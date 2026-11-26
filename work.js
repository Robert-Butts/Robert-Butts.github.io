/* ============================================================
   ROBERT BUTTS · PORTFOLIO  ·  work.js
   Loaded only by work.html, after site.js and journey.js. When journey.js
   shows the 3D path, this file does nothing. Otherwise it handles:
     1. the parallax: each featured project gets a number (--p) for
        where it sits on screen, eased so layers glide into place
     2. the masked title reveal and the side list of projects
     3. gentle snapping, so a short scroll settles on the next project
     4. the cursor light and the small "what a click does" label
     5. the image that grows to fill the screen before a project page opens
   Anyone who prefers reduced motion gets a still page with no snapping.

   Settings you can change:
     SNAP   set to false to turn off the snapping between projects
     EASE   how quickly the layers catch up to the scroll (0.05 floaty, 0.2 tight)
============================================================ */
(function(){
  "use strict";
  /* journey.js (the 3D path) runs the page instead when the device can show it */
  if(window.WORK_3D || window.WORK_JOURNEY){ return; }   /* a 3D version of the page (journey.js) is running */
  var SNAP = true;
  var EASE = 0.1;

  var scenes = [].slice.call(document.querySelectorAll('.scene'));
  if(!scenes.length){ return; }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer:fine)').matches;
  var body = document.body;
  var nav = document.getElementById('nav');
  var railLinks = [].slice.call(document.querySelectorAll('.rail a'));

  function clamp(v, lo, hi){ return Math.min(hi, Math.max(lo, v)); }
  function navH(){ return nav ? nav.offsetHeight : 0; }
  function wide(){ return window.innerWidth > 900 && window.innerHeight > 560; }

  var state = scenes.map(function(el){ return {el:el, p:1, target:1, on:false}; });
  var active = -1;

  /* ---- where each scene sits, from -1 (above) to 1 (below) ---- */
  function measure(){
    var top = navH();
    var mid = top + (window.innerHeight - top) / 2;
    var vh = window.innerHeight;
    var best = -1, bestD = Infinity;
    state.forEach(function(st, i){
      var r = st.el.getBoundingClientRect();
      st.target = clamp((r.top + r.height / 2 - mid) / vh, -1.25, 1.25);
      st.near = r.bottom > -vh * 0.3 && r.top < vh * 1.3;
      var d = Math.abs(st.target);
      if(d < bestD){ bestD = d; best = i; }

      /* titles reveal near the center and hide again once well out of view */
      if(!st.on && d < 0.42){ st.on = true; st.el.classList.add('on'); }
      else if(st.on && d > 0.95){ st.on = false; st.el.classList.remove('on'); }
    });
    setActive(bestD < 0.45 ? best : -1);
  }

  function setActive(i){
    if(i === active){ return; }
    active = i;
    body.classList.toggle('rail-on', i !== -1);
    railLinks.forEach(function(a, j){
      a.classList.toggle('is-active', j === i);
      if(j === i){ a.setAttribute('aria-current', 'true'); } else { a.removeAttribute('aria-current'); }
    });
  }

  /* ---- reduced motion: no parallax, just keep the side list in step ---- */
  if(reduce){
    state.forEach(function(st){ st.on = true; st.el.classList.add('on'); });
    measure();
    window.addEventListener('scroll', measure, {passive:true});
    window.addEventListener('resize', measure);
    return;
  }

  /* titles and details start hidden only once this script is running */
  document.documentElement.classList.add('work-motion');

  /* ---- 1 + 2. the animation loop (runs only while needed) ---- */
  var lastY = window.scrollY, vel = 0, raf = null;

  function frame(){
    raf = null;
    measure();
    var y = window.scrollY;
    vel += ((y - lastY) - vel) * 0.14;
    lastY = y;
    var skew = wide() ? clamp(vel * -0.04, -1.6, 1.6) : 0;
    var moving = Math.abs(vel) > 0.05;

    state.forEach(function(st){
      var gap = st.target - st.p;
      st.p += gap * EASE;
      if(Math.abs(gap) < 0.0005){ st.p = st.target; } else { moving = true; }
      if(!st.near){ return; }
      var k = clamp((Math.abs(st.p) - 0.08) * 0.11, 0, 0.07);
      var s = st.el.style;
      s.setProperty('--p', st.p.toFixed(4));
      s.setProperty('--k', k.toFixed(4));
      s.setProperty('--skew', skew.toFixed(3) + 'deg');
    });
    if(moving){ kick(); }
  }
  function kick(){ if(!raf){ raf = requestAnimationFrame(frame); } }

  /* start every scene at its true spot so nothing slides in on page load */
  measure();
  state.forEach(function(st){ st.p = st.target; });
  frame();

  window.addEventListener('scroll', kick, {passive:true});
  window.addEventListener('resize', kick);

  /* ---- 3. gentle snapping between projects ----
     When the scrolling stops and a project is on screen, the page settles on a
     project: any scroll down moves on to the next one, any scroll up goes back
     one. Above the first project and below the last one, scrolling stays free.
     Only on wide screens with a mouse or trackpad. */
  var idle = null, snapping = false, restY = window.scrollY;

  function settle(){
    var y = window.scrollY;
    if(snapping){ snapping = false; restY = y; return; }       /* our own snap just finished */
    if(!SNAP || !finePointer || !wide()){ restY = y; return; }
    var dir = y > restY + 1 ? 1 : (y < restY - 1 ? -1 : 0);
    restY = y;
    if(!dir){ return; }

    var top = navH();
    var starts = state.map(function(st){ return st.el.getBoundingClientRect().top + y - top; });
    var n = starts.length, step = n > 1 ? starts[1] - starts[0] : window.innerHeight;

    /* f is the position counted in projects: 1.3 means 30% of the way from the second to the third */
    var f;
    if(y < starts[0]){ f = (y - starts[0]) / step; }
    else if(y >= starts[n - 1]){ f = (n - 1) + (y - starts[n - 1]) / step; }
    else{
      for(var i = 0; i < n - 1; i++){
        if(y < starts[i + 1]){ f = i + (y - starts[i]) / (starts[i + 1] - starts[i]); break; }
      }
    }
    if(f < -0.6){ return; }                                     /* still reading the intro */

    var whole = Math.floor(f), part = f - whole;
    var goal = dir > 0 ? (part > 0.01 ? whole + 1 : whole) : (part < 0.99 ? whole : whole + 1);
    if(goal < 0 || goal > n - 1){ return; }                    /* leaving the stage: let it go */
    var to = starts[goal];
    if(Math.abs(to - y) < 3){ return; }
    snapping = true;
    restY = to;
    window.scrollTo({top:to, behavior:'smooth'});
  }

  /* wait until the wheel, trackpad, or keys have been quiet for a moment */
  function later(){ clearTimeout(idle); idle = setTimeout(settle, 190); }
  window.addEventListener('scroll', later, {passive:true});
  /* new input during a snap means the person is steering again */
  function takeOver(){ if(snapping){ snapping = false; restY = window.scrollY; } }
  window.addEventListener('wheel', function(){ takeOver(); later(); }, {passive:true});
  window.addEventListener('pointerdown', takeOver, {passive:true});
  window.addEventListener('keydown', takeOver);

  /* ---- 4. cursor light and label ---- */
  if(finePointer){
    var chip = document.createElement('div');
    chip.className = 'cursor-chip';
    chip.setAttribute('aria-hidden', 'true');
    body.appendChild(chip);
    var cx = 0, cy = 0, tx = 0, ty = 0, chipRaf = null;

    function chipLoop(){
      cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
      chip.style.transform = 'translate(' + (cx + 16).toFixed(1) + 'px,' + (cy + 18).toFixed(1) + 'px)';
      chipRaf = (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.3) ? requestAnimationFrame(chipLoop) : null;
    }

    document.querySelectorAll('.frame').forEach(function(fr){
      var scene = fr.closest('.scene');
      fr.addEventListener('pointerenter', function(e){
        chip.textContent = fr.getAttribute('data-cursor') || 'Open';
        chip.style.setProperty('--cc', getComputedStyle(scene).getPropertyValue('--cc'));
        cx = tx = e.clientX; cy = ty = e.clientY;
        chip.style.transform = 'translate(' + (cx + 16) + 'px,' + (cy + 18) + 'px)';
        chip.classList.add('show');
      });
      fr.addEventListener('pointermove', function(e){
        var r = fr.getBoundingClientRect();
        fr.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px');
        fr.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px');
        tx = e.clientX; ty = e.clientY;
        if(!chipRaf){ chipRaf = requestAnimationFrame(chipLoop); }
      });
      fr.addEventListener('pointerleave', function(){ chip.classList.remove('show'); });
    });
    window.addEventListener('scroll', function(){ chip.classList.remove('show'); }, {passive:true});
  }

  /* ---- 5. the image grows to fill the screen, then the project page opens ----
     A photo frame (frame-photo) grows its photo. A screenshot frame (frame-shot)
     grows its lit background with the screenshot centered on it. With reduced
     motion, the link simply opens the page. */
  document.querySelectorAll('[data-expand]').forEach(function(link){
    link.addEventListener('click', function(e){
      if(reduce || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey){ return; }
      var scene = link.closest('.scene');
      var fr = scene && scene.querySelector('.frame');
      var img = fr && fr.querySelector('img.cover');
      var shot = fr && !img && fr.querySelector('.shot:not(.no-img) img');
      if(!fr || (!img && !shot)){ return; }
      e.preventDefault();
      var r = fr.getBoundingClientRect();
      var W = window.innerWidth, H = window.innerHeight;
      var wipe = document.createElement('div');
      wipe.className = 'wipe';
      if(img){
        wipe.style.backgroundImage = 'url("' + (img.currentSrc || img.src) + '")';
      } else {
        wipe.style.backgroundImage = 'url("' + (shot.currentSrc || shot.src) + '"), ' + getComputedStyle(fr).backgroundImage;
        wipe.style.backgroundSize = 'min(82%, 1500px) auto, 100% 100%, 100% 100%';
        wipe.style.backgroundPosition = 'center 46%, center, center';
        wipe.style.backgroundRepeat = 'no-repeat';
      }
      wipe.style.clipPath = 'inset(' + Math.max(0, r.top) + 'px ' + Math.max(0, W - r.right) + 'px ' +
        Math.max(0, H - r.bottom) + 'px ' + Math.max(0, r.left) + 'px round 22px)';
      body.appendChild(wipe);
      wipe.getBoundingClientRect();
      wipe.style.transition = 'clip-path .7s cubic-bezier(.7,0,.2,1)';
      wipe.style.clipPath = 'inset(0px 0px 0px 0px round 0px)';
      setTimeout(function(){ window.location.href = link.getAttribute('href'); }, 720);
    });
  });
  /* coming back with the browser's back button: remove the leftover overlay */
  window.addEventListener('pageshow', function(e){
    if(e.persisted){ document.querySelectorAll('.wipe').forEach(function(w){ w.remove(); }); }
  });
})();
