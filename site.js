/* ============================================================
   ROBERT BUTTS · PORTFOLIO  ·  site.js
   Loaded by every page. It handles:
     1. the animated data field behind the hero (home only)
     2. the page-load reveal sequence
     3. scroll-triggered reveals for sections
     4. a border on the menu once the page scrolls
     5. animated counters in the run-log strip
     6. gentle magnetic pull on primary buttons
     7. a subtle 3D tilt on cards
     8. the mobile menu open and close behavior
   Every motion is skipped for anyone who prefers reduced motion.
============================================================ */
(function(){
  "use strict";
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  if(!reduce){ root.classList.add('js-anim'); }

  /* ---- 1. animated data field (home hero) --------------- */
  var field = document.getElementById('heroField');
  if(field){
    var canvas = document.createElement('canvas');
    field.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var points = [];
    var mouse = {x:-9999, y:-9999};
    var COLORS = ['#75AADB','#75AADB','#75AADB','#7FD18C','#B79CFF','#F0B95A'];
    var LINK = 132;      /* max distance to draw a link  */

    function size(){
      W = field.clientWidth; H = field.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function build(){
      var target = Math.round(Math.min(90, Math.max(34, (W * H) / 17000)));
      points = [];
      for(var i = 0; i < target; i++){
        points.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - .5) * .28,
          vy: (Math.random() - .5) * .28,
          r: Math.random() < .16 ? 2.6 : 1.6,
          c: COLORS[(Math.random() * COLORS.length) | 0]
        });
      }
    }

    function frame(){
      ctx.clearRect(0, 0, W, H);

      /* links first, so dots sit on top */
      for(var i = 0; i < points.length; i++){
        var a = points[i];
        for(var j = i + 1; j < points.length; j++){
          var b = points[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if(dist < LINK){
            var o = (1 - dist / LINK) * .5;
            ctx.strokeStyle = 'rgba(117,170,219,' + o.toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      for(var k = 0; k < points.length; k++){
        var p = points[k];
        /* drift */
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0 || p.x > W) p.vx *= -1;
        if(p.y < 0 || p.y > H) p.vy *= -1;

        /* gentle push away from the cursor */
        var mdx = p.x - mouse.x, mdy = p.y - mouse.y;
        var md = Math.sqrt(mdx * mdx + mdy * mdy);
        if(md < 120 && md > 0.01){
          var force = (120 - md) / 120 * 1.4;
          p.x += (mdx / md) * force;
          p.y += (mdy / md) * force;
        }

        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.r > 2 ? .95 : .6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(frame);
    }

    var raf = null;
    function start(){ if(!raf){ raf = requestAnimationFrame(frame); } }
    function stop(){ if(raf){ cancelAnimationFrame(raf); raf = null; } }

    size();
    window.addEventListener('resize', size);
    field.addEventListener('pointermove', function(e){
      var rect = field.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
    });
    field.addEventListener('pointerleave', function(){ mouse.x = -9999; mouse.y = -9999; });

    if(reduce){
      frame();                 /* draw one static frame */
      stop();
    } else {
      start();
      /* pause when the tab is hidden to save the battery */
      document.addEventListener('visibilitychange', function(){
        if(document.hidden){ stop(); } else { start(); }
      });
    }
  }

  /* ---- 2. page-load reveal sequence --------------------- */
  window.requestAnimationFrame(function(){
    window.requestAnimationFrame(function(){ root.classList.add('loaded'); });
  });

  /* ---- 3. scroll reveals -------------------------------- */
  if(!reduce && 'IntersectionObserver' in window){
    var items = document.querySelectorAll('.reveal');
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, {threshold:.14, rootMargin:'0px 0px -40px 0px'});
    items.forEach(function(el){ obs.observe(el); });
  }

  /* ---- 4. nav border on scroll -------------------------- */
  var nav = document.getElementById('nav');
  if(nav){
    var onScroll = function(){
      if(window.scrollY > 12){ nav.classList.add('scrolled'); }
      else{ nav.classList.remove('scrolled'); }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  /* ---- 5. animated counters ----------------------------- */
  var counters = document.querySelectorAll('[data-count]');
  function runCount(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if(reduce){ el.textContent = target.toLocaleString() + suffix; return; }
    var start = 0, dur = 1200, t0 = null;
    function step(t){
      if(!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(start + (target - start) * eased);
      el.textContent = val.toLocaleString() + suffix;
      if(p < 1){ requestAnimationFrame(step); }
    }
    requestAnimationFrame(step);
  }
  if(counters.length){
    if('IntersectionObserver' in window){
      var cobs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){ runCount(e.target); cobs.unobserve(e.target); }
        });
      }, {threshold:.6});
      counters.forEach(function(el){ cobs.observe(el); });
    } else {
      counters.forEach(runCount);
    }
  }

  /* ---- 6. magnetic primary buttons ---------------------- */
  if(!reduce && window.matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.btn-primary, .nav-cta').forEach(function(btn){
      btn.addEventListener('pointermove', function(e){
        var r = btn.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        btn.style.transform = 'translate(' + (mx * .18) + 'px,' + (my * .28) + 'px)';
      });
      btn.addEventListener('pointerleave', function(){ btn.style.transform = ''; });
    });
  }

  /* ---- 7. subtle 3D tilt on cards ----------------------- */
  if(!reduce && window.matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('[data-tilt]').forEach(function(card){
      card.addEventListener('pointermove', function(e){
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - .5;
        var py = (e.clientY - r.top) / r.height - .5;
        card.style.transform = 'rotateX(' + (-py * 5).toFixed(2) + 'deg) rotateY(' + (px * 6).toFixed(2) + 'deg) translateY(-4px)';
      });
      card.addEventListener('pointerleave', function(){ card.style.transform = ''; });
    });
  }

  /* ---- 8. mobile menu ----------------------------------- */
  var mbtn = document.getElementById('menuBtn');
  var mmenu = document.getElementById('mobileMenu');
  if(mbtn && mmenu){
    var setMenu = function(open){
      mmenu.classList.toggle('open', open);
      mbtn.classList.toggle('open', open);
      mbtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      mbtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-open', open);
    };
    mbtn.addEventListener('click', function(){ setMenu(!mmenu.classList.contains('open')); });
    mmenu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ setMenu(false); });
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && mmenu.classList.contains('open')){ setMenu(false); mbtn.focus(); }
    });
  }
})();
