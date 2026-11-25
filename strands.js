/* ============================================================
   GALLERY HERO (strands.js)
   A map of the Chart Gallery in 3D. A glowing nucleus sits in the
   middle, and one strand grows out of it for each of the 58 charts,
   gathered in nine bundles, one per chart family, in the colors the
   gallery already gives each family. How far a strand reaches shows
   how often you see that chart: common charts stay close to the
   middle, uncommon ones reach farther, and rare ones reach the farthest.

   - When the page opens, the strands grow out family by family.
   - Small beads of light travel out along each strand.
   - Strands bend away from the mouse as it drifts through them.
   - Pointing at a strand's tip shows the chart and its family's
     question; clicking it opens that chart's page. On a phone, tap
     a tip to see its name, then tap the name to open it.
   - Clicking the nucleus sends a ripple of light out along every strand.
   - The whole map turns slowly and leans toward the mouse; it holds
     still while you point at a tip, so it is easy to click.

   The charts come from gallery-data.js (window.GALLERY), so a chart
   added there gets its own strand. Needs three.js (loaded before this
   file) and, in the page, inside the hero:
     <div class="st-stage" data-strands aria-hidden="true"></div>
     <p class="st-key" id="stKey" aria-hidden="true"></p>
     <a class="st-label" id="stLabel" href="#" tabindex="-1" aria-hidden="true"></a>
   If three.js cannot load, or the device has no WebGL, the page shows
   without it. Anyone whose device asks for reduced motion sees the
   map fully grown and still; pointing and clicking still work.
   ============================================================ */
