"""
Build the NBA Game Explorer data for one season.

Reads the SportsDataverse copies of ESPN's play-by-play and schedule files
(the same files the R package hoopR loads) and writes:

  <out>/games.json      one row per game, plus the 30 teams and their chart colors
  <out>/g/<game_id>.json one file per game: plays, lead changes, runs, timeouts

Usage:
  python3 -I build_games.py <pbp.parquet> <schedule.parquet> <out_dir> <season_label>
"""
import sys, os, json, math, colorsys
import pandas as pd

pbp_path, sched_path, out_dir, season_label = sys.argv[1:5]
os.makedirs(os.path.join(out_dir, "g"), exist_ok=True)

RUN_MIN = 8          # a "run" is 8 or more unanswered points
PANEL = "161B23"     # the site's panel color; chart colors must contrast with it

# ------------------------------------------------------------------ colors
def lum(h):
    r, g, b = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    f = lambda c: c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)

def contrast(a, b=PANEL):
    la, lb = lum(a), lum(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)

def lighten_to(h, target=3.4):
    """Raise lightness (keeping hue) until the color reaches the contrast target."""
    r, g, b = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    hh, ll, ss = colorsys.rgb_to_hls(r, g, b)
    while contrast(h) < target and ll < 0.92:
        ll = min(0.92, ll + 0.02)
        r, g, b = colorsys.hls_to_rgb(hh, ll, ss)
        h = "%02x%02x%02x" % (round(r * 255), round(g * 255), round(b * 255))
    return h

def to_lab(h):
    def lin(c):
        c /= 255
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = [lin(int(h[i:i + 2], 16)) for i in (0, 2, 4)]
    x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047
    y = (0.2126 * r + 0.7152 * g + 0.0722 * b)
    z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883
    f = lambda t: t ** (1 / 3) if t > 0.008856 else 7.787 * t + 16 / 116
    return 116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))

def delta_e(a, b):
    return math.dist(to_lab(a), to_lab(b))

# Which ESPN color fans most associate with each team, when it is not the
# first one listed. Everything else starts from ESPN's primary color.
PREFER_ALT = {"IND", "DEN", "NY", "PHX", "NO", "GS", "SA", "BKN", "UTAH", "MIL"}
NEUTRAL = "9aa4b2"   # used only if two teams' colors are still too alike

def team_colors(abbr, c, alt):
    order = [alt, c] if abbr in PREFER_ALT else [c, alt]
    out = []
    for h in order:
        h = h.lower()
        if h in ("000000",):          # pure black cannot show on a dark page
            continue
        out.append(lighten_to(h))
    if not out:
        out = [NEUTRAL]
    if len(out) == 1:
        out.append(NEUTRAL)
    return out

def pick_pair(home_cols, away_cols):
    """Home keeps its first color; the away team switches if the two are too alike."""
    h = home_cols[0].lstrip("#")
    for a in [x.lstrip("#") for x in away_cols] + [NEUTRAL]:
        if delta_e(h, a) >= 28:
            return "#" + h, "#" + a
    return "#" + h, "#" + NEUTRAL

# ------------------------------------------------------------------ helpers
def clock_seconds(s):
    s = str(s)
    if ":" in s:
        m, sec = s.split(":")
        return int(m) * 60 + float(sec)
    return float(s)

def elapsed(period, clock):
    if period <= 4:
        return (period - 1) * 720 + (720 - clock)
    return 2880 + (period - 5) * 300 + (300 - clock)

def stage_label(row):
    note = (row.notes_headline or "").strip()
    if row.type_abbreviation == "CC":
        return "NBA Cup Championship", "Does not count in the standings"
    if row.season_type == 5:
        n = note.replace("NBA Play-In - ", "").replace(" - ", " ")
        n = n.replace("7th Place vs 8th Place", "7th vs 8th place game").replace("9th Place vs 10th Place", "9th vs 10th place game")
        return "Play-In Tournament", n
    if row.season_type == 3:
        rnd, _, g = note.partition(" - ")
        rnd = rnd.replace("1st Round", "First Round")
        return "Playoffs", f"{rnd}, {g}"
    if note.startswith("NBA Cup - "):
        part = note.replace("NBA Cup - ", "")
        part = {"Group Play": "group play", "Quarterfinals": "quarterfinal", "Semifinals": "semifinal"}.get(part, part.lower())
        return "Regular season", f"NBA Cup {part}"
    if note and not note.startswith("Postponed"):
        return "Regular season", note
    return "Regular season", ""

