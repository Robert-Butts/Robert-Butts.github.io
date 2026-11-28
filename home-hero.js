/* ============================================================
   HOME PAGE HERO (home-hero.js)
   A short story told on a 3D coordinate plane:
     1. a large cloud of about 1,100 data points, nearly as wide as
        the screen, turns slowly with a faint plane through it (the
        same cloud as recall()). It leans toward the mouse, and the
        far points fade into the dark, so its depth is easy to see,
     2. the camera pulls back as the plane swings flat and becomes the
        floor, and the points fall onto it, each one lighting the grid
        triangle it lands in,
     3. one at a time, a shape for each favorite project rises out of
        the triangle grid, holds for a moment, and falls apart,
     4. then all six rise together, side by side. Each one is a link.
   Anyone can skip ahead: click the empty part of the hero, scroll,
   or press "See all six projects" in the bar. Later visits in the same
   browser session start at step 4.
   Behind the scene, the names of data sources drift faintly (the
   list is in index.html); this file places them.

   The six projects are the links inside <nav class="hh-projects">
   in index.html. Each link's data-shape names its shape in
   home-shapes.js. Change a project's name, link, or description
   there, in the page.

   Needs three.js and home-shapes.js (loaded before this file) and,
   in the page:
     <div class="hh-stage" data-homehero aria-hidden="true"></div>
   inside <section class="home-hero" id="homeHero">.
   If three.js cannot load, or the device has no WebGL, the page
   shows the six projects as a plain list instead. Anyone whose
   device asks for reduced motion sees step 4, still.
   ============================================================ */