(function () {
  'use strict';
  var stage = document.querySelector('[data-strands]');
  var DATA = window.GALLERY;
  if (!stage || typeof THREE === 'undefined' || !DATA || !DATA.charts) return;
  var hero = stage.parentElement;
  var keyEl = document.getElementById('stKey');
  var label = document.getElementById('stLabel');
  var renderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
  catch (e) { return; }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- EDIT: how far each kind of chart reaches, the key line, and the timing ---- */
  var REACH = { Common: 0.55, Uncommon: 0.77, Rare: 1 };   /* share of the longest reach */
  var KEY = 'Each strand is one chart \u00b7 Rarer charts reach farther';
  var GROW = 1.5;       /* seconds for one strand to grow */
  var FAMILY_GAP = 0.3; /* seconds between one family starting to grow and the next */

  var NR = 0.75;        /* the nucleus's radius, in scene units */
  var MAXR = 6.2;       /* the longest strand's reach */
  var K = 28;           /* points along each strand */
  var FIB = 5;          /* fibers per strand: one down the middle, four that fan out toward the tip */

  /* a repeatable random number, so the map looks the same on every visit */
  var seed = 58;
  var rand = function () { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  var css = getComputedStyle(document.documentElement);
  var colorOf = function (name) { return new THREE.Color((css.getPropertyValue('--' + name) || '').trim() || '#75AADB'); };

  /* ---- the map: nine directions, one per family, and a strand per chart ---- */
  var fams = DATA.families.map(function (f, i) {
    /* nine directions spread evenly over a slightly flattened sphere */
    var y = 1 - (i + 0.5) / DATA.families.length * 2, r = Math.sqrt(1 - y * y), a = i * 2.39996 + 0.6;
    var dir = new THREE.Vector3(Math.cos(a) * r, y * 0.72, Math.sin(a) * r).normalize();
    return { key: f.key, name: f.name, ask: f.ask, color: colorOf(f.color), css: f.color, dir: dir, order: i, n: 0 };
  });
  var famBy = {};
  fams.forEach(function (f) { famBy[f.key] = f; });
  var perp = function (d) {
    var u = Math.abs(d.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
    u = new THREE.Vector3().crossVectors(d, u).normalize();
    return [u, new THREE.Vector3().crossVectors(d, u).normalize()];
  };
  var bezier = function (p0, p1, p2, p3, t) {
    var s = 1 - t;
    return new THREE.Vector3()
      .addScaledVector(p0, s * s * s).addScaledVector(p1, 3 * s * s * t)
      .addScaledVector(p2, 3 * s * t * t).addScaledVector(p3, t * t * t);
  };
  var strands = [];
  DATA.charts.forEach(function (c) {
    var f = famBy[c.family];
    if (!f) return;
    strands.push({ c: c, f: f, j: f.n++ });
  });
  strands.forEach(function (s) {
    var f = s.f, count = f.n, cone = 0.2 + 0.035 * count;
    var r = cone * Math.sqrt((s.j + 0.5) / count), th = s.j * 2.39996 + f.order;
    var fp = perp(f.dir);
    var d = f.dir.clone().addScaledVector(fp[0], r * Math.cos(th)).addScaledVector(fp[1], r * Math.sin(th)).normalize();
    var L = NR + (MAXR - NR) * (REACH[s.c.rarity] || 0.7) * (0.94 + rand() * 0.12);
    var sp = perp(d), bend = sp[0].clone().multiplyScalar((rand() - 0.5) * 0.3 * L).addScaledVector(sp[1], (rand() - 0.5) * 0.3 * L);
    var base = f.dir.clone().lerp(d, 0.3).normalize().multiplyScalar(NR * 0.92);
    var p1 = base.clone().addScaledVector(f.dir, L * 0.35);
    var p2 = d.clone().multiplyScalar(L * 0.66).add(bend);
    var tip = d.clone().multiplyScalar(L);
    s.pts = [];
    for (var k = 0; k < K; k++) s.pts.push(bezier(base, p1, p2, tip, k / (K - 1)));
    s.u = sp[0]; s.v = sp[1];
    s.fa = [];
    for (var q = 1; q < FIB; q++) s.fa.push(q * Math.PI / 2 + rand() * 0.8);
    s.start = 0.35 + f.order * FAMILY_GAP + s.j * 0.06;
    s.bead = rand(); s.beadSp = 0.16 + rand() * 0.12;
    s.ph = rand() * 6.283;
    s.disp = new Float32Array(K * 3);   /* how far each point is pushed by the mouse, eased */
    s.sx = new Float32Array(K); s.sy = new Float32Array(K); s.cz = new Float32Array(K);
  });

  /* ---- the scene ------------------------------------------------ */
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  stage.appendChild(renderer.domElement);
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(36, 1, 0.1, 200);
  var root = new THREE.Group();
  scene.add(root);

  var glowTex = (function () {
    var c = document.createElement('canvas'); c.width = c.height = 64;
    var g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,255,255,0.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  })();
  var ADD = { transparent: true, blending: THREE.AdditiveBlending, depthWrite: false };

  /* the nucleus: a slowly turning polygon shell around a soft glow */
  var shell = new THREE.Mesh(new THREE.IcosahedronGeometry(NR, 1), new THREE.MeshBasicMaterial(Object.assign({ color: 0xC9D3E6, wireframe: true, opacity: 0.35 }, ADD)));
  root.add(shell);
  var core = new THREE.Sprite(new THREE.SpriteMaterial(Object.assign({ map: glowTex, color: 0xDDE6F5, opacity: 0.85 }, ADD)));
  core.scale.set(NR * 3.4, NR * 3.4, 1);
  root.add(core);

  /* the fibers: every strand's fibers in one set of line segments */
  var SEG = (K - 1) * 2;
  var fpos = new Float32Array(strands.length * FIB * SEG * 3), fcol = new Float32Array(fpos.length);
  var fgeo = new THREE.BufferGeometry();
  fgeo.setAttribute('position', new THREE.BufferAttribute(fpos, 3));
  fgeo.setAttribute('color', new THREE.BufferAttribute(fcol, 3));
  var fibers = new THREE.LineSegments(fgeo, new THREE.LineBasicMaterial(Object.assign({ vertexColors: true }, ADD)));
  fibers.frustumCulled = false;
  root.add(fibers);

  /* the tips, the beads, and the tip being pointed at */
  var pointsOf = function (n, size, opacity) {
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    var p = new THREE.Points(g, new THREE.PointsMaterial(Object.assign({ map: glowTex, vertexColors: true, size: size, sizeAttenuation: false, opacity: opacity }, ADD)));
    p.frustumCulled = false;
    root.add(p);
    return p;
  };
  var tips = pointsOf(strands.length, 11, 1);
  var beads = pointsOf(strands.length, 5, 0.9);
  var pick = pointsOf(1, 26, 1);

  /* ---- where the map sits on the screen -------------------------- */
  var LY = null;
  var side = window.matchMedia('(min-width: 1000px)');
  var layout = function () {
    var w = hero.clientWidth, h = hero.clientHeight;
    if (!w || !h) return false;
    var hr = hero.getBoundingClientRect(), right = 0, bottom = 0;
    Array.prototype.forEach.call(hero.querySelectorAll('.ph-a, .ph-b, .ph-lead, .ph-d'), function (el) {
      var r = el.getBoundingClientRect();
      right = Math.max(right, r.right - hr.left); bottom = Math.max(bottom, r.bottom - hr.top);
    });
    var wrap = hero.querySelector('.wrap'), wr = wrap.getBoundingClientRect(), pr = parseFloat(getComputedStyle(wrap).paddingRight) || 0;
    var cx, cy, dpx;
    if (side.matches) {                     /* beside the title */
      var x0 = right + 40, x1 = wr.right - hr.left - pr;
      dpx = Math.min(h * 0.8, (x1 - x0) * 1.02);
      cx = (x0 + x1) / 2; cy = Math.max(96 + dpx / 2, h * 0.5);
    } else {                                /* below the title */
      var top = bottom + 20, room = h - top - 34;
      dpx = Math.min(room * 0.98, w * 0.98);
      cx = w / 2; cy = top + room * 0.5;
    }
    var span = MAXR * 2.1;                                           /* scene units across the whole map */
    var vh = h * span / dpx;
    var dist = vh / (2 * Math.tan(camera.fov * Math.PI / 360));
    camera.position.set(0, 0, dist);
    camera.lookAt(0, 0, 0);
    camera.aspect = w / h;
    camera.setViewOffset(w, h, -(cx - w / 2), -(cy - h / 2), w, h);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    LY = { w: w, h: h, cx: cx, cy: cy, dpx: dpx, hl: hr.left, ht: hr.top };
    if (keyEl) {
      keyEl.textContent = KEY;
      keyEl.style.left = Math.round(cx) + 'px';
      keyEl.style.top = Math.round(Math.min(cy + dpx * 0.47 + 6, h - 26)) + 'px';
    }
    return true;
  };

  /* ---- the mouse: leaning, bending, pointing, clicking ----------- */
  var mxT = 0, myT = 0, mx = 0, my = 0, mouse = false;
  var cur = { x: -9999, y: -9999, on: false };   /* the pointer, in hero pixels */
  var hover = -1, nucleusOver = false, pinned = -1, lastType = 'mouse';
  var M = new THREE.Matrix4(), V = new THREE.Vector4();
  var toScreen = function (p, out) {   /* a point in the map to hero pixels (and whether it is in front) */
    V.set(p.x, p.y, p.z, 1).applyMatrix4(M);
    out[0] = (V.x / V.w * 0.5 + 0.5) * LY.w;
    out[1] = (-V.y / V.w * 0.5 + 0.5) * LY.h;
    return V.w > 0;
  };
  var tipXY = [];   /* where each tip is on the screen, set every frame */
  var nearestTip = function (x, y, reach) {
    var best = -1, bd = reach * reach;
    for (var i = 0; i < strands.length; i++) {
      if (!tipXY[i] || strands[i].g < 0.98) continue;
      var dx = tipXY[i][0] - x, dy = tipXY[i][1] - y, dd = dx * dx + dy * dy;
      if (dd < bd) { bd = dd; best = i; }
    }
    return best;
  };
  var nuc = [0, 0], nucR = 30;
  var labelFor = -1;
  var showLabel = function (i) {
    if (!label) return;
    if (i < 0) { label.classList.remove('on'); labelFor = -1; return; }
    var s = strands[i];
    if (i !== labelFor) {
      labelFor = i;
      label.href = 'chart.html?c=' + encodeURIComponent(s.c.key);
      label.style.setProperty('--cc', 'var(--' + s.f.css + ')');
      label.innerHTML = '<b></b><span></span>';
      label.firstChild.textContent = s.c.name;
      label.lastChild.textContent = s.f.name + ' \u00b7 ' + s.f.ask + ' \u00b7 ' + s.c.rarity;
    }
    var x = tipXY[i][0], y = tipXY[i][1], lw = 250;
    var left = x + 16 + lw > LY.w - 8 ? x - lw - 16 : x + 16;
    label.style.left = Math.round(Math.max(8, left)) + 'px';
    label.style.top = Math.round(Math.max(8, Math.min(y - 22, LY.h - 90))) + 'px';
    label.classList.add('on');
  };
  var setCursor = function () { hero.style.cursor = (hover >= 0 || nucleusOver) ? 'pointer' : ''; };
  var dirty = true;   /* reduced motion only redraws when something changes */

  hero.addEventListener('pointermove', function (e) {
    lastType = e.pointerType;
    if (e.pointerType === 'touch' || !LY) return;
    var r = hero.getBoundingClientRect();
    cur.x = e.clientX - r.left; cur.y = e.clientY - r.top; cur.on = true;
    var h = nearestTip(cur.x, cur.y, 16);
    var nOver = Math.hypot(cur.x - nuc[0], cur.y - nuc[1]) < nucR;
    if (h !== hover) { hover = h; showLabel(h); dirty = true; }
    if (nOver !== nucleusOver) { nucleusOver = nOver; dirty = true; }
    setCursor();
  }, { passive: true });
  hero.addEventListener('pointerleave', function () {
    cur.on = false; cur.x = cur.y = -9999;
    if (lastType !== 'touch' && hover >= 0) { hover = -1; showLabel(-1); dirty = true; }
    nucleusOver = false; setCursor();
  });
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    mouse = true;
    if (hover >= 0) return;
    mxT = e.clientX / window.innerWidth - 0.5;
    myT = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  var ripple = 99;
  hero.addEventListener('pointerdown', function (e) {
    lastType = e.pointerType;
    if (!LY || e.target.closest('a, button, input')) return;   /* links (including the chart name) work as links */
    var r = hero.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    if (Math.hypot(x - nuc[0], y - nuc[1]) < nucR) { ripple = 0; dirty = true; return; }
    if (e.pointerType === 'touch') {   /* a tap shows the name; tapping the name opens the chart */
      var t = nearestTip(x, y, 26);
      if (t >= 0 || pinned >= 0) { pinned = t; hover = t; showLabel(t); dirty = true; }
    }
  });
  hero.addEventListener('click', function (e) {
    if (lastType === 'touch' || hover < 0 || e.target.closest('a, button, input')) return;
    window.location.href = 'chart.html?c=' + encodeURIComponent(strands[hover].c.key);
  });

  /* ---- one frame ------------------------------------------------- */
  var ease = function (k) { return 1 - Math.pow(1 - k, 1.6); };
  var P = new THREE.Vector3(), Q = new THREE.Vector3(), camR = new THREE.Vector3(), camU = new THREE.Vector3(), inv = new THREE.Quaternion();
  var XY = [0, 0], ZERO = new THREE.Vector3();
  var draw = function (t, dt) {
    root.updateMatrixWorld();
    M.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse).multiply(root.matrixWorld);
    /* the camera's right and up, as seen from inside the turning map, for pushing strands aside */
    inv.copy(root.quaternion).invert();
    camR.set(1, 0, 0).applyQuaternion(inv); camU.set(0, 1, 0).applyQuaternion(inv);
    var pxPerUnit = LY.dpx / (MAXR * 2.1), RAD = 95, PUSH = 0.7;
    var tp = tips.geometry.attributes.position.array, tc = tips.geometry.attributes.color.array;
    var bp = beads.geometry.attributes.position.array, bc = beads.geometry.attributes.color.array;
    var o = 0, fadeHover = hover >= 0 ? strands[hover].f : null;
    toScreen(ZERO, nuc);
    nucR = Math.max(22, NR * 1.3 * pxPerUnit);
    var ring = ripple < 4 ? ripple : 99;
    for (var i = 0; i < strands.length; i++) {
      var s = strands[i];
      s.g = reduce ? 1 : ease(Math.min(1, Math.max(0, (t - s.start) / GROW)));
      var dim = fadeHover ? (s.f === fadeHover ? (i === hover ? 1.5 : 1.1) : 0.22) : 1;
      var col = s.f.color, d = s.disp;
      /* the centerline, grown to s.g, bent away from the mouse */
      for (var k = 0; k < K; k++) {
        var u = (k / (K - 1)) * s.g, idx = u * (K - 1), k0 = Math.floor(idx), k1 = Math.min(K - 1, k0 + 1), fr = idx - k0;
        P.copy(s.pts[k0]).lerp(s.pts[k1], fr);
        var tx = 0, ty = 0, tz = 0;
        if (!reduce && cur.on && i !== hover && toScreen(P, XY)) {   /* the strand you point at stops bending away */
          var dx = XY[0] - cur.x, dy = XY[1] - cur.y, dd = Math.hypot(dx, dy);
          if (dd < RAD && dd > 0.01) {
            var m = PUSH * Math.pow(1 - dd / RAD, 2) * Math.pow(u, 0.8);
            tx = (camR.x * dx - camU.x * dy) / dd * m; ty = (camR.y * dx - camU.y * dy) / dd * m; tz = (camR.z * dx - camU.z * dy) / dd * m;
          }
        }
        var e = reduce ? 1 : 1 - Math.exp(-dt / 0.18);
        d[k * 3] += (tx - d[k * 3]) * e; d[k * 3 + 1] += (ty - d[k * 3 + 1]) * e; d[k * 3 + 2] += (tz - d[k * 3 + 2]) * e;
        s.sx[k] = P.x + d[k * 3]; s.sy[k] = P.y + d[k * 3 + 1];
        s.cz[k] = P.z + d[k * 3 + 2];
      }
      /* the fibers: tight at the base, fanning out toward the tip like fiber optics */
      for (var q = 0; q < FIB; q++) {
        var main = q === 0, ang = main ? 0 : s.fa[q - 1];
        var ca = Math.cos(ang), sa = Math.sin(ang);
        var px = 0, py = 0, pz = 0, pb = 0;
        for (k = 0; k < K; k++) {
          var uu = k / (K - 1);
          var spread = main ? 0 : (Math.pow(uu, 1.6) * 0.24 + 0.035 * Math.sin(t * 1.3 + s.ph + q + uu * 4)) * s.g;
          Q.set(s.sx[k], s.sy[k], s.cz[k]).addScaledVector(s.u, ca * spread).addScaledVector(s.v, sa * spread);
          var wave = ring < 99 ? Math.exp(-Math.pow((uu * s.g - ring * 0.85) * 7, 2)) * Math.exp(-ring * 0.7) * 2.4 : 0;
          var bright = (0.16 + 0.84 * Math.pow(uu, 1.3)) * (main ? 0.95 : 0.42) * dim + wave;
          if (k > 0) {
            fpos[o] = px; fpos[o + 1] = py; fpos[o + 2] = pz;
            fpos[o + 3] = Q.x; fpos[o + 4] = Q.y; fpos[o + 5] = Q.z;
            fcol[o] = col.r * pb; fcol[o + 1] = col.g * pb; fcol[o + 2] = col.b * pb;
            fcol[o + 3] = col.r * bright; fcol[o + 4] = col.g * bright; fcol[o + 5] = col.b * bright;
            o += 6;
          }
          px = Q.x; py = Q.y; pz = Q.z; pb = bright;
        }
      }
      /* the tip lights up once the strand has grown */
      var tipOn = Math.max(0, (s.g - 0.9) / 0.1) * (fadeHover && s.f !== fadeHover ? 0.3 : 1);
      tp[i * 3] = s.sx[K - 1]; tp[i * 3 + 1] = s.sy[K - 1]; tp[i * 3 + 2] = s.cz[K - 1];
      tc[i * 3] = Math.min(1, col.r * 1.15) * tipOn; tc[i * 3 + 1] = Math.min(1, col.g * 1.15) * tipOn; tc[i * 3 + 2] = Math.min(1, col.b * 1.15) * tipOn;
      /* tips are found by where they rest, so a tip does not slide away from the mouse reaching for it */
      tipXY[i] = tipXY[i] || [0, 0];
      toScreen(s.pts[K - 1], tipXY[i]);
      /* a bead of light traveling out along the grown strand */
      var bu = reduce ? -1 : (s.bead + t * s.beadSp) % 1;
      if (bu >= 0 && bu < s.g) {
        var bk = bu / s.g * (K - 1), b0 = Math.floor(bk), b1 = Math.min(K - 1, b0 + 1), bf = bk - b0;
        bp[i * 3] = s.sx[b0] + (s.sx[b1] - s.sx[b0]) * bf; bp[i * 3 + 1] = s.sy[b0] + (s.sy[b1] - s.sy[b0]) * bf; bp[i * 3 + 2] = s.cz[b0] + (s.cz[b1] - s.cz[b0]) * bf;
        var bb = Math.sin(Math.PI * bu) * (fadeHover && s.f !== fadeHover ? 0.2 : 0.85);
        bc[i * 3] = 0.6 + col.r * 0.4 * bb; bc[i * 3 + 1] = 0.6 + col.g * 0.4 * bb; bc[i * 3 + 2] = 0.6 + col.b * 0.4 * bb;
        bc[i * 3] *= bb; bc[i * 3 + 1] *= bb; bc[i * 3 + 2] *= bb;
      } else { bc[i * 3] = bc[i * 3 + 1] = bc[i * 3 + 2] = 0; }
    }
    fgeo.setDrawRange(0, o / 3);
    fgeo.attributes.position.needsUpdate = fgeo.attributes.color.needsUpdate = true;
    tips.geometry.attributes.position.needsUpdate = tips.geometry.attributes.color.needsUpdate = true;
    beads.geometry.attributes.position.needsUpdate = beads.geometry.attributes.color.needsUpdate = true;
    /* the tip being pointed at gets a bigger glow, and its label follows it */
    var pp = pick.geometry.attributes.position.array, pc = pick.geometry.attributes.color.array;
    if (hover >= 0) {
      pp[0] = tp[hover * 3]; pp[1] = tp[hover * 3 + 1]; pp[2] = tp[hover * 3 + 2];
      pc[0] = Math.min(1, strands[hover].f.color.r * 1.2); pc[1] = Math.min(1, strands[hover].f.color.g * 1.2); pc[2] = Math.min(1, strands[hover].f.color.b * 1.2);
    } else { pc[0] = pc[1] = pc[2] = 0; }
    pick.geometry.attributes.position.needsUpdate = pick.geometry.attributes.color.needsUpdate = true;
    /* the nucleus breathes, brightens when pointed at, and flashes with a ripple */
    var flash = ring < 99 ? Math.exp(-ring * 2.2) : 0;
    core.material.opacity = 0.7 + 0.12 * Math.sin(t * 1.4) + (nucleusOver ? 0.2 : 0) + flash * 0.6;
    core.scale.setScalar(NR * (3.4 + flash * 1.6));
    shell.material.opacity = 0.3 + (nucleusOver ? 0.25 : 0) + flash * 0.4;
    shell.rotation.y = t * 0.15; shell.rotation.x = t * 0.07;
    renderer.render(scene, camera);
  };

  /* ---- the loop ---------------------------------------------- */
  var t0 = null, last = null, onscreen = true, spin = 0;
  var frame = function (now) {
    requestAnimationFrame(frame);
    if (!onscreen || document.hidden || !LY) { last = null; return; }
    if (t0 === null) t0 = now;
    var dt = last === null ? 0.016 : Math.min(0.05, (now - last) / 1000);
    last = now;
    var t = (now - t0) / 1000;
    if (!mouse) { mxT = 0.3 * Math.sin(t * 0.25); myT = 0.18 * Math.sin(t * 0.19 + 1); }
    if (hover < 0) {   /* turns slowly and leans, and holds completely still while you point at a tip */
      mx += (mxT - mx) * 0.04; my += (myT - my) * 0.04;
      spin += dt * 0.07;
    }
    root.rotation.y = 0.5 + spin + mx * 0.5;
    root.rotation.x = 0.12 + my * 0.2;
    if (ripple < 99) ripple += dt;
    if (keyEl && t > 2.2) keyEl.classList.add('on');
    draw(t, dt);
    if (hover >= 0 && LY) showLabel(hover);
  };
  var still = function () {
    if (!LY) return;
    root.rotation.y = 0.5; root.rotation.x = 0.12;
    draw(10, 0.016);
    if (keyEl) keyEl.classList.add('on');
  };

  hero.classList.add('has-strands');   /* makes room for the map (see the page's styles) */
  if (!layout()) return;
  stage.classList.add('on');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { onscreen = en[0].isIntersecting; }, { threshold: 0 }).observe(hero);
  }
  var settle = function () { layout(); if (reduce) still(); };
  var rt = null;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(settle, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(settle);
  setTimeout(settle, 1300);
  if (reduce) {
    still();
    /* with motion off, the map only redraws when the pointer changes something */
    setInterval(function () { if (dirty) { dirty = false; if (ripple < 99) ripple = 99; still(); if (hover >= 0) showLabel(hover); } }, 120);
  } else {
    requestAnimationFrame(frame);
  }
})();
