/* ============================================================
   DEEP DIVES HERO (polyhero.js)
   A 3D coordinate plane: a floor grid of squares, each cut into
   two right triangles (the same grid as recall() and the Practice
   page). One at a time, a shape for each deep dive is built out of
   that grid: triangles light up in their grid squares, lift out, and
   fly into place to form the shape. The shape holds for a few
   seconds, then falls apart back into the grid, and the next one
   builds. The scene leans toward the mouse (on a phone it drifts).

   The shapes, in order:
     1. a basketball .................. NBA Game Explorer
     2. a score line, with a run and a timeout ... Which NBA coaches stop runs?
     3. the outline of Ohio, with Columbus marked  Where Ohio's school money goes
   Each shape is drawn on the same triangle grid it is built from.
   The outline of Ohio comes from the U.S. Census Bureau's state
   boundaries (the us-atlas files, ISC license), simplified.

   Needs three.js (loaded before this file) and, in the page:
     <div class="poly-stage" data-polyhero aria-hidden="true"></div>
     <p class="poly-cap" id="polyCap" aria-hidden="true"></p>
   inside the hero. If three.js cannot load, or the device has no
   WebGL, the page shows without the animation. Anyone whose device
   asks for reduced motion sees the first shape, built and still.
   ============================================================ */
