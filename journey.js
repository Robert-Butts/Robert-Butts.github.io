/* ============================================================
   WORK PAGE JOURNEY (journey.js)
   Loaded by work.html only, after three.js and before work.js.

   The Work page as a trip forward through the projects:
     - you start on a flat 3D coordinate plane: a floor grid of squares,
       each cut into two right triangles, with the axes drawn in
     - scrolling moves you forward along the z axis; past the start, the
       plane rises into dark, faceted rock on both sides of the path
     - each project floats beside the path as a soft-edged, gently curved
       picture, lit in the project's own color; its title, description,
       and links appear on the other side of the screen while you are there
     - your cursor lights up the rock under it, in the color of the
       project you are nearest (on a phone the light wanders on its own,
       and a tap moves it)
     - clicking a project's picture opens the project, like its first button
   The project text, links, and colors all come from the scene blocks in
   work.html, so a project added there gets its own stop on the path.

   Each project's picture comes from data-jr-img on its scene. Pictures
   from other sites (like Tableau Public) cannot be used in 3D, so LEGO and
   NBA point to images/work/lego.png and images/work/nba.png. Until those
   files exist, a simple title card in the project's color stands in.

   If three.js cannot load, the device has no WebGL, or the device asks for
   reduced motion, this file does nothing and work.js shows the page as a
   regular scroll, one project per screen.
   ============================================================ */