(function () {
  'use strict';
  var stage = document.querySelector('[data-homehero]');
  if (!stage || typeof THREE === 'undefined' || !window.HOME_SHAPES) return;
  var hero = document.getElementById('homeHero');
  var foot = hero.querySelector('.hh-bottom'), row = hero.querySelector('.hh-row');
  var links = Array.prototype.slice.call(hero.querySelectorAll('.hp'));
  var btn = document.getElementById('hhBtn');
  var srcs = Array.prototype.slice.call(hero.querySelectorAll('.hh-src')), srcBox = hero.querySelector('.hh-sources');
  if (!links.length) return;
  var renderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
  catch (e) { return; }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- EDIT: timing, in seconds ---- */
  var CLOUD = 5.5;                                  /* the cloud turns on its own */
  var FALL = 2.6;                                   /* the points fall onto the grid */
  var BUILD = 2.1, HOLD = 2.3, BREAK = 1.3, STEP = 4.6;   /* each project's shape; a new one starts every STEP seconds */
  var RISE = 2.4;                                   /* all six rise together at the end */

  var HS = window.HOME_SHAPES, S = HS.S, H = HS.H;
  var BASE = 0.35;      /* shapes float this far above the floor */
  var SHRINK = 0.86;    /* each triangle is drawn a little smaller, so the grid shows between them */
  var CW = 15.5;        /* the width given to each shape when all six stand together */
  var ROWGAP = 1.2;     /* the space between rows then */
  var PITCH = 0.2;      /* how far the camera looks down */
  var POINTS = 1100, SLOPE = 0.3, CS = 1;        /* the cloud: point count, how steeply it rises, its size */
  var CLOUD_Y = BASE + 8;                       /* the height of the cloud's center */
  var CLOUD_W = 1.04, CLOUD_W_PHONE = 1.35;   /* how much of the screen's width the cloud's plane spans at its widest (on phones it runs past the sides) */
  var CLOUD_FOV = 50;   /* the camera's lens while the cloud turns: wider than later, for stronger depth */
  var TURN = 0.35, TILT = 0.25;   /* how far the cloud turns and tips toward the mouse */
  var YAW0 = -0.5, SPIN = 0.11;   /* the cloud's starting angle, and how fast it turns (radians per second) */

  var bgHex = (getComputedStyle(document.documentElement).getPropertyValue('--bg') || '').trim() || '#0E1116';
  var BG = new THREE.Color(bgHex);

  /* a repeatable random number, so the shading and timing look the same on every visit */
  var seed = 5;
  var rand = function () { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  var clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  var smooth = function (a, b, v) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  var ease = function (x) { x = clamp(x, 0, 1); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  var lerp = function (a, b, e) { return a + (b - a) * e; };

  /* ---- the six shapes -------------------------------------------- */
  var N6 = links.length;
  var shapes = links.map(function (a) {
    var make = HS.make[a.getAttribute('data-shape')];
    var tiles = make ? make() : [];
    var lo = Infinity, hi = -Infinity;
    tiles.forEach(function (t) { lo = Math.min(lo, t.x0); hi = Math.max(hi, t.x0 + S); });
    return { tiles: tiles, mid: tiles.length ? (lo + hi) / 2 : 0, hw: tiles.length ? (hi - lo) / 2 : 1 };
  });

  /* grid squares on the floor near (cx, cz), nearest first, with some randomness */
  var cells = function (n, cx, cz, spread) {
    var list = [], gx = Math.round(cx / S);
    for (var x = gx - 15; x < gx + 15; x++) for (var z = -11; z < 15; z++) {
      list.push({ x: x * S, z: z * S, d: Math.hypot(x * S - cx, (z * S - cz) * 1.4) + rand() * spread });
    }
    list.sort(function (a, b) { return a.d - b.d; });
    return list.slice(0, n);
  };
  /* a triangle lying flat in grid square c, in the same half of the square it has in its shape */
  var floorTri = function (v, c) { return v.map(function (p) { return [c.x + p[0], 0.03, c.z + S - p[1]]; }); };
  var shrink3 = function (tri) {
    var mx = (tri[0][0] + tri[1][0] + tri[2][0]) / 3, my = (tri[0][1] + tri[1][1] + tri[2][1]) / 3, mz = (tri[0][2] + tri[1][2] + tri[2][2]) / 3;
    return tri.map(function (p) { return [mx + (p[0] - mx) * SHRINK, my + (p[1] - my) * SHRINK, mz + (p[2] - mz) * SHRINK]; });
  };

  /* every triangle of every shape, with its trip from the floor, into place, and back down */
  var T = [];
  shapes.forEach(function (sh, i) {
    var order = sh.tiles.slice().sort(function (a, b) { return (a.cy + rand() * 2.2) - (b.cy + rand() * 2.2); });   /* builds from the bottom up */
    var from = cells(order.length, 0, 2.5, 3.2), to = cells(order.length, 0, 1.5, 9);
    order.forEach(function (t, j) {
      var mx = t.x0 + (t.v[0][0] + t.v[1][0] + t.v[2][0]) / 3, my = t.y0 + (t.v[0][1] + t.v[1][1] + t.v[2][1]) / 3;
      T.push({
        i: i, v: t.v, rgb: t.rgb,
        loc: t.v.map(function (p) { return [mx - sh.mid + (t.x0 + p[0] - mx) * SHRINK, my + (t.y0 + p[1] - my) * SHRINK]; }),   /* its corners in the shape, centered */
        src: shrink3(floorTri(t.v, from[j])),
        dst: shrink3(floorTri(t.v, to[(j * 7) % to.length])),
        fsrc: null,                                    /* where it starts when all six rise (set in layout) */
        d1: (j / order.length) * 1.3 + rand() * 0.25,  /* when it lifts off, in its shape's turn */
        d2: rand() * 0.7,                              /* when it falls */
        df: (j / order.length) * 0.9 + rand() * 0.5,   /* when it lifts off when all six rise */
        arc: 1.3 + rand() * 1.6
      });
    });
  });
  var NT = T.length;

  /* ---- the scene ---------------------------------------------- */
  var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(dpr);
  stage.appendChild(renderer.domElement);
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(38, 1, 0.1, 400);
  var root = new THREE.Group();
  scene.add(root);

  /* the floor: grid lines every S units, a diagonal through every square, and two brighter axes */
  var GX = 31.2, GZ0 = -36, GZ1 = 40, seg = [];
  for (var gx = -GX; gx <= GX + 1e-6; gx += S) seg.push(gx, 0, GZ0, gx, 0, GZ1);
  for (var gz = GZ0; gz <= GZ1 + 1e-6; gz += S) seg.push(-GX, 0, gz, GX, 0, gz);
  for (gx = -GX; gx < GX - 1e-6; gx += S) for (gz = GZ0; gz < GZ1 - 1e-6; gz += S) seg.push(gx, 0, gz + S, gx + S, 0, gz);
  var gridGeo = new THREE.BufferGeometry();
  gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(seg, 3));
  var gridMat = new THREE.LineBasicMaterial({ color: 0x2E3845, transparent: true, opacity: 0 });
  root.add(new THREE.LineSegments(gridGeo, gridMat));
  var axisGeo = new THREE.BufferGeometry();
  axisGeo.setAttribute('position', new THREE.Float32BufferAttribute([-GX, 0.01, 0, GX, 0.01, 0, 0, 0.01, GZ0, 0, 0.01, GZ1], 3));
  var axisMat = new THREE.LineBasicMaterial({ color: 0x55627A, transparent: true, opacity: 0 });
  root.add(new THREE.LineSegments(axisGeo, axisMat));

  /* the cloud: y rises with x, plus noise, in the site's code colors (mostly blue) */
  var palette = [0x75AADB, 0x75AADB, 0x75AADB, 0x7FD18C, 0xB79CFF, 0xF0B95A].map(function (c) { return new THREE.Color(c); });
  var gauss = function () { return rand() + rand() + rand() - 1.5; };
  var P = [];
  for (var k = 0; k < POINTS; k++) {
    var x = (rand() * 2 - 1) * 16.5, c = palette[Math.floor(rand() * palette.length)];   /* spread out to the plane's edges */
    P.push({ x: x * CS, y: (x * SLOPE + gauss() * 3.2) * CS, z: (rand() * 2 - 1) * 10 * CS, rgb: [c.r, c.g, c.b], rel: rand(), land: null });
  }
  var ppos = new Float32Array(POINTS * 3), pcol = new Float32Array(POINTS * 3);
  P.forEach(function (p, k) { pcol[k * 3] = p.rgb[0]; pcol[k * 3 + 1] = p.rgb[1]; pcol[k * 3 + 2] = p.rgb[2]; });
  var pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(ppos, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(pcol, 3));
  var pMat = new THREE.PointsMaterial({ size: 0.28, vertexColors: true, transparent: true, opacity: 0, sizeAttenuation: true, depthWrite: false });
  var pts = new THREE.Points(pGeo, pMat);
  pts.frustumCulled = false;
  root.add(pts);

  /* the cloud's plane: a faint wireframe tilted along the trend */
  var planeHold = new THREE.Group();
  var plane = new THREE.Mesh(new THREE.PlaneGeometry(34 * CS, 22 * CS, 17, 11),
    new THREE.MeshBasicMaterial({ color: 0x2E3845, wireframe: true, transparent: true, opacity: 0 }));
  plane.rotation.order = 'ZXY';
  plane.rotation.x = -Math.PI / 2;
  planeHold.add(plane);
  root.add(planeHold);

  /* flat triangles: the ones the points light up when they land, and the shapes' triangles */
  var triMesh = function (n) {
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 9), 3));
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 9), 3));
    var m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide }));
    m.frustumCulled = false;
    root.add(m);
    return g;
  };
  var landGeo = triMesh(POINTS), tileGeo = triMesh(NT);
  var lpos = landGeo.attributes.position.array, lcol = landGeo.attributes.color.array;
  var tpos = tileGeo.attributes.position.array, tcol = tileGeo.attributes.color.array;
  var A = new Float32Array(NT);   /* how visible each shape triangle is right now */

  /* write one triangle, its color faded toward the page background by alpha */
  var put = function (posA, colA, k, tri, rgb, alpha) {
    var o = k * 9;
    for (var v = 0; v < 3; v++) {
      posA[o + v * 3] = tri[v][0]; posA[o + v * 3 + 1] = tri[v][1]; posA[o + v * 3 + 2] = tri[v][2];
      colA[o + v * 3] = BG.r + (rgb[0] - BG.r) * alpha;
      colA[o + v * 3 + 1] = BG.g + (rgb[1] - BG.g) * alpha;
      colA[o + v * 3 + 2] = BG.b + (rgb[2] - BG.b) * alpha;
    }
  };
  var hide = function (posA, k) { for (var j = 0; j < 9; j++) posA[k * 9 + j] = 0; };
  var lerp3 = function (a, b, e, lift) {
    return [[a[0][0] + (b[0][0] - a[0][0]) * e, a[0][1] + (b[0][1] - a[0][1]) * e + lift, a[0][2] + (b[0][2] - a[0][2]) * e],
            [a[1][0] + (b[1][0] - a[1][0]) * e, a[1][1] + (b[1][1] - a[1][1]) * e + lift, a[1][2] + (b[1][2] - a[1][2]) * e],
            [a[2][0] + (b[2][0] - a[2][0]) * e, a[2][1] + (b[2][1] - a[2][1]) * e + lift, a[2][2] + (b[2][2] - a[2][2]) * e]];
  };
  var cur = function (k) {   /* triangle k where it is drawn now */
    var o = k * 9;
    return [[tpos[o], tpos[o + 1], tpos[o + 2]], [tpos[o + 3], tpos[o + 4], tpos[o + 5]], [tpos[o + 6], tpos[o + 7], tpos[o + 8]]];
  };

  /* a shape standing somewhere: where its center sits on the floor (ox, oz), how high it floats (oy),
     how far it turns (yaw), and its size (sc, grown from its middle) */
  var pose = function (q, ps) {
    var c = Math.cos(ps.yaw), s = Math.sin(ps.yaw);
    return q.loc.map(function (p) {
      var x = p[0] * ps.sc, y = H / 2 + (p[1] - H / 2) * ps.sc;
      return [ps.ox + x * c, ps.oy + y, ps.oz - x * s];
    });
  };

  /* ---- 1 and 2. the cloud, and the points falling onto the grid ---- */
  /* the cloud follows the mouse while it turns; once the points start to fall it keeps that last lean */
  var cm = { yaw: 0, tilt: 0 };
  var cloudMouse = function (t) { if (t < CLOUD) { cm.yaw = mx * TURN; cm.tilt = my * TILT; } };
  var cloudPos = function (p, t) {
    var th = YAW0 + SPIN * t + cm.yaw, tilt = (0.12 + cm.tilt) * (1 - ease((t - CLOUD) / (FALL * 0.85)));
    var c = Math.cos(th), s = Math.sin(th);
    var x1 = p.x * c + p.z * s, z1 = -p.x * s + p.z * c;           /* turn */
    var ct = Math.cos(tilt), st = Math.sin(tilt);
    return [x1, CLOUD_Y + p.y * ct - z1 * st, p.y * st + z1 * ct];  /* lean back */
  };
  var landing = function (p) {   /* where point p lands, worked out once */
    if (p.land) return p.land;
    var t0 = CLOUD + p.rel * (FALL - 1.15), from = cloudPos(p, t0);
    var y0 = Math.max(from[1], 0.1);
    var gx = Math.floor(from[0] / S), gz = Math.floor(from[2] / S);
    var fx = from[0] / S - gx, fz = from[2] / S - gz;
    var v = fx + fz > 1 ? [[0, 0], [S, 0], [S, S]] : [[0, 0], [S, S], [0, S]];   /* the half of the square it falls into */
    var tri = shrink3(floorTri(v, { x: gx * S, z: gz * S }).map(function (q) { return [q[0], 0.015, q[2]]; }));
    p.land = { t0: t0, dur: 0.42 + 0.05 * y0, from: [from[0], y0, from[2]], tri: tri,
      to: [(tri[0][0] + tri[1][0] + tri[2][0]) / 3, 0.02, (tri[0][2] + tri[1][2] + tri[2][2]) / 3] };
    return p.land;
  };
  var GLOWT = 1.5;   /* how long a landed point's triangle glows */
  /* draws the cloud at time t, faded by k (1 = fully there) */
  var drawCloud = function (t, k) {
    var fadeIn = smooth(0, 1.2, t);
    cloudMouse(t);
    for (var n = 0; n < POINTS; n++) {
      var p = P[n], o = n * 3, L = t >= CLOUD ? landing(p) : null, q;
      if (!L || t < L.t0) { q = cloudPos(p, t); ppos[o] = q[0]; ppos[o + 1] = q[1]; ppos[o + 2] = q[2]; hide(lpos, n); continue; }
      var u = (t - L.t0) / L.dur;
      if (u < 1) {
        var e = u * u;
        ppos[o] = lerp(L.from[0], L.to[0], u); ppos[o + 1] = lerp(L.from[1], L.to[1], e); ppos[o + 2] = lerp(L.from[2], L.to[2], u);
        hide(lpos, n);
      } else {
        ppos[o] = 0; ppos[o + 1] = -999; ppos[o + 2] = 0;   /* landed: the point is gone and its triangle glows */
        var g = 1 - (t - L.t0 - L.dur) / GLOWT;
        if (g <= 0 || k <= 0) hide(lpos, n);
        else put(lpos, lcol, n, L.tri, p.rgb, 0.95 * g * g * k);
      }
    }
    pGeo.attributes.position.needsUpdate = true;
    landGeo.attributes.position.needsUpdate = true;
    landGeo.attributes.color.needsUpdate = true;
    pMat.opacity = 0.8 * fadeIn * k;
    var f = ease((t - CLOUD) / (FALL * 0.85));            /* the plane swings flat and settles onto the floor */
    planeHold.rotation.set((0.12 + cm.tilt) * (1 - f), YAW0 + SPIN * t + cm.yaw, 0);
    planeHold.position.y = CLOUD_Y * (1 - f) + 0.01;
    plane.rotation.z = Math.atan(SLOPE) * (1 - f);
    plane.material.opacity = 0.28 * fadeIn * (1 - smooth(0.45, 1, f)) * k;
    plane.visible = plane.material.opacity > 0.002;
    pts.visible = pMat.opacity > 0.002;
  };
  var gridAt = function (t) { return smooth(CLOUD + 0.3, CLOUD + FALL, t); };
  var setGrid = function (g) { gridMat.opacity = 0.55 * g; axisMat.opacity = 0.8 * g; };

  /* ---- 3. one shape at a time --------------------------------------- */
  var TSEQ = CLOUD + FALL - 0.5;                   /* the first shape starts as the last points land */
  var TFIN = TSEQ + (N6 - 1) * STEP + BUILD + HOLD; /* then all six rise */
  var FLY = 1.1, GLOW = 0.35, FALLT = 0.85, FADE = 0.45;
  var single = { ox: 0, oy: BASE, oz: 0, yaw: 0, sc: 1 };
  var drawSequence = function (t) {
    single.yaw = 0.2 * Math.sin(t * 0.45);
    for (var k = 0; k < NT; k++) {
      var q = T[k], ts = t - TSEQ - q.i * STEP, last = q.i === N6 - 1;
      if (ts < -GLOW - 1.5 || (!last && ts > BUILD + HOLD + BREAK + 0.2)) { hide(tpos, k); A[k] = 0; continue; }
      var up = pose(q, single);
      if (ts < BUILD + HOLD || last) {
        var p = (ts - q.d1) / FLY;
        if (p * FLY < -GLOW) { hide(tpos, k); A[k] = 0; continue; }
        if (p < 0) { A[k] = 1 + p * FLY / GLOW; put(tpos, tcol, k, q.src, q.rgb, A[k]); continue; }   /* lights up in its grid square */
        var e = ease(p);
        put(tpos, tcol, k, lerp3(q.src, up, e, Math.sin(Math.PI * e) * q.arc), q.rgb, 1); A[k] = 1;
      } else {
        var f = (ts - BUILD - HOLD - q.d2) / FALLT;
        if (f < 0) { put(tpos, tcol, k, up, q.rgb, 1); A[k] = 1; continue; }
        var g = Math.min(1, f), fade = f <= 1 ? 1 : 1 - (f - 1) * FALLT / FADE;
        if (fade <= 0) { hide(tpos, k); A[k] = 0; continue; }
        put(tpos, tcol, k, lerp3(up, q.dst, g * g, Math.sin(Math.PI * g) * 0.9), q.rgb, fade); A[k] = fade;
      }
    }
    tileGeo.attributes.position.needsUpdate = true;
    tileGeo.attributes.color.needsUpdate = true;
  };
  var shownAt = function (t) {   /* which shape is on show at time t, or -1 */
    for (var i = 0; i < N6; i++) {
      var ts = t - TSEQ - i * STEP;
      if (ts > BUILD - 0.3 && (ts < BUILD + HOLD || i === N6 - 1)) return i;
    }
    return -1;
  };

  /* ---- 4. all six together ------------------------------------------ */
  var cols = 2, rows = 3, capF = 3, capS = 3;   /* columns and rows; the room under each shape for its name (finale, single) */
  var cell = [];                                 /* where each shape stands when all six are together */
  var hl = new Float32Array(N6), dim = new Float32Array(N6), hover = -1;
  var finalPose = function (i, t, still) {
    var c = cell[i], b = still ? 0 : 0.14 * Math.sin(t * 0.9 + i * 1.3);
    return { ox: c.x, oy: c.y + b, oz: c.z, yaw: c.yaw + (still ? 0 : 0.05 * Math.sin(t * 0.5 + i)), sc: 1 + 0.04 * hl[i] };
  };
  var arrange = function () {
    var mid = (cols - 1) / 2, ch = H + capF + ROWGAP, bend = cols > 3 ? 0.4 : 1;   /* a gentle curve; flatter for a long row */
    cell = [];
    for (var i = 0; i < N6; i++) {
      var cI = i % cols, r = Math.floor(i / cols), d = cI - mid;
      cell.push({ x: d * CW, y: BASE + capF + (rows - 1 - r) * ch, z: Math.abs(d) * 1.4 * bend, yaw: -d * 0.16 * bend });
    }
    var srcs = {};
    T.forEach(function (q) {
      if (!srcs[q.i]) srcs[q.i] = cells(shapes[q.i].tiles.length, cell[q.i].x, 3, 4);
      q.fsrc = shrink3(floorTri(q.v, srcs[q.i].shift()));
    });
  };

  /* ---- the camera ------------------------------------------------------ */
  var L = null, CAM = null;   /* CAM: px per scene unit (s), the height the camera aims at, and where that lands on screen */
  var panel = function () {   /* the part of the hero the scene fills, in px: below the menu, above the words */
    var w = hero.clientWidth, h = hero.clientHeight, hr = hero.getBoundingClientRect();
    var fr = foot.getBoundingClientRect(), rr = row.getBoundingClientRect(), pad = parseFloat(getComputedStyle(row).paddingLeft) || 0;
    return { x0: rr.left - hr.left + pad, x1: rr.right - hr.left - pad, y0: 84, y1: fr.top - hr.top - 16, w: w, h: h };
  };
  var fit = function (pn, bw, bh, fw, fh) { return Math.min((pn.x1 - pn.x0) * fw / bw, (pn.y1 - pn.y0) * fh / bh); };   /* px per scene unit */
  /* a view: its size (px per scene unit at the point it aims at), that point's height and place on screen,
     the lens (fov, in degrees), and where the fog starts and ends, counted from the aim point */
  var frame3 = function (s, aimY) { return { s: s, aimY: aimY, cx: L.cx, cy: L.cy, fov: 38, fogA: 4, fogB: 40 }; };
  /* the cloud's view: as wide as the screen allows, centered between the menu and the bar, and closer,
     with a wider lens and fog that starts in front of the cloud, so the far points fade (as on recall()) */
  var probe = new THREE.Object3D(), probePlane = new THREE.Object3D(), PV = new THREE.Vector3();
  probePlane.rotation.order = 'ZXY'; probePlane.rotation.x = -Math.PI / 2; probePlane.rotation.z = Math.atan(SLOPE);
  probe.add(probePlane);
  var cloudFrame = function (pn) {
    var top = 66, bar = pn.y1 + 16;
    var cam = { s: 30, aimY: CLOUD_Y, cx: L.w / 2, cy: (top + bar) / 2, fov: CLOUD_FOV, fogA: -4, fogB: 26 };
    var hx = 17 * CS, hz = 11 * CS;
    for (var it = 0; it < 6; it++) {
      aimCamera(cam);
      var wMax = 0, hMax = 0;
      for (var t = 0; t <= CLOUD; t += CLOUD / 4) {
        probe.rotation.set(0.12, YAW0 + SPIN * t, 0); probe.position.set(0, CLOUD_Y, 0);
        probe.updateMatrixWorld(true);
        var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
        [[-hx, -hz], [hx, -hz], [-hx, hz], [hx, hz]].forEach(function (c) {
          PV.set(c[0], c[1], 0).applyMatrix4(probePlane.matrixWorld).project(camera);
          var sx = (PV.x + 1) / 2 * L.w, sy = (1 - PV.y) / 2 * L.h;
          x0 = Math.min(x0, sx); x1 = Math.max(x1, sx); y0 = Math.min(y0, sy); y1 = Math.max(y1, sy);
        });
        wMax = Math.max(wMax, x1 - x0); hMax = Math.max(hMax, y1 - y0);
      }
      /* as wide as CLOUD_W of the screen, but never more than about 1.6 times the room above the bar
         (it may run a little behind the menu and the bar); small steps, since depth makes the size uneven */
      cam.s *= Math.pow(Math.min((L.w < 760 ? CLOUD_W_PHONE : CLOUD_W) * L.w / wMax, 1.6 * (bar - top) / hMax), 0.8);
    }
    return cam;
  };
  var layout = function () {
    var w = hero.clientWidth, h = hero.clientHeight;
    if (!w || !h) return false;
    var pn = panel();
    L = { w: w, h: h, cx: (pn.x0 + pn.x1) / 2, cy: (pn.y0 + pn.y1) / 2 };
    /* one shape: room under it for its name and a line about it (about 80 px) */
    var s1 = 30;
    for (var n = 0; n < 3; n++) { capS = Math.max(2.4, 84 / s1); s1 = fit(pn, 15.5, H + capS, 0.94, 0.86); }
    L.single = frame3(s1, BASE + (H - capS) / 2); L.s1 = s1;
    /* all six: two, three, or six columns, whichever lets the shapes be bigger;
       room under each for its name (about 40 px, or 56 px on a phone, where names wrap more) */
    var best = null, capPx = w < 600 ? 56 : 40;
    [2, 3, 6].forEach(function (c) {
      var r = Math.ceil(N6 / c), s = 15, cap = 3;
      for (var n2 = 0; n2 < 3; n2++) { cap = Math.max(2.2, capPx / s); s = fit(pn, c * CW, r * (H + cap + ROWGAP) - ROWGAP, 0.98, 0.96); }
      if (!best || s > best.s) best = { c: c, r: r, s: s, cap: cap };
    });
    if (best.c !== cols || best.cap !== capF || !cell.length) { cols = best.c; rows = best.r; capF = best.cap; arrange(); }
    L.fin = frame3(best.s, BASE + (rows * (H + capF + ROWGAP) - ROWGAP) / 2); L.s6 = best.s;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    L.cloud = cloudFrame(pn);
    placeSources(pn);
    return true;
  };
  scene.fog = new THREE.Fog(BG, 30, 70);   /* the far floor (and the far side of the cloud) fades into the page */
  var aimCamera = function (cam) {
    var dist = L.h / cam.s / (2 * Math.tan(cam.fov * Math.PI / 360));
    camera.fov = cam.fov;
    camera.position.set(0, cam.aimY + dist * Math.sin(PITCH), dist * Math.cos(PITCH));
    camera.lookAt(0, cam.aimY, 0);
    camera.near = Math.max(0.1, dist - 45); camera.far = dist + 90;
    camera.setViewOffset(L.w, L.h, -(cam.cx - L.w / 2), -(cam.cy - L.h / 2), L.w, L.h);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    scene.fog.near = dist + cam.fogA; scene.fog.far = dist + cam.fogB;
  };
  var mixCam = function (a, b, e) {
    return { s: a.s * Math.pow(b.s / a.s, e), aimY: lerp(a.aimY, b.aimY, e), cx: lerp(a.cx, b.cx, e), cy: lerp(a.cy, b.cy, e),
      fov: lerp(a.fov, b.fov, e), fogA: lerp(a.fogA, b.fogA, e), fogB: lerp(a.fogB, b.fogB, e) };
  };

  /* ---- the faint data sources: spread evenly behind the scene, above the bar ---- */
  var srcSeed = 21;
  var srcRand = function () { srcSeed = (srcSeed * 1664525 + 1013904223) >>> 0; return srcSeed / 4294967296; };
  srcs.forEach(function (sp, i) {   /* each name drifts up and down on its own slow timing */
    var it = document.createElement('i');
    it.textContent = sp.textContent; sp.textContent = ''; sp.appendChild(it);
    sp.style.setProperty('--d', (3 + srcRand() * 3).toFixed(2) + 's');
    sp.style.setProperty('--dl', (-srcRand() * 6).toFixed(2) + 's');
    sp.style.setProperty('--dy', Math.round(12 + srcRand() * 26) + 'px');
    sp.style.transitionDelay = (0.8 + i * 0.07).toFixed(2) + 's';
  });
  function placeSources(pn) {
    if (!srcs.length) return;
    srcSeed = 21;
    var cols = L.w < 600 ? 2 : 4, rows = Math.ceil(srcs.length / cols), n = cols * rows, order = [];
    for (var k = 0; k < n; k++) order.push(k);
    for (k = n - 1; k > 0; k--) { var j = Math.floor(srcRand() * (k + 1)), tmp = order[k]; order[k] = order[j]; order[j] = tmp; }
    var x0 = L.w * 0.03, x1 = L.w * 0.97, y0 = 92, y1 = Math.max(y0 + 120, pn.y1 - 34), cw = (x1 - x0) / cols, ch = (y1 - y0) / rows;
    srcs.forEach(function (sp, i) {
      var c = order[i] % cols, r = Math.floor(order[i] / cols), w = sp.offsetWidth || 120;
      var x = x0 + c * cw + srcRand() * Math.max(0, cw - w), y = y0 + r * ch + srcRand() * Math.max(0, ch - 46);
      sp.style.transform = 'translate(' + Math.round(x) + 'px,' + Math.round(y) + 'px)';
    });
  }
  var srcX = null, srcY = null;
  var leanSources = function () {   /* the names shift a little against the mouse, as if they sit far behind the scene */
    if (!srcBox) return;
    var x = Math.round(-mx * 22 * 10) / 10, y = Math.round(-my * 12 * 10) / 10;
    if (x !== srcX || y !== srcY) { srcX = x; srcY = y; srcBox.style.transform = 'translate(' + x + 'px,' + y + 'px)'; }
  };

  /* ---- the six links: placed over their shapes ---------------------- */
  var V = new THREE.Vector3();
  var toScreen = function (x, y, z) {
    V.set(x, y, z).applyMatrix4(root.matrixWorld).project(camera);
    return [(V.x + 1) / 2 * L.w, (1 - V.y) / 2 * L.h];
  };
  var placeLink = function (i, ps, cap) {
    var a = links[i], hw = Math.min(shapes[i].hw + 0.4, CW / 2 - 0.45) * ps.sc, c = Math.cos(ps.yaw), s = Math.sin(ps.yaw);   /* never wider than its column */
    var top = ps.oy + H / 2 + (H / 2 + 0.3) * ps.sc, bot = ps.oy + H / 2 - (H / 2) * ps.sc - cap;
    var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    [[-hw, top], [hw, top], [-hw, bot], [hw, bot]].forEach(function (p) {
      var q = toScreen(ps.ox + p[0] * c, p[1], ps.oz - p[0] * s);
      x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]);
    });
    var bw = Math.round(x1 - x0), bh = Math.round(y1 - y0);
    if (a._w !== bw || a._h !== bh) { a.style.width = bw + 'px'; a.style.height = bh + 'px'; a._w = bw; a._h = bh; }
    a.style.transform = 'translate(' + x0.toFixed(1) + 'px,' + y0.toFixed(1) + 'px)';
  };
  var shown = null;
  var showLinks = function (which, isSingle) {   /* which: -1 none, 'all', or one shape's number */
    var key = which + '|' + !!isSingle;
    if (key === shown) return;
    shown = key;
    links.forEach(function (a, i) {
      var on = which === 'all' || which === i;
      a.classList.toggle('show', on);
      a.classList.toggle('single', !!isSingle && on);
    });
  };

  /* ---- what is happening -------------------------------------------- */
  var mode = 'intro', clock = 0, mt = 0;      /* mt: seconds into the current mode */
  var snap = null;                            /* the moment a change of mode began */
  var tx = 0, ty = 0, mx = 0, my = 0, mouse = false;

  var setButton = function () {
    if (!btn) return;
    btn.hidden = reduce;
    btn.textContent = mode === 'final' ? 'Play again' : 'See all six projects \u2192';
  };
  var remember = function () { try { sessionStorage.setItem('rb-home-seen', '1'); } catch (e) { /* storage blocked */ } };

  /* from wherever things are now to all six together */
  var toFinal = function (fromFloor) {
    var from = new Array(NT), fa = new Float32Array(NT);
    for (var k = 0; k < NT; k++) { fa[k] = fromFloor ? 0 : A[k]; from[k] = fa[k] > 0.03 ? cur(k) : null; }
    snap = { from: from, a: fa, cam: CAM || L.single, cloudT: mode === 'intro' ? mt : 99, cloudK: mode === 'intro' ? 1 : 0,
      grid: mode === 'intro' ? gridAt(mt) : gridMat.opacity / 0.55 };
    if (fromFloor) { snap.grid = 0; snap.cloudK = 0; }
    mode = 'final'; mt = 0;
    showLinks('all'); setButton(); remember();
    hero.classList.add('is-final'); layout();
  };
  /* from all six back to the start */
  var replay = function () {
    var from = new Array(NT), fa = new Float32Array(NT);
    for (var k = 0; k < NT; k++) { fa[k] = A[k]; from[k] = A[k] > 0.03 ? cur(k) : null; }
    snap = { from: from, a: fa, cam: CAM };
    mode = 'replay'; mt = 0; hover = -1;
    hero.classList.remove('is-final'); layout();
    showLinks(-1); setButton();
  };

  var drawFinal = function (t, still) {
    var u = still ? 99 : t;
    for (var k = 0; k < NT; k++) {
      var q = T[k], target = pose(q, finalPose(q.i, clock, still));
      var rgb = hl[q.i] > 0.01 ? q.rgb.map(function (c) { return Math.min(1, c * (1 + 0.16 * hl[q.i])); }) : q.rgb;
      var alpha = 1 - 0.5 * dim[q.i];
      var from = snap && snap.from[k], p;
      if (from) {                                    /* already in the air: flies straight to its place */
        p = (u - q.df * 0.35) / FLY;
        if (p < 0) { put(tpos, tcol, k, from, q.rgb, snap.a[k]); A[k] = snap.a[k]; continue; }
        var e = ease(p);
        put(tpos, tcol, k, lerp3(from, target, e, Math.sin(Math.PI * e) * 0.6), rgb, lerp(snap.a[k], alpha, e)); A[k] = 1;
      } else {                                       /* rises out of the floor */
        p = (u - 0.35 - q.df) / FLY;
        if (p * FLY < -GLOW) { hide(tpos, k); A[k] = 0; continue; }
        if (p < 0) { A[k] = 1 + p * FLY / GLOW; put(tpos, tcol, k, q.fsrc, q.rgb, A[k]); continue; }
        var e2 = ease(p);
        put(tpos, tcol, k, lerp3(q.fsrc, target, e2, Math.sin(Math.PI * e2) * q.arc), rgb, alpha); A[k] = 1;
      }
    }
    tileGeo.attributes.position.needsUpdate = true;
    tileGeo.attributes.color.needsUpdate = true;
  };
  var drawReplay = function (t) {
    for (var k = 0; k < NT; k++) {
      var q = T[k], from = snap.from[k];
      if (!from) { hide(tpos, k); A[k] = 0; continue; }
      var f = (t - q.d2 * 0.6) / FALLT;
      if (f < 0) { put(tpos, tcol, k, from, q.rgb, snap.a[k]); continue; }
      var g = Math.min(1, f), fade = f <= 1 ? 1 : 1 - (f - 1) * FALLT / FADE;
      if (fade <= 0) { hide(tpos, k); A[k] = 0; continue; }
      var cx = (from[0][0] + from[1][0] + from[2][0]) / 3, cz = (from[0][2] + from[1][2] + from[2][2]) / 3;
      var down = from.map(function (v) { return [v[0] + (cx - v[0]) * 0.1, 0.03, v[2] + (cz - v[2]) * 0.1]; });
      put(tpos, tcol, k, lerp3(from, down, g * g, 0), q.rgb, snap.a[k] * fade); A[k] = fade;
    }
    tileGeo.attributes.position.needsUpdate = true;
    tileGeo.attributes.color.needsUpdate = true;
  };

  /* ---- the loop ------------------------------------------------- */
  var onscreen = true, last = null;
  var lean = function (t, k) {
    if (!mouse) { tx = 0.3 * Math.sin(t * 0.3); ty = 0.18 * Math.sin(t * 0.21 + 1); }
    mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
    root.rotation.y = mx * 0.42 * k;
    root.rotation.x = my * 0.1 * k;
  };
  var ease6 = function () {
    for (var i = 0; i < N6; i++) {
      hl[i] += ((hover === i ? 1 : 0) - hl[i]) * 0.14;
      dim[i] += ((hover >= 0 && hover !== i ? 1 : 0) - dim[i]) * 0.14;
    }
  };
  var step = function (now) {
    requestAnimationFrame(step);
    if (last === null) last = now;
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!onscreen || document.hidden || !L) return;
    clock += dt; mt += dt;
    ease6();
    if (mode === 'intro') {
      if (mt >= TFIN) toFinal(false);
      else {
        lean(clock, 1);
        CAM = mixCam(L.cloud, L.single, ease((mt - CLOUD + 0.3) / (FALL + 0.4)));   /* the camera pulls back as the points fall */
        drawCloud(mt, 1);
        setGrid(gridAt(mt));
        drawSequence(mt);
        var i = shownAt(mt);
        showLinks(i, true);
        aimCamera(CAM);
        root.updateMatrixWorld();
        if (i >= 0) placeLink(i, single, capS);
      }
    }
    if (mode === 'final') {
      lean(clock, 0.6);
      var e = ease(mt / (RISE * 0.9));
      CAM = mixCam(snap.cam, L.fin, e);
      if (snap.cloudK > 0) drawCloud(snap.cloudT, Math.max(0, 1 - mt / 0.6));
      else { pts.visible = false; plane.visible = false; }
      setGrid(Math.max(snap.grid, smooth(0, 0.8, mt)));
      drawFinal(mt, false);
      aimCamera(CAM);
      root.updateMatrixWorld();
      for (var j = 0; j < N6; j++) placeLink(j, finalPose(j, clock, false), capF);
    } else if (mode === 'replay') {
      lean(clock, 1);
      CAM = mixCam(snap.cam, L.cloud, ease(mt / 1.6));   /* back to the cloud's view, where the story starts */
      setGrid(1 - smooth(0.9, 1.8, mt));
      drawReplay(mt);
      aimCamera(CAM);
      if (mt > 1.9) { mode = 'intro'; mt = 0; P.forEach(function (p) { p.land = null; }); setButton(); }
    }
    leanSources();
    renderer.render(scene, camera);
  };

  /* reduced motion: all six, still */
  var still = function () {
    if (!layout()) return;
    if (mode !== 'final') { mode = 'final'; snap = null; showLinks('all'); hero.classList.add('is-final'); layout(); }
    for (var i = 0; i < N6; i++) { hl[i] = hover === i ? 1 : 0; dim[i] = hover >= 0 && hover !== i ? 1 : 0; }
    pts.visible = false; plane.visible = false;
    setGrid(1);
    CAM = L.fin;
    drawFinal(0, true);
    aimCamera(CAM);
    root.updateMatrixWorld();
    for (var j = 0; j < N6; j++) placeLink(j, finalPose(j, 0, true), capF);
    renderer.render(scene, camera);
  };

  /* ---- people ---------------------------------------------------- */
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    mouse = true;
    tx = e.clientX / window.innerWidth - 0.5;
    ty = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });
  var skip = function () { if (mode === 'intro') toFinal(false); };
  hero.addEventListener('click', function (e) { if (!e.target.closest('a, button')) skip(); });
  window.addEventListener('wheel', skip, { passive: true });
  window.addEventListener('scroll', function () { if (window.scrollY > 30) skip(); }, { passive: true });
  window.addEventListener('keydown', function (e) { if (/^(ArrowDown|PageDown|End| )$/.test(e.key)) skip(); });
  if (btn) btn.addEventListener('click', function () {
    if (mode === 'final') replay();
    else if (mode === 'intro') skip();
  });
  links.forEach(function (a, i) {
    var on = function () {
      if (mode === 'intro' && !a.classList.contains('show')) skip();
      if (mode !== 'final') return;
      hover = i;
      if (reduce) still();
    };
    var off = function () { if (hover === i) { hover = -1; if (reduce) still(); } };
    a.addEventListener('pointerenter', on);
    a.addEventListener('pointerleave', off);
    a.addEventListener('focus', on);
    a.addEventListener('blur', off);
  });

  /* ---- start ----------------------------------------------------- */
  hero.classList.add('has-h3d');   /* the page's styles make room for the scene and lift the links over it */
  if (!layout()) { hero.classList.remove('has-h3d'); return; }
  stage.classList.add('on');
  srcs.forEach(function (sp) { sp.classList.add('on'); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { onscreen = en[0].isIntersecting; }, { threshold: 0 }).observe(hero);
  }
  var rt = null;
  var settle = function () { if (reduce) still(); else layout(); };
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(settle, 120); });
  /* the title settles after its fonts load and it slides in, so place the scene again then */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(settle);
  setTimeout(settle, 1300);
  var seen = false;
  try { seen = !!sessionStorage.getItem('rb-home-seen'); } catch (e) { /* storage blocked */ }
  setButton();
  if (reduce) { still(); return; }
  showLinks(-1);
  if (seen) { CAM = L.fin; toFinal(true); snap.cam = L.fin; }
  else CAM = L.cloud;
  requestAnimationFrame(step);
  window.HOME_HERO = { skip: skip, replay: function () { if (mode === 'final') replay(); }, mode: function () { return mode; }, time: function () { return mt; },
    view: function () { return CAM ? { s: CAM.s, fov: CAM.fov } : null; }, cloud: function () { return L.cloud.s; } };
})();
