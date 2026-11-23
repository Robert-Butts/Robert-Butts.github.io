/* ============================================================
   ROBERT BUTTS · PORTFOLIO  ·  sky.js
   The sky map at the top of the home page (index.html).
   It draws, on one canvas:
     1. a faint star-chart grid and a Milky Way band (drawn once per resize)
     2. a field of twinkling stars that drift slowly and shift with the mouse
     3. one constellation per project, shaped loosely like the project
   Each constellation belongs to a link in the sky-labels list in index.html
   (matched by data-key). Pointing at a constellation, or focusing its link,
   lights it up and shows a card. Clicking zooms into it, then opens the page.
   Anyone who prefers reduced motion gets a still sky with the same links.

   To move or reshape a constellation, edit SHAPES below:
     x, y    where it sits inside the sky area (0 = left/top, 1 = right/bottom)
     size    how big it is, as a share of the sky area
     label   where its name goes: 'below', 'above', 'left', or 'right'
     stars   [x, y, brightness] inside a box from -1 to 1 (y grows downward).
             brightness 1 = bright, 2 = medium, 3 = faint
     lines   pairs of star numbers to connect, counting from 0
============================================================ */
(function(){
  "use strict";

  var SHAPES = {
    /* three small groups joined together, like the clustering result */
    dublin: { x:.77, y:.17, size:.15, label:'below',
      stars:[[-.86,-.40,2],[-.58,-.62,3],[-.62,-.14,2],
             [-.08,.34,1],[.20,.18,3],[.10,.60,3],
             [.60,-.40,2],[.92,-.18,3],[.66,-.04,3]],
      lines:[[1,0],[0,2],[2,3],[3,4],[3,5],[4,8],[8,6],[6,7]] },

    /* a rising staircase with one small spur near the top, like a brick */
    lego: { x:.71, y:.83, size:.15, label:'below',
      stars:[[-1,.66,3],[-.54,.58,2],[-.44,.16,3],[.02,.08,2],[.12,-.36,3],[.58,-.44,1],[.66,-.86,3],[.98,-.40,3]],
      lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[5,7]] },

    /* a goose in flight: head, long neck, body, and two wings */
    brant: { x:.25, y:.15, size:.17, label:'below',
      stars:[[-1,-.30,2],[-.56,-.12,3],[-.10,.02,1],[.78,.24,2],[.20,-.44,3],[.56,-.92,2],[.26,.52,3],[.44,.86,2]],
      lines:[[0,1],[1,2],[2,3],[2,4],[4,5],[2,6],[6,7]] },

    /* swings above and below a center line, like game margins */
    nba: { x:.22, y:.80, size:.16, label:'below',
      stars:[[-1,-.10,2],[-.58,.52,2],[-.14,-.46,1],[.28,.24,3],[.62,-.66,2],[1,.08,3]],
      lines:[[0,1],[1,2],[2,3],[3,4],[4,5]] },

    /* an open star cluster: 58 stars (one per chart) in nine families */
    gallery: { x:.44, y:.48, size:.19, label:'below', cluster:true,
      families:[[4,'red'],[5,'violet'],[8,'blue'],[7,'green'],[7,'amber'],[8,'pink'],[8,'orange'],[7,'lime'],[4,'teal']] },

    /* a winding river of five bright stars, one per practice tool */
    practice: { x:.88, y:.50, size:.13, label:'below',
      stars:[[-.70,-1,1],[-.20,-.70,3],[-.36,-.24,1],[.12,.04,3],[.30,.42,1],[-.06,.70,3],[.20,1,1],[.70,.86,1]],
      lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]] }
  };

  var COLORS = {blue:'#75AADB', green:'#7FD18C', violet:'#B79CFF', amber:'#F0B95A', red:'#F2716F',
                teal:'#46D6D1', pink:'#F38ABE', orange:'#FA934E', lime:'#C1E069'};

  var hero = document.getElementById('skyHero');
  var room = document.getElementById('skyRoom');
  var card = document.getElementById('skyCard');
  var hint = document.getElementById('skyHint');
  var canvas = hero && hero.querySelector('.sky-canvas');
  if(!hero || !room || !canvas || !canvas.getContext){ return; }
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  hero.classList.add('sky-on');
  if(hint && !fine){ hint.textContent = 'Each constellation in this sky is one of my projects. Tap one to read about it, then tap it again to open it.'; }

  function rgb(hex){ var n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function rgba(c, a){ return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a.toFixed(3) + ')'; }
  function clamp(v, lo, hi){ return Math.min(hi, Math.max(lo, v)); }
  function ease(t){ return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function seeded(n){ return function(){ n = (n * 16807) % 2147483647; return (n - 1) / 2147483646; }; }

  /* ---- link each shape to its link in the HTML ---- */
  var shapes = [];
  [].slice.call(room.querySelectorAll('.sky-label')).forEach(function(link){
    var key = link.getAttribute('data-key'), sh = SHAPES[key];
    if(!sh){ return; }
    sh.key = key; sh.link = link;
    sh.color = rgb(COLORS[link.getAttribute('data-cc')] || COLORS.blue);
    sh.hex = COLORS[link.getAttribute('data-cc')] || COLORS.blue;
    if(sh.cluster){ buildCluster(sh); }
    shapes.push(sh);
  });

  /* the gallery cluster: nine small groups placed around a loose ring */
  function buildCluster(sh){
    var rnd = seeded(11), stars = [], lines = [], fams = sh.families, k = fams.length;
    sh.groupColors = [];
    fams.forEach(function(f, gi){
      var gx, gy;
      if(gi === 0){ gx = -.04; gy = .02; }
      else{
        var ang = (gi - 1) / (k - 1) * Math.PI * 2 + rnd() * .35;
        var rad = .56 + rnd() * .3;
        gx = Math.cos(ang) * rad; gy = Math.sin(ang) * rad * .82;
      }
      var first = stars.length, pts = [];
      for(var i = 0; i < f[0]; i++){
        var a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * .2;
        pts.push([gx + Math.cos(a) * d, gy + Math.sin(a) * d, i === 0 ? 2 : 3, gi]);
      }
      /* join each group in order around its middle, so it reads as one family */
      pts.sort(function(p, q){ return Math.atan2(p[1] - gy, p[0] - gx) - Math.atan2(q[1] - gy, q[0] - gx); });
      pts.forEach(function(p, i){ stars.push(p); if(i > 0){ lines.push([first + i - 1, first + i, gi]); } });
      sh.groupColors.push(rgb(COLORS[f[1]]));
    });
    sh.stars = stars; sh.lines = lines;
  }

  /* ---- sizes, background, and positions ---- */
  var W = 0, H = 0, dpr = 1, bg = null, field = [], roomBox = null, copyBox = null;

  function layout(){
    var hr = hero.getBoundingClientRect();
    W = Math.round(hr.width); H = Math.round(hr.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    var rr = room.getBoundingClientRect();
    roomBox = {x: rr.left - hr.left, y: rr.top - hr.top, w: rr.width, h: rr.height};
    var copy = hero.querySelector('.hero-copy').getBoundingClientRect();
    copyBox = {x: copy.left - hr.left - 30, y: copy.top - hr.top - 30, w: copy.width + 60, h: copy.height + 60};
    placeShapes();
    buildBackground();
    buildField();
  }

  function placeShapes(){
    var unit = Math.min(roomBox.w, roomBox.h);
    var starScale = clamp(unit / 620, .78, 1.15);
    shapes.forEach(function(sh){
      sh.cx = roomBox.x + sh.x * roomBox.w;
      sh.cy = roomBox.y + sh.y * roomBox.h;
      sh.R = sh.size * unit;
      sh.pts = sh.stars.map(function(s){
        return {x: sh.cx + s[0] * sh.R, y: sh.cy + s[1] * sh.R, r: [3.1, 2.15, 1.45][s[2] - 1] * starScale * (sh.cluster ? .8 : 1), m: s[2], g: s[3]};
      });
      var minY = Infinity, maxY = -Infinity;
      sh.pts.forEach(function(p){ minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y); });
      sh.top = minY; sh.bottom = maxY;

      /* put the name below (or above) the shape, kept inside the sky area */
      var link = sh.link, lw = link.offsetWidth, lh = link.offsetHeight;
      var lx = sh.cx - lw / 2, ly = sh.label === 'above' ? sh.top - lh - 12 : sh.bottom + 12;
      if(sh.label === 'right'){ lx = sh.cx + sh.R + 10; ly = sh.cy - lh / 2; }
      if(sh.label === 'left'){ lx = sh.cx - sh.R - 10 - lw; ly = sh.cy - lh / 2; }
      link.style.left = clamp(lx - roomBox.x, 2, roomBox.w - lw - 2) + 'px';
      link.style.top = clamp(ly - roomBox.y, 0, roomBox.h - lh) + 'px';
    });
  }

  /* drawn once per resize: deep sky, chart grid, Milky Way */
  function buildBackground(){
    bg = document.createElement('canvas');
    bg.width = canvas.width; bg.height = canvas.height;
    var b = bg.getContext('2d');
    b.setTransform(dpr, 0, 0, dpr, 0, 0);

    /* star-chart grid: circles and spokes around a pole above the top right corner */
    var px = W * 1.1, py = -H * .45;
    b.lineWidth = 1;
    for(var k = 0; k < 9; k++){
      b.strokeStyle = 'rgba(150,180,230,' + (k % 3 === 0 ? .065 : .035) + ')';
      b.beginPath(); b.arc(px, py, H * (.72 + k * .3), 0, Math.PI * 2); b.stroke();
    }
    b.strokeStyle = 'rgba(150,180,230,.035)';
    for(var a = 90; a <= 180; a += 7.5){
      var t = a * Math.PI / 180;
      b.beginPath(); b.moveTo(px + Math.cos(t) * H * .72, py + Math.sin(t) * H * .72);
      b.lineTo(px + Math.cos(t) * H * 3.4, py + Math.sin(t) * H * 3.4); b.stroke();
    }

    /* Milky Way: soft glow plus thousands of tiny stars along a diagonal band */
    var ax = W * .30, ay = H * 1.08, bx = W * 1.04, by = -H * .06;
    var dx = bx - ax, dy = by - ay, len = Math.sqrt(dx * dx + dy * dy), nx = -dy / len, ny = dx / len;
    var band = Math.min(W, H) * .17, rnd = seeded(3);
    for(var i = 0; i < 34; i++){
      var tt = rnd(), off = (rnd() - .5) * band * 1.1;
      var gx = ax + dx * tt + nx * off, gy = ay + dy * tt + ny * off, gr = band * (.7 + rnd() * 1.1);
      var grd = b.createRadialGradient(gx, gy, 0, gx, gy, gr);
      var col = rnd() < .5 ? '120,140,230' : '170,140,240';
      grd.addColorStop(0, 'rgba(' + col + ',' + (.028 + rnd() * .03).toFixed(3) + ')');
      grd.addColorStop(1, 'rgba(' + col + ',0)');
      b.fillStyle = grd; b.fillRect(gx - gr, gy - gr, gr * 2, gr * 2);
    }
    var dust = Math.round(W * H / 900);
    for(var j = 0; j < dust; j++){
      var u = rnd(), g = (rnd() + rnd() + rnd() - 1.5) * band * .9;
      var sx = ax + dx * u + nx * g, sy = ay + dy * u + ny * g;
      if(inCopy(sx, sy)){ continue; }
      b.fillStyle = 'rgba(220,228,255,' + (.06 + rnd() * .22).toFixed(3) + ')';
      b.fillRect(sx, sy, rnd() < .85 ? .7 : 1.1, rnd() < .85 ? .7 : 1.1);
    }
  }

  function inCopy(x, y){
    return copyBox && x > copyBox.x && x < copyBox.x + copyBox.w && y > copyBox.y && y < copyBox.y + copyBox.h;
  }

  /* the twinkling field, in three depths */
  function buildField(){
    field = [];
    var n = Math.round(clamp(W * H / 1500, 220, 1000)), rnd = Math.random;
    for(var i = 0; i < n; i++){
      var d = rnd(), layer = d < .58 ? 0 : (d < .9 ? 1 : 2);
      var x = rnd() * W, y = rnd() * H, warm = rnd();
      field.push({
        x: x, y: y, layer: layer,
        r: .45 + Math.pow(rnd(), 6) * 1.7 + layer * .18,
        a: (.25 + rnd() * .6) * (inCopy(x, y) ? .38 : 1),
        tw: .5 + rnd() * 1.8, ph: rnd() * 6.283,
        c: warm < .14 ? '255,226,190' : (warm < .32 ? '200,220,255' : '240,244,250')
      });
    }
  }

  /* ---- state ---- */
  var active = null, armed = null, mx = 0, my = 0, tmx = 0, tmy = 0, t0 = performance.now(), last = t0, drift = 0;
  var shooting = null, nextShoot = t0 + 6000, zoom = null, running = false, raf = null;
  var INTRO = reduce ? 0 : 1;   /* 1 while the opening line-drawing plays */

  /* ---- drawing ---- */
  function draw(now){
    var t = (now - t0) / 1000, dt = Math.min(.05, (now - last) / 1000); last = now;
    if(!reduce){ drift += dt; mx += (tmx - mx) * .05; my += (tmy - my) * .05; }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    var z = 0;
    if(zoom){
      z = ease(clamp((now - zoom.start) / 800, 0, 1));
      var s = 1 + z * 2.4;
      ctx.translate(zoom.sh.cx, zoom.sh.cy); ctx.scale(s, s); ctx.translate(-zoom.sh.cx, -zoom.sh.cy);
    }

    ctx.drawImage(bg, 0, 0, W, H);

    /* field stars */
    for(var i = 0; i < field.length; i++){
      var st = field[i], depth = (st.layer + 1);
      var x = st.x + drift * (1.2 + st.layer * 1.6) - mx * depth * 5, y = st.y - my * depth * 4;
      x = ((x % W) + W) % W;
      var a = st.a * (reduce ? 1 : (.7 + .3 * Math.sin(t * st.tw + st.ph)));
      ctx.fillStyle = 'rgba(' + st.c + ',' + a.toFixed(3) + ')';
      if(st.r > 1.4){
        ctx.beginPath(); ctx.arc(x, y, st.r, 0, 6.283); ctx.fill();
        ctx.fillStyle = 'rgba(' + st.c + ',' + (a * .12).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(x, y, st.r * 3.2, 0, 6.283); ctx.fill();
      } else {
        ctx.fillRect(x - st.r / 2, y - st.r / 2, st.r, st.r);
      }
    }

    /* an occasional shooting star */
    if(!reduce && !zoom){
      if(!shooting && now > nextShoot && !active){
        shooting = {x: W * (.45 + Math.random() * .5), y: H * (.05 + Math.random() * .3), start: now, ang: Math.PI * (.78 + Math.random() * .1)};
      }
      if(shooting){
        var p = (now - shooting.start) / 900;
        if(p >= 1){ shooting = null; nextShoot = now + 9000 + Math.random() * 9000; }
        else{
          var L = 150, sp = 420 * p;
          var hx = shooting.x + Math.cos(shooting.ang) * sp, hy = shooting.y + Math.sin(shooting.ang) * sp;
          var grad = ctx.createLinearGradient(hx, hy, hx - Math.cos(shooting.ang) * L, hy - Math.sin(shooting.ang) * L);
          var fade = Math.sin(p * Math.PI);
          grad.addColorStop(0, 'rgba(255,255,255,' + (.75 * fade).toFixed(3) + ')');
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.strokeStyle = grad; ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx - Math.cos(shooting.ang) * L, hy - Math.sin(shooting.ang) * L); ctx.stroke();
        }
      }
    }

    /* constellations */
    for(var k = 0; k < shapes.length; k++){
      var intro = INTRO ? clamp((t - .7 - k * .28) / 1.1, 0, 1) : 1;
      drawShape(shapes[k], intro, z, t);
    }
    if(INTRO && t > .7 + shapes.length * .28 + 1.2){ INTRO = 0; }

    /* fade to the page color at the end of a zoom */
    if(z > 0){
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = 'rgba(8,11,18,' + Math.pow(z, 2).toFixed(3) + ')';
      ctx.fillRect(0, 0, W, H);
    }
  }

  function drawShape(sh, intro, z, t){
    if(intro <= 0){ return; }
    var on = active === sh, other = (active && !on) || (zoom && zoom.sh !== sh);
    var fadeOut = zoom && zoom.sh !== sh ? 1 - z : 1;
    var dim = (other ? .4 : 1) * fadeOut;
    var c = sh.color, pts = sh.pts;

    /* soft light behind the gallery cluster */
    if(sh.cluster){
      var gr = ctx.createRadialGradient(sh.cx, sh.cy, 0, sh.cx, sh.cy, sh.R * 1.25);
      gr.addColorStop(0, rgba(c, (on ? .16 : .085) * intro * dim));
      gr.addColorStop(1, rgba(c, 0));
      ctx.fillStyle = gr; ctx.fillRect(sh.cx - sh.R * 1.3, sh.cy - sh.R * 1.3, sh.R * 2.6, sh.R * 2.6);
    }

    /* lines, stopping just short of each star like a printed star chart */
    for(var i = 0; i < sh.lines.length; i++){
      var ln = sh.lines[i], A = pts[ln[0]], B = pts[ln[1]];
      var lp = clamp(intro * sh.lines.length - i, 0, 1);
      if(lp <= 0){ continue; }
      var col = sh.cluster ? sh.groupColors[ln[2]] : c;
      var alpha = sh.cluster ? (on ? .75 : .1) : (on ? .9 : .32);
      var dx = B.x - A.x, dy = B.y - A.y, d = Math.sqrt(dx * dx + dy * dy);
      if(d < 12){ continue; }
      var ux = dx / d, uy = dy / d, gap = 5;
      var sx = A.x + ux * gap, sy = A.y + uy * gap, ex = A.x + ux * (gap + (d - gap * 2) * lp), ey = A.y + uy * (gap + (d - gap * 2) * lp);
      ctx.strokeStyle = rgba(col, alpha * dim);
      ctx.lineWidth = on ? 1.4 : 1;
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
    }

    /* stars */
    for(var j = 0; j < pts.length; j++){
      var P = pts[j];
      var sp = clamp(intro * 1.4 - j / pts.length * .4, 0, 1);
      if(sp <= 0){ continue; }
      var sc = sh.cluster ? sh.groupColors[P.g] : c;
      var tw = reduce ? 1 : .85 + .15 * Math.sin(t * 1.3 + j * 1.7);
      var r = P.r * (on ? 1.18 : 1) * (.4 + .6 * sp);
      var ga = (P.m === 1 ? .32 : .16) * (on ? 1.8 : 1) * sp * dim * tw;
      var glow = ctx.createRadialGradient(P.x, P.y, 0, P.x, P.y, r * 5.5);
      glow.addColorStop(0, rgba(sc, ga)); glow.addColorStop(1, rgba(sc, 0));
      ctx.fillStyle = glow; ctx.fillRect(P.x - r * 5.5, P.y - r * 5.5, r * 11, r * 11);
      ctx.fillStyle = 'rgba(248,250,255,' + ((P.m === 3 ? .7 : .95) * sp * dim * tw).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(P.x, P.y, r, 0, 6.283); ctx.fill();
    }
  }

  /* ---- loop ---- */
  function frame(now){
    raf = null;
    draw(now);
    if(running && !reduce){ raf = requestAnimationFrame(frame); }
  }
  function start(){ if(!raf && !reduce){ last = performance.now(); raf = requestAnimationFrame(frame); } }
  function redraw(){ if(reduce || !running){ draw(performance.now()); } }

  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){
      running = es[0].isIntersecting && !document.hidden;
      if(running){ start(); }
    }).observe(hero);
  } else { running = true; }
  document.addEventListener('visibilitychange', function(){
    running = !document.hidden && hero.getBoundingClientRect().bottom > 0;
    if(running){ start(); }
  });

  /* ---- choosing a constellation ---- */
  function setActive(sh){
    if(active === sh){ return; }
    active = sh;
    shapes.forEach(function(s){ s.link.classList.toggle('is-on', s === sh); });
    hero.classList.toggle('sky-pointing', !!sh);
    if(sh){ showCard(sh); } else { card.classList.remove('show'); }
    redraw();
  }

  function showCard(sh){
    var l = sh.link;
    card.querySelector('.sc-kind').textContent = l.querySelector('.sl-kind').textContent;
    card.querySelector('.sc-name').textContent = l.querySelector('.sl-name').textContent;
    card.querySelector('.sc-desc').textContent = l.querySelector('.sl-desc').textContent;
    card.querySelector('.sc-go').textContent = fine ? 'Click to open' : 'Tap again to open';
    card.style.setProperty('--cc', sh.hex);
    card.classList.add('show');
    var cw = card.offsetWidth, ch = card.offsetHeight, gap = 18;
    var lx = sh.cx - roomBox.x, ly = sh.cy - roomBox.y;
    /* the card may use the whole hero width, not only the sky area */
    var minX = 16 - roomBox.x, maxX = W - roomBox.x - 16 - cw, x, y;
    if(roomBox.w > 520){
      /* beside the shape: right if it fits, then left, then below */
      var reach = sh.R * .95;
      if(lx + reach + gap <= maxX){ x = lx + reach + gap; y = ly - ch / 2; }
      else if(lx - reach - gap - cw >= 0){ x = lx - reach - gap - cw; y = ly - ch / 2; }
      else{ x = lx - cw / 2; y = sh.bottom - roomBox.y + 44; }
    } else {
      /* narrow screens: below the shape's name, or above the shape */
      x = lx - cw / 2;
      y = (sh.bottom - roomBox.y + 44 + ch < roomBox.h) ? sh.bottom - roomBox.y + 44 : sh.top - roomBox.y - ch - 14;
    }
    card.style.left = clamp(x, minX, maxX) + 'px';
    card.style.top = clamp(y, -40, roomBox.h - ch) + 'px';
  }

  function nearest(px, py){
    var best = null, bestScore = Infinity;
    shapes.forEach(function(sh){
      var dmin = Infinity;
      sh.pts.forEach(function(P){ var d = Math.hypot(P.x - px, P.y - py); if(d < dmin){ dmin = d; } });
      var dc = Math.hypot(sh.cx - px, sh.cy - py);
      var reach = Math.max(30, sh.R * .38);
      var score = Math.min(dmin, dc - sh.R * .55);
      if((dmin < reach || dc < sh.R * .85) && score < bestScore){ bestScore = score; best = sh; }
    });
    return best;
  }

  function go(sh){
    if(zoom){ return; }
    var href = sh.link.getAttribute('href');
    if(reduce){ window.location.href = href; return; }
    setActive(sh);
    card.classList.remove('show');
    zoom = {sh: sh, start: performance.now()};
    hero.classList.add('sky-leaving');
    running = true; start();
    setTimeout(function(){ window.location.href = href; }, 820);
  }

  function local(e){
    var hr = hero.getBoundingClientRect();
    return {x: e.clientX - hr.left, y: e.clientY - hr.top};
  }

  hero.addEventListener('pointermove', function(e){
    if(e.pointerType !== 'mouse' || zoom){ return; }
    var p = local(e);
    tmx = p.x / W * 2 - 1; tmy = p.y / H * 2 - 1;
    if(e.target.closest('.hero-copy a, .sky-card')){ return; }
    if(e.target.closest('.sky-label')){ return; }
    setActive(nearest(p.x, p.y));
  });
  hero.addEventListener('pointerleave', function(){ tmx = tmy = 0; if(!zoom){ setActive(null); } });

  hero.addEventListener('click', function(e){
    if(zoom || e.defaultPrevented){ return; }
    if(e.target.closest('.hero-copy a, .sky-label')){ return; }
    if(e.target.closest('.sky-card')){ if(active){ go(active); } return; }
    var p = local(e), sh = nearest(p.x, p.y);
    if(!sh){ armed = null; setActive(null); return; }
    /* touch: the first tap shows the card, a second tap on the same one opens it */
    if(fine || armed === sh){ go(sh); } else { armed = sh; setActive(sh); }
  });

  shapes.forEach(function(sh){
    var l = sh.link;
    l.addEventListener('mouseenter', function(){ if(!zoom){ setActive(sh); } });
    l.addEventListener('focus', function(){ if(!zoom){ setActive(sh); } });
    l.addEventListener('blur', function(){ if(active === sh && !zoom){ setActive(null); } });
    l.addEventListener('click', function(e){
      if(e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey){ return; }
      e.preventDefault();
      if(!fine && armed !== sh){ armed = sh; setActive(sh); return; }
      go(sh);
    });
  });

  /* coming back with the browser's back button */
  window.addEventListener('pageshow', function(e){
    if(e.persisted){ zoom = null; hero.classList.remove('sky-leaving'); setActive(null); redraw(); }
  });

  var rt = null;
  window.addEventListener('resize', function(){
    clearTimeout(rt);
    rt = setTimeout(function(){ layout(); if(active){ showCard(active); } redraw(); }, 120);
  });

  layout();
  draw(performance.now());
  if(document.fonts && document.fonts.ready){ document.fonts.ready.then(function(){ layout(); redraw(); }); }
})();
