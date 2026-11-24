/* ============================================================
   HOME PAGE (sky.js)
   Loaded by index.html only, after sky-stars.js. It handles:
     1. the sky: the real stars over Columbus, Ohio, right now,
        facing north, with each project in one of the six
        constellations that never set there
     2. the motion:
        - on arrival, the sky turns in from a few hours earlier and
          slows to a stop on the real sky for this minute, while the
          clock below counts up to now; then the constellation lines
          draw in and their names appear
        - after that, the sky keeps turning at its real speed
        - brighter stars sit closer and fainter stars farther back,
          so the sky shifts in depth as the mouse moves (on a phone
          it drifts gently, and shifts as the page scrolls)
        - the brightest stars twinkle
        The arrival plays once per visit; later trips back to the home
        page in the same visit skip straight to the sky.
     3. the card that appears when you point to a constellation
   Anyone whose device asks for reduced motion sees a still sky.
   Without JavaScript, the sky's project links show as a plain list.
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var hero = document.getElementById('skyHero');
  var stage = document.getElementById('skyStage');
  var list = document.getElementById('skyList');
  var card = document.getElementById('skyCard');
  var timeEl = document.getElementById('skyTime');
  if (!(hero && stage && list && card && window.SKY_STARS && window.SKY_FIGS)) return;

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext && canvas.getContext('2d');
  if (!ctx) return;   /* no canvas: the plain list of projects stays */

  /* ---- EDIT: the motion ----------------------------------- */
  var SPIN_FROM = -40;   /* the arrival starts this many degrees back, about 2 hours 40 minutes earlier */
  var SPIN_MS = 3000;    /* how long the arrival takes, in milliseconds */
  var DEPTH = 0.14;       /* how far the nearest stars shift, as a share of the sky circle's radius */

  var LAT = 39.9612, LON = -82.9988, RAD = Math.PI / 180;   /* Columbus, Ohio */
  var SINP = Math.sin(LAT * RAD), COSP = Math.cos(LAT * RAD);
  var CAP = Math.tan(40 * RAD);   /* stars within 40 degrees of the pole never set here */
  var SIDEREAL = 360.98564736629; /* degrees the sky turns in one day of clock time */

  /* the arrival plays once per visit */
  try {
    if (sessionStorage.getItem('skySeen') === '1') SPIN_MS = 0;
    sessionStorage.setItem('skySeen', '1');
  } catch (e) { /* private browsing: play it every time */ }
  if (reduce) SPIN_MS = 0;

  /* a repeatable random number, so each star keeps the same depth and twinkle */
  var seed = 20261124;
  var rand = function () { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };

  var COLORS = ['#CFDDFF', '#F2F4FF', '#FFF2DA', '#FFE2BC', '#FFD0A4'];   /* blue-white to orange, by B-V color */
  var colorIndex = function (bv) { return bv < 0 ? 0 : bv < 0.45 ? 1 : bv < 0.9 ? 2 : bv < 1.3 ? 3 : 4; };
  var trig = function (ra, dec) {
    return { cr: Math.cos(ra * RAD), sr: Math.sin(ra * RAD), cd: Math.cos(dec * RAD), sd: Math.sin(dec * RAD) };
  };

  var stars = window.SKY_STARS.split(';').map(function (t) {
    var a = t.split(','), m = +a[2], s = trig(+a[0], +a[1]);
    s.ra = +a[0]; s.dec = +a[1]; s.m = m; s.c = colorIndex(+a[3]);
    /* depth: brighter stars sit closer and shift more; the random part keeps the layers from lining up */
    s.k = Math.max(0.12, Math.min(1, (5.6 - m) / 6)) * (0.8 + 0.4 * rand());
    s.r = 0.35 + (5.3 - m) * 0.42;
    s.op = Math.min(1, 0.3 + (5.3 - m) * 0.13);
    s.tw = m < 2.6; s.ph = rand() * 6.283; s.sp = 0.6 + rand() * 0.9;
    return s;
  }).sort(function (a, b) { return a.c - b.c; });   /* grouped by color, so drawing switches color only five times */

  var projects = Array.prototype.map.call(list.querySelectorAll('a[data-key]'), function (a) {
    return {
      key: a.getAttribute('data-key'), href: a.getAttribute('href'), name: a.textContent.trim(),
      kind: a.getAttribute('data-kind') || '', desc: a.getAttribute('data-desc') || '', where: a.getAttribute('data-where') || ''
    };
  }).filter(function (p) { return window.SKY_FIGS[p.key]; });

  /* each corner of a constellation line takes the depth of its star, so the lines move with the stars */
  var depthAt = function (ra, dec) {
    var best = 0.06, k = 0.4;
    stars.forEach(function (s) {
      var d = Math.hypot((s.ra - ra) * Math.cos(dec * RAD), s.dec - dec);
      if (d < best) { best = d; k = s.k; }
    });
    return k;
  };
  var figs = projects.map(function (pr) {
    return {
      pr: pr,
      lines: window.SKY_FIGS[pr.key].map(function (line) {
        return line.map(function (c) { var v = trig(c[0], c[1]); v.k = depthAt(c[0], c[1]); return v; });
      })
    };
  });

  /* ---- the math ------------------------------------------- */
  /* local sidereal time in degrees: how far the sky has turned */
  var lstDeg = function (ms) {
    var d = ms / 86400000 + 2440587.5 - 2451545.0;
    var g = 280.46061837 + SIDEREAL * d + LON;
    return ((g % 360) + 360) % 360;
  };
  var L = { s: 0, c: 1 };
  var setLst = function (deg) { L.s = Math.sin(deg * RAD); L.c = Math.cos(deg * RAD); };
  var G = null;               /* sizes, set by layout() */
  var P = { x: 0, y: 0, u: 0 };
  /* a star's place on the screen: a gnomonic projection facing north, centered at the
     height of the North Star, so the horizon stays a straight line. False if out of view. */
  var project = function (o) {
    var sH = L.s * o.cr - L.c * o.sr, cH = L.c * o.cr + L.s * o.sr;   /* hour angle */
    var e = -o.cd * sH;
    var n = o.sd * COSP - o.cd * SINP * cH;
    var u = o.sd * SINP + o.cd * COSP * cH;
    var cosT = n * COSP + u * SINP;
    if (cosT < 0.12) return false;
    P.u = u;
    P.x = G.cx + G.scale * (e / cosT);
    P.y = G.cy - G.scale * ((-n * SINP + u * COSP) / cosT);
    return true;
  };

  var fmt = null;
  try {
    fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  } catch (e) { fmt = null; }
  var fmtTime = function (ms) { return fmt ? fmt.format(new Date(ms)) + ' ET' : new Date(ms).toLocaleString(); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  };
  var rgba = function (hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  };

  /* ---- sizes, the background, and the soft glow around bright stars ---- */
  var bg = document.createElement('canvas');
  var halos = COLORS.map(function (col) {
    var c = document.createElement('canvas'); c.width = c.height = 64;
    var g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, rgba(col, 0.55)); gr.addColorStop(0.25, rgba(col, 0.16)); gr.addColorStop(1, rgba(col, 0));
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return c;
  });

  var layout = function () {
    var w = hero.clientWidth, h = hero.clientHeight;
    if (!w || !h) return false;
    var bar = (parseFloat(getComputedStyle(hero).getPropertyValue('--bar')) || 28) / 100;   /* the black bar's share of the screen */
    var horizonY = Math.round((1 - bar) * h);
    /* the never-setting circle: as large as fits, with its top kept below the menu */
    var R = Math.max(90, Math.min(0.37 * h, 0.42 * w, (horizonY - 124) / 2));
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    G = { w: w, h: h, horizonY: horizonY, R: R, scale: R / CAP, cx: w / 2, cy: horizonY - R, dpr: dpr,
      rs: Math.max(0.75, Math.min(1.2, Math.min(w, h) / 900)), amp: R * DEPTH };
    canvas.width = bg.width = Math.round(w * dpr);
    canvas.height = bg.height = Math.round(h * dpr);
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    /* the sky's color and the glow of the city near the horizon, drawn once per size */
    var b = bg.getContext('2d');
    b.setTransform(dpr, 0, 0, dpr, 0, 0);
    var gr = b.createLinearGradient(0, 0, 0, horizonY);
    gr.addColorStop(0, '#03050A'); gr.addColorStop(0.7, '#080C14'); gr.addColorStop(1, '#111722');
    b.fillStyle = gr; b.fillRect(0, 0, w, horizonY);
    b.save(); b.translate(w / 2, horizonY); b.scale(w, h * 0.35);
    var glow = b.createRadialGradient(0, 0, 0, 0, 0, 0.75);
    glow.addColorStop(0, 'rgba(232,166,106,0.13)'); glow.addColorStop(1, 'rgba(232,166,106,0)');
    b.fillStyle = glow; b.fillRect(-0.5, -1, 1, 1);
    b.restore();
    return true;
  };

  /* ---- the constellations: links drawn over the stars ---- */
  var svg = null, lit = false, hover = null;
  var buildSvg = function () {
    var w = G.w, h = G.h, horizonY = G.horizonY, o = [];
    var labelSize = w < 600 ? 15 : 18;
    o.push('<svg class="sky-svg' + (lit ? ' lit' : '') + '" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">');
    figs.forEach(function (f, i) {
      o.push('<a class="fig" href="' + esc(f.pr.href) + '" data-key="' + f.pr.key + '" style="--d:' + (i * 0.14).toFixed(2) + 's" aria-label="' + esc(f.pr.name + '. ' + f.pr.desc + ' ' + f.pr.where + '.') + '">');
      o.push('<path class="hit"/><path class="line" pathLength="1"/>');
      f.lines.forEach(function (line) { line.forEach(function () { o.push('<circle class="glow" r="7"/>'); }); });
      o.push('<text font-size="' + labelSize + '">' + esc(f.pr.name) + '</text></a>');
    });
    /* the ground, the horizon, and compass marks */
    o.push('<rect x="0" y="' + horizonY + '" width="' + w + '" height="' + (h - horizonY) + '" fill="#030406"/>');
    o.push('<line x1="0" x2="' + w + '" y1="' + horizonY + '" y2="' + horizonY + '" stroke="rgba(233,227,213,0.16)"/>');
    [['NW', -45], ['N', 0], ['NE', 45]].forEach(function (c) {
      var a = c[1] * RAD, x = G.cx + G.scale * (Math.sin(a) / (Math.cos(a) * COSP));
      if (x > 20 && x < w - 20 && w >= 700) {
        o.push('<line x1="' + x.toFixed(1) + '" x2="' + x.toFixed(1) + '" y1="' + horizonY + '" y2="' + (horizonY + 7) + '" stroke="rgba(233,227,213,0.3)"/>');
        o.push('<text class="compass" x="' + x.toFixed(1) + '" y="' + (horizonY + 22) + '" text-anchor="middle" aria-hidden="true">' + c[0] + '</text>');
      }
    });
    o.push('</svg>');
    if (svg) svg.parentNode.removeChild(svg);
    stage.insertAdjacentHTML('beforeend', o.join(''));
    svg = stage.querySelector('svg.sky-svg');
    Array.prototype.forEach.call(svg.querySelectorAll('.fig'), function (a, i) {
      figs[i].el = { a: a, hit: a.querySelector('.hit'), line: a.querySelector('.line'), glows: a.querySelectorAll('.glow'), text: a.querySelector('text') };
    });
  };

  /* labels go just outside each figure, on the side away from the North Star, kept on screen
     and apart from each other. Placed for the real sky now; between placements they ride along
     with their constellation. */
  var placeLabels = function (ms) {
    if (!svg) return;
    setLst(lstDeg(ms));
    var w = G.w, horizonY = G.horizonY, edge = Math.max(10, G.amp + 4);
    figs.forEach(function (f) {
      var pts = [];
      f.lines.forEach(function (line) { line.forEach(function (v) { if (project(v)) pts.push({ x: P.x, y: P.y }); }); });
      var mx = 0, my = 0;
      pts.forEach(function (p) { mx += p.x; my += p.y; });
      mx /= pts.length; my /= pts.length;
      var dx = mx - G.cx, dy = my - G.cy, len = Math.hypot(dx, dy) || 1;
      dx /= len; dy /= len;
      if (f.pr.key === 'practice') { dx = 0; dy = 1; }
      var far = -1e9;
      pts.forEach(function (p) { var t = (p.x - mx) * dx + (p.y - my) * dy; if (t > far) far = t; });
      f.mx0 = mx; f.my0 = my;
      f.lx = mx + dx * (far + 20);
      f.ly = Math.max(104, Math.min(my + dy * (far + 20) + 5, horizonY - 12));
      f.anchor = dx > 0.45 ? 'start' : dx < -0.45 ? 'end' : 'middle';
      f.el.text.setAttribute('text-anchor', f.anchor);
      f.el.text.setAttribute('x', f.lx.toFixed(1));
      f.el.text.setAttribute('y', f.ly.toFixed(1));
    });
    figs.forEach(function (f) {
      var bb = f.el.text.getBBox(), shift = 0;
      if (bb.x < edge) shift = edge - bb.x;
      else if (bb.x + bb.width > w - edge) shift = (w - edge) - (bb.x + bb.width);
      if (shift) { f.lx += shift; f.el.text.setAttribute('x', f.lx.toFixed(1)); }
    });
    var boxes = figs.map(function (f) {
      var bb = f.el.text.getBBox();
      return { f: f, x: bb.x, y: bb.y, w: bb.width, h: bb.height };
    }).sort(function (a, b) { return a.y - b.y; });
    var placed = [];
    boxes.forEach(function (b) {
      var y0 = b.y;
      for (var tries = 0; tries < 6; tries++) {
        var hit = placed.filter(function (q) { return b.x < q.x + q.w + 6 && q.x < b.x + b.w + 6 && b.y < q.y + q.h + 4 && q.y < b.y + b.h + 4; })[0];
        if (!hit) break;
        b.y = (hit.y + hit.h + 4 + b.h < horizonY - 4) ? hit.y + hit.h + 4 : hit.y - b.h - 4;
      }
      if (b.y !== y0) { b.f.ly += b.y - y0; b.f.el.text.setAttribute('y', b.f.ly.toFixed(1)); }
      placed.push(b);
    });
    figs.forEach(function (f) { f.x = f.lx; f.y = f.ly; });
  };

  /* ---- drawing one moment of the sky ---------------------- */
  var draw = function (ox, oy, fade, ts) {
    var w = G.w, hY = G.horizonY, rs = G.rs, cur = -1, i, s, x, y, r, a, tw;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.drawImage(bg, 0, 0);
    ctx.setTransform(G.dpr, 0, 0, G.dpr, 0, 0);
    for (i = 0; i < stars.length; i++) {
      s = stars[i];
      if (!project(s) || P.u <= 0) continue;
      x = P.x + ox * s.k; y = P.y + oy * s.k;
      if (x < -8 || x > w + 8 || y < -8 || y > hY) continue;
      if (s.c !== cur) { cur = s.c; ctx.fillStyle = COLORS[cur]; }
      a = s.op * fade; r = Math.max(0.45, s.r * rs);
      if (s.tw && !reduce) { tw = Math.sin(ts * s.sp + s.ph); a *= 0.78 + 0.22 * tw; r *= 1 + 0.08 * tw; }
      if (s.m < 2.2) { ctx.globalAlpha = a * 0.6; ctx.drawImage(halos[s.c], x - r * 5, y - r * 5, r * 10, r * 10); }
      ctx.globalAlpha = a;
      if (r < 0.9) ctx.fillRect(x - r, y - r, r * 2, r * 2);
      else { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill(); }
    }
    /* the constellation lines and labels follow their stars */
    figs.forEach(function (f) {
      var d = '', sx = 0, sy = 0, n = 0, gi = 0;
      f.lines.forEach(function (line) {
        var first = true;
        line.forEach(function (v) {
          var g = f.el.glows[gi++];
          if (!project(v)) { first = true; return; }
          var px = P.x + ox * v.k, py = P.y + oy * v.k;
          d += (first ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1);
          first = false; sx += px; sy += py; n++;
          if (g) { g.setAttribute('cx', px.toFixed(1)); g.setAttribute('cy', py.toFixed(1)); }
        });
      });
      f.el.hit.setAttribute('d', d);
      f.el.line.setAttribute('d', d);
      if (n) {
        f.x = f.lx + (sx / n - f.mx0); f.y = f.ly + (sy / n - f.my0);
        f.el.text.setAttribute('x', f.x.toFixed(1)); f.el.text.setAttribute('y', f.y.toFixed(1));
      }
    });
  };

  var lastClock = '';
  var showClock = function (ms) {
    var t = fmtTime(ms);
    if (t !== lastClock && timeEl) { lastClock = t; timeEl.textContent = t + ' · Facing north'; }
  };

  var reveal = function () {
    if (lit) return;
    lit = true;
    if (!svg) return;
    svg.classList.add('lit');
    if (!reduce) {
      svg.classList.add('revealing');   /* lines draw in one after another, then the names appear */
      var s = svg;
      setTimeout(function () { s.classList.remove('revealing'); }, 3400);
    }
  };

  /* ---- the motion loop ------------------------------------ */
  var t0 = null, lastNow = null, done = false, running = false, raf = 0, lastClockAt = -1e9;
  var cam = { x: 0, y: 0 }, aim = { x: 0, y: 0 }, mouse = false;
  var frame = function (now) {
    raf = 0;
    if (!running || !G) return;
    if (t0 === null) t0 = now;
    var el = now - t0;
    var p = (done || !SPIN_MS) ? 1 : Math.min(1, el / SPIN_MS);
    var back = SPIN_FROM * Math.pow(1 - p, 3);   /* degrees still to turn: fast at first, then easing to a stop */
    var ms = Date.now();
    setLst(lstDeg(ms) + back);
    /* where the "camera" leans: toward the mouse, or a slow drift on touch screens */
    if (!hover && !mouse) {
      var sec = el / 1000;
      aim.x = 0.8 * Math.sin(sec * 0.29);
      aim.y = 0.55 * Math.sin(sec * 0.21 + 1.3);
    }
    var dt = lastNow === null ? 0 : Math.min(64, now - lastNow);
    lastNow = now;
    var ease = 1 - Math.exp(-dt / 450);
    cam.x += (aim.x - cam.x) * ease;
    cam.y += (aim.y - cam.y) * ease;
    var scroll = Math.min(1, Math.max(0, (window.scrollY || 0) / G.h));
    draw(-cam.x * G.amp, -cam.y * G.amp - scroll * G.amp * 2, SPIN_MS ? Math.min(1, el / 700) : Math.min(1, el / 400), now / 1000);
    if (!lit && p >= 0.72) reveal();
    if (p < 1 || now - lastClockAt > 1000) { lastClockAt = now; showClock(ms + back / SIDEREAL * 86400000); }
    raf = requestAnimationFrame(frame);
  };
  var start = function () {
    if (running || reduce) return;
    running = true; lastNow = null;
    raf = requestAnimationFrame(frame);
  };
  var stop = function () {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };
  /* a still sky, for reduced motion: redrawn every 30 seconds (the sky turns about
     one degree every four minutes) */
  var still = function () {
    if (!G) return;
    var ms = Date.now();
    placeLabels(ms);
    setLst(lstDeg(ms));
    draw(0, 0, 1, 0);
    showClock(ms);
  };

  /* ---- the card for the constellation you point to ------- */
  var setHover = function (key) {
    hover = key;
    if (!svg) return;
    svg.classList.toggle('dim', !!key);
    figs.forEach(function (f) { f.el.a.classList.toggle('on', f.pr.key === key); });
    if (!key || !G) { card.classList.remove('on'); return; }
    var f = figs.filter(function (x) { return x.pr.key === key; })[0];
    if (!f) return;
    card.innerHTML = '<span class="sc-kind">' + esc(f.pr.kind) + '</span><span class="sc-name">' + esc(f.pr.name) + '</span><span class="sc-desc">' + esc(f.pr.desc) + '</span><span class="sc-where">' + esc(f.pr.where) + '</span>';
    var cw = Math.min(300, G.w - 40);
    var x = f.anchor === 'end' ? f.x - cw - 8 : f.anchor === 'start' ? f.x + 8 : f.x - cw / 2;
    var y = f.y + 16;
    if (y + 190 > G.horizonY) y = f.y - 210;
    x = Math.max(16, Math.min(x, G.w - cw - 16));
    y = Math.max(76, y);
    card.style.width = cw + 'px';
    card.style.left = Math.round(x) + 'px';
    card.style.top = Math.round(y) + 'px';
    card.classList.add('on');
  };
  var figOf = function (e) { return e.target.closest && e.target.closest('.fig'); };
  stage.addEventListener('mouseover', function (e) { var a = figOf(e); if (a) setHover(a.getAttribute('data-key')); });
  stage.addEventListener('mouseleave', function () { setHover(null); });
  stage.addEventListener('mouseout', function (e) {
    var a = figOf(e);
    if (a && !(e.relatedTarget && a.contains(e.relatedTarget))) setHover(null);
  });
  stage.addEventListener('focusin', function (e) {
    var a = figOf(e);
    if (!a) return;
    done = true; reveal();   /* someone using the keyboard does not wait for the arrival */
    setHover(a.getAttribute('data-key'));
  });
  stage.addEventListener('focusout', function () { setHover(null); });

  /* the sky leans toward the mouse; it holds still while you point at a constellation */
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    mouse = true;
    if (hover) return;
    aim.x = (e.clientX / window.innerWidth - 0.5) * 2;
    aim.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  /* ---- start ---------------------------------------------- */
  canvas.className = 'sky-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  stage.appendChild(canvas);
  if (!SPIN_MS) lit = true;
  if (!layout()) return;
  buildSvg();
  placeLabels(Date.now());
  hero.classList.add('has-sky');

  if (reduce) {
    still();
    setInterval(still, 30000);
  } else {
    var onscreen = true;
    var check = function () { if (onscreen && !document.hidden) start(); else stop(); };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { onscreen = en[0].isIntersecting; check(); }, { threshold: 0 }).observe(hero);
    }
    document.addEventListener('visibilitychange', check);
    setInterval(function () { if (!hover) placeLabels(Date.now()); }, 60000);
    check();
  }

  var rt = null;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      if (!layout()) return;
      buildSvg();
      placeLabels(Date.now());
      if (hover) setHover(hover);
      if (reduce) still();
    }, 120);
  });
})();