# ------------------------------------------------------------------ load
pbp = pd.read_parquet(pbp_path)
sched = pd.read_parquet(sched_path)
sched = sched[sched.season_type.isin([2, 3, 5]) & (sched.type_abbreviation != "ALLSTAR")]
sched = sched[sched.game_id.isin(set(pbp.game_id.unique()))].copy()
sched = sched.sort_values("game_date_time")

teams = {}
for side in ("home", "away"):
    for _, r in sched.drop_duplicates(f"{side}_id").iterrows():
        a = r[f"{side}_abbreviation"]
        teams[a] = {
            "abbr": a,
            "name": r[f"{side}_display_name"],
            "short": r[f"{side}_short_display_name"],
            "colors": ["#" + x for x in team_colors(a, r[f"{side}_color"], r[f"{side}_alternate_color"])],
        }

index_rows, problems = [], []

for _, g in sched.iterrows():
    gid = int(g.game_id)
    d = pbp[pbp.game_id == gid].sort_values("game_play_number")
    home_id, away_id = int(g.home_id), int(g.away_id)

    types, type_ix = [], {}
    plays = []
    prev_t = 0.0
    for r in d.itertuples(index=False):
        p = int(r.period_number)
        c = clock_seconds(r.clock_display_value)
        t = max(prev_t, round(elapsed(p, c), 1))   # keep time moving forward
        prev_t = t
        tid = None if pd.isna(r.team_id) else int(r.team_id)
        side = 1 if tid == home_id else 2 if tid == away_id else 0
        tt = r.type_text.replace("\n", " ") if isinstance(r.type_text, str) else ""
        if tt not in type_ix:
            type_ix[tt] = len(types); types.append(tt)
        plays.append([t, p, str(r.clock_display_value), int(r.home_score), int(r.away_score), side, type_ix[tt],
                      (r.text or "").strip() if isinstance(r.text, str) else ""])

    # ESPN's score columns are right in almost every game. If they ever go
    # backwards or miss the official final, rebuild the running score from the
    # scoring plays instead, and say so on the page.
    official = (int(g.home_score), int(g.away_score))
    data_note = None
    monotonic = all(plays[i][3] >= plays[i - 1][3] and plays[i][4] >= plays[i - 1][4] for i in range(1, len(plays)))
    if not monotonic or (plays[-1][3], plays[-1][4]) != official:
        hs = as_ = 0
        for pl, r in zip(plays, d.itertuples(index=False)):
            if bool(r.scoring_play) and not pd.isna(r.score_value):
                if pl[5] == 1: hs += int(r.score_value)
                elif pl[5] == 2: as_ += int(r.score_value)
            pl[3], pl[4] = hs, as_
        problems.append((gid, "rebuilt score", (hs, as_), official))
        if (hs, as_) != official:
            diff_h, diff_a = hs - official[0], as_ - official[1]
            data_note = ("ESPN's play-by-play for this game does not match the official box score "
                         f"({hs} to {as_} instead of {official[0]} to {official[1]}), so the line may be off by "
                         f"{max(abs(diff_h), abs(diff_a))} points in places. The final score above is the official one.")
    hs_final, as_final = official

    # ---- scoring plays, lead changes, ties, largest leads, runs
    lead_changes, ties = [], 0
    last_leader, prev_margin = 0, 0
    big = {1: 0, 2: 0}
    runs, cur = [], None       # cur = [side, start_idx, end_idx, points]
    ph, pa = 0, 0
    for i, pl in enumerate(plays):
        hs, as_ = pl[3], pl[4]
        dh, da = hs - ph, as_ - pa
        if dh == 0 and da == 0:
            continue
        if dh < 0 or da < 0:
            problems.append((gid, "score went down", i, (ph, pa), (hs, as_)))
        scorer = 1 if dh > 0 and da == 0 else 2 if da > 0 and dh == 0 else 0
        pts = max(dh, 0) + max(da, 0)
        if scorer and cur and cur[0] == scorer:
            cur[2] = i; cur[3] += pts
        else:
            if cur and cur[3] >= RUN_MIN:
                runs.append(cur)
            cur = [scorer, i, i, pts] if scorer else None
        ph, pa = hs, as_
        m = hs - as_
        big[1] = max(big[1], m); big[2] = max(big[2], -m)
        leader = 1 if m > 0 else 2 if m < 0 else 0
        if leader and last_leader and leader != last_leader:
            lead_changes.append(i)
        if leader:
            last_leader = leader
        if m == 0 and prev_margin != 0:
            ties += 1
        prev_margin = m
    if cur and cur[3] >= RUN_MIN:
        runs.append(cur)

    # biggest unanswered run for each team (any size)
    best = {1: [0, None, None], 2: [0, None, None]}
    ph = pa = 0; cur = None
    for i, pl in enumerate(plays):
        dh, da = pl[3] - ph, pl[4] - pa
        if dh == 0 and da == 0:
            continue
        scorer = 1 if dh > 0 and da == 0 else 2 if da > 0 and dh == 0 else 0
        pts = max(dh, 0) + max(da, 0)
        if scorer and cur and cur[0] == scorer:
            cur[2] = i; cur[3] += pts
        else:
            cur = [scorer, i, i, pts] if scorer else None
        if cur and cur[3] > best[cur[0]][0]:
            best[cur[0]] = [cur[3], cur[1], cur[2]]
        ph, pa = pl[3], pl[4]

    # ---- timeouts, with the two mandatory timeouts per period tagged by rule
    # NBA Rule 5, Section VI: if neither team has taken a timeout before 6:59,
    # the scorer takes one at the first dead ball and charges it to the home
    # team. If no later timeout is taken before 2:59, the scorer takes one and
    # charges it to the team not previously charged.
    timeouts = []
    for per in range(1, 5):
        tos = [i for i, pl in enumerate(plays) if pl[1] == per and types[pl[6]] == "Full Timeout" and pl[5]]
        kinds = {i: 0 for i in tos}
        if tos:
            first = tos[0]
            if clock_seconds(plays[first][2]) <= 419 and plays[first][5] == 1:
                kinds[first] = 1
            charged = {plays[first][5]}
            if len(tos) > 1:
                second = tos[1]
                if clock_seconds(plays[second][2]) <= 179 and plays[second][5] not in charged:
                    kinds[second] = 2
        for i in tos:
            timeouts.append([i, kinds[i]])
    for i, pl in enumerate(plays):
        if pl[1] > 4 and types[pl[6]] == "Full Timeout" and pl[5]:
            timeouts.append([i, 0])
    timeouts.sort()

    hp, ap = teams[g.home_abbreviation], teams[g.away_abbreviation]
    hc, ac = pick_pair(hp["colors"], ap["colors"])

    def lines(s):
        try:
            import ast
            return [int(x["value"]) for x in ast.literal_eval(s.replace("\n", ","))]
        except Exception:
            return []

    stage, detail = stage_label(g)
    n_periods = max(pl[1] for pl in plays)
    att = None if pd.isna(g.attendance) or g.attendance == 0 else int(g.attendance)
    game = {
        "id": gid,
        "date": str(g.game_date),
        "start": g.game_date_time.isoformat(),
        "stage": stage, "detail": detail,
        "venue": g.venue_full_name, "city": g.venue_address_city,
        "state": None if pd.isna(g.venue_address_state) else g.venue_address_state,
        "attendance": att,
        "periods": n_periods,
        "home": {"abbr": g.home_abbreviation, "score": hs_final, "lines": lines(g.home_linescores), "color": hc},
        "away": {"abbr": g.away_abbreviation, "score": as_final, "lines": lines(g.away_linescores), "color": ac},
        "dataNote": data_note,
        "types": types,
        "plays": plays,
        "leadChanges": lead_changes,
        "ties": ties,
        "largest": {"home": big[1], "away": big[2]},
        "bestRun": {"home": best[1], "away": best[2]},
        "runs": runs,
        "timeouts": timeouts,
    }
    with open(os.path.join(out_dir, "g", f"{gid}.json"), "w") as f:
        json.dump(game, f, separators=(",", ":"), ensure_ascii=False)

    index_rows.append({
        "id": gid, "date": str(g.game_date), "stage": stage, "detail": detail,
        "h": g.home_abbreviation, "a": g.away_abbreviation, "hs": hs_final, "as": as_final,
        "ot": max(0, n_periods - 4),
    })

out = {
    "season": season_label,
    "built": pd.Timestamp.now(tz="America/New_York").strftime("%Y-%m-%d"),
    "runMin": RUN_MIN,
    "teams": dict(sorted(teams.items(), key=lambda kv: kv[1]["name"])),
    "games": index_rows,
}
with open(os.path.join(out_dir, "games.json"), "w") as f:
    json.dump(out, f, separators=(",", ":"), ensure_ascii=False)

print("games written:", len(index_rows))
print("problems:", len(problems))
for p in problems[:25]:
    print("  ", p)
