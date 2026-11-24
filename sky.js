/* ============================================================
   HOME PAGE (sky.js)
   Loaded by index.html only, after sky-stars.js. It handles:
     1. the sky: the real stars over Columbus, Ohio, right now,
        facing north, with each project in one of the six
        constellations that never set there
     2. the card that appears when you point to a constellation
   Without JavaScript, the sky's project links show as a plain list.
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. the sky ---------------------------------------- */
  var hero = document.getElementById('skyHero');
  var stage = document.getElementById('skyStage');
  var list = document.getElementById('skyList');
  var card = document.getElementById('skyCard');
  var timeEl = document.getElementById('skyTime');

  if (hero && stage && list && window.SKY_STARS && window.SKY_FIGS) {
    var LAT = 39.9612, LON = -82.9988, RAD = Math.PI / 180;   /* Columbus, Ohio */
    var SINP = Math.sin(LAT * RAD), COSP = Math.cos(LAT * RAD);
    var CAP = Math.tan(40 * RAD);   /* stars within 40 degrees of the pole never set here */

    var stars = window.SKY_STARS.split(';').map(function (t) {
      var a = t.split(',');
      return { ra: +a[0], dec: +a[1], m: +a[2], bv: +a[3] };
    });
    var projects = Array.prototype.map.call(list.querySelectorAll('a[data-key]'), function (a) {
      return {
        key: a.getAttribute('data-key'), href: a.getAttribute('href'), name: a.textContent.trim(),
        kind: a.getAttribute('data-kind') || '', desc: a.getAttribute('data-desc') || '', where: a.getAttribute('data-where') || ''
      };
    }).filter(function (p) { return window.SKY_FIGS[p.key]; });

    /* local sidereal time in degrees */
    var lstDeg = function (ms) {
      var d = ms / 86400000 + 2440587.5 - 2451545.0;
      var g = 280.46061837 + 360.98564736629 * d + LON;
      return ((g % 360) + 360) % 360;
    };
    /* right ascension and declination to a direction in the sky (east, north, up) */
    var toVec = function (ra, dec, lst) {
      var H = (lst - ra) * RAD, de = dec * RAD;
      var sinAlt = SINP * Math.sin(de) + COSP * Math.cos(de) * Math.cos(H);
      var alt = Math.asin(sinAlt);
      var az = Math.atan2(-Math.cos(de) * Math.sin(H), Math.sin(de) * COSP - Math.cos(de) * SINP * Math.cos(H));
      return { alt: alt, e: Math.cos(alt) * Math.sin(az), n: Math.cos(alt) * Math.cos(az), u: sinAlt };
    };
    var starColor = function (bv) {
      if (bv < 0) return '#CFDDFF';
      if (bv < 0.45) return '#F2F4FF';
      if (bv < 0.9) return '#FFF2DA';
      if (bv < 1.3) return '#FFE2BC';
      return '#FFD0A4';
    };
    var fmtTime = function (ms) {
      try {
        return new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(ms)) + ' ET';
      } catch (e) { return new Date(ms).toLocaleString(); }
    };
    var esc = function (s) {
      return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
    };

    var geo = null, hover = null;

    var draw = function () {
      var w = hero.clientWidth, h = hero.clientHeight;
      if (!w || !h) return;
      var ms = Date.now(), lst = lstDeg(ms);
      /* the never-setting circle: as large as fits, with its top kept below the menu */
      var bar = (parseFloat(getComputedStyle(hero).getPropertyValue('--bar')) || 28) / 100;   /* the black bar's share of the screen */
      var horizonY = Math.round((1 - bar) * h);
      var R = Math.max(90, Math.min(0.37 * h, 0.42 * w, (horizonY - 124) / 2));
      var scale = R / CAP, cx = w / 2, cy = horizonY - R;
      var rs = Math.max(0.75, Math.min(1.2, Math.min(w, h) / 900));
      /* gnomonic projection facing north, centered at the height of the North Star,
         so the horizon stays a straight line */
      var proj = function (v) {
        var cosT = v.n * COSP + v.u * SINP;
        if (cosT < 0.12) return null;
        return { x: cx + scale * (v.e / cosT), y: cy - scale * ((-v.n * SINP + v.u * COSP) / cosT) };
      };

      var o = [];
      o.push('<svg class="sky-svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">');
      o.push('<defs><linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#03050A"/><stop offset="0.7" stop-color="#080C14"/><stop offset="1" stop-color="#111722"/></linearGradient>' +
        '<radialGradient id="cityGlow" cx="0.5" cy="1" r="0.75"><stop offset="0" stop-color="#E8A66A" stop-opacity="0.13"/><stop offset="1" stop-color="#E8A66A" stop-opacity="0"/></radialGradient></defs>');
      o.push('<rect x="0" y="0" width="' + w + '" height="' + horizonY + '" fill="url(#skyGrad)"/>');
      o.push('<rect x="0" y="' + (horizonY - Math.round(h * 0.35)) + '" width="' + w + '" height="' + Math.round(h * 0.35) + '" fill="url(#cityGlow)"/>');

      /* stars */
      o.push('<g aria-hidden="true">');
      var n = 0;
      stars.forEach(function (st) {
        var v = toVec(st.ra, st.dec, lst);
        if (v.alt <= 0) return;
        var p = proj(v);
        if (!p || p.x < -6 || p.x > w + 6 || p.y < -6 || p.y > horizonY) return;
        var r = Math.max(0.45, (0.35 + (5.3 - st.m) * 0.42) * rs);
        var op = Math.min(1, 0.3 + (5.3 - st.m) * 0.13);
        var cls = st.m < 2.6 ? ' class="tw' + (1 + (n++ % 3)) + '"' : '';
        o.push('<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + r.toFixed(2) + '" fill="' + starColor(st.bv) + '" fill-opacity="' + op.toFixed(2) + '"' + cls + '/>');
      });
      o.push('</g>');

      /* the six project constellations */
      var figs = projects.map(function (pr) {
        var pts = [], d = '';
        window.SKY_FIGS[pr.key].forEach(function (line) {
          var first = true;
          line.forEach(function (c) {
            var p = proj(toVec(c[0], c[1], lst));
            if (!p) { first = true; return; }
            pts.push(p);
            d += (first ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1);
            first = false;
          });
        });
        var mx = 0, my = 0;
        pts.forEach(function (p) { mx += p.x; my += p.y; });
        mx /= pts.length; my /= pts.length;
        /* the label goes just outside the figure, on the side away from the North Star */
        var dx = mx - cx, dy = my - cy, len = Math.hypot(dx, dy) || 1;
        dx /= len; dy /= len;
        if (pr.key === 'practice') { dx = 0; dy = 1; }
        var far = -1e9;
        pts.forEach(function (p) { var t = (p.x - mx) * dx + (p.y - my) * dy; if (t > far) far = t; });
        var lx = mx + dx * (far + 20), ly = Math.max(104, Math.min(my + dy * (far + 20) + 5, horizonY - 12));
        var anchor = dx > 0.45 ? 'start' : dx < -0.45 ? 'end' : 'middle';
        return { pr: pr, d: d, pts: pts, lx: lx, ly: ly, anchor: anchor };
      });
      var labelSize = w < 600 ? 15 : 18;
      figs.forEach(function (f) {
        o.push('<a class="fig" href="' + esc(f.pr.href) + '" data-key="' + f.pr.key + '" aria-label="' + esc(f.pr.name + '. ' + f.pr.desc + ' ' + f.pr.where + '.') + '">');
        o.push('<path class="hit" d="' + f.d + '"/>');
        o.push('<path class="line" d="' + f.d + '"/>');
        f.pts.forEach(function (p) { o.push('<circle class="glow" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="7"/>'); });
        o.push('<text x="' + f.lx.toFixed(1) + '" y="' + f.ly.toFixed(1) + '" text-anchor="' + f.anchor + '" font-size="' + labelSize + '">' + esc(f.pr.name) + '</text>');
        o.push('</a>');
      });

      /* the ground, the horizon, and compass marks */
      o.push('<rect x="0" y="' + horizonY + '" width="' + w + '" height="' + (h - horizonY) + '" fill="#030406"/>');
      o.push('<line x1="0" x2="' + w + '" y1="' + horizonY + '" y2="' + horizonY + '" stroke="rgba(233,227,213,0.16)"/>');
      [['NW', -45], ['N', 0], ['NE', 45]].forEach(function (c) {
        var a = c[1] * RAD, x = cx + scale * (Math.sin(a) / (Math.cos(a) * COSP));
        if (x > 20 && x < w - 20 && w >= 700) {
          o.push('<line x1="' + x.toFixed(1) + '" x2="' + x.toFixed(1) + '" y1="' + horizonY + '" y2="' + (horizonY + 7) + '" stroke="rgba(233,227,213,0.3)"/>');
          o.push('<text class="compass" x="' + x.toFixed(1) + '" y="' + (horizonY + 22) + '" text-anchor="middle" aria-hidden="true">' + c[0] + '</text>');
        }
      });
      o.push('</svg>');

      stage.innerHTML = o.join('');
      /* keep every label inside the screen (long names can run off a phone's edge) */
      Array.prototype.forEach.call(stage.querySelectorAll('.fig text'), function (t, i) {
        var bb = t.getBBox(), shift = 0;
        if (bb.x < 10) shift = 10 - bb.x;
        else if (bb.x + bb.width > w - 10) shift = (w - 10) - (bb.x + bb.width);
        if (shift) { figs[i].lx += shift; t.setAttribute('x', figs[i].lx.toFixed(1)); }
      });
      /* and move a label up or down if it lands on another one */
      var boxes = Array.prototype.map.call(stage.querySelectorAll('.fig text'), function (t, i) {
        var bb = t.getBBox();
        return { t: t, i: i, x: bb.x, y: bb.y, w: bb.width, h: bb.height };
      }).sort(function (a, b) { return a.y - b.y; });
      var placed = [];
      boxes.forEach(function (b) {
        var y0 = b.y;
        for (var tries = 0; tries < 6; tries++) {
          var hit = placed.filter(function (q) { return b.x < q.x + q.w + 6 && q.x < b.x + b.w + 6 && b.y < q.y + q.h + 4 && q.y < b.y + b.h + 4; })[0];
          if (!hit) break;
          b.y = (hit.y + hit.h + 4 + b.h < horizonY - 4) ? hit.y + hit.h + 4 : hit.y - b.h - 4;
        }
        if (b.y !== y0) {
          figs[b.i].ly += b.y - y0;
          b.t.setAttribute('y', figs[b.i].ly.toFixed(1));
        }
        placed.push(b);
      });
      geo = { w: w, horizonY: horizonY, figs: figs };
      if (timeEl) timeEl.textContent = fmtTime(ms) + ' · Facing north';
      hero.classList.add('has-sky');
      if (hover) setHover(hover);
    };

    var setHover = function (key) {
      hover = key;
      var svg = stage.querySelector('svg');
      if (!svg) return;
      svg.classList.toggle('dim', !!key);
      Array.prototype.forEach.call(svg.querySelectorAll('.fig'), function (a) { a.classList.toggle('on', a.getAttribute('data-key') === key); });
      if (!key || !geo) { card.classList.remove('on'); return; }
      var f = geo.figs.filter(function (x) { return x.pr.key === key; })[0];
      if (!f) return;
      card.innerHTML = '<span class="sc-kind">' + esc(f.pr.kind) + '</span><span class="sc-name">' + esc(f.pr.name) + '</span><span class="sc-desc">' + esc(f.pr.desc) + '</span><span class="sc-where">' + esc(f.pr.where) + '</span>';
      var cw = Math.min(300, geo.w - 40);
      var x = f.anchor === 'end' ? f.lx - cw - 8 : f.anchor === 'start' ? f.lx + 8 : f.lx - cw / 2;
      var y = f.ly + 16;
      if (y + 190 > geo.horizonY) y = f.ly - 210;
      x = Math.max(16, Math.min(x, geo.w - cw - 16));
      y = Math.max(76, y);
      card.style.width = cw + 'px';
      card.style.left = Math.round(x) + 'px';
      card.style.top = Math.round(y) + 'px';
      card.classList.add('on');
    };

    stage.addEventListener('mouseover', function (e) {
      var a = e.target.closest && e.target.closest('.fig');
      if (a) setHover(a.getAttribute('data-key'));
    });
    stage.addEventListener('mouseleave', function () { setHover(null); });
    stage.addEventListener('mouseout', function (e) {
      var a = e.target.closest && e.target.closest('.fig');
      if (a && !(e.relatedTarget && a.contains(e.relatedTarget))) setHover(null);
    });
    stage.addEventListener('focusin', function (e) {
      var a = e.target.closest && e.target.closest('.fig');
      if (a) setHover(a.getAttribute('data-key'));
    });
    stage.addEventListener('focusout', function () { setHover(null); });

    draw();
    setInterval(draw, 30000);       /* the sky turns about one degree every four minutes */
    var rt = null;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(draw, 120);
    });
  }

})();
