/* ============================================================
   NBA GAME EXPLORER (nba-games/explorer.js)

   1. settings
   2. loading the season and a game
   3. pickers (team, game, earlier and later)
   4. scoreboard and summary numbers
   5. the chart
   6. hover, touch, and keyboard
   7. lists, CSV download, copy link
   8. small helpers

   No libraries. The chart is plain SVG, redrawn when the page
   is resized. Anyone who prefers reduced motion sees the line
   without the drawing animation.
   ============================================================ */
(function () {
  'use strict';

  /* ---- 1. settings ------------------------------------------ */
  var SEASON = '2024-25';
  var DATA = 'data/' + SEASON + '/';
  var DEFAULT_TEAM = 'OKC';          // first view: the Thunder in Game 7 of the NBA Finals
  var DEFAULT_GAME = 401766128;
  var GROUPS = ['Playoffs', 'Play-In Tournament', 'NBA Cup Championship', 'Regular season'];
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var $ = function (id) { return document.getElementById(id); };
  var el = {
    team: $('geTeam'), game: $('geGame'), prev: $('gePrev'), next: $('geNext'),
    board: $('geBoard'), stats: $('geStats'), plot: $('gePlot'), tip: $('geTip'),
    legend: $('geLegend'), summary: $('geSummary'), note: $('geNote'), lists: $('geLists'),
    csv: $('geCsv'), copy: $('geCopy'), copied: $('geCopied'),
    showLc: $('geShowLc'), showRuns: $('geShowRuns'), showTo: $('geShowTo'),
    chartTitle: $('geChartTitle')
  };

  var S = { ix: null, team: null, gameId: null, g: null, v: null, cache: {}, cursor: -1, drawn: false, token: 0 };

  /* ---- 2. loading ------------------------------------------- */
  fetch(DATA + 'games.json')
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(init)
    .catch(function () {
      el.board.innerHTML = '<p class="ge-msg" style="grid-column:1 / -1">The season data could not be loaded. Please refresh the page to try again.</p>';
    });

  function loadGame(id) {
    if (S.cache[id]) return Promise.resolve(S.cache[id]);
    return fetch(DATA + 'g/' + id + '.json')
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (g) { S.cache[id] = g; return g; });
  }

  function init(ix) {
    S.ix = ix;
    ix.byId = {};
    ix.games.forEach(function (g) { ix.byId[g.id] = g; });
    var abbrs = Object.keys(ix.teams);
    el.team.innerHTML = abbrs.map(function (a) {
      return '<option value="' + a + '">' + esc(ix.teams[a].name) + '</option>';
    }).join('');

    var h = parseHash();
    var team = h.team && ix.teams[h.team] ? h.team : DEFAULT_TEAM;
    var gid = h.game && ix.byId[h.game] && involves(ix.byId[h.game], team) ? h.game : null;
    if (!gid && team === DEFAULT_TEAM) gid = DEFAULT_GAME;
    setTeam(team, gid);

    el.team.addEventListener('change', function () { setTeam(el.team.value, null); });
    el.game.addEventListener('change', function () { showGame(+el.game.value); });
    el.prev.addEventListener('click', function () { step(-1); });
    el.next.addEventListener('click', function () { step(1); });
    [el.showLc, el.showRuns, el.showTo].forEach(function (c) { c.addEventListener('change', function () { draw(false); }); });
    window.addEventListener('hashchange', function () {
      var h2 = parseHash();
      if (h2.team && ix.teams[h2.team]) {
        if (h2.team !== S.team || h2.game !== S.gameId) setTeam(h2.team, h2.game);
      } else {
        writeHash();      // not a team we know: keep showing the current game
      }
    });
    el.csv.addEventListener('click', downloadCsv);
    el.copy.addEventListener('click', copyLink);
    if (window.ResizeObserver) {
      var lastW = 0;
      new ResizeObserver(function () {
        var w = el.plot.clientWidth;
        if (S.v && Math.abs(w - lastW) > 2) { lastW = w; draw(false); }
      }).observe(el.plot);
    }
    bindPointer();
  }

  /* ---- 3. pickers ------------------------------------------- */
  function involves(g, a) { return g.h === a || g.a === a; }

  function teamGames(a) {
    return S.ix.games.filter(function (g) { return involves(g, a); })
      .sort(function (x, y) { return x.date < y.date ? -1 : x.date > y.date ? 1 : x.id - y.id; });
  }

  function groupOf(g) {
    if (g.stage === 'Playoffs') return 'Playoffs';
    if (g.stage === 'Play-In Tournament') return 'Play-In Tournament';
    if (g.stage === 'NBA Cup Championship') return 'NBA Cup Championship';
    return 'Regular season';
  }

  function setTeam(a, gid) {
    S.team = a;
    el.team.value = a;
    var list = teamGames(a);
    var html = '';
    GROUPS.forEach(function (grp) {
      var rows = list.filter(function (g) { return groupOf(g) === grp; }).reverse();   // newest first
      if (!rows.length) return;
      html += '<optgroup label="' + grp + ' (' + rows.length + ')">' + rows.map(function (g) {
        return '<option value="' + g.id + '">' + esc(gameLabel(g, a)) + '</option>';
      }).join('') + '</optgroup>';
    });
    el.game.innerHTML = html;
    if (!gid || !list.some(function (g) { return g.id === gid; })) gid = list[list.length - 1].id;
    showGame(gid);
  }

  function gameLabel(g, a) {
    var home = g.h === a, opp = home ? g.a : g.h;
    var my = home ? g.hs : g.as, their = home ? g.as : g.hs;
    var d = g.date.split('-');
    var s = MONTHS[+d[1] - 1] + ' ' + (+d[2]) + '  ·  ' + (home ? 'vs ' : 'at ') + opp + '  ·  ' + (my > their ? 'W ' : 'L ') + my + '-' + their;
    if (g.ot) s += g.ot === 1 ? ' (OT)' : ' (' + g.ot + 'OT)';
    if (g.stage === 'Playoffs' || g.stage === 'Play-In Tournament') s += '  ·  ' + g.detail.replace(/^(East|West) /, '').replace('NBA Finals, ', 'Finals, ');
    else if (g.detail && /NBA Cup (quarter|semi)/.test(g.detail)) s += '  ·  ' + g.detail;
    return s;
  }

  function step(dir) {
    var list = teamGames(S.team);
    var i = list.findIndex(function (g) { return g.id === S.gameId; });
    var j = i + dir;
    if (j >= 0 && j < list.length) showGame(list[j].id);
  }

  function updateSteps() {
    var list = teamGames(S.team);
    var i = list.findIndex(function (g) { return g.id === S.gameId; });
    el.prev.disabled = i <= 0;
    el.next.disabled = i >= list.length - 1;
  }

  function showGame(id) {
    S.gameId = id;
    el.game.value = String(id);
    updateSteps();
    writeHash();
    var token = ++S.token;
    loadGame(id).then(function (g) {
      if (token !== S.token) return;      // a newer choice arrived while loading
      S.g = g;
      S.v = view(g, S.team);
      S.cursor = -1;
      renderBoard();
      renderStats();
      renderNote();
      draw(true);
      renderLists();
    }).catch(function () {
      if (token !== S.token) return;
      el.plot.innerHTML = '<p class="ge-msg">This game could not be loaded. Please try another game or refresh the page.</p>';
    });
  }

  function parseHash() {
    var m = (location.hash || '').replace('#', '').split('/');
    return { team: m[0] ? decodeURIComponent(m[0]).toUpperCase() : null, game: m[1] ? +m[1] : null };
  }
  function writeHash() {
    var h = '#' + S.team + '/' + S.gameId;
    if (location.hash !== h) history.replaceState(null, '', h);
  }

  /* The game from the chosen team's point of view. */
  function view(g, a) {
    var selHome = g.home.abbr === a;
    var sel = selHome ? g.home : g.away, opp = selHome ? g.away : g.home;
    var sign = selHome ? 1 : -1;
    var T = S.ix.teams;
    var end = 2880 + Math.max(0, g.periods - 4) * 300;
    var ev = [{ i: -1, t: 0, m: 0 }];
    var ph = 0, pa = 0;
    g.plays.forEach(function (p, i) {
      if (p[3] !== ph || p[4] !== pa) {
        ev.push({ i: i, t: p[0], m: sign * (p[3] - p[4]) });
        ph = p[3]; pa = p[4];
      }
    });
    // time in the lead
    var lead = { sel: 0, opp: 0, tie: 0 };
    for (var k = 0; k < ev.length; k++) {
      var t1 = k + 1 < ev.length ? ev[k + 1].t : end;
      var dur = Math.max(0, t1 - ev[k].t);
      if (ev[k].m > 0) lead.sel += dur; else if (ev[k].m < 0) lead.opp += dur; else lead.tie += dur;
    }
    var selKey = selHome ? 'home' : 'away', oppKey = selHome ? 'away' : 'home';
    return {
      selHome: selHome, sign: sign, end: end, ev: ev, lead: lead,
      sel: { abbr: sel.abbr, color: sel.color, name: T[sel.abbr].name, short: T[sel.abbr].short, side: selHome ? 1 : 2, key: selKey },
      opp: { abbr: opp.abbr, color: opp.color, name: T[opp.abbr].name, short: T[opp.abbr].short, side: selHome ? 2 : 1, key: oppKey }
    };
  }

  /* ---- 4. scoreboard and summary numbers --------------------- */
  function renderBoard() {
    var g = S.g, v = S.v, T = S.ix.teams;
    function side(key) {
      var t = g[key], other = g[key === 'home' ? 'away' : 'home'];
      var isSel = t.abbr === v.sel.abbr;
      return '<div class="ge-side ' + key + (isSel ? ' sel' : '') + (t.score > other.score ? ' won' : '') + '" style="--tc:' + t.color + '">' +
        '<div class="ge-badge" aria-hidden="true">' + esc(t.abbr) + '</div>' +
        '<div class="ge-tname">' + esc(T[t.abbr].name) + '</div>' +
        '<div class="ge-ha">' + (key === 'home' ? 'Home' : 'Away') + (isSel ? ' · <b>Following</b>' : '') + '</div>' +
        '<div class="ge-score"><span class="ge-sr">' + esc(T[t.abbr].short) + ' </span>' + t.score + '</div>' +
        '</div>';
    }
    var d = g.date.split('-');
    var dt = new Date(+d[0], +d[1] - 1, +d[2]);
    var dateStr = DAYS[dt.getDay()] + ', ' + MONTHS_LONG[dt.getMonth()] + ' ' + dt.getDate() + ', ' + dt.getFullYear();
    var tip = tipoff(g.start);
    var place = esc(g.venue || '') + (g.city ? ', ' + esc(g.city) + (g.state && g.state.length <= 3 ? ', ' + esc(g.state) : '') : '');
    var heads = '', ra = '', rh = '';
    var n = Math.max(g.home.lines.length, g.away.lines.length);
    for (var q = 0; q < n; q++) {
      heads += '<th scope="col">' + (q < 4 ? 'Q' + (q + 1) : (q === 4 ? 'OT' : (q - 3) + 'OT')) + '</th>';
      ra += '<td>' + (g.away.lines[q] != null ? g.away.lines[q] : '') + '</td>';
      rh += '<td>' + (g.home.lines[q] != null ? g.home.lines[q] : '') + '</td>';
    }
    var lines = n ? '<table class="ge-lines"><caption class="ge-sr">Points by quarter</caption><thead><tr><th></th>' + heads + '<th scope="col">T</th></tr></thead><tbody>' +
      '<tr><th scope="row">' + esc(g.away.abbr) + '</th>' + ra + '<td class="t">' + g.away.score + '</td></tr>' +
      '<tr><th scope="row">' + esc(g.home.abbr) + '</th>' + rh + '<td class="t">' + g.home.score + '</td></tr></tbody></table>' : '';
    el.board.innerHTML = side('away') +
      '<div class="ge-mid">' +
        '<div><div class="ge-stage">' + esc(g.stage) + '</div>' + (g.detail ? '<div class="ge-detail">' + esc(g.detail) + '</div>' : '') + '</div>' +
        '<div class="ge-facts"><span><b>' + dateStr + '</b>' + (tip ? ', ' + tip : '') + '</span><span>' + place + '</span>' +
          (g.attendance ? '<span>Attendance ' + g.attendance.toLocaleString('en-US') + '</span>' : '') + '</div>' +
        lines +
        '<button class="ge-swap" type="button" id="geSwap">Follow the ' + esc(v.opp.short) + ' instead</button>' +
      '</div>' +
      side('home');
    $('geSwap').addEventListener('click', function () { setTeam(v.opp.abbr, g.id); });
    el.chartTitle.textContent = v.sel.short + ' and ' + v.opp.short + ': score difference throughout the game';
  }

  function renderStats() {
    var g = S.g, v = S.v;
    function pair(selVal, oppVal) {
      return '<div class="ge-pair">' +
        '<div style="--tc:' + v.sel.color + '"><span><i></i>' + esc(v.sel.short) + '</span><b>' + selVal + '</b></div>' +
        '<div style="--tc:' + v.opp.color + '"><span><i></i>' + esc(v.opp.short) + '</span><b>' + oppVal + '</b></div></div>';
    }
    function run(r) { return r[0] ? r[0] + '-0' : 'None'; }
    el.stats.innerHTML =
      '<div class="ge-stat"><div class="ge-stat-k">Lead changes</div><div class="ge-stat-v">' + g.leadChanges.length + '</div></div>' +
      '<div class="ge-stat"><div class="ge-stat-k">Times tied</div><div class="ge-stat-v">' + g.ties + '</div></div>' +
      '<div class="ge-stat"><div class="ge-stat-k">Largest lead</div>' + pair(g.largest[v.sel.key], g.largest[v.opp.key]) + '</div>' +
      '<div class="ge-stat"><div class="ge-stat-k">Biggest run</div>' + pair(run(g.bestRun[v.sel.key]), run(g.bestRun[v.opp.key])) + '</div>' +
      '<div class="ge-stat"><div class="ge-stat-k">Time in the lead</div>' + pair(mmss(v.lead.sel), mmss(v.lead.opp)) + '</div>';
  }

  function renderNote() {
    el.note.innerHTML = S.g.dataNote ? '<p class="ge-note"><b>About this game’s data.</b> ' + esc(S.g.dataNote) + '</p>' : '';
  }

  /* ---- 5. the chart ------------------------------------------ */
  var geo = null;   // sizes and scales from the last drawing, used by hover

  function draw(animate) {
    var g = S.g, v = S.v;
    if (!g) return;
    var W = Math.max(280, el.plot.clientWidth);
    var small = W < 620;
    var showTo = el.showTo.checked, showRuns = el.showRuns.checked, showLc = el.showLc.checked;
    var L = small ? 34 : 50, R = 10, T = 28;
    var PH = small ? 230 : 330;
    var STRIP = showTo ? 46 : 0;
    var H = T + PH + 14 + STRIP;
    var x = function (t) { return L + (t / v.end) * (W - L - R); };
    // each side gets the room it needs (at least 10 points), so a blowout
    // does not squeeze the line into half of the chart
    var up = 0, dn = 0;
    v.ev.forEach(function (e) { up = Math.max(up, e.m); dn = Math.max(dn, -e.m); });
    var big = Math.max(up, dn);
    var stepV = big <= 12 ? 5 : big <= 32 ? 10 : 20;
    var top = Math.max(10, Math.ceil((up + 2) / stepV) * stepV);
    var bot = Math.max(10, Math.ceil((dn + 2) / stepV) * stepV);
    var y = function (m) { return T + (top - m) / (top + bot) * PH; };
    var y0 = y(0);
    var id = 'g' + (++uid);
    var o = [];

    o.push('<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-labelledby="' + id + 't">');
    o.push('<title id="' + id + 't">' + esc(chartSummary()) + '</title>');
    o.push('<defs>' +
      '<clipPath id="' + id + 'up"><rect x="0" y="0" width="' + W + '" height="' + y0 + '"/></clipPath>' +
      '<clipPath id="' + id + 'dn"><rect x="0" y="' + y0 + '" width="' + W + '" height="' + (H - y0) + '"/></clipPath>' +
      '<clipPath id="' + id + 'rv"><rect id="' + id + 'rvr" x="0" y="0" width="' + (animate && !reduce ? L : W) + '" height="' + H + '"/></clipPath>' +
      '</defs>');

    // quarter bands, lines, and labels
    for (var p = 1; p <= g.periods; p++) {
      var a = p <= 4 ? (p - 1) * 720 : 2880 + (p - 5) * 300;
      var b = p <= 4 ? p * 720 : a + 300;
      if (p % 2 === 0) o.push('<rect x="' + x(a) + '" y="' + T + '" width="' + (x(b) - x(a)) + '" height="' + PH + '" fill="rgba(255,255,255,.018)"/>');
      if (p > 1) o.push('<line x1="' + x(a) + '" x2="' + x(a) + '" y1="' + (T - 6) + '" y2="' + (H - 2) + '" stroke="rgba(255,255,255,.12)" stroke-dasharray="3 4"/>');
      var lab = p <= 4 ? 'Q' + p : (p === 5 ? 'OT' : (p - 4) + 'OT');
      o.push('<text class="q-lab" x="' + ((x(a) + x(b)) / 2) + '" y="' + (T - 10) + '" text-anchor="middle">' + lab + '</text>');
    }

    // y grid and labels
    for (var m = -bot; m <= top; m += stepV) {
      if (m === 0) continue;
      o.push('<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(m) + '" y2="' + y(m) + '" stroke="rgba(255,255,255,.05)"/>');
      o.push('<text x="' + (L - 8) + '" y="' + (y(m) + 3.5) + '" text-anchor="end">' + Math.abs(m) + '</text>');
    }
    o.push('<text x="' + (L - 8) + '" y="' + (y0 + 3.5) + '" text-anchor="end">0</text>');
    o.push('<text class="lead-lab" x="' + (L + 8) + '" y="' + (T + 14) + '" style="fill:' + v.sel.color + '">' + esc(v.sel.short.toUpperCase()) + ' LEAD</text>');
    o.push('<text class="lead-lab" x="' + (L + 8) + '" y="' + (T + PH - 8) + '" style="fill:' + v.opp.color + '">' + esc(v.opp.short.toUpperCase()) + ' LEAD</text>');

    // runs of 8 or more
    if (showRuns) {
      g.runs.forEach(function (r) {
        var isSel = r[0] === v.sel.side, c = isSel ? v.sel.color : v.opp.color;
        var x1 = x(g.plays[r[1]][0]), x2 = Math.max(x(g.plays[r[2]][0]), x1 + 3);
        o.push('<rect x="' + x1 + '" y="' + T + '" width="' + (x2 - x1) + '" height="' + PH + '" fill="' + c + '" fill-opacity=".1"/>');
        o.push('<rect x="' + x1 + '" y="' + (isSel ? T : T + PH - 3) + '" width="' + (x2 - x1) + '" height="3" fill="' + c + '" fill-opacity=".8"/>');
        if (x2 - x1 >= 26) o.push('<text class="run-lab" x="' + ((x1 + x2) / 2) + '" y="' + (isSel ? T + 30 : T + PH - 24) + '" text-anchor="middle" style="fill:' + c + '">' + r[3] + '-0</text>');
      });
    }

    // zero line
    o.push('<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y0 + '" y2="' + y0 + '" stroke="rgba(255,255,255,.32)"/>');

    // the stepped line and its fill
    var d = 'M' + x(0) + ',' + y0;
    for (var k = 1; k < v.ev.length; k++) d += 'H' + x(v.ev[k].t).toFixed(1) + 'V' + y(v.ev[k].m).toFixed(1);
    d += 'H' + x(v.end).toFixed(1);
    var area = d + 'V' + y0 + 'H' + x(0) + 'Z';
    o.push('<g clip-path="url(#' + id + 'rv)">');
    o.push('<g clip-path="url(#' + id + 'up)"><path d="' + area + '" fill="' + v.sel.color + '" fill-opacity=".16"/><path d="' + d + '" fill="none" stroke="' + v.sel.color + '" stroke-width="2" stroke-linejoin="round"/></g>');
    o.push('<g clip-path="url(#' + id + 'dn)"><path d="' + area + '" fill="' + v.opp.color + '" fill-opacity=".16"/><path d="' + d + '" fill="none" stroke="' + v.opp.color + '" stroke-width="2" stroke-linejoin="round"/></g>');

    // lead changes
    if (showLc) {
      var evAt = {};
      v.ev.forEach(function (e) { evAt[e.i] = e; });
      g.leadChanges.forEach(function (i) {
        var e = evAt[i];
        if (!e) return;
        var c = e.m > 0 ? v.sel.color : v.opp.color;
        o.push('<path d="' + diamond(x(e.t), y(e.m), 5.5) + '" fill="' + c + '" stroke="#161B23" stroke-width="2"/>');
      });
    }
    o.push('</g>');

    // timeouts strip
    if (showTo) {
      var ry = [T + PH + 14 + 12, T + PH + 14 + 32];
      o.push('<text x="' + (L - 8) + '" y="' + (ry[0] + 3.5) + '" text-anchor="end" style="fill:' + v.sel.color + '">' + esc(v.sel.abbr) + '</text>');
      o.push('<text x="' + (L - 8) + '" y="' + (ry[1] + 3.5) + '" text-anchor="end" style="fill:' + v.opp.color + '">' + esc(v.opp.abbr) + '</text>');
      o.push('<line x1="' + L + '" x2="' + (W - R) + '" y1="' + ry[0] + '" y2="' + ry[0] + '" stroke="rgba(255,255,255,.06)"/>');
      o.push('<line x1="' + L + '" x2="' + (W - R) + '" y1="' + ry[1] + '" y2="' + ry[1] + '" stroke="rgba(255,255,255,.06)"/>');
      g.timeouts.forEach(function (to) {
        var pl = g.plays[to[0]];
        var row = pl[5] === v.sel.side ? 0 : 1, c = row === 0 ? v.sel.color : v.opp.color;
        if (to[1]) o.push('<circle cx="' + x(pl[0]) + '" cy="' + ry[row] + '" r="4.2" fill="#161B23" stroke="' + c + '" stroke-width="1.6"/>');
        else o.push('<circle cx="' + x(pl[0]) + '" cy="' + ry[row] + '" r="4.6" fill="' + c + '"/>');
      });
    }

    // hover marks (moved by the pointer code)
    o.push('<line id="' + id + 'hx" x1="0" x2="0" y1="' + T + '" y2="' + (H - 2) + '" stroke="rgba(255,255,255,.35)" stroke-width="1" visibility="hidden"/>');
    o.push('<circle id="' + id + 'hd" r="5" fill="#E8EDF4" stroke="#161B23" stroke-width="2" visibility="hidden"/>');
    o.push('</svg>');
    el.plot.innerHTML = o.join('');

    geo = { W: W, H: H, L: L, R: R, T: T, PH: PH, x: x, y: y, ry: showTo ? [T + PH + 14 + 12, T + PH + 14 + 32] : null, id: id, small: small };
    renderLegend(showLc, showRuns, showTo);
    el.summary.textContent = chartSummary();
    hideHover();

    if (animate && !reduce) {
      var rect = document.getElementById(id + 'rvr'), t0 = null, dur = 900;
      var tick = function (now) {
        if (!rect.isConnected) return;
        if (t0 === null) t0 = now;
        var k = Math.min(1, (now - t0) / dur);
        k = 1 - Math.pow(1 - k, 3);
        rect.setAttribute('width', L + k * (W - L));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }
  var uid = 0;

  function renderLegend(lc, runs, to) {
    var v = S.v, out = [];
    if (lc) out.push('<span><svg width="12" height="12"><path d="' + diamond(6, 6, 5) + '" fill="#8B97A7"/></svg>Lead change</span>');
    if (runs) out.push('<span><svg width="14" height="12"><rect x="0" y="0" width="14" height="12" fill="#8B97A7" fill-opacity=".25"/><rect x="0" y="0" width="14" height="3" fill="#8B97A7"/></svg>Run of 8 or more points in a row</span>');
    if (to) {
      out.push('<span><svg width="12" height="12"><circle cx="6" cy="6" r="4.6" fill="#8B97A7"/></svg>Timeout called by the team</span>');
      out.push('<span><svg width="12" height="12"><circle cx="6" cy="6" r="4.2" fill="none" stroke="#8B97A7" stroke-width="1.6"/></svg>Mandatory timeout</span>');
    }
    el.legend.innerHTML = out.join('');
  }

  function chartSummary() {
    var g = S.g, v = S.v;
    var selS = g[v.sel.key].score, oppS = g[v.opp.key].score;
    var winner = selS > oppS ? v.sel.short : v.opp.short;
    var s = 'The ' + winner + ' won ' + Math.max(selS, oppS) + ' to ' + Math.min(selS, oppS) + '. ';
    s += 'The ' + v.sel.short + ' led for ' + mmss(v.lead.sel) + ' and the ' + v.opp.short + ' led for ' + mmss(v.lead.opp) + '. ';
    s += 'The ' + poss(v.sel.short) + ' largest lead was ' + g.largest[v.sel.key] + ' points, and the ' + poss(v.opp.short) + ' largest lead was ' + g.largest[v.opp.key] + ' points. ';
    s += 'The lead changed hands ' + g.leadChanges.length + (g.leadChanges.length === 1 ? ' time' : ' times') + ', and the score was tied ' + g.ties + (g.ties === 1 ? ' time.' : ' times.');
    return s;
  }

  /* ---- 6. hover, touch, and keyboard ------------------------- */
  function bindPointer() {
    var p = el.plot;
    p.addEventListener('pointermove', onPoint);
    p.addEventListener('pointerdown', onPoint);
    p.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') hideHover(); });
    p.addEventListener('keydown', function (e) {
      if (!S.v) return;
      var n = S.v.ev.length - 1, c = S.cursor < 0 ? 0 : S.cursor;
      if (e.key === 'ArrowRight') c = Math.min(n, c + 1);
      else if (e.key === 'ArrowLeft') c = Math.max(1, c - 1);
      else if (e.key === 'Home') c = 1;
      else if (e.key === 'End') c = n;
      else if (e.key === 'Escape') { hideHover(); return; }
      else return;
      e.preventDefault();
      if (c < 1) c = 1;
      S.cursor = c;
      showScore(c);
    });
    p.addEventListener('blur', hideHover);
  }

  function onPoint(e) {
    if (!geo || !S.v) return;
    var r = el.plot.getBoundingClientRect();
    var scale = geo.W / r.width;
    var px = (e.clientX - r.left) * scale, py = (e.clientY - r.top) * scale;
    if (px < geo.L - 4 || px > geo.W) { hideHover(); return; }
    var t = (px - geo.L) / (geo.W - geo.L - geo.R) * S.v.end;
    // over the timeout rows?
    if (geo.ry && py > geo.T + geo.PH + 8) {
      var row = Math.abs(py - geo.ry[0]) < Math.abs(py - geo.ry[1]) ? 0 : 1;
      var side = row === 0 ? S.v.sel.side : S.v.opp.side, best = null, bd = 1e9;
      S.g.timeouts.forEach(function (to) {
        var pl = S.g.plays[to[0]];
        if (pl[5] !== side) return;
        var dd = Math.abs(geo.x(pl[0]) - px);
        if (dd < bd) { bd = dd; best = to; }
      });
      if (best && bd < 14) { showTimeout(best, row); return; }
    }
    // nearest scoring play at or before this moment
    var ev = S.v.ev, lo = 1, hi = ev.length - 1, c = 1;
    if (hi < 1) return;
    while (lo <= hi) {
      var mid = (lo + hi) >> 1;
      if (ev[mid].t <= t) { c = mid; lo = mid + 1; } else hi = mid - 1;
    }
    if (c + 1 < ev.length && Math.abs(ev[c + 1].t - t) < Math.abs(ev[c].t - t) && geo.x(ev[c + 1].t) - px < 6) c = c + 1;
    S.cursor = c;
    showScore(c);
  }

  function showScore(c) {
    var g = S.g, v = S.v, e = v.ev[c], pl = g.plays[e.i];
    var selS = v.selHome ? pl[3] : pl[4], oppS = v.selHome ? pl[4] : pl[3];
    var lead = e.m > 0 ? v.sel.short + ' lead by ' + e.m : e.m < 0 ? v.opp.short + ' lead by ' + (-e.m) : 'Tied';
    var color = e.m > 0 ? v.sel.color : e.m < 0 ? v.opp.color : '#8B97A7';
    var isLc = g.leadChanges.indexOf(e.i) >= 0;
    el.tip.innerHTML = '<div class="k">' + clockLabel(pl) + (isLc ? ' · Lead change' : '') + '</div>' +
      '<div class="s">' + esc(v.sel.short) + ' ' + selS + ', ' + esc(v.opp.short) + ' ' + oppS + '</div>' +
      '<div class="m" style="color:' + color + '">' + esc(lead) + '</div>' +
      '<div class="d">' + esc(pl[7]) + '</div>';
    placeHover(geo.x(e.t), geo.y(e.m), true);
  }

  function showTimeout(to, row) {
    var g = S.g, v = S.v, pl = g.plays[to[0]];
    var who = row === 0 ? v.sel : v.opp;
    var selS = v.selHome ? pl[3] : pl[4], oppS = v.selHome ? pl[4] : pl[3];
    var why = to[1] === 1 ? 'Mandatory timeout. No team called a timeout before 6:59, so the rules charge this one to the home team.'
      : to[1] === 2 ? 'Mandatory timeout. No other timeout came before 2:59, so the rules charge this one to the team not yet charged.'
      : 'Called by the ' + who.short + '.';
    el.tip.innerHTML = '<div class="k">' + clockLabel(pl) + ' · Timeout</div>' +
      '<div class="s">' + esc(who.short) + ' timeout</div>' +
      '<div class="m" style="color:#8B97A7">Score: ' + esc(v.sel.short) + ' ' + selS + ', ' + esc(v.opp.short) + ' ' + oppS + '</div>' +
      '<div class="d">' + esc(why) + '</div>';
    placeHover(geo.x(pl[0]), geo.ry[row], false);
  }

  function placeHover(px, py, dot) {
    var hx = document.getElementById(geo.id + 'hx'), hd = document.getElementById(geo.id + 'hd');
    if (hx) { hx.setAttribute('x1', px); hx.setAttribute('x2', px); hx.setAttribute('visibility', 'visible'); }
    if (hd) { hd.setAttribute('cx', px); hd.setAttribute('cy', py); hd.setAttribute('visibility', dot ? 'visible' : 'hidden'); }
    el.tip.classList.add('on');
    if (geo.small) return;               // on phones the box sits under the chart
    var r = el.plot.getBoundingClientRect(), k = r.width / geo.W;
    var tw = el.tip.offsetWidth, th = el.tip.offsetHeight;
    var left = px * k + 16;
    if (left + tw > r.width) left = px * k - tw - 16;
    var top = Math.max(0, Math.min(py * k - th / 2, r.height - th));
    el.tip.style.left = Math.max(0, left) + 'px';
    el.tip.style.top = top + 'px';
  }

  function hideHover() {
    if (!geo) return;
    var hx = document.getElementById(geo.id + 'hx'), hd = document.getElementById(geo.id + 'hd');
    if (hx) hx.setAttribute('visibility', 'hidden');
    if (hd) hd.setAttribute('visibility', 'hidden');
    el.tip.classList.remove('on');
    el.tip.innerHTML = '<div class="d">' + (geo.small ? 'Tap or drag across the chart to see each scoring play.' : 'Move across the chart to see each scoring play.') + '</div>';
  }

  /* ---- 7. lists, CSV download, copy link --------------------- */
  function renderLists() {
    var g = S.g, v = S.v;
    function who(side) { return side === v.sel.side ? v.sel : v.opp; }
    function scoreText(pl) {
      var selS = v.selHome ? pl[3] : pl[4], oppS = v.selHome ? pl[4] : pl[3];
      return v.sel.short + ' ' + selS + ', ' + v.opp.short + ' ' + oppS;
    }
    function block(title, items, empty, open) {
      return '<details class="ge-list"' + (open ? ' open' : '') + '><summary>' + title + ' (' + items.length + ')</summary>' +
        (items.length ? '<ol>' + items.join('') + '</ol>' : '<p class="none">' + empty + '</p>') + '</details>';
    }
    var lcs = g.leadChanges.map(function (i) {
      var pl = g.plays[i], h = pl[3], a = pl[4];
      var t = who(h > a ? 1 : 2);
      var hi = Math.max(h, a), lo = Math.min(h, a);
      return '<li style="--tc:' + t.color + '"><span class="t">' + clockLabel(pl) + '</span><span><i></i><b>' + esc(t.short) + ' take the lead, ' + hi + ' to ' + lo + '.</b> ' + esc(pl[7]) + '</span></li>';
    });
    var runs = g.runs.map(function (r) {
      var t = who(r[0]), a = g.plays[r[1]], b = g.plays[r[2]];
      return '<li style="--tc:' + t.color + '"><span class="t">' + clockLabel(a) + '</span><span><i></i><b>' + esc(t.short) + ' score ' + r[3] + ' straight points</b> through ' + clockLabel(b) + '. The score went from ' + esc(scoreText(prevScore(r[1]))) + ' to ' + esc(scoreText(b)) + '.</span></li>';
    });
    var tos = g.timeouts.map(function (to) {
      var pl = g.plays[to[0]], t = who(pl[5]);
      var kind = to[1] ? 'Mandatory timeout, charged to the ' + t.short : t.short + ' timeout';
      return '<li style="--tc:' + t.color + '"><span class="t">' + clockLabel(pl) + '</span><span><i class="' + (to[1] ? 'hollow' : '') + '"></i><b>' + esc(kind) + '.</b> ' + esc(scoreText(pl)) + '.</span></li>';
    });
    el.lists.innerHTML = block('Lead changes', lcs, 'The lead never changed hands in this game.', false) +
      block('Runs of 8 or more points', runs, 'Neither team scored 8 or more points in a row.', false) +
      block('Timeouts', tos, 'No timeouts were recorded for this game.', false);
  }

  function prevScore(i) {
    var g = S.g;
    for (var k = i - 1; k >= 0; k--) if (g.plays[k][3] !== g.plays[i][3] || g.plays[k][4] !== g.plays[i][4]) return g.plays[k];
    return [0, 1, '12:00', 0, 0, 0, 0, ''];
  }

  function downloadCsv() {
    var g = S.g;
    if (!g) return;
    var rows = [['game_id', 'date', 'period', 'clock', 'seconds_elapsed', 'home_team', 'away_team', 'home_score', 'away_score', 'team', 'event_type', 'description']];
    g.plays.forEach(function (p) {
      rows.push([g.id, g.date, p[1], p[2], p[0], g.home.abbr, g.away.abbr, p[3], p[4], p[5] === 1 ? g.home.abbr : p[5] === 2 ? g.away.abbr : '', g.types[p[6]], p[7]]);
    });
    var csv = rows.map(function (r) {
      return r.map(function (c) { c = String(c); return /[",\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c; }).join(',');
    }).join('\r\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'nba-' + g.date + '-' + g.away.abbr.toLowerCase() + '-at-' + g.home.abbr.toLowerCase() + '-play-by-play.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  function copyLink() {
    var url = location.href;
    var done = function () { el.copied.textContent = 'Link copied'; setTimeout(function () { el.copied.textContent = ''; }, 2400); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, function () { el.copied.textContent = url; });
    } else {
      el.copied.textContent = url;
    }
  }

  /* ---- 8. small helpers -------------------------------------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function poss(name) { return /s$/.test(name) ? name + '\u2019' : name + '\u2019s'; }
  function mmss(sec) {
    sec = Math.round(sec);
    return Math.floor(sec / 60) + ':' + ('0' + (sec % 60)).slice(-2);
  }
  function clockLabel(pl) {
    var p = pl[1], c = String(pl[2]);
    if (c.indexOf(':') < 0) { var sec = parseFloat(c); c = '0:' + (sec < 10 ? '0' : '') + sec.toFixed(1); }
    var q = p <= 4 ? 'Q' + p : (p === 5 ? 'OT' : (p - 4) + 'OT');
    return q + ' ' + c;
  }
  function tipoff(iso) {
    var m = /T(\d\d):(\d\d)/.exec(iso || '');
    if (!m) return '';
    var h = +m[1], mi = m[2];
    return (h % 12 || 12) + ':' + mi + (h < 12 ? ' AM' : ' PM') + ' ET';
  }
  function diamond(cx, cy, r) {
    return 'M' + cx + ',' + (cy - r) + 'L' + (cx + r) + ',' + cy + 'L' + cx + ',' + (cy + r) + 'L' + (cx - r) + ',' + cy + 'Z';
  }
})();
