/* ============================================================
   DEEP DIVES: THE DIVE (dive.js)
   Loaded by deep-dives.html only, after three.js and home-shapes.js.

   The page becomes a dive under water:
     - at the top, you look down at the triangle-grid coordinate plane,
       which moves gently like the surface of water. Your cursor sends
       ripples across it
     - scrolling takes you down through the surface. Under it, data
       points drift past, light comes down in soft rays, and the light
       fades from blue to deep navy the farther down you go. Low-poly
       rock reefs rise on both sides, and your cursor lights them like a
       flashlight
     - each deep dive is a stop on the way down. As you reach it, its
       shape (from home-shapes.js) gathers out of drifting triangles,
       and its question shows on the other side of the screen, with its
       title, tags, description, and link
     - a thin depth line on the right edge marks the stops and jumps
       between them, with a depth readout
     - at the bottom, the sea floor, with "Have a question worth a deep
       dive?" and the Get in touch button
   Scrolling is the browser's own: nothing takes over the mouse wheel.

   The stops come from the deep dive cards in deep-dives.html: each
   card's question (.dv-q), its data-shape, and its color (--cc). A card
   added there gets its own stop.

   If three.js cannot load, the device has no WebGL, or the device asks
   for reduced motion, this file does nothing and the page shows the
   deep dives as cards.
   ============================================================ */
