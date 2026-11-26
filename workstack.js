/* ============================================================
   WORK PAGE: THE PICTURE COLUMN (workstack.js)
   Loaded by work.html only, after three.js and before work.js.
   Inspired by robin-noguier.com.

   The featured projects become a column of pictures drawn in 3D on the
   right side of the screen:
     - when the page opens, all of the pictures slide up together into a
       small column beside the page's title, so every project shows at once
       (pointing at one shows its name; clicking it scrolls to it)
     - scrolling spreads them into the full column, which then moves up
       one project per screen. The picture
       in the middle of the screen is almost flat and in full color; the
       ones above and below tip away, bend, shrink, and fade toward gray,
       as if the column were wrapped around a large drum. Scrolling fast
       bends them a little more, like paper moving through air
     - the project's title, text, and buttons show on the left while its
       picture is in the middle, and the background takes on a soft tint
       of the project's color
     - dots on the right edge show where you are and jump between projects
     - clicking the picture in the middle opens the project, like its
       first button
   Scrolling is the browser's own: nothing takes over the mouse wheel.

   The project text, links, and colors all come from the scene blocks in
   work.html, so a project added there gets its own picture in the column.
   Each picture comes from data-ws-img on its scene. Pictures from other
   sites (like Tableau Public) cannot be drawn in 3D, so LEGO and NBA point
   to screenshots saved as images/work/lego.webp and images/work/nba.webp.
   If a picture cannot load, a title card in the project's color stands in.

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
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false }); }
  catch (e) { return; }
  window.WORK_3D = true;   /* tells work.js to stand aside */
  var root = document.documentElement;
  root.classList.add('ws');

  /* ---- EDIT: the column ---------------------------------------- */
  var SCROLL_PER = 1;     /* screens of scrolling for each project */
  var CARD = 16 / 10;     /* the shape of every picture (width / height); pictures are cropped to fit */
  var DRUM = 2.4;         /* the size of the drum the column wraps around: smaller tips the pictures away faster */
  var TWIST = 0.16;       /* how far pictures above and below turn sideways */
  var TINT = 0.13;        /* how strongly the background takes on each project's color (0 to 1) */
  var START = -0.4;       /* how far before the first project the page's top is, in projects (the scroll from there spreads the small column out) */
  var SMALL = 0.5;        /* the largest the pictures get in the small column at the top, compared with full size */

  var N = scenes.length;
  var css = getComputedStyle(root);
  var BG = new THREE.Color((css.getPropertyValue('--bg') || '').trim() || '#0E1116');
  var colorOf = function (el) {
    var v = (getComputedStyle(el).getPropertyValue('--cc') || '').trim();
    if (!/^#|^rgb/.test(v)) v = (css.getPropertyValue('--' + el.getAttribute('data-cc')) || '').trim();
    return new THREE.Color(v || '#75AADB');
  };
  var clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  var smooth = function (a, b, v) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  var narrow = function () { return window.innerWidth < 760 || window.innerWidth / window.innerHeight < 0.85; };
  var NARROW = narrow();

  /* ---- the scene --------------------------------------------------- */
  var stage3d = document.createElement('div');
  stage3d.className = 'ws-stage';
  stage3d.setAttribute('aria-hidden', 'true');
  main.insertBefore(stage3d, main.firstChild);
  var DPR = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(DPR);
  renderer.setClearColor(BG, 1);
  stage3d.appendChild(renderer.domElement);
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  var column = new THREE.Group();
  scene.add(column);

  var W = 1.6, H = W / CARD, GAP = H * 1.24;   /* each picture's size, and the distance between them, in scene units */

  var vs = [
    'uniform float uY, uR, uTwist, uVel, uScale, uHover, uW;',
    'varying vec2 vUv; varying float vFace;',
    'void main(){',
    '  vUv = uv;',
    '  vec3 p = position;',
    '  p.xy *= uScale * (1.0 + 0.04 * uHover);',
    '  float xn = p.x / uW;',
    '  p.z -= uVel * 0.2 * cos(xn * 3.14159);',                      /* scrolling fast bends the middle back */
    '  float c = cos(uTwist), s = sin(uTwist);',
    '  p = vec3(p.x * c - p.z * s, p.y, p.x * s + p.z * c);',          /* turns sideways, more the farther from the middle */
    '  float a = (p.y + uY) / uR;',                                    /* wraps around the drum */
    '  vec3 q = vec3(p.x, sin(a) * (uR + p.z), cos(a) * (uR + p.z) - uR);',
    '  vFace = cos(a);',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(q, 1.0);',
    '}'].join('\n');
  var fs = [
    'uniform sampler2D uMap; uniform vec2 uCrop; uniform float uGray, uOpacity, uHover, uAspect;',
    'varying vec2 vUv; varying float vFace;',
    'void main(){',
    '  vec3 col = texture2D(uMap, (vUv - 0.5) * uCrop + 0.5).rgb;',
    '  float l = dot(col, vec3(0.299, 0.587, 0.114));',
    '  col = mix(col, vec3(l) * 0.72, uGray);',                         /* away from the middle: gray */
    '  col *= mix(0.45, 1.0, clamp(vFace, 0.0, 1.0)) * (1.0 + 0.08 * uHover);',
    '  vec2 q = abs(vUv - 0.5) * vec2(uAspect, 1.0) - (vec2(uAspect, 1.0) * 0.5 - 0.035);',
    '  float d = length(max(q, 0.0)) - 0.035;',                         /* rounded corners */
    '  float edge = 1.0 - smoothstep(-0.004, 0.004, d);',
    '  gl_FragColor = vec4(col, uOpacity * edge);',
    '}'].join('\n');

  /* a title card in the project's color, until a real picture exists */
  var titleCard = function (sc, col) {
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
    var words = title.split(/\s+/), line = '', y = 220;
    words.forEach(function (w) {
      var test = line ? line + ' ' + w : w;
      if (g.measureText(test).width > 520 && line) { g.fillText(line, 64, y); line = w; y += 84; } else { line = test; }
    });
    g.fillText(line, 64, y);
    return c;
  };

  var loader = new THREE.TextureLoader();
  var cards = scenes.map(function (sc, i) {
    var col = colorOf(sc);
    var link = sc.querySelector('.sm-btn');
    var mat = new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: null }, uCrop: { value: new THREE.Vector2(1, 1) }, uAspect: { value: CARD },
        uY: { value: 0 }, uR: { value: DRUM }, uTwist: { value: 0 }, uVel: { value: 0 }, uScale: { value: 1 }, uW: { value: W },
        uGray: { value: 0 }, uOpacity: { value: 0 }, uHover: { value: 0 }
      },
      vertexShader: vs, fragmentShader: fs, transparent: true, depthWrite: false, side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(W, H, 40, 26), mat);
    mesh.frustumCulled = false;
    mesh.renderOrder = i;
    column.add(mesh);
    var card = { el: sc, col: col, mat: mat, href: link && link.getAttribute('href'), target: link && link.getAttribute('target'), hover: 0 };
    var use = function (tex, w, h) {
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      var a = w / h;   /* crop to the card's shape, keeping the middle */
      mat.uniforms.uCrop.value.set(a > CARD ? CARD / a : 1, a > CARD ? 1 : a / CARD);
      mat.uniforms.uMap.value = tex;
    };
    var stand = function () {
      var draw = function () { var cv = titleCard(sc, col); use(new THREE.CanvasTexture(cv), cv.width, cv.height); };
      draw();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);   /* again once the fonts are in */
    };
    var src = sc.getAttribute('data-ws-img');
    if (src) loader.load(src, function (tex) { use(tex, tex.image.width, tex.image.height); }, undefined, stand);
    else stand();
    /* keep a photo credit visible, since the picture moves into the 3D scene */
    var credit = sc.querySelector('.frame-credit'), meta = sc.querySelector('.scene-meta');
    if (credit && meta && !meta.querySelector('.ws-credit')) {
      var p = document.createElement('p'); p.className = 'ws-credit'; p.textContent = credit.textContent; meta.appendChild(p);
    }
    /* a small counter above the title: 01 / 04 */
    var title = sc.querySelector('.scene-title');
    if (title && !sc.querySelector('.ws-count')) {
      var n = document.createElement('p'); n.className = 'ws-count'; n.setAttribute('aria-hidden', 'true');
      n.textContent = (i < 9 ? '0' : '') + (i + 1) + ' / ' + (N < 10 ? '0' : '') + N;
      title.parentNode.insertBefore(n, title);
    }
    return card;
  });

  /* a soft glow in the project's color behind the middle picture */
  var glowMat = new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color() }, uOpacity: { value: 0 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: 'uniform vec3 uColor; uniform float uOpacity; varying vec2 vUv; void main(){ float d = length(vUv - 0.5) * 2.0; gl_FragColor = vec4(uColor, uOpacity * pow(max(0.0, 1.0 - d), 2.2)); }',
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });
  var glow = new THREE.Mesh(new THREE.PlaneGeometry(W * 2.8, W * 2.8), glowMat);
  glow.position.z = -0.9;
  glow.renderOrder = -1;
  scene.add(glow);

  /* ---- scrolling moves the column ---------------------------------- */
  var VH = 1, VW = 1, T = 0, seg = 1, spots = [];
  var measure = function () {
    VH = window.innerHeight; VW = window.innerWidth;
    seg = SCROLL_PER * VH;
    /* the stage starts at the top of the page, under the title (see style.css), so each
       project's text is already in place when it fades in; the first stop is one screen down */
    stageEl.style.height = Math.round(VH + (N - 1) * seg + VH * 1.7) + 'px';
    T = stageEl.getBoundingClientRect().top + window.scrollY;
    spots = cards.map(function (c, i) { return T + VH + i * seg; });
  };
  var REST = 0.2;   /* the share of each project's scrolling where the column holds still */
  var target = function (y) {   /* where the column should be, in projects (0 = the first one in the middle) */
    if (y <= spots[0] - seg * REST) return START + (0 - START) * smooth(0, spots[0] - seg * REST, y);
    for (var i = 0; i < N - 1; i++) {
      var a = spots[i] + seg * REST, b = spots[i + 1] - seg * REST;
      if (y < a) return i;
      if (y < b) return i + smooth(a, b, y);
    }
    var e = spots[N - 1] + seg * REST;
    return y < e ? N - 1 : N - 1 + (y - e) / seg;   /* past the last one, the column keeps rising away */
  };

  /* ---- where things sit on the screen ------------------------------ */
  var layout = function () {
    VW = window.innerWidth; VH = window.innerHeight;
    renderer.setSize(VW, VH, false);   /* the page's styles size the canvas */
    camera.aspect = VW / VH;
    /* the middle picture's width on screen, in px */
    var px = NARROW ? Math.min(VW * 0.84, VH * 0.42 * CARD) : Math.min(VW * 0.42, VH * 0.5 * CARD, 700);
    var dist = (VH / (px / W)) / (2 * Math.tan(15 * Math.PI / 180));
    camera.position.set(0, 0, dist);
    camera.lookAt(0, 0, 0);
    /* the column's middle: right of the text on wide screens, high on a phone with the text below */
    var cx = NARROW ? VW * 0.5 : VW * 0.68, cy = NARROW ? VH * 0.32 : VH * 0.5;
    camera.setViewOffset(VW, VH, -(cx - VW / 2), -(cy - VH / 2), VW, VH);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    glow.position.set(0, 0, -0.9);
    /* the small column at the top of the page: all of the pictures, sized to fit between the menu
       and the bottom of the screen (on a phone, between the menu and the page's title) */
    var pxu = px / W, top = 84, bottom = VH - 48;
    if (NARROW) { var hw = head.querySelector('.wrap'); bottom = hw ? hw.getBoundingClientRect().top + window.scrollY - 18 : VH * 0.55; top = 78; }
    var sz = Math.min(SMALL, (bottom - top) / (((N - 1) * 1.18 + 1) * H * pxu));
    OV.s = sz;
    OV.step = sz * H * 1.18 / GAP;
    OV.shift = (cy - (top + bottom) / 2) / pxu;
  };
  var OV = { s: SMALL, step: 0.5, shift: 0 };   /* the small column: picture size, spacing (in projects), and how far it moves up */

  /* ---- the cursor ---------------------------------------------------- */
  var mx = 0, my = 0, tx = 0, ty = 0, pointer = false, px0 = -1, py0 = -1, hoverI = -1;
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    pointer = true; px0 = e.clientX; py0 = e.clientY;
    tx = e.clientX / window.innerWidth - 0.5; ty = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });
  /* the middle picture's corners on screen, worked out the same way the drawing does */
  var V = new THREE.Vector3();
  var cornerOnScreen = function (x, y, u) {
    var s = u.uScale.value * (1 + 0.04 * u.uHover.value), c = Math.cos(u.uTwist.value), sn = Math.sin(u.uTwist.value);
    var X = x * s, Y = y * s, Z = 0;
    var x2 = X * c - Z * sn, z2 = X * sn + Z * c;
    var a = (Y + u.uY.value) / DRUM;
    V.set(x2, Math.sin(a) * (DRUM + z2), Math.cos(a) * (DRUM + z2) - DRUM).applyMatrix4(column.matrixWorld).project(camera);
    return [(V.x + 1) / 2 * VW, (1 - V.y) / 2 * VH];
  };
  var inQuad = function (p, q) {   /* is point p inside the four-sided shape q (corners in order) */
    var sign = 0;
    for (var i = 0; i < 4; i++) {
      var a = q[i], b = q[(i + 1) % 4], cr = (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
      if (cr !== 0) { if (sign === 0) sign = cr > 0 ? 1 : -1; else if ((cr > 0 ? 1 : -1) !== sign) return false; }
    }
    return true;
  };
  var quadOf = function (i) { var u = cards[i].mat.uniforms; return [cornerOnScreen(-W / 2, H / 2, u), cornerOnScreen(W / 2, H / 2, u), cornerOnScreen(W / 2, -H / 2, u), cornerOnScreen(-W / 2, -H / 2, u)]; };
  /* which picture the pointer is on: any of them in the small column, otherwise only the middle one */
  var pick = function (c, ov) {
    if (!pointer || px0 < 0) return -1;
    var list = [];
    if (ov > 0.5) { for (var j = 0; j < N; j++) list.push(j); }
    else { var m = Math.round(c); if (m >= 0 && m < N && Math.abs(c - m) <= 0.3) list.push(m); }
    for (var k = 0; k < list.length; k++) {
      if (cards[list[k]].mat.uniforms.uOpacity.value < 0.6) continue;
      if (inQuad([px0, py0], quadOf(list[k]))) return list[k];
    }
    return -1;
  };
  /* the name of the picture you point at, in the small column */
  var tip = document.createElement('p');
  tip.className = 'ws-tip';
  tip.setAttribute('aria-hidden', 'true');
  document.body.appendChild(tip);
  var tipFor = -1;
  var showTip = function (i, on) {
    tip.classList.toggle('on', on);
    if (!on) return;
    if (tipFor !== i) {
      tipFor = i;
      var name = [].map.call(scenes[i].querySelectorAll('.scene-title .ln'), function (l) { return l.textContent.trim(); }).join(' ');
      tip.textContent = (i < 9 ? '0' : '') + (i + 1) + '  ' + name;
      tip.style.setProperty('--cc', '#' + cards[i].col.getHexString());
    }
    var q = quadOf(i), x1 = Math.max(q[1][0], q[2][0]), x0 = Math.min(q[0][0], q[3][0]), yc = (q[0][1] + q[1][1] + q[2][1] + q[3][1]) / 4;
    var w = tip.offsetWidth, x = x1 + 16 + w > VW - 40 ? x0 - 16 - w : x1 + 16;
    tip.style.transform = 'translate(' + Math.round(x) + 'px,' + Math.round(yc - tip.offsetHeight / 2) + 'px)';
  };
  var ovNow = 1;
  document.addEventListener('click', function (e) {
    if (hoverI < 0 || e.defaultPrevented || e.target.closest('a, button, input, label')) return;
    if (ovNow > 0.5) {   /* in the small column, a click scrolls to that project */
      jump(hoverI);
      history.replaceState(null, '', '#' + scenes[hoverI].id);
      return;
    }
    var cd = cards[hoverI];
    if (!cd.href) return;
    if (cd.target === '_blank') window.open(cd.href, '_blank', 'noopener');
    else window.location.href = cd.href;
  });

  /* ---- jumping straight to a project: the dots, the scroll cue, and links like work.html#lego ---- */
  var jump = function (i, instant) {
    if (i < 0 || i >= N) return;
    window.scrollTo({ top: spots[i], behavior: instant ? 'instant' : 'smooth' });   /* 'instant', since the page's smooth scrolling would otherwise apply */
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

  /* ---- the text on the left, and the dots ---------------------------- */
  var rail = [].slice.call(document.querySelectorAll('.rail a'));
  var lastActive = -2;
  var text = function (c, y) {
    var active = -1, best = 0;
    scenes.forEach(function (sc, i) {
      var k = 1 - Math.abs(c - i) / 0.36;   /* each project's text shows only near its stop, so two never overlap */
      k = k <= 0 ? 0 : k * k * (3 - 2 * k);
      if (k > best) { best = k; active = i; }
      sc.style.opacity = k.toFixed(3);
      sc.style.visibility = k > 0.02 ? 'visible' : 'hidden';   /* hidden text is also skipped by the keyboard */
      sc.style.setProperty('--ws-y', ((1 - k) * (c < i ? 28 : -28)).toFixed(1) + 'px');
    });
    if (active !== lastActive) {
      lastActive = active;
      rail.forEach(function (a, j) { a.classList.toggle('is-active', j === active); });
    }
    root.classList.toggle('rail-on', c > -0.3 && y < spots[N - 1] + seg * 0.6);
  };

  /* ---- each frame -------------------------------------------------- */
  var c = START, vel = 0, t0 = null, last = null, onscreen = true;
  var tint = new THREE.Color(), clear = new THREE.Color();
  var frame = function (now) {
    requestAnimationFrame(frame);
    if (!onscreen || document.hidden) { last = null; return; }
    if (t0 === null) t0 = now;
    var dt = last === null ? 0.016 : Math.min(0.05, (now - last) / 1000);
    last = now;
    var t = (now - t0) / 1000, y = window.scrollY;
    var goal = target(y), prev = c;
    c += (goal - c) * (1 - Math.exp(-dt / 0.14));   /* the column glides after the scroll */
    vel += ((c - prev) / Math.max(dt, 0.001) - vel) * 0.2;
    mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
    var ov = 1 - smooth(START, 0, c);   /* 1 at the top of the page (the small column), 0 from the first project on */
    ovNow = ov;
    column.rotation.y = mx * 0.16;
    column.rotation.x = my * 0.08;
    column.position.y = OV.shift * ov;
    column.updateMatrixWorld();

    /* each picture: where it is in the column, and how it looks there */
    cards.forEach(function (cd, i) {
      var u = cd.mat.uniforms;
      var arrive = clamp((t - 0.15 - i * 0.12) / 1.3, 0, 1), rise = 1 - Math.pow(1 - arrive, 3);
      var dc = i - c, adc = Math.abs(dc);              /* in the full column: how far from the middle */
      var ds = (i - (N - 1) / 2) * OV.step;           /* in the small column at the top */
      var d = dc + (ds - dc) * ov + (1 - rise) * (4.2 + i * 0.5);   /* on arrival, the pictures slide up from below */
      var full = (1 - smooth(1.5, 2.3, adc)) * (NARROW && dc > 0 ? 1 - smooth(0.45, 0.95, dc) : 1);   /* on a phone the next picture stays out of the text's way */
      u.uY.value = -d * GAP;
      u.uTwist.value = clamp(dc, -2, 2) * TWIST * (1 - ov) + ds * 0.3 * ov;
      u.uScale.value = (1 - 0.1 * Math.min(adc, 1.5)) * (1 - ov) + OV.s * ov;
      u.uGray.value = smooth(0.12, 0.9, adc) * (1 - ov);
      u.uVel.value = clamp(vel * 0.5, -1.2, 1.2) * (1 - ov);
      u.uOpacity.value = (full + (1 - full) * ov) * smooth(0, 0.35, arrive);
      cd.hover += ((i === hoverI ? 1 : 0) - cd.hover) * 0.15;
      u.uHover.value = cd.hover;
    });
    hoverI = pick(c, ov);
    document.body.style.cursor = hoverI >= 0 ? 'pointer' : '';
    showTip(hoverI, hoverI >= 0 && ov > 0.5);

    /* the background and the glow take on the color of the project in the middle */
    var k = clamp(c, 0, N - 1), i0 = Math.floor(k), i1 = Math.min(N - 1, i0 + 1);
    tint.copy(cards[i0].col).lerp(cards[i1].col, k - i0);
    clear.copy(BG).lerp(tint, TINT);
    renderer.setClearColor(clear, 1);
    glowMat.uniforms.uColor.value.copy(tint);
    glowMat.uniforms.uOpacity.value = 0.22 * (1 - smooth(0.3, 0.5, Math.abs(c - Math.round(c))) * 0.5) * smooth(0, 1, t) * (1 - 0.5 * ov);

    /* past the last project the scene fades so the page can continue */
    stage3d.style.opacity = (1 - smooth(spots[N - 1] + seg * 0.3, spots[N - 1] + seg * 0.75, y)).toFixed(3);
    text(c, y);
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
  /* arriving with a link like work.html#lego goes straight to that project */
  var hashed = indexOfId((window.location.hash || '').slice(1));
  if (hashed >= 0) {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    var arrive = function () { measure(); jump(hashed, true); c = hashed; };
    arrive();
    /* the browser makes its own jump to the anchor once the page loads, so go again after it */
    window.addEventListener('load', function () { setTimeout(arrive, 30); });
  } else if (window.scrollY > 0) {
    c = target(window.scrollY);
  }
  /* a change to the address's #name on this page (typed, or from the back button) */
  window.addEventListener('hashchange', function () {
    var i = indexOfId((window.location.hash || '').slice(1));
    if (i >= 0) { measure(); jump(i, true); }
  });
  text(c, window.scrollY);
  requestAnimationFrame(frame);
  /* for testing: where the column is, where each project's scroll stop is, and a picture's corners on screen */
  window.WORK_STACK = {
    at: function () { return c; }, spots: function () { return spots.slice(); }, hover: function () { return hoverI; },
    tint: function () { return '#' + clear.getHexString(); },
    quad: quadOf
  };
})();
