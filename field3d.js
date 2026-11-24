/* ============================================================
   3D DATA FIELD (field3d.js)
   The slowly turning 3D scatterplot from recall(): about 1,100
   points that rise together like correlated data, with a faint
   wireframe regression plane through them. It leans toward the
   mouse and sinks and fades as the page scrolls.

   To put it on a page:
     1. add class="has-field3d" to the page's <main>
     2. make this the first thing inside <main>:
          <div class="field3d" data-field3d aria-hidden="true"></div>
     3. before </body>, add these two lines:
          <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
          <script src="field3d.js" defer></script>
        (for a page inside a folder, use ../field3d.js)
   The look of the layer (its height and fade) is in style.css,
   under "3D DATA FIELD".

   If three.js cannot load, or the device has no WebGL, the page
   simply shows without it. Anyone whose device asks for reduced
   motion sees one still frame.
   ============================================================ */
(function () {
  'use strict';
  var host = document.querySelector('[data-field3d]');
  if (!host || typeof THREE === 'undefined') return;
  var renderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
  catch (e) { return; }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* EDIT: the look */
  var POINTS = 1100;     /* how many points */
  var SLOPE = 0.42;      /* how steeply the cloud rises */
  var SHIFT_X = 4.5;     /* moves the cloud right, away from the page title */
  var POINT_OPACITY = 0.7, PLANE_OPACITY = 0.28;
  var NARROW = 700, QUIET = 0.5;   /* on screens narrower than 700 px, where text runs full width, the cloud is half as strong and sits lower */

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(host.clientWidth, host.clientHeight);
  host.appendChild(renderer.domElement);

  /* fog in the page's own background color, so far points fade into the page */
  var bg = (getComputedStyle(document.documentElement).getPropertyValue('--bg') || '').trim() || '#0E1116';
  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(new THREE.Color(bg), 22, 46);
  var camera = new THREE.PerspectiveCamera(55, host.clientWidth / Math.max(1, host.clientHeight), 0.1, 100);
  camera.position.set(0, 2.2, 24);

  var group = new THREE.Group();
  scene.add(group);

  /* the point cloud: y rises with x, plus noise, in the site's code colors (mostly blue) */
  var palette = [0x75AADB, 0x75AADB, 0x75AADB, 0x7FD18C, 0xB79CFF, 0xF0B95A].map(function (c) { return new THREE.Color(c); });
  var pos = new Float32Array(POINTS * 3), col = new Float32Array(POINTS * 3);
  var gauss = function () { return Math.random() + Math.random() + Math.random() - 1.5; };
  for (var i = 0; i < POINTS; i++) {
    var x = (Math.random() * 2 - 1) * 15;
    pos[i * 3] = x;
    pos[i * 3 + 1] = x * SLOPE + gauss() * 3.2;
    pos[i * 3 + 2] = (Math.random() * 2 - 1) * 9;
    var c = palette[Math.floor(Math.random() * palette.length)];
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  var pts = new THREE.Points(geo, new THREE.PointsMaterial({
    size: 0.16, vertexColors: true, transparent: true, opacity: POINT_OPACITY, sizeAttenuation: true, depthWrite: false
  }));
  group.add(pts);

  /* the regression plane: a faint wireframe tilted along the trend */
  var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(34, 22, 17, 11),
    new THREE.MeshBasicMaterial({ color: 0x2E3845, wireframe: true, transparent: true, opacity: PLANE_OPACITY })
  );
  plane.rotation.order = 'ZXY';
  plane.rotation.x = -Math.PI / 2;
  plane.rotation.z = Math.atan(SLOPE);
  group.add(plane);

  group.rotation.x = 0.12;
  group.position.x = SHIFT_X;

  var quiet = 1, drop = 0;
  var fit = function () { var n = host.clientWidth < NARROW; quiet = n ? QUIET : 1; drop = n ? -3 : 0; };
  fit();

  /* the cloud leans toward the mouse */
  var tx = 0, ty = 0, mx = 0, my = 0;
  window.addEventListener('pointermove', function (e) {
    tx = e.clientX / window.innerWidth - 0.5;
    ty = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  var resize = function () {
    var w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    fit();
    if (reduce) still();
  };
  window.addEventListener('resize', resize);

  /* only draw while the layer is on screen and the tab is visible */
  var onscreen = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { onscreen = en[0].isIntersecting; }, { threshold: 0 }).observe(host);
  }

  var t = 0, born = null;
  var frame = function (now) {
    requestAnimationFrame(frame);
    if (!onscreen || document.hidden) return;
    if (born === null) born = now;
    var fadeIn = Math.min(1, (now - born) / 1200);   /* eases in when the page opens */
    t += 0.0016;
    mx += (tx - mx) * 0.04;
    my += (ty - my) * 0.04;
    group.rotation.y = t + mx * 0.5;
    group.rotation.x = 0.12 + my * 0.3;
    var sc = Math.min(window.scrollY / window.innerHeight, 1);   /* sinks and fades as the page scrolls */
    group.position.y = drop - sc * 4;
    pts.material.opacity = POINT_OPACITY * quiet * (1 - sc * 0.7) * fadeIn;
    plane.material.opacity = PLANE_OPACITY * quiet * (1 - sc * 0.7) * fadeIn;
    renderer.render(scene, camera);
  };

  /* one still frame, no motion */
  var still = function () {
    group.position.y = drop;
    pts.material.opacity = POINT_OPACITY * quiet;
    plane.material.opacity = PLANE_OPACITY * quiet;
    renderer.render(scene, camera);
  };
  if (reduce) still();
  else requestAnimationFrame(frame);
})();