(function () {
  'use strict';
  var stage = document.querySelector('[data-polyhero]');
  if (!stage || typeof THREE === 'undefined') return;
  var hero = stage.parentElement;
  var capEl = document.getElementById('polyCap');
  var renderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
  catch (e) { return; }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- EDIT: the captions under each shape, and the timing ---- */
  var CAPTIONS = ['NBA Game Explorer', 'Which NBA coaches stop runs?', "Where Ohio's school money goes"];
  var BUILD = 2.6, HOLD = 3.8, BREAK = 1.9, REST = 0.5;   /* seconds for each part of one shape */

  var S = 0.8;          /* the side of one grid square, in scene units */
  var SHAPE_H = 11;     /* every shape is 11 units tall */
  var BASE = 0.35;      /* shapes float this far above the floor */
  var SHRINK = 0.86;    /* each triangle is drawn a little smaller, so the grid shows between them */
  var COL = {           /* the site's code colors */
    blue: [0x75, 0xAA, 0xDB], green: [0x7F, 0xD1, 0x8C], violet: [0xB7, 0x9C, 0xFF],
    amber: [0xF0, 0xB9, 0x5A], red: [0xF2, 0x71, 0x6F], pale: [0xC9, 0xD3, 0xE6], axis: [0x5A, 0x66, 0x78], seam: [0x2A, 0x22, 0x18]
  };
  var bgHex = (getComputedStyle(document.documentElement).getPropertyValue('--bg') || '').trim() || '#0E1116';
  var BG = new THREE.Color(bgHex);

  /* a repeatable random number, so the shading and timing look the same on every visit */
  var seed = 7;
  var rand = function () { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  var clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };

  /* ---- the shapes, drawn on the triangle grid --------------------- */
  /* every grid square (x0, y0) is cut by its diagonal into two right triangles; a triangle
     belongs to the shape when its center does, and paint() gives it a color */
  var cut = function (halfW, paint) {
    var tiles = [];
    for (var y0 = 0; y0 < SHAPE_H; y0 += S) {
      for (var x0 = -Math.ceil(halfW / S) * S; x0 < halfW; x0 += S) {
        var tri = [
          [[0, 0], [S, 0], [S, S]],   /* lower right half */
          [[0, 0], [S, S], [0, S]]    /* upper left half */
        ];
        for (var k = 0; k < 2; k++) {
          var cx = x0 + (tri[k][0][0] + tri[k][1][0] + tri[k][2][0]) / 3;
          var cy = y0 + (tri[k][0][1] + tri[k][1][1] + tri[k][2][1]) / 3;
          var c = paint(cx, cy);
          if (c) tiles.push({ x0: x0, y0: y0, v: tri[k], cx: cx, cy: cy, rgb: c });
        }
      }
    }
    return tiles;
  };
  var shade = function (rgb, f) { return [Math.min(1, rgb[0] * f / 255), Math.min(1, rgb[1] * f / 255), Math.min(1, rgb[2] * f / 255)]; };   /* f: 1 is the color itself */

  /* 1. a basketball: an amber ball, lit from the upper left, with dark seams */
  var R = 5.4, BC = SHAPE_H / 2;
  var ball = cut(R + 0.4, function (x, y) {
    var dx = x, dy = y - BC, d = Math.hypot(dx, dy);
    if (d > R) return null;
    var arc = Math.abs(Math.hypot(Math.abs(dx) - R * 1.42, dy) - R * 1.07);
    if (Math.abs(dx) < 0.34 || Math.abs(dy) < 0.34 || arc < 0.36) return shade(COL.seam, 1);
    return shade(COL.amber, clamp(0.86 + 0.22 * ((-dx * 0.55 + dy * 0.8) / R) + (rand() - 0.5) * 0.12, 0.55, 1.12));
  });

  /* 2. a score line: the score difference through part of a game. The team gives up a run
     (red, below the middle line), a timeout stops it (the dashed line), and they climb back
     (the same shape as the coaches card below) */
  var steps = [[40, 90, 160], [90, 130, 146], [130, 170, 152], [170, 210, 132], [210, 250, 140], [250, 300, 124], [300, 318, 140],
    [318, 336, 158], [336, 352, 176], [352, 370, 196], [370, 396, 214], [396, 430, 206], [430, 470, 192], [470, 510, 178], [510, 560, 170]];
  var LW = 6.75, V0 = 0.3 + 54 * (10.4 / 90), VK = 10.4 / 90;     /* the middle line sits at V0 */
  var ux = function (px) { return (px - 300) / 520 * LW * 2; };
  var TO = ux(396);                                                  /* the timeout */
  /* drawn column by column, the way the explorer draws it: a bright stepped line, a dim area
     between it and the middle line, the middle line itself, and the timeout as a dashed column */
  var colVal = function (c) {
    var x = c * S + S / 2;
    for (var i = 0; i < steps.length; i++) if (x >= ux(steps[i][0]) && x < ux(steps[i][1])) return V0 + (160 - steps[i][2]) * VK;
    return null;
  };
  var rowOf = function (v) { return Math.floor(v / S); };
  var R0 = rowOf(V0), TOC = Math.floor(TO / S);
  var line = cut(LW, function (x, y) {
    var c = Math.floor(x / S), v = colVal(c);
    if (v === null) return null;
    var r = rowOf(y), rv = rowOf(v), prev = colVal(c - 1), rp = prev === null ? rv : rowOf(prev);
    var hue = v >= V0 ? COL.amber : COL.red;
    if (c === TOC && r % 2 === 0) return shade(COL.pale, 0.75);                                    /* the timeout */
    if (r >= Math.min(rp, rv) && r <= Math.max(rp, rv)) return shade(hue, 1.1 + (rand() - 0.5) * 0.1);   /* the stepped line */
    if (r === R0) return shade(COL.axis, 1);                                                        /* the middle line */
    if ((r > R0 && r < rv) || (r < R0 && r > rv)) return shade(hue, 0.42 + (rand() - 0.5) * 0.08);  /* the area */
    return null;
  });

  /* 3. the outline of Ohio (longitude, latitude), with Columbus marked */
  var OH = [-84.81,41.7,-83.45,41.73,-82.93,41.51,-82.84,41.59,-82.72,41.54,-82.62,41.43,-82.48,41.38,-82.01,41.52,-81.74,41.49,-81.29,41.76,-80.52,41.98,-80.52,40.64,-80.67,40.57,-80.6,40.46,-80.6,40.32,-80.74,40.08,-80.76,39.91,-80.8,39.92,-80.79,39.87,-80.87,39.76,-80.83,39.71,-80.88,39.62,-81.21,39.39,-81.39,39.34,-81.47,39.4,-81.56,39.34,-81.57,39.27,-81.68,39.27,-81.73,39.22,-81.74,39.1,-81.81,39.08,-81.77,39.02,-81.78,38.92,-81.81,38.95,-81.89,38.87,-81.94,38.99,-82.03,39.03,-82.14,38.84,-82.22,38.8,-82.17,38.62,-82.29,38.58,-82.32,38.45,-82.53,38.41,-82.72,38.56,-82.85,38.59,-82.89,38.76,-83.02,38.73,-83.16,38.62,-83.31,38.6,-83.37,38.66,-83.52,38.7,-83.66,38.63,-83.95,38.79,-84.21,38.81,-84.33,39.03,-84.43,39.06,-84.44,39.11,-84.6,39.07,-84.76,39.15,-84.82,39.11];
  var LAT0 = 38.41, LAT1 = 41.98, LONC = -82.67, KX = Math.cos(40.2 * Math.PI / 180), SC = SHAPE_H / (LAT1 - LAT0);
  var toLocal = function (lon, lat) { return [(lon - LONC) * KX * SC, (lat - LAT0) * SC]; };
  var poly = [];
  for (var i = 0; i < OH.length; i += 2) poly.push(toLocal(OH[i], OH[i + 1]));
  var inside = function (x, y) {
    var c = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      if ((poly[i][1] > y) !== (poly[j][1] > y) && x < (poly[j][0] - poly[i][0]) * (y - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0]) c = !c;
    }
    return c;
  };
  var CMH = toLocal(-82.9988, 39.9612);   /* Columbus */
  var ohio = cut(5.4, function (x, y) {
    if (!inside(x, y)) return null;
    if (Math.hypot(x - CMH[0], y - CMH[1]) < 0.42) return shade(COL.amber, 1.15);
    return shade(COL.green, clamp(0.8 + 0.16 * (y / SHAPE_H) + (rand() - 0.5) * 0.14, 0.55, 1.1));
  });
  var SHAPES = [ball, line, ohio];
  var MAX = Math.max(ball.length, line.length, ohio.length);

  /* ---- the scene ---------------------------------------------- */
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  stage.appendChild(renderer.domElement);
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
  var root = new THREE.Group();
  scene.add(root);

  /* the floor: grid lines every S units, a diagonal through every square, and two brighter axes */
  var GX = 24, GZ0 = -36, GZ1 = 14.4, seg = [];   /* edges on whole squares, so the axes are grid lines */
  for (var gx = -GX; gx <= GX + 1e-6; gx += S) seg.push(gx, 0, GZ0, gx, 0, GZ1);
  for (var gz = GZ0; gz <= GZ1 + 1e-6; gz += S) seg.push(-GX, 0, gz, GX, 0, gz);
  for (gx = -GX; gx < GX - 1e-6; gx += S) for (gz = GZ0; gz < GZ1 - 1e-6; gz += S) seg.push(gx, 0, gz + S, gx + S, 0, gz);
  var gridGeo = new THREE.BufferGeometry();
  gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(seg, 3));
  var gridMat = new THREE.LineBasicMaterial({ color: 0x2E3845, transparent: true, opacity: 0.55 });
  root.add(new THREE.LineSegments(gridGeo, gridMat));
  var axisGeo = new THREE.BufferGeometry();
  axisGeo.setAttribute('position', new THREE.Float32BufferAttribute([-GX, 0.01, 0, GX, 0.01, 0, 0, 0.01, GZ0, 0, 0.01, GZ1], 3));
  var axisMat = new THREE.LineBasicMaterial({ color: 0x55627A, transparent: true, opacity: 0.8 });
  root.add(new THREE.LineSegments(axisGeo, axisMat));

  /* the triangles: one mesh, moved by hand every frame */
  var pos = new Float32Array(MAX * 9), col = new Float32Array(MAX * 9);
  var tileGeo = new THREE.BufferGeometry();
  tileGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  tileGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  var tileMesh = new THREE.Mesh(tileGeo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide }));
  tileMesh.frustumCulled = false;
  root.add(tileMesh);

  /* ---- each shape's trip: from grid squares on the floor, into place, and back down ---- */
  var cells = function (n, cx, cz, spread, used) {
    var list = [];
    for (var x = -12; x < 12; x++) for (var z = -8; z < 12; z++) {
      var key = x + ',' + z;
      if (used && used[key]) continue;
      var d = Math.hypot(x * S - cx, (z * S - cz) * 1.4) + rand() * spread;
      list.push({ x: x * S, z: z * S, d: d, key: key });
    }
    list.sort(function (a, b) { return a.d - b.d; });
    return list.slice(0, n);
  };
  /* a triangle lying in grid square (x, z): its "up" points away from the camera */
  var floorTri = function (t, c) {
    return t.v.map(function (p) { return [c.x + p[0], 0.02, c.z + S - p[1]]; });
  };
  var shrink = function (tri) {
    var mx = (tri[0][0] + tri[1][0] + tri[2][0]) / 3, my = (tri[0][1] + tri[1][1] + tri[2][1]) / 3, mz = (tri[0][2] + tri[1][2] + tri[2][2]) / 3;
    return tri.map(function (p) { return [mx + (p[0] - mx) * SHRINK, my + (p[1] - my) * SHRINK, mz + (p[2] - mz) * SHRINK]; });
  };
  var plans = SHAPES.map(function (tiles) {
    var order = tiles.slice().sort(function (a, b) { return (a.cy + rand() * 2.2) - (b.cy + rand() * 2.2); });   /* builds from the bottom up */
    var from = cells(order.length, 0, 2.5, 3.2, null), used = {};
    from.forEach(function (c) { used[c.key] = 1; });
    var to = cells(order.length, 0, 1.5, 9, null);
    return order.map(function (t, i) {
      return {
        t: t,
        up: shrink(t.v.map(function (p) { return [t.x0 + p[0], BASE + t.y0 + p[1], 0]; })),
        src: shrink(floorTri(t, from[i])),
        dst: shrink(floorTri(t, to[(i * 7) % to.length])),
        d1: (i / order.length) * 1.35 + rand() * 0.25,     /* when it lifts off */
        d2: rand() * 0.75,                                  /* when it falls */
        arc: 1.3 + rand() * 1.6,
        rgb: t.rgb
      };
    });
  });

  var ease = function (x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  var CYCLE = BUILD + HOLD + BREAK + REST, FLY = 1.1, GLOW = 0.35, FALL = 0.85, FADE = 0.45;
  var lerp3 = function (a, b, e) { return [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e, a[2] + (b[2] - a[2]) * e]; };
  var put = function (k, tri, rgb, alpha) {
    var o = k * 9;
    for (var v = 0; v < 3; v++) {
      pos[o + v * 3] = tri[v][0]; pos[o + v * 3 + 1] = tri[v][1]; pos[o + v * 3 + 2] = tri[v][2];
      col[o + v * 3] = BG.r + (rgb[0] - BG.r) * alpha;
      col[o + v * 3 + 1] = BG.g + (rgb[1] - BG.g) * alpha;
      col[o + v * 3 + 2] = BG.b + (rgb[2] - BG.b) * alpha;
    }
  };
  var hide = function (k) { for (var j = 0; j < 9; j++) pos[k * 9 + j] = 0; };

  /* one moment of one shape: s is the shape, tc the seconds into its turn, yaw its gentle sway */
  var place = function (s, tc, yaw) {
    var plan = plans[s], cy = Math.cos(yaw), sy = Math.sin(yaw);
    var turn = function (tri) { return tri.map(function (p) { return [p[0] * cy, p[1], -p[0] * sy]; }); };
    for (var k = 0; k < MAX; k++) {
      var q = plan[k];
      if (!q) { hide(k); continue; }
      var up = turn(q.up);
      if (tc < BUILD + HOLD) {
        var p = (tc - q.d1) / FLY;
        if (p * FLY < -GLOW) { hide(k); continue; }
        if (p < 0) { put(k, q.src, q.rgb, 1 + p * FLY / GLOW); continue; }   /* lights up in its grid square */
        var e = ease(Math.min(1, p));
        var a = Math.sin(Math.PI * e) * q.arc;
        put(k, [lerp3(q.src[0], up[0], e), lerp3(q.src[1], up[1], e), lerp3(q.src[2], up[2], e)].map(function (v) { return [v[0], v[1] + a, v[2]]; }), q.rgb, 1);
      } else {
        var f = (tc - BUILD - HOLD - q.d2) / FALL;
        if (f < 0) { put(k, up, q.rgb, 1); continue; }
        var g = Math.min(1, f), ge = g * g;
        var fade = f <= 1 ? 1 : 1 - (f - 1) * FALL / FADE;
        if (fade <= 0) { hide(k); continue; }
        var b = Math.sin(Math.PI * g) * 0.9;
        put(k, [lerp3(up[0], q.dst[0], ge), lerp3(up[1], q.dst[1], ge), lerp3(up[2], q.dst[2], ge)].map(function (v) { return [v[0], v[1] + b, v[2]]; }), q.rgb, fade);
      }
    }
    tileGeo.attributes.position.needsUpdate = true;
    tileGeo.attributes.color.needsUpdate = true;
  };

  /* ---- where the shape sits on the screen ----------------------- */
  var L = null;
  var side = window.matchMedia('(min-width: 1000px)');
  var layout = function () {
    var w = hero.clientWidth, h = hero.clientHeight;
    if (!w || !h) return false;
    var hr = hero.getBoundingClientRect(), right = 0, bottom = 0;
    Array.prototype.forEach.call(hero.querySelectorAll('.ph-a, .ph-b, .ph-lead'), function (el) {
      var r = el.getBoundingClientRect();
      right = Math.max(right, r.right - hr.left); bottom = Math.max(bottom, r.bottom - hr.top);
    });
    var wrap = hero.querySelector('.wrap'), wr = wrap.getBoundingClientRect(), pr = parseFloat(getComputedStyle(wrap).paddingRight) || 0;
    var cx, cy, hpx;
    if (side.matches) {                     /* beside the title */
      var x0 = right + 48, x1 = wr.right - hr.left - pr;
      hpx = Math.min(h * 0.6, (x1 - x0) * 0.9 * SHAPE_H / (LW * 2));
      cx = (x0 + x1) / 2; cy = Math.max(110 + hpx / 2, h * 0.5);
    } else {                                /* below the title */
      var top = bottom + 28, room = h - top - 24;
      hpx = Math.min(room * 0.78, (w - 40) * 0.9 * SHAPE_H / (LW * 2));
      cx = w / 2; cy = top + room * 0.44;
    }
    var vh = h * SHAPE_H / hpx;                                     /* scene units visible from top to bottom */
    var dist = vh / (2 * Math.tan(camera.fov * Math.PI / 360));
    var pitch = 0.2, aim = new THREE.Vector3(0, BASE + SHAPE_H / 2, 0);
    camera.position.set(0, aim.y + dist * Math.sin(pitch), dist * Math.cos(pitch));
    camera.lookAt(aim);
    camera.aspect = w / h;
    camera.near = Math.max(0.1, dist - 30); camera.far = dist + 60;
    camera.setViewOffset(w, h, -(cx - w / 2), -(cy - h / 2), w, h);
    camera.updateProjectionMatrix();
    scene.fog = new THREE.Fog(BG, dist + 2, dist + 34);             /* the far floor fades into the page */
    renderer.setSize(w, h);
    L = { w: w, h: h, cx: cx, cy: cy, hpx: hpx };
    if (capEl) { capEl.style.left = Math.round(cx) + 'px'; capEl.style.top = Math.round(cy + hpx / 2 + 18) + 'px'; }
    return true;
  };

  /* ---- the loop ------------------------------------------------- */
  var tx = 0, ty = 0, mx = 0, my = 0, mouse = false;
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    mouse = true;
    tx = e.clientX / window.innerWidth - 0.5;
    ty = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  var lastCap = -1;
  var caption = function (s, on) {
    if (!capEl) return;
    if (s !== lastCap) { capEl.textContent = String(s + 1).padStart(2, '0') + ' / ' + CAPTIONS[s]; lastCap = s; }
    capEl.classList.toggle('on', on);
  };

  var t0 = null, onscreen = true;
  var frame = function (now) {
    requestAnimationFrame(frame);
    if (!onscreen || document.hidden || !L) return;
    if (t0 === null) t0 = now - 0.2 * 1000;
    var t = (now - t0) / 1000;
    var s = Math.floor(t / CYCLE) % SHAPES.length, tc = t % CYCLE;
    if (!mouse) { tx = 0.35 * Math.sin(t * 0.3); ty = 0.2 * Math.sin(t * 0.21 + 1); }
    mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
    root.rotation.y = mx * 0.45;
    root.rotation.x = my * 0.1;
    place(s, tc, 0.22 * Math.sin(t * 0.45));
    caption(s, tc > BUILD - 0.3 && tc < BUILD + HOLD);
    renderer.render(scene, camera);
  };

  var still = function () {
    if (!layout()) return;
    place(0, BUILD, 0);
    caption(0, true);
    renderer.render(scene, camera);
  };

  hero.classList.add('has-poly');   /* makes room for the shape (see the page's styles) */
  if (!layout()) return;
  stage.classList.add('on');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { onscreen = en[0].isIntersecting; }, { threshold: 0 }).observe(hero);
  }
  var rt = null;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { if (reduce) still(); else layout(); }, 120);
  });
  /* the title settles after its fonts load and it slides in, so place the shape again then */
  var settle = function () { if (reduce) still(); else layout(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(settle);
  setTimeout(settle, 1300);
  if (reduce) still();
  else requestAnimationFrame(frame);
})();