(function () {
  'use strict';
  var main = document.getElementById('main');
  var head = document.querySelector('.dv-head');
  var stageEl = document.getElementById('dives');
  var cardsEl = [].slice.call(document.querySelectorAll('#dives .dv-card'));
  if (!main || !head || !stageEl || !cardsEl.length || typeof THREE === 'undefined' || !window.HOME_SHAPES) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false }); }
  catch (e) { return; }
  var root = document.documentElement;
  root.classList.add('dive');

  /* ---- EDIT: the dive ----------------------------------------- */
  var SCROLL_PER = 1;     /* screens of scrolling for each stop */
  var DEPTH = 24;         /* how far down each stop is from the last, in scene units */
  var METERS = 1.5;       /* meters per scene unit, for the depth readout */
  var SIZE = 0.52;        /* the size of each shape (1 = the home page's size) */
  var WATER_TOP = '#14364F', WATER_DEEP = '#060B12';   /* the water just under the surface, and at the floor */

  var N = cardsEl.length;
  var css = getComputedStyle(root);
  var cssColor = function (name, fallback) { return new THREE.Color((css.getPropertyValue(name) || '').trim() || fallback); };
  var BG = cssColor('--bg', '#0E1116');
  var WT = new THREE.Color(WATER_TOP), WD = new THREE.Color(WATER_DEEP);
  var clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  var smooth = function (a, b, v) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  var ease = function (x) { x = clamp(x, 0, 1); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  var lerp = function (a, b, e) { return a + (b - a) * e; };
  var seed = 3;
  var rand = function () { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  var narrow = function () { return window.innerWidth < 760 || window.innerWidth / window.innerHeight < 0.85; };
  var NARROW = narrow();

  /* 2D simplex noise, -1 to 1 (the same as the old Work journey's) */
  var perm = (function () {
    var p = [], i, j, t;
    for (i = 0; i < 256; i++) p[i] = i;
    for (i = 255; i > 0; i--) { j = Math.floor(rand() * (i + 1)); t = p[i]; p[i] = p[j]; p[j] = t; }
    return p.concat(p);
  })();
  var GR = [[1, 1], [-1, 1], [1, -1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]];
  var F2 = 0.5 * (Math.sqrt(3) - 1), G2 = (3 - Math.sqrt(3)) / 6;
  var noise = function (x, y) {
    var s = (x + y) * F2, i = Math.floor(x + s), j = Math.floor(y + s), t = (i + j) * G2;
    var x0 = x - (i - t), y0 = y - (j - t), i1 = x0 > y0 ? 1 : 0, j1 = x0 > y0 ? 0 : 1;
    var x1 = x0 - i1 + G2, y1 = y0 - j1 + G2, x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
    var ii = i & 255, jj = j & 255, n = 0, g, q;
    q = 0.5 - x0 * x0 - y0 * y0; if (q > 0) { g = GR[perm[ii + perm[jj]] & 7]; q *= q; n += q * q * (g[0] * x0 + g[1] * y0); }
    q = 0.5 - x1 * x1 - y1 * y1; if (q > 0) { g = GR[perm[ii + i1 + perm[jj + j1]] & 7]; q *= q; n += q * q * (g[0] * x1 + g[1] * y1); }
    q = 0.5 - x2 * x2 - y2 * y2; if (q > 0) { g = GR[perm[ii + 1 + perm[jj + 1]] & 7]; q *= q; n += q * q * (g[0] * x2 + g[1] * y2); }
    return 70 * n;
  };
  var fbm = function (x, y) { return noise(x, y) * 0.6 + noise(x * 2.1, y * 2.1) * 0.28 + noise(x * 4.3, y * 4.3) * 0.12; };

  /* ---- the stops ---------------------------------------------- */
  var FLOOR = -DEPTH * (N + 1);   /* the sea floor */
  var stops = cardsEl.map(function (el, i) {
    var cc = (getComputedStyle(el).getPropertyValue('--cc') || '').trim();
    var q = el.querySelector('.dv-q'), h2 = el.querySelector('h2');
    if (q && h2 && q.textContent.trim() === h2.textContent.trim()) el.classList.add('dv-same');   /* the title is the question: show it once */
    el.setAttribute('data-side', i % 2 ? 'right' : 'left');   /* the side the text sits on; the shape takes the other */
    return { el: el, y: -DEPTH * (i + 1), side: i % 2 ? -1 : 1, col: new THREE.Color(cc || '#75AADB'),
      href: el.tagName === 'A' ? el.getAttribute('href') : null, shape: el.getAttribute('data-shape') };
  });

  /* ---- the scene ---------------------------------------------- */
  var stage3d = document.createElement('div');
  stage3d.className = 'dive-stage';
  stage3d.setAttribute('aria-hidden', 'true');
  main.insertBefore(stage3d, main.firstChild);
  var DPR = Math.min(window.devicePixelRatio || 1, 1.5);   /* drops to 1 on its own if the device runs slow */
  renderer.setPixelRatio(DPR);
  stage3d.appendChild(renderer.domElement);
  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(BG, 30, 120);
  var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 260);

  /* the surface: the triangle grid, moving like water. The waves and ripples are worked out on the
     graphics card, so the grid itself never changes */
  var GS = 1.2, GX0 = -36, GX1 = 36, GZ0 = -72, GZ1 = 18, seg = [];
  for (var gx = GX0; gx <= GX1 + 1e-6; gx += GS) for (var gz = GZ0; gz < GZ1 - 1e-6; gz += GS) seg.push(gx, 0, gz, gx, 0, gz + GS);
  for (gz = GZ0; gz <= GZ1 + 1e-6; gz += GS) for (gx = GX0; gx < GX1 - 1e-6; gx += GS) seg.push(gx, 0, gz, gx + GS, 0, gz);
  for (gx = GX0; gx < GX1 - 1e-6; gx += GS) for (gz = GZ0; gz < GZ1 - 1e-6; gz += GS) seg.push(gx, 0, gz + GS, gx + GS, 0, gz);
  var ripples = [new THREE.Vector4(0, 0, -99, 0), new THREE.Vector4(0, 0, -99, 0), new THREE.Vector4(0, 0, -99, 0), new THREE.Vector4(0, 0, -99, 0)];
  var waveGL = [
    'uniform float uTime; uniform vec4 uRip[4];',
    'float waveAt(vec2 p){',
    '  float h = 0.20 * sin(p.x * 0.33 + uTime * 0.9) + 0.15 * sin(p.y * 0.41 - uTime * 0.7) + 0.08 * sin((p.x + p.y) * 0.8 + uTime * 1.3);',
    '  for (int i = 0; i < 4; i++) {',
    '    float age = uTime - uRip[i].z;',
    '    if (age > 0.0 && age < 4.0) {',
    '      float d = distance(p, uRip[i].xy);',
    '      h += uRip[i].w * 0.55 * sin(d * 1.5 - age * 5.0) * exp(-age * 0.9) * exp(-d * 0.1) * smoothstep(age * 4.5 + 1.5, age * 4.5 - 1.0, d);',
    '    }',
    '  }',
    '  return h;',
    '}'].join('\n');
  var surfU = { uTime: { value: 0 }, uRip: { value: ripples }, uColor: { value: new THREE.Color(0x3E5A72) }, uHi: { value: new THREE.Color(0x9FD3EE) },
    uOpacity: { value: 0.7 }, uNear: { value: 30 }, uFar: { value: 110 } };
  var surfGeo = new THREE.BufferGeometry();
  surfGeo.setAttribute('position', new THREE.Float32BufferAttribute(seg, 3));
  var surface = new THREE.LineSegments(surfGeo, new THREE.ShaderMaterial({
    uniforms: surfU, transparent: true, depthWrite: false,
    vertexShader: waveGL + '\nvarying float vH; varying float vD;\nvoid main(){ vec3 q = position; float h = waveAt(q.xz); q.y += h; vH = h; vec4 mv = modelViewMatrix * vec4(q, 1.0); vD = -mv.z; gl_Position = projectionMatrix * mv; }',
    fragmentShader: 'uniform vec3 uColor, uHi; uniform float uOpacity, uNear, uFar; varying float vH; varying float vD;\nvoid main(){ vec3 c = mix(uColor, uHi, clamp(vH * 1.6 + 0.25, 0.0, 1.0)); gl_FragColor = vec4(c, uOpacity * (1.0 - smoothstep(uNear, uFar, vD))); }'
  }));
  surface.frustumCulled = false;
  scene.add(surface);
  /* a faint sheet of water under the grid lines: dark from above, glowing from below */
  var sheetGeo = new THREE.PlaneGeometry(GX1 - GX0, GZ1 - GZ0, 60, 75);
  sheetGeo.rotateX(-Math.PI / 2);
  sheetGeo.translate(0, -0.02, (GZ0 + GZ1) / 2);
  var sheetU = { uTime: surfU.uTime, uRip: surfU.uRip, uColor: { value: new THREE.Color(0x1B4E6E) }, uOpacity: { value: 0.18 }, uNear: surfU.uNear, uFar: surfU.uFar };
  var sheet = new THREE.Mesh(sheetGeo, new THREE.ShaderMaterial({
    uniforms: sheetU, transparent: true, depthWrite: false, side: THREE.DoubleSide,
    vertexShader: waveGL + '\nvarying float vD; varying float vH;\nvoid main(){ vec3 q = position; float h = waveAt(q.xz); q.y += h; vH = h; vec4 mv = modelViewMatrix * vec4(q, 1.0); vD = -mv.z; gl_Position = projectionMatrix * mv; }',
    fragmentShader: 'uniform vec3 uColor; uniform float uOpacity, uNear, uFar; varying float vD; varying float vH;\nvoid main(){ gl_FragColor = vec4(uColor * (1.0 + vH * 0.8), uOpacity * (1.0 - smoothstep(uNear, uFar, vD))); }'
  }));
  sheet.frustumCulled = false;
  scene.add(sheet);

  /* drifting data points: small dots in the site's code colors, slowly rising */
  var PCOUNT = NARROW ? 700 : 1300, ptop = -0.6, pbot = FLOOR + 2;
  var pp = new Float32Array(PCOUNT * 3), pc = new Float32Array(PCOUNT * 3), ps = new Float32Array(PCOUNT);
  var palette = ['--blue', '--blue', '--teal', '--teal', '--green', '--violet', '--amber'].map(function (n) { return cssColor(n, '#75AADB'); });
  for (var k = 0; k < PCOUNT; k++) {
    pp[k * 3] = (rand() * 2 - 1) * 22; pp[k * 3 + 1] = lerp(pbot, ptop, rand()); pp[k * 3 + 2] = lerp(-40, 12, rand());
    var cl = palette[Math.floor(rand() * palette.length)];
    pc[k * 3] = cl.r; pc[k * 3 + 1] = cl.g; pc[k * 3 + 2] = cl.b; ps[k] = rand();
  }
  var ptGeo = new THREE.BufferGeometry();
  ptGeo.setAttribute('position', new THREE.BufferAttribute(pp, 3));
  ptGeo.setAttribute('color', new THREE.BufferAttribute(pc, 3));
  ptGeo.setAttribute('seed', new THREE.BufferAttribute(ps, 1));
  var ptU = { uTime: surfU.uTime, uScale: { value: 400 }, uTop: { value: ptop }, uSpan: { value: ptop - pbot }, uOpacity: { value: 0.8 }, uFar: { value: 60 } };
  var points = new THREE.Points(ptGeo, new THREE.ShaderMaterial({
    uniforms: ptU, transparent: true, depthWrite: false, vertexColors: true,
    vertexShader: [
      'attribute float seed; uniform float uTime, uScale, uTop, uSpan; varying vec3 vC; varying float vD; varying float vTw;',
      'void main(){',
      '  vec3 p = position;',
      '  p.y = uTop - mod(uTop - p.y - uTime * (0.12 + seed * 0.25), uSpan);',   /* rising slowly, starting again at the bottom */
      '  p.x += sin(uTime * 0.3 + seed * 6.283) * 0.8;',
      '  vC = color; vTw = 0.65 + 0.35 * sin(uTime * (0.6 + seed) + seed * 40.0);',
      '  vec4 mv = modelViewMatrix * vec4(p, 1.0); vD = -mv.z;',
      '  gl_PointSize = (0.06 + seed * 0.08) * uScale / vD;',
      '  gl_Position = projectionMatrix * mv;',
      '}'].join('\n'),
    fragmentShader: 'uniform float uOpacity, uFar; varying vec3 vC; varying float vD; varying float vTw;\nvoid main(){ float r = length(gl_PointCoord - 0.5); gl_FragColor = vec4(vC, uOpacity * vTw * smoothstep(0.5, 0.1, r) * (1.0 - smoothstep(uFar * 0.4, uFar, vD))); }'
  }));
  points.frustumCulled = false;
  scene.add(points);

  /* light coming down from the surface in soft rays */
  var rays = [], rayU = { uTime: surfU.uTime, uOpacity: { value: 0 } };
  for (var r = 0; r < 7; r++) {
    var w = 2.5 + rand() * 4;
    var rg = new THREE.PlaneGeometry(w, 70, 1, 1);
    rg.translate(0, -35, 0);
    var rm = new THREE.Mesh(rg, new THREE.ShaderMaterial({
      uniforms: { uTime: rayU.uTime, uOpacity: rayU.uOpacity, uSeed: { value: rand() * 10 } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: 'uniform float uTime, uOpacity, uSeed; varying vec2 vUv;\nvoid main(){ float edge = smoothstep(0.0, 0.5, vUv.x) * smoothstep(1.0, 0.5, vUv.x); float a = pow(vUv.y, 2.4) * edge * (0.6 + 0.4 * sin(uTime * 0.5 + uSeed)); gl_FragColor = vec4(vec3(0.62, 0.86, 1.0), a * uOpacity); }'
    }));
    rm.position.set((rand() * 2 - 1) * 16, 0, lerp(-30, -4, rand()));
    rm.rotation.z = (rand() - 0.5) * 0.5;
    rm.userData.sway = rand() * 6;
    rm.frustumCulled = false;
    rays.push(rm);
    scene.add(rm);
  }

  /* rock: reefs on both sides, and the sea floor, low-poly like the old Work journey's hills */
  var rockMat = new THREE.MeshStandardMaterial({ color: 0x16212C, roughness: 0.95, metalness: 0, flatShading: true, side: THREE.DoubleSide });
  var grid = function (nu, nv, at) {   /* a sheet of nu x nv points placed by at(u, v), cut into triangles */
    var pos = [], idx = [], i, j;
    for (j = 0; j <= nv; j++) for (i = 0; i <= nu; i++) { var q = at(i / nu, j / nv); pos.push(q[0], q[1], q[2]); }
    for (j = 0; j < nv; j++) for (i = 0; i < nu; i++) {
      var a = j * (nu + 1) + i, b = a + 1, c = a + nu + 1, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g = g.toNonIndexed();
    g.computeVertexNormals();   /* one normal per triangle: the faceted look */
    return g;
  };
  var wallX = NARROW ? 9.5 : 12.5;
  [-1, 1].forEach(function (s) {
    var g = grid(36, 70, function (u, v) {
      var z = lerp(-48, 18, u), y = lerp(-5, FLOOR - 4, v);
      var x = wallX + 4 * fbm(y * 0.06 + s * 9, z * 0.07) + 2.4 * Math.pow(1 - Math.abs(noise(y * 0.1 + s * 3, z * 0.09)), 2) + Math.max(0, -z - 20) * 0.35;
      x += smooth(-8, -1, y) * 14;   /* the reefs fall away near the surface, so the water is open there */
      return [s * x, y, z];
    });
    scene.add(new THREE.Mesh(g, rockMat));
  });
  var floor = new THREE.Mesh(grid(50, 44, function (u, v) {
    var x = lerp(-40, 40, u), z = lerp(-60, 18, v);
    var y = FLOOR + 2.6 * fbm(x * 0.07, z * 0.07) + smooth(8, 24, Math.abs(x)) * 6 * (0.6 + 0.4 * noise(x * 0.05, z * 0.05));
    return [x, y, z];
  }), rockMat);
  scene.add(floor);
  /* light: from the surface above (fading with depth), your cursor's flashlight, and each stop's color */
  var hemi = new THREE.HemisphereLight(0x5FA8C8, 0x05080D, 0.65);
  var sun = new THREE.DirectionalLight(0xBFE6FF, 0.7);
  sun.position.set(-6, 20, 8);
  var torch = new THREE.PointLight(0x9FE0FF, 2.4, 30, 1.6);
  var glow = new THREE.PointLight(0xFFFFFF, 0, 22, 1.4);
  scene.add(hemi, sun, sun.target, torch, glow);

  /* the shapes, one per stop, gathered out of drifting triangles */
  var HS = window.HOME_SHAPES, S = HS.S, SH = HS.H;
  stops.forEach(function (st, si) {
    var make = HS.make[st.shape] || HS.make.ball, tiles = make();
    var lo = Infinity, hi = -Infinity;
    tiles.forEach(function (t) { lo = Math.min(lo, t.x0); hi = Math.max(hi, t.x0 + S); });
    var mid = (lo + hi) / 2;
    st.hw = (hi - lo) / 2;
    var order = tiles.slice().sort(function (a, b) { return (a.cy + rand() * 2) - (b.cy + rand() * 2); });
    st.tiles = order.map(function (t, j) {
      var mx = t.x0 + (t.v[0][0] + t.v[1][0] + t.v[2][0]) / 3, my = t.y0 + (t.v[0][1] + t.v[1][1] + t.v[2][1]) / 3;
      var ang = rand() * Math.PI * 2, el = (rand() - 0.5) * 1.6, rr = 4 + rand() * 7;
      return {
        cx: (mx - mid) * SIZE, cy: (my - SH / 2) * SIZE,     /* its center in the finished shape */
        v: t.v.map(function (p) { return [(t.x0 + p[0] - mx) * 0.86 * SIZE, (t.y0 + p[1] - my) * 0.86 * SIZE]; }),   /* its corners, around its center */
        rgb: t.rgb, delay: (j / order.length) * 0.9 + rand() * 0.2,
        off: [Math.cos(ang) * rr, Math.sin(el) * rr, Math.sin(ang) * rr * 0.6 - 2], ph: rand() * 6.283, spin: (rand() - 0.5) * 3
      };
    });
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(st.tiles.length * 9), 3));
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(st.tiles.length * 9), 3));
    var col = g.attributes.color.array;
    st.tiles.forEach(function (t, j) { for (var vv = 0; vv < 3; vv++) { col[j * 9 + vv * 3] = t.rgb[0]; col[j * 9 + vv * 3 + 1] = t.rgb[1]; col[j * 9 + vv * 3 + 2] = t.rgb[2]; } });
    st.geo = g;
    st.mesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, fog: true }));
    st.mesh.frustumCulled = false;
    scene.add(st.mesh);
    st.pos = new THREE.Vector3();
  });
  var placeShape = function (st, a, t) {   /* a: 0 = scattered, 1 = gathered */
    var arr = st.geo.attributes.position.array, yaw = 0.16 * Math.sin(t * 0.4 + st.y), cy = Math.cos(yaw), sy = Math.sin(yaw);
    var bob = 0.15 * Math.sin(t * 0.8 + st.y);
    st.tiles.forEach(function (tl, j) {
      var q = clamp((a * 1.6 - tl.delay) / 0.7, 0, 1), e = ease(q);
      var drift = 1 - e, wob = t * 0.25 + tl.ph;
      var ox = tl.off[0] + Math.sin(wob) * 0.8, oy = tl.off[1] + Math.cos(wob * 0.8) * 0.8, oz = tl.off[2];
      var x = tl.cx + ox * drift, y = tl.cy + oy * drift + bob, z = oz * drift;
      var sc = 0.3 + 0.7 * e, spin = tl.spin * drift, cs = Math.cos(spin), sn = Math.sin(spin);
      for (var vv = 0; vv < 3; vv++) {
        var px = tl.v[vv][0] * sc, py = tl.v[vv][1] * sc;
        var rx = px * cs - py * sn, ry = px * sn + py * cs;
        var X = x + rx, Z = z;
        arr[j * 9 + vv * 3] = st.pos.x + X * cy + Z * sy;
        arr[j * 9 + vv * 3 + 1] = st.pos.y + y + ry;
        arr[j * 9 + vv * 3 + 2] = st.pos.z - X * sy + Z * cy;
      }
    });
    st.geo.attributes.position.needsUpdate = true;
  };

  /* ---- scrolling sets how deep you are ------------------------------ */
  var VH = 1, VW = 1, T = 0, segPx = 1, spots = [];
  var measure = function () {
    VH = window.innerHeight; VW = window.innerWidth;
    segPx = SCROLL_PER * VH;
    /* the stops' text sits under the page title (see deep-dives.html), so it is in place when it
       fades in; the first stop is one screen down, and the floor one screen past the last stop */
    stageEl.style.height = Math.round(VH + N * segPx + VH * 0.3) + 'px';
    T = stageEl.getBoundingClientRect().top + window.scrollY;
    spots = [T];
    for (var i = 0; i < N; i++) spots.push(T + VH + i * segPx);
    spots.push(T + VH + N * segPx);   /* the floor */
  };
  var REST = 0.2;
  var target = function (y) {   /* 0 = the surface, 1 to N = the stops, N + 1 = the floor */
    if (y <= spots[1] - segPx * REST) return smooth(0, spots[1] - segPx * REST, y);
    for (var i = 1; i <= N; i++) {
      var a = spots[i] + segPx * REST, b = spots[i + 1] - (i < N ? segPx * REST : 0);
      if (y < a) return i;
      if (y < b) return i + smooth(a, b, y);
    }
    return N + 1;
  };

  /* ---- the camera at each depth ---------------------------------- */
  var CZ = 15;
  var shapeAt = function (st) {   /* where each shape floats: beside the text, or above it on a phone */
    if (NARROW) st.pos.set(0, st.y + 2.6, 0);
    else st.pos.set(st.side * 4.1, st.y, 0);
  };
  var camAt = function (p) {   /* where the camera is and how far it looks down, for depth p */
    var ys = [5.5], xs = [0], pitch = [-0.42];
    stops.forEach(function (st) { ys.push(st.y + (NARROW ? -0.6 : 0)); xs.push(NARROW ? 0 : -st.side * 1.2); pitch.push(0); });
    ys.push(FLOOR + 7.5); xs.push(0); pitch.push(-0.3);
    var i = Math.min(N, Math.floor(p)), f = p - i, e = ease(f);
    var dip = i > 0 && i < N + 1 ? -0.16 * Math.sin(Math.PI * f) : 0;   /* look down a little while descending */
    return { x: lerp(xs[i], xs[i + 1], e), y: lerp(ys[i], ys[i + 1], e), pitch: lerp(pitch[i], pitch[i + 1], e) + dip };
  };
  var layout = function () {
    VW = window.innerWidth; VH = window.innerHeight;
    renderer.setSize(VW, VH, false);
    camera.aspect = VW / VH;
    /* on a phone, step back far enough that the shape fits across the screen */
    var tanH = Math.tan(22.5 * Math.PI / 180);
    CZ = NARROW ? Math.max(15, (7.4 * 1.15 / camera.aspect) / (2 * tanH))
      : Math.max(15, 9.6 / (tanH * camera.aspect));   /* on a narrower computer screen, back up so the shape fits beside the text */
    camera.updateProjectionMatrix();
    ptU.uScale.value = VH * DPR * 0.5;
    stops.forEach(shapeAt);
  };

  /* ---- the cursor: ripples on the surface, a flashlight below it ------- */
  var mx = 0, my = 0, tx = 0, ty = 0, pointer = false, cxp = -1, cyp = -1, lastRip = 0, ripI = 0, now0 = 0;
  var ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), V = new THREE.Vector3();
  var ripple = function (strength) {
    if (camera.position.y < 0.5) return;
    ndc.set(cxp / VW * 2 - 1, -(cyp / VH * 2 - 1));
    ray.setFromCamera(ndc, camera);
    var d = ray.ray.direction, o = ray.ray.origin;
    if (d.y >= -0.01) return;
    var t = -o.y / d.y;
    ripples[ripI].set(o.x + d.x * t, o.z + d.z * t, surfU.uTime.value, strength);
    ripI = (ripI + 1) % ripples.length;
  };
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    pointer = true; cxp = e.clientX; cyp = e.clientY;
    tx = e.clientX / VW - 0.5; ty = e.clientY / VH - 0.5;
    if (now0 - lastRip > 0.35) { lastRip = now0; ripple(0.6); }
  }, { passive: true });
  document.addEventListener('pointerdown', function (e) {
    cxp = e.clientX; cyp = e.clientY;
    if (!e.target.closest('a, button')) ripple(1.4);
  });

  /* a shape you can open: only a live deep dive's, while you are at its stop */
  var hoverI = -1;
  var shapeOnScreen = function (st) {
    var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) {
      V.set(st.pos.x + c[0] * st.hw * SIZE, st.pos.y + c[1] * SH / 2 * SIZE, st.pos.z).project(camera);
      var sx = (V.x + 1) / 2 * VW, sy = (1 - V.y) / 2 * VH;
      x0 = Math.min(x0, sx); x1 = Math.max(x1, sx); y0 = Math.min(y0, sy); y1 = Math.max(y1, sy);
    });
    return [x0, y0, x1, y1];
  };
  var pick = function (p) {
    if (!pointer || cxp < 0) return -1;
    var i = Math.round(p) - 1;
    if (i < 0 || i >= N || Math.abs(p - (i + 1)) > 0.25 || !stops[i].href) return -1;
    var b = shapeOnScreen(stops[i]);
    return cxp >= b[0] && cxp <= b[2] && cyp >= b[1] && cyp <= b[3] ? i : -1;
  };
  document.addEventListener('click', function (e) {
    if (hoverI < 0 || e.defaultPrevented || e.target.closest('a, button, input, label')) return;
    window.location.href = stops[hoverI].href;
  });

  /* ---- the depth line on the right edge ------------------------------- */
  var rail = document.createElement('nav');
  rail.className = 'dive-rail';
  rail.setAttribute('aria-label', 'Deep dives on this page');
  var readout = document.createElement('p');   /* the depth, in the bottom right corner */
  readout.className = 'dive-depth';
  readout.setAttribute('aria-hidden', 'true');
  document.body.appendChild(readout);
  var marks = stops.map(function (st, i) {
    var a = document.createElement('a');
    a.href = '#' + st.el.id;
    a.style.setProperty('--cc', '#' + st.col.getHexString());
    a.innerHTML = '<span class="dr-dot" aria-hidden="true"></span><span class="dr-name"></span>';
    a.querySelector('.dr-name').textContent = st.el.querySelector('h2').textContent.trim();
    rail.appendChild(a);
    return a;
  });
  document.body.appendChild(rail);
  var jump = function (k, instant) {   /* k: 1 to N for the stops */
    window.scrollTo({ top: spots[k], behavior: instant ? 'instant' : 'smooth' });   /* 'instant', since the page's smooth scrolling would otherwise apply */
  };
  var indexOfId = function (id) { for (var i = 0; i < N; i++) if (stops[i].el.id === id) return i; return -1; };
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var i = indexOfId(a.getAttribute('href').slice(1));
    if (i < 0) return;
    e.preventDefault();
    jump(i + 1);
    history.replaceState(null, '', '#' + stops[i].el.id);
  });

  /* ---- the text of each stop ------------------------------------------ */
  var lastActive = -2;
  var text = function (p) {
    var active = -1;
    stops.forEach(function (st, i) {
      var k = 1 - Math.abs(p - (i + 1)) / 0.36;
      k = k <= 0 ? 0 : k * k * (3 - 2 * k);
      if (k > 0.5) active = i;
      st.el.style.opacity = k.toFixed(3);
      st.el.style.visibility = k > 0.02 ? 'visible' : 'hidden';   /* hidden text is also skipped by the keyboard */
      st.el.style.setProperty('--dv-y', ((1 - k) * (p < i + 1 ? 30 : -30)).toFixed(1) + 'px');
    });
    if (active !== lastActive) {
      lastActive = active;
      marks.forEach(function (a, j) { a.classList.toggle('is-active', j === active); });
    }
    rail.classList.toggle('on', p > 0.45 && p < N + 0.7);
    readout.classList.toggle('on', p > 0.25 && p < N + 0.7);
  };

  /* ---- each frame -------------------------------------------------- */
  var p = 0, t0 = null, last = null, onscreen = true, slow = [];
  var water = new THREE.Color(), tint = new THREE.Color();
  var frame = function (now) {
    requestAnimationFrame(frame);
    if (!onscreen || document.hidden) { last = null; return; }
    if (t0 === null) t0 = now;
    var dt = last === null ? 0.016 : Math.min(0.05, (now - last) / 1000);
    /* if frames keep running slow, draw at ordinary resolution so scrolling stays smooth */
    if (last !== null && DPR > 1) {
      slow.push(dt);
      if (slow.length > 60) {
        slow.sort(function (a, b) { return a - b; });
        if (slow[30] > 0.028) { DPR = 1; renderer.setPixelRatio(1); renderer.setSize(VW, VH, false); ptU.uScale.value = VH * 0.5; }
        slow = [];
      }
    }
    last = now;
    var t = (now - t0) / 1000;
    now0 = t;
    surfU.uTime.value = t;
    var goal = target(window.scrollY);
    p += (goal - p) * (1 - Math.exp(-dt / 0.16));   /* the camera glides after the scroll */

    var cam = camAt(p);
    mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
    camera.position.set(cam.x + mx * 0.8, cam.y - my * 0.4, CZ);
    camera.lookAt(cam.x + mx * 0.4, cam.y + Math.tan(cam.pitch) * CZ - my * 0.2, 0);
    camera.updateMatrixWorld();

    /* the water: its color, how far you can see, and the light, all by depth */
    var y = camera.position.y, under = smooth(0.8, -0.8, y), deep = smooth(-2, FLOOR, y);
    water.copy(WT).lerp(WD, deep);
    tint.copy(BG).lerp(water, under);
    renderer.setClearColor(tint, 1);
    scene.fog.color.copy(tint);
    scene.fog.near = lerp(30, 6, under);
    scene.fog.far = lerp(130, lerp(62, 44, deep), under);
    surfU.uNear.value = lerp(30, 4, under); surfU.uFar.value = lerp(110, 60, under);
    surfU.uOpacity.value = lerp(0.7, 0.55, under);
    sheetU.uOpacity.value = lerp(0.55, 0.4, under);   /* from above, dark water that hides most of what is below */
    hemi.intensity = lerp(0.65, 0.12, deep);
    sun.intensity = lerp(0.5, 0.04, deep);
    rayU.uOpacity.value = 0.16 * under * (1 - smooth(0.1, 0.7, deep));
    rays.forEach(function (rm) { rm.rotation.y = 0.25 * Math.sin(t * 0.15 + rm.userData.sway); });
    ptU.uOpacity.value = lerp(0.35, 0.85, under);

    /* the flashlight: where your line of sight meets the reefs, the floor, or the far water */
    ndc.set(pointer ? cxp / VW * 2 - 1 : 0.25 * Math.sin(t * 0.3), pointer ? -(cyp / VH * 2 - 1) : -0.1);
    ray.setFromCamera(ndc, camera);
    var o = ray.ray.origin, d = ray.ray.direction, hit = 26;
    if (Math.abs(d.x) > 1e-3) hit = Math.min(hit, (Math.sign(d.x) * (wallX - 1) - o.x) / d.x);
    if (d.y < -1e-3) hit = Math.min(hit, (o.y - FLOOR - 1.5) / -d.y);
    hit = Math.max(4, hit - 1.5);
    torch.position.set(o.x + d.x * hit, o.y + d.y * hit, o.z + d.z * hit);
    torch.intensity = 2.4 * under;

    /* the shapes, and the glow of the stop you are at */
    var near = -1, nearK = 0;
    stops.forEach(function (st, i) {
      var dist = Math.abs(p - (i + 1));
      st.mesh.visible = dist < 1.4;
      if (!st.mesh.visible) return;
      var a = smooth(1.1, 0.3, dist);
      placeShape(st, a, t);
      if (1 - dist > nearK) { nearK = 1 - dist; near = i; }
    });
    if (near >= 0) {
      var stn = stops[near];
      glow.color.copy(stn.col);
      glow.position.set(stn.pos.x * 0.6, stn.pos.y + 1, 4);
      glow.intensity = 2.2 * smooth(0, 1, nearK);
    } else glow.intensity = 0;

    hoverI = pick(p);
    document.body.style.cursor = hoverI >= 0 ? 'pointer' : '';
    readout.textContent = 'Depth ' + Math.max(0, Math.round(-y * METERS)) + ' m';
    text(p);
    renderer.render(scene, camera);
  };

  var resize = function () { NARROW = narrow(); measure(); layout(); };
  var rt = null;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 120); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { onscreen = en[0].isIntersecting; }, { threshold: 0 }).observe(stage3d);
  }
  resize();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  /* arriving with a link like deep-dives.html#coaches goes straight to that stop */
  var goHash = function () {
    var i = indexOfId((window.location.hash || '').slice(1));
    if (i < 0) return false;
    measure(); jump(i + 1, true); p = i + 1;
    return true;
  };
  if (window.location.hash && indexOfId(window.location.hash.slice(1)) >= 0) {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    goHash();
    window.addEventListener('load', function () { setTimeout(goHash, 30); });   /* after the browser's own jump to the anchor */
  } else if (window.scrollY > 0) {
    p = target(window.scrollY);
  }
  window.addEventListener('hashchange', goHash);
  text(p);
  requestAnimationFrame(frame);
  /* for testing */
  window.DIVE = { at: function () { return p; }, spots: function () { return spots.slice(); }, hover: function () { return hoverI; },
    shape: function (i) { return shapeOnScreen(stops[i]); }, depth: function () { return readout.textContent; },
    snap: function () { p = target(window.scrollY); },
    ripples: function () { return ripples.filter(function (r) { return surfU.uTime.value - r.z < 4; }).length; } };
})();