(function () {
  'use strict';
  var main = document.getElementById('main');
  var stageEl = document.getElementById('stage');
  var head = document.querySelector('.work-head');
  var scenes = [].slice.call(document.querySelectorAll('#stage .scene'));
  if (!main || !stageEl || !head || !scenes.length || typeof THREE === 'undefined') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' }); }
  catch (e) { return; }
  window.WORK_JOURNEY = true;   /* tells work.js to stand aside */
  var root = document.documentElement;
  root.classList.add('jr');

  /* ---- EDIT: the journey ---------------------------------------- */
  var STEP = 46;           /* distance between projects, in scene units */
  var SCROLL_PER = 1.5;    /* screens of scrolling for each project */
  var LIGHT = 2.8;         /* how bright the cursor light is */
  var START_BLUE = '#75AADB';   /* the light's color on the open plane, before the first project */

  var N = scenes.length;
  var narrow = function () { return window.innerWidth < 760 || window.innerWidth / window.innerHeight < 0.85; };
  var NARROW = narrow();
  var css = getComputedStyle(root);
  var bgHex = (css.getPropertyValue('--bg') || '').trim() || '#0E1116';
  var BG = new THREE.Color(bgHex);
  var colorOfScene = function (el) {
    var v = (getComputedStyle(el).getPropertyValue('--cc') || '').trim();
    if (!/^#|^rgb/.test(v)) v = (css.getPropertyValue('--' + el.getAttribute('data-cc')) || '').trim();
    return new THREE.Color(v || START_BLUE);
  };
  var smooth = function (a, b, v) { var t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };

  /* ---- noise, for the rock ------------------------------------- */
  var perm = new Uint8Array(512);
  (function () {
    var p = [], s = 1234567, i, j, t;
    for (i = 0; i < 256; i++) p[i] = i;
    for (i = 255; i > 0; i--) { s = (s * 16807) % 2147483647; j = s % (i + 1); t = p[i]; p[i] = p[j]; p[j] = t; }
    for (i = 0; i < 512; i++) perm[i] = p[i & 255];
  })();
  var GR = [[1, 1], [-1, 1], [1, -1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]];
  var F2 = 0.5 * (Math.sqrt(3) - 1), G2 = (3 - Math.sqrt(3)) / 6;
  var noise = function (x, y) {   /* 2D simplex noise, -1 to 1 */
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
  /* the ground's height: flat at the start (the coordinate plane), then rising into rock
     on both sides of a clear path down the middle */
  var height = function (x, z) {
    var amp = smooth(-6, -40, z);
    if (amp <= 0) return 0;
    var ax = Math.abs(x);
    var wall = smooth(5.5, 21, ax);
    var hills = wall * (5 + 8 * (fbm(x * 0.045, z * 0.04) * 0.5 + 0.5));
    var ridge = 1 - Math.abs(noise(x * 0.09 + 7, z * 0.08));
    var crags = wall * ridge * ridge * 3.4;
    var far = smooth(26, 64, ax) * 10 * (0.6 + 0.4 * noise(x * 0.02, z * 0.03));
    var floor = 0.4 * fbm(x * 0.12, z * 0.12) * (1 - wall);
    return amp * (hills + crags + far + floor);
  };

  /* ---- the scene --------------------------------------------------- */
  var stage3d = document.createElement('div');
  stage3d.className = 'jr-stage';
  stage3d.setAttribute('aria-hidden', 'true');
  main.insertBefore(stage3d, main.firstChild);
  var DPR = Math.min(window.devicePixelRatio || 1, 1.5);   /* drops to 1 on its own if the device runs slow */
  renderer.setPixelRatio(DPR);
  renderer.setClearColor(BG, 1);
  stage3d.appendChild(renderer.domElement);
  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(BG, 0.017);
  var camera = new THREE.PerspectiveCamera(NARROW ? 62 : 52, 1, 0.1, 400);

  scene.add(new THREE.HemisphereLight(0x2a3a55, 0x050608, 0.55));   /* faint moonlight from above */
  var moon = new THREE.DirectionalLight(0xa9bcdf, 0.32);
  moon.position.set(-30, 40, 10);
  scene.add(moon);
  var cursorLight = new THREE.PointLight(0x75aadb, LIGHT, 26, 1.6);
  scene.add(cursorLight);
  /* one light for the picture you are nearest: its color spills onto the rock below it */
  var glow = new THREE.PointLight(0x75aadb, 0, 20, 2);
  scene.add(glow);

  /* the ground: one sheet of triangles, drawn solid and again as a lit wire grid */
  var CELL = NARROW ? 2.6 : 2, W = 72, Z0 = 22, Z1 = -(N + 1) * STEP - 90;
  var nx = Math.ceil(2 * W / CELL), nz = Math.ceil((Z0 - Z1) / CELL);
  var H = new Float32Array((nx + 1) * (nz + 1));
  for (var gi = 0; gi <= nx; gi++) for (var gk = 0; gk <= nz; gk++) H[gi * (nz + 1) + gk] = height(-W + gi * CELL, Z0 - gk * CELL);
  var tpos = new Float32Array(nx * nz * 18), o = 0;
  var vtx = function (i, k) { tpos[o++] = -W + i * CELL; tpos[o++] = H[i * (nz + 1) + k]; tpos[o++] = Z0 - k * CELL; };
  for (gi = 0; gi < nx; gi++) for (gk = 0; gk < nz; gk++) {
    /* the same diagonal as the other pages' grids */
    vtx(gi, gk); vtx(gi + 1, gk); vtx(gi + 1, gk + 1);
    vtx(gi, gk); vtx(gi + 1, gk + 1); vtx(gi, gk + 1);
  }
  var groundGeo = new THREE.BufferGeometry();
  groundGeo.setAttribute('position', new THREE.BufferAttribute(tpos, 3));
  groundGeo.computeVertexNormals();   /* one normal per triangle: the faceted look */
  scene.add(new THREE.Mesh(groundGeo, new THREE.MeshStandardMaterial({
    color: 0x1a2028, roughness: 0.95, metalness: 0, flatShading: true,
    polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1
  })));
  scene.add(new THREE.Mesh(groundGeo, new THREE.MeshLambertMaterial({
    color: 0x55647c, emissive: 0x0e141c, wireframe: true, transparent: true, opacity: 0.6
  })));

  /* the axes: the z axis is the path you travel; the x axis crosses where you start */
  var axisMat = new THREE.LineBasicMaterial({ color: 0x6d80a0, transparent: true, opacity: 0.9 });
  var zpts = [];
  for (var z = Z0; z >= Z1; z -= 1) zpts.push(new THREE.Vector3(0, height(0, z) + 0.05, z));
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(zpts), axisMat));
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-W, 0.05, 0), new THREE.Vector3(W, 0.05, 0)]), axisMat));
  var ticks = [];
  for (z = 20; z >= -6; z -= 4) ticks.push(new THREE.Vector3(-0.35, 0.05, z), new THREE.Vector3(0.35, 0.05, z));
  for (var x = -24; x <= 24; x += 4) if (x) ticks.push(new THREE.Vector3(x, 0.05, -0.35), new THREE.Vector3(x, 0.05, 0.35));
  scene.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(ticks), axisMat));

  /* drifting dust in the air */
  var DUST = NARROW ? 420 : 900, dpos = new Float32Array(DUST * 3), dph = new Float32Array(DUST);
  for (var d = 0; d < DUST; d++) {
    dpos[d * 3] = (Math.random() * 2 - 1) * 16; dpos[d * 3 + 1] = 0.4 + Math.random() * 9.5; dpos[d * 3 + 2] = Z1 + 40 + Math.random() * (Z0 - Z1 - 40);
    dph[d] = Math.random() * 6.283;
  }
  var dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
  var speck = (function () {   /* a soft round speck, instead of a square */
    var c = document.createElement('canvas'); c.width = c.height = 32;
    var g = c.getContext('2d'), gr = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.4, 'rgba(255,255,255,0.45)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(c);
  })();
  scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({ size: 0.11, map: speck, color: 0x9fb6d6, transparent: true, opacity: 0.6, depthWrite: false })));

  /* ---- the projects ------------------------------------------------ */
  var panelVS = [
    'uniform float uTime; uniform float uBend;',
    'varying vec2 vUv;',
    'void main(){',
    '  vUv = uv; vec3 p = position;',
    '  p.z -= uBend * p.x * p.x;',                              /* a gentle curve, not a flat box */
    '  p.z += sin(uv.y * 3.0 + uTime * 0.8) * 0.03;',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);',
    '}'].join('\n');
  var panelFS = [
    'uniform sampler2D uMap; uniform vec3 uColor; uniform float uOpacity; uniform float uHover; uniform float uFeather;',
    'varying vec2 vUv;',
    'void main(){',
    '  vec2 d = min(vUv, 1.0 - vUv);',                             /* how far from the nearest edge */
    '  float edge = smoothstep(0.0, uFeather, d.x) * smoothstep(0.0, uFeather * 1.5, d.y);',
    '  vec3 col = texture2D(uMap, vUv).rgb * (0.84 + 0.22 * uHover);',
    '  float rim = 1.0 - smoothstep(0.0, uFeather * 2.2, min(d.x, d.y * 1.3));',
    '  col = mix(col, col * 0.55 + uColor * 0.22, rim);',         /* the edges soften into the project color */
    '  gl_FragColor = vec4(col, uOpacity * edge);',
    '}'].join('\n');
  var placeholder = function (sc, col) {   /* a title card in the project's color, until a real picture exists */
    var c = document.createElement('canvas'); c.width = 1024; c.height = 640;
    var g = c.getContext('2d'), hex = '#' + col.getHexString();
    var gr = g.createRadialGradient(780, 120, 20, 700, 260, 760);
    gr.addColorStop(0, hex + '55'); gr.addColorStop(1, '#11161d');
    g.fillStyle = '#11161d'; g.fillRect(0, 0, 1024, 640);
    g.fillStyle = gr; g.fillRect(0, 0, 1024, 640);
    g.strokeStyle = hex + '33'; g.lineWidth = 1;
    for (var i = 0; i <= 16; i++) { g.beginPath(); g.moveTo(i * 64, 0); g.lineTo(i * 64, 640); g.stroke(); }
    for (i = 0; i <= 10; i++) { g.beginPath(); g.moveTo(0, i * 64); g.lineTo(1024, i * 64); g.stroke(); }
    g.fillStyle = hex;
    for (i = 0; i < 11; i++) { var bh = 60 + (Math.sin(i * 1.7 + 1) * 0.5 + 0.5) * 220 + i * 12; g.globalAlpha = 0.5; g.fillRect(560 + i * 38, 560 - bh, 24, bh); }
    g.globalAlpha = 1;
    var title = [].map.call(sc.querySelectorAll('.scene-title .ln'), function (l) { return l.textContent.trim(); }).join(' ');
    var tag = (sc.querySelector('.card-tag') || {}).textContent || '';
    g.fillStyle = hex; g.font = '600 26px "IBM Plex Mono", monospace'; g.fillText(tag.toUpperCase(), 64, 110);
    g.fillStyle = '#E8EDF4'; g.font = '600 76px "Bricolage Grotesque", system-ui, sans-serif';
    var words = title.trim().split(/\s+/), line = '', y = 220;
    words.forEach(function (w) {
      var test = line ? line + ' ' + w : w;
      if (g.measureText(test).width > 520 && line) { g.fillText(line, 64, y); line = w; y += 84; } else { line = test; }
    });
    g.fillText(line, 64, y);
    var t = new THREE.CanvasTexture(c);
    return { tex: t, aspect: 1024 / 640 };
  };
  var place = function (st) {   /* where each picture floats, and how big */
    var w = NARROW ? 7 : 9.6, h = w / st.aspect;
    if (h > (NARROW ? 4.4 : 7.6)) { h = NARROW ? 4.4 : 7.6; w = h * st.aspect; }
    st.w = w; st.h = h;
    st.x = NARROW ? 0 : st.side * 4.2;
    st.y = NARROW ? 6.2 : 3.9;   /* on a phone the picture sits high, above the card */
    st.mesh.scale.set(w, h, 1);
    st.mesh.position.set(st.x, st.y, st.z);
    st.mesh.rotation.y = NARROW ? 0 : -st.side * 0.3;
    st.glowAt = new THREE.Vector3(st.x, st.y - h / 2 - 0.6, st.z + 1.8);
    /* where the camera stops to look at it */
    /* the camera looks straight down the path, so the picture stays on its half of the screen and the card has the other */
    st.cam = NARROW ? new THREE.Vector3(0, 3, st.z + 15) : new THREE.Vector3(-st.side * 1.2, 3.1, st.z + 14.5);
    st.look = NARROW ? new THREE.Vector3(0, 1.6, st.z) : new THREE.Vector3(-st.side * 1.2, 3.3, st.z);
  };
  var loader = new THREE.TextureLoader();
  var stops = scenes.map(function (sc, i) {
    var col = colorOfScene(sc), side = i % 2 === 0 ? -1 : 1;
    sc.setAttribute('data-card', side < 0 ? 'right' : 'left');   /* the card sits opposite the picture */
    var link = sc.querySelector('.sm-btn');
    var mat = new THREE.ShaderMaterial({
      uniforms: { uMap: { value: null }, uColor: { value: col }, uOpacity: { value: 0 }, uHover: { value: 0 }, uFeather: { value: 0.09 }, uTime: { value: 0 }, uBend: { value: 1.4 } },
      vertexShader: panelVS, fragmentShader: panelFS, transparent: true, depthWrite: false, side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 24, 12), mat);
    scene.add(mesh);
    var st = { el: sc, col: col, side: side, mesh: mesh, mat: mat, aspect: 16 / 10, z: -(i + 1) * STEP, href: link && link.getAttribute('href'), target: link && link.getAttribute('target') };
    var use = function (tex, aspect) { tex.minFilter = THREE.LinearFilter; mat.uniforms.uMap.value = tex; st.aspect = aspect; place(st); };
    var src = sc.getAttribute('data-jr-img');
    var fallback = function () { var p = placeholder(sc, col); use(p.tex, p.aspect); };
    if (src) loader.load(src, function (tex) { use(tex, tex.image.width / tex.image.height); }, undefined, fallback);
    else fallback();
    /* keep a photo credit visible, since the picture moves into the 3D scene */
    var credit = sc.querySelector('.frame-credit'), meta = sc.querySelector('.scene-meta');
    if (credit && meta && !meta.querySelector('.jr-credit')) {
      var p = document.createElement('p'); p.className = 'jr-credit'; p.textContent = credit.textContent; meta.appendChild(p);
    }
    return st;
  });
  stops.forEach(place);

  /* ---- scrolling moves you forward --------------------------------- */
  var VH = 1, T = 0, R = 1, KEYS = [], spots = [];
  var START = { cam: new THREE.Vector3(0, 2.3, 15), look: new THREE.Vector3(0, 1.4, -24) };
  var measure = function () {
    VH = window.innerHeight;
    stageEl.style.height = Math.round(N * SCROLL_PER * VH + VH) + 'px';
    T = stageEl.getBoundingClientRect().top + window.scrollY;
    R = N * SCROLL_PER * VH;
    var seg = R / N, D = seg * 0.2;
    spots = stops.map(function (st, i) { return T + seg * (i + 0.5); });
    var last = stops[N - 1];
    KEYS = [{ y: 0, cam: START.cam, look: START.look }];
    stops.forEach(function (st, i) {
      KEYS.push({ y: spots[i] - D, cam: st.cam, look: st.look, i: i });
      KEYS.push({ y: spots[i] + D, cam: st.cam, look: st.look, i: i });
    });
    KEYS.push({ y: T + R + VH * 0.7, cam: new THREE.Vector3(0, 3.6, last.z - 34), look: new THREE.Vector3(0, 3.4, last.z - 90) });
  };
  var goal = { cam: new THREE.Vector3(), look: new THREE.Vector3() };
  var aim = function (y) {   /* the camera's place for a scroll position: glides between stops, rests at each */
    var k = 0;
    while (k < KEYS.length - 2 && y > KEYS[k + 1].y) k++;
    var a = KEYS[k], b = KEYS[k + 1];
    var t = b.y > a.y ? smooth(a.y, b.y, y) : 1;
    goal.cam.lerpVectors(a.cam, b.cam, t);
    goal.look.lerpVectors(a.look, b.look, t);
  };

  /* ---- the cursor light ------------------------------------------- */
  var ndc = new THREE.Vector2(0.3, -0.1), pointer = false, touchHold = 0;
  var ray = new THREE.Raycaster(), lightGoal = new THREE.Vector3(), hoverStop = -1;
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    pointer = true;
    ndc.set(e.clientX / window.innerWidth * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  }, { passive: true });
  window.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'touch') return;
    ndc.set(e.clientX / window.innerWidth * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    touchHold = 4;   /* a tap moves the light there for a few seconds */
  }, { passive: true });
  /* where the cursor's line of sight first meets the rock */
  var findLight = function () {
    ray.setFromCamera(ndc, camera);
    var o2 = ray.ray.origin, dir = ray.ray.direction, p = new THREE.Vector3();
    for (var t = 1; t < 90; t += 0.7) {
      p.copy(o2).addScaledVector(dir, t);
      if (p.y < height(p.x, p.z) + 0.15) { lightGoal.copy(p).addScaledVector(dir, -1.4); lightGoal.y += 0.9; return true; }
    }
    lightGoal.copy(o2).addScaledVector(dir, 22);
    return false;
  };

  /* clicking a picture opens its project */
  var pickPanel = function () {
    ray.setFromCamera(ndc, camera);
    var best = -1;
    stops.forEach(function (st, i) {
      if (st.mat.uniforms.uOpacity.value < 0.5) return;
      if (ray.intersectObject(st.mesh).length) best = i;
    });
    return best;
  };
  document.addEventListener('click', function (e) {
    if (hoverStop < 0 || e.defaultPrevented || e.target.closest('a, button, input, label')) return;
    var st = stops[hoverStop];
    if (!st.href) return;
    if (st.target === '_blank') window.open(st.href, '_blank', 'noopener');
    else window.location.href = st.href;
  });

  /* jumping straight to a project: the side list, the scroll cue, and links like work.html#lego */
  var jump = function (i, instant) {
    if (i < 0 || i >= N) return;
    window.scrollTo({ top: spots[i], behavior: instant ? 'auto' : 'smooth' });
  };
  var indexOfId = function (id) { for (var i = 0; i < N; i++) if (scenes[i].id === id) return i; return -1; };
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var i = indexOfId(a.getAttribute('href').slice(1));
    if (i < 0) return;
    e.preventDefault();
    jump(i);
    history.replaceState(null, '', '#' + scenes[i].id);
  });

  /* ---- the cards and the side list -------------------------------- */
  var rail = [].slice.call(document.querySelectorAll('.rail a'));
  var lastActive = -2;
  var cards = function (y) {
    var seg = R / N, active = -1, bestC = 0;
    scenes.forEach(function (sc, i) {
      var c = 1 - Math.abs(y - spots[i]) / (seg * 0.46);
      c = c <= 0 ? 0 : c * c * (3 - 2 * c);
      if (c > bestC) { bestC = c; active = i; }
      sc.style.opacity = c.toFixed(3);
      sc.style.visibility = c > 0.02 ? 'visible' : 'hidden';
      sc.style.setProperty('--jr-y', ((1 - c) * (y < spots[i] ? 26 : -26)).toFixed(1) + 'px');
    });
    if (active !== lastActive) {
      lastActive = active;
      rail.forEach(function (a, j) { a.classList.toggle('is-active', j === active); });
    }
    root.classList.toggle('rail-on', y > T - VH * 0.5 && y < T + R);
  };

  /* ---- each frame -------------------------------------------------- */
  var curCam = START.cam.clone(), curLook = START.look.clone(), lightCol = new THREE.Color(START_BLUE), tmpCol = new THREE.Color();
  var last = null, t0 = null, onscreen = true, slow = [];
  var blueCol = new THREE.Color(START_BLUE);
  var frame = function (now) {
    requestAnimationFrame(frame);
    if (!onscreen || document.hidden) { last = null; return; }
    if (t0 === null) t0 = now;
    var dt = last === null ? 0.016 : Math.min(0.05, (now - last) / 1000);
    last = now;
    var t = (now - t0) / 1000, y = window.scrollY;
    /* if frames keep running slow, draw at ordinary resolution so scrolling stays smooth */
    if (DPR > 1 && t > 2) {
      slow.push(dt);
      if (slow.length > 60) {
        slow.sort(function (a, b) { return a - b; });
        if (slow[30] > 0.028) { DPR = 1; renderer.setPixelRatio(1); renderer.setSize(window.innerWidth, window.innerHeight, false); }
        slow = [];
      }
    }
    aim(y);
    var e = 1 - Math.exp(-dt / 0.16);   /* the camera glides after the scroll, so a wheel click feels smooth */
    curCam.lerp(goal.cam, e); curLook.lerp(goal.look, e);
    camera.position.copy(curCam);
    camera.position.y += Math.sin(t * 0.6) * 0.05;
    camera.lookAt(curLook);

    /* the light's color: blue on the open plane, then each project's color as you near it */
    var cz = curCam.z, zs = [START.cam.z].concat(stops.map(function (s) { return s.cam.z; })), cols = [blueCol].concat(stops.map(function (s) { return s.col; }));
    var k = 0;
    while (k < zs.length - 2 && cz < zs[k + 1]) k++;
    var f = smooth(zs[k], zs[k + 1], cz);
    tmpCol.copy(cols[k]).lerp(cols[k + 1], f);
    lightCol.lerp(tmpCol, 0.08);
    cursorLight.color.copy(lightCol);

    /* the cursor light: under the mouse, wandering on its own on a phone */
    if (!pointer && touchHold <= 0) {
      ndc.set(0.55 * Math.sin(t * 0.35), -0.25 + 0.22 * Math.sin(t * 0.23 + 1));
    }
    if (touchHold > 0) touchHold -= dt;
    var hit = findLight();
    cursorLight.position.lerp(lightGoal, 1 - Math.exp(-dt / 0.08));
    cursorLight.intensity += ((hit ? LIGHT : LIGHT * 0.5) - cursorLight.intensity) * 0.1;

    /* the pictures fade in as you approach, and out as you pass */
    var near = null, nearOp = 0;
    stops.forEach(function (st) {
      var dist = curCam.z - st.z;
      var op = smooth(54, 27, dist) * smooth(2, 7, dist);   /* appears only as you near it, so the next one does not show through */
      st.mat.uniforms.uOpacity.value = op;
      st.mat.uniforms.uTime.value = t;
      if (op > nearOp) { nearOp = op; near = st; }
    });
    if (near) { glow.position.copy(near.glowAt); glow.color.copy(near.col); }
    glow.intensity = 1.6 * nearOp;
    hoverStop = pointer ? pickPanel() : -1;
    stops.forEach(function (st, i) {
      var h = st.mat.uniforms.uHover; h.value += ((i === hoverStop ? 1 : 0) - h.value) * 0.15;
    });
    document.body.style.cursor = hoverStop >= 0 ? 'pointer' : '';

    /* the dust drifts */
    var dp = dustGeo.attributes.position.array;
    for (var q = 0; q < DUST; q++) {
      dp[q * 3] += Math.sin(t * 0.3 + dph[q]) * 0.004;
      dp[q * 3 + 1] += 0.003 + Math.sin(t * 0.5 + dph[q]) * 0.002;
      if (dp[q * 3 + 1] > 10) dp[q * 3 + 1] = 0.4;
    }
    dustGeo.attributes.position.needsUpdate = true;

    /* at the end of the path the scene fades so the page can continue */
    stage3d.style.opacity = (1 - smooth(T + R - VH * 0.1, T + R + VH * 0.55, y)).toFixed(3);
    cards(y);
    renderer.render(scene, camera);
  };

  var resize = function () {
    var was = NARROW;
    NARROW = narrow();
    camera.fov = NARROW ? 62 : 52;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);   /* the page's styles size the canvas */
    if (was !== NARROW) stops.forEach(place);
    measure();
  };
  var rt = null;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 120); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { onscreen = en[0].isIntersecting; }, { threshold: 0 }).observe(stage3d);
  }
  resize();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  /* arriving with a link like work.html#lego goes straight to that project */
  var hashed = indexOfId((window.location.hash || '').slice(1));
  if (hashed >= 0) {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    var arrive = function () { measure(); jump(hashed, true); curCam.copy(stops[hashed].cam); curLook.copy(stops[hashed].look); };
    arrive();
    /* the browser makes its own jump to the anchor once the page loads, so go again after it */
    window.addEventListener('load', function () { setTimeout(arrive, 30); });
  }
  cards(window.scrollY);
  requestAnimationFrame(frame);
})();
