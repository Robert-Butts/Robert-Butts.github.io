/* ============================================================
   THE CHART GALLERY · gallery.js
   Draws gallery.html (the tile wall) and chart.html (one page per
   chart) from the data in gallery-data.js.

   Sections
     1. Shared helpers
     2. Gallery page: filters, search, and the tile wall
     3. Chart page: reads ?c=key and fills every section
     4. R code coloring and the copy button
============================================================ */
(function(){
  "use strict";
  var G = window.GALLERY;
  if(!G){ return; }

  /* ---- 1. SHARED HELPERS -------------------------------- */
  var FAM = {};
  G.families.forEach(function(f, i){ f.num = String(i + 1).padStart(2, '0'); FAM[f.key] = f; });
  var BY_KEY = {};
  G.charts.forEach(function(c, i){ c.index = i; BY_KEY[c.key] = c; });
  var ALL_DONE = G.charts.every(function(c){ return c.lesson; });

  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function imgFor(c){
    return c.lesson ? 'images/gallery/lesson/' + c.key + '.png' : 'images/charts/' + c.key + '.png';
  }
  function chartUrl(c){ return 'chart.html?c=' + encodeURIComponent(c.key); }
  /* The install line under each R script, for example
     install.packages(c("tidyverse", "treemapify")) */
  function packageNote(pk){
    var names = pk.join(' and ');
    var call = pk.length === 1 ? '"' + pk[0] + '"' : 'c(' + pk.map(function(x){ return '"' + x + '"'; }).join(', ') + ')';
    return 'You need R, RStudio, and the ' + esc(names) + (pk.length === 1 ? ' package' : ' packages') +
      '. Run <code>install.packages(' + esc(call) + ')</code> once if you have never used ' + (pk.length === 1 ? 'it' : 'them') + '.';
  }

  /* Links to every family whose charts all have a full lesson, for example
     "the Magnitude family" or "the Magnitude and Part-to-whole families". */
  function doneFamilies(){
    var done = G.families.filter(function(f){
      return G.charts.every(function(c){ return c.family !== f.key || c.lesson; });
    }).map(function(f){ return '<a href="gallery.html#' + f.key + '">' + esc(f.name) + '</a>'; });
    if(!done.length){ return 'the gallery'; }
    var list = done.length === 1 ? done[0] : done.slice(0, -1).join(', ') + (done.length > 2 ? ',' : '') + ' and ' + done[done.length - 1];
    return 'the ' + list + (done.length === 1 ? ' family' : ' families');
  }

  function tileHTML(c, opts){
    opts = opts || {};
    var f = FAM[c.family];
    /* The badge only matters while some charts still lack a lesson */
    var badge = (c.lesson && !ALL_DONE) ? '<span class="g-badge">Full lesson</span>' : '';
    var delay = opts.delay != null ? ' style="--d:' + opts.delay + 's"' : '';
    return '<a class="g-tile' + (opts.big ? ' big' : '') + '" data-fc="' + f.color + '" href="' + chartUrl(c) + '"' + delay + '>' +
      '<div class="g-img">' + badge + '<img src="' + imgFor(c) + '" alt="" loading="lazy" decoding="async"></div>' +
      '<div class="g-cap"><h3>' + esc(c.name) + '</h3>' +
      '<p class="g-meta"><i></i>' + esc(f.name) + ' · ' + esc(c.level) + '</p></div></a>';
  }

  /* ---- 2. GALLERY PAGE ---------------------------------- */
  var wallRoot = document.getElementById('gWall');
  if(wallRoot){
    var chipsEl = document.getElementById('gChips');
    var searchEl = document.getElementById('gSearch');
    var countEl = document.getElementById('gCount');
    var state = {family:'all', q:''};

    var chips = '<button type="button" class="g-chip" data-family="all" aria-pressed="true">All <b>' + G.charts.length + '</b></button>';
    G.families.forEach(function(f){
      chips += '<button type="button" class="g-chip" data-fc="' + f.color + '" data-family="' + f.key + '" aria-pressed="false"><i></i>' + esc(f.name) + ' <b>' + f.count + '</b></button>';
    });
    chipsEl.innerHTML = chips;

    function matches(c){
      if(!state.q){ return true; }
      var hay = [c.name, FAM[c.family].name, c.serves, c.question, c.hint, c.level].join(' ').toLowerCase();
      return state.q.split(/\s+/).every(function(w){ return hay.indexOf(w) !== -1; });
    }

    function render(){
      var html = '';
      var shown = 0;
      var solo = state.family !== 'all';
      G.families.forEach(function(f){
        if(solo && f.key !== state.family){ return; }
        var list = G.charts.filter(function(c){ return c.family === f.key && matches(c); });
        if(!list.length){ return; }
        shown += list.length;
        html += '<section class="g-section' + (solo ? ' g-solo' : '') + '" id="fam-' + f.key + '" data-fc="' + f.color + '" aria-labelledby="h-' + f.key + '">' +
          '<div class="g-sec-head"><span class="g-sec-num">' + f.num + '</span>' +
          '<h2 id="h-' + f.key + '">' + esc(f.name) + '</h2>' +
          '<span class="g-sec-ask">' + esc(f.ask) + '</span>' +
          '<span class="g-sec-count">' + list.length + (list.length === 1 ? ' chart' : ' charts') + '</span>' +
          (solo ? '<p class="g-sec-about">' + esc(f.about) + '</p>' : '') +
          '</div><div class="g-wall">';
        list.forEach(function(c, i){
          html += tileHTML(c, {big: i === 0 && !state.q, delay: Math.min(i, 10) * 0.04});
        });
        html += '</div></section>';
      });
      if(!shown){
        html = '<div class="g-empty"><p>No charts match "' + esc(state.q) + '".</p><button type="button" id="gClear">Clear the search</button></div>';
      }
      wallRoot.innerHTML = html;
      fillGaps();
      countEl.textContent = shown + ' of ' + G.charts.length + ' charts';
      var clear = document.getElementById('gClear');
      if(clear){ clear.addEventListener('click', function(){ searchEl.value = ''; state.q = ''; render(); searchEl.focus(); }); }
      Array.prototype.forEach.call(chipsEl.querySelectorAll('.g-chip'), function(b){
        b.setAttribute('aria-pressed', String(b.getAttribute('data-family') === state.family));
      });
    }

    /* When a family's tiles leave empty cells at the end of the grid,
       fill them with a note tile about that family. Recomputed on resize,
       because the number of columns changes with the screen width. */
    function fillGaps(){
      Array.prototype.forEach.call(wallRoot.querySelectorAll('.g-note'), function(n){ n.remove(); });
      if(state.q){ return; }
      var phone = window.matchMedia('(max-width:720px)').matches;
      Array.prototype.forEach.call(wallRoot.querySelectorAll('.g-section'), function(sec){
        var wall = sec.querySelector('.g-wall');
        var cols = getComputedStyle(wall).gridTemplateColumns.split(' ').length;
        var cells = 0;
        Array.prototype.forEach.call(wall.children, function(t){
          cells += t.classList.contains('big') ? (phone ? 2 : 4) : 1;
        });
        var empty = (cols - (cells % cols)) % cols;
        if(!empty){ return; }
        var f = FAM[sec.id.replace('fam-', '')];
        var note = document.createElement('div');
        note.className = 'g-note';
        note.style.gridColumn = 'span ' + empty;
        note.innerHTML = '<p class="g-note-ask">' + esc(f.ask) + '</p><p>' + esc(f.about) + '</p>' +
          '<a href="chart-field-guide.html">Quiz yourself on ' + esc(f.name) + ' charts <span aria-hidden="true">&rarr;</span></a>';
        wall.appendChild(note);
      });
    }
    var rtimer;
    window.addEventListener('resize', function(){ clearTimeout(rtimer); rtimer = setTimeout(fillGaps, 150); });

    function setFamily(key, push){
      state.family = FAM[key] ? key : 'all';
      render();
      if(push){
        var url = state.family === 'all' ? location.pathname : '#' + state.family;
        history.replaceState(null, '', url);
        var bar = document.querySelector('.g-bar');
        var top = (bar ? bar.getBoundingClientRect().top + window.scrollY : 0) - 66;
        if(window.scrollY > top){ window.scrollTo({top: top, behavior: 'smooth'}); }
      }
    }

    chipsEl.addEventListener('click', function(e){
      var b = e.target.closest('.g-chip');
      if(b){ setFamily(b.getAttribute('data-family'), true); }
    });
    var timer;
    searchEl.addEventListener('input', function(){
      clearTimeout(timer);
      timer = setTimeout(function(){ state.q = searchEl.value.trim().toLowerCase(); render(); }, 120);
    });
    window.addEventListener('hashchange', function(){ setFamily(location.hash.slice(1), false); });
    setFamily(location.hash.slice(1), false);
  }

  /* ---- 3. CHART PAGE ------------------------------------ */
  var pageRoot = document.getElementById('chartPage');
  if(pageRoot){
    var params = new URLSearchParams(location.search);
    var key = params.get('c') || location.hash.slice(1);
    var c = BY_KEY[key];

    if(!c){
      pageRoot.innerHTML = '<div class="wrap c-head"><p class="c-fam">Chart not found</p>' +
        '<h1 style="font-family:var(--display);font-size:clamp(2rem,5vw,3.4rem);margin-top:12px">That chart is not in the gallery.</h1>' +
        '<p class="c-serves" style="margin-top:16px">Check the link, or browse all ' + G.charts.length + ' charts.</p>' +
        '<p style="margin-top:28px"><a class="btn btn-primary" href="gallery.html">Open the gallery <span class="arr">&rarr;</span></a></p></div>';
      return;
    }

    var f = FAM[c.family];
    document.title = c.name + ' · The Chart Gallery · Robert Butts';
    pageRoot.setAttribute('data-fc', f.color);
    var L = c.lesson;
    var num = 0;
    function secHead(title, note, id){
      num += 1;
      return '<div class="c-sec-head"><span class="num">' + String(num).padStart(2, '0') + '</span><h2 id="' + id + '">' + esc(title) + '</h2>' +
        (note ? '<p>' + note + '</p>' : '') + '</div>';
    }

    /* title and plate */
    var alsoTags = c.alt.map(function(a){
      return '<span class="c-tag">Also: <a href="gallery.html#' + a + '">' + esc(FAM[a].name) + '</a></span>';
    }).join('');
    var question = L ? L.question : c.question;
    var html = '<div class="c-head"><div class="wrap">' +
      '<nav class="c-trail" aria-label="Breadcrumb"><a href="gallery.html">Gallery</a><span aria-hidden="true">/</span>' +
      '<a href="gallery.html#' + f.key + '">' + esc(f.name) + '</a><span aria-hidden="true">/</span><span aria-current="page">' + esc(c.name) + '</span></nav>' +
      '<div class="c-title"><div><p class="c-fam">' + f.num + ' · ' + esc(f.name) + ' · ' + esc(f.ask) + '</p><h1>' + esc(c.name) + '</h1></div>' +
      '<div><p class="c-serves">' + esc(c.hint) + '</p>' +
      '<div class="c-tags"><span class="c-tag">' + esc(c.level) + '</span><span class="c-tag">' + esc(c.rarity) + '</span>' + alsoTags + '</div></div></div>' +
      '<figure class="c-plate"><img src="' + imgFor(c) + '" alt="Example ' + esc(c.name.toLowerCase()) + ' answering the question: ' + esc(question) + '" width="1800" height="1200">' +
      '<figcaption><q>' + esc(question) + '</q><span>' + (L ? 'Drawn from the sample data below' : 'Lesson chart') + '</span></figcaption></figure>' +
      '</div></div>';

    html += '<div class="wrap">';

    /* how it works */
    html += '<section class="c-sec" aria-labelledby="s-how">' + secHead('How it works', null, 's-how') +
      '<div class="c-notes">' +
      '<div class="c-note"><h3>Best for</h3><p>' + esc(c.serves) + '</p></div>' +
      '<div class="c-note warn"><h3>Watch out</h3><p>' + esc(c.watch) + '</p></div>' +
      '<div class="c-note pair"><h3>Pairs well with</h3><p>' + esc(c.pairs) + '</p></div></div>' +
      '<div class="c-two"><div class="c-list"><h3>What you need</h3><ul>' +
      c.needs.map(function(n){ return '<li>' + esc(n) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="c-list"><h3>How to build it</h3><ol>' +
      c.steps.map(function(s){ return '<li>' + esc(s) + '</li>'; }).join('') + '</ol></div></div></section>';

    if(L){
      /* the data it needs */
      var letters = 'ABCDEFGHIJ';
      var maxRows = 10;
      var rows = L.rows.slice(0, maxRows);
      var sheet = '<div class="sheet"><div class="sheet-top">' + esc(c.key) + '.csv</div><div class="sheet-scroll"><table>' +
        '<caption class="sr-only">Sample data for the ' + esc(c.name.toLowerCase()) + '</caption>' +
        '<thead><tr><th class="rn" scope="col"></th>' + L.columns.map(function(col, i){ return '<th scope="col">' + letters.charAt(i) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        '<tr class="hd"><td class="rn">1</td>' + L.columns.map(function(col){ return '<td data-type="' + col.type + '">' + esc(col.name) + '</td>'; }).join('') + '</tr>' +
        rows.map(function(r, ri){
          return '<tr><td class="rn">' + (ri + 2) + '</td>' + r.map(function(v){
            /* Show each value exactly as the CSV file stores it: no thousands commas,
               so years read 2019 and nobody copies a comma that would split a CSV cell */
            var isNum = typeof v === 'number';
            return '<td' + (isNum ? ' class="num"' : '') + '>' + esc(String(v)) + '</td>';
          }).join('') + '</tr>';
        }).join('') +
        (L.rows.length > maxRows ? '<tr class="more"><td class="rn"></td><td colspan="' + L.columns.length + '">' + (L.rows.length - maxRows) + ' more rows in the CSV file</td></tr>' : '') +
        '</tbody></table></div><div class="sheet-tabs" aria-hidden="true"><span class="on">' + esc(c.key) + '</span></div></div>';

      var guide = '<div class="c-shape"><h3>The shape of the data</h3><p>' + esc(L.shape) + '</p><div class="c-cols">' +
        L.columns.map(function(col){
          return '<div class="c-col" data-type="' + col.type + '"><code>' + esc(col.name) + '</code><span class="type">' + esc(col.type) + '</span><p>' + esc(col.desc) + '</p></div>';
        }).join('') + '</div>' +
        '<div class="c-dl"><a class="main" href="templates/' + c.key + '.csv" download>Download the CSV file <span aria-hidden="true">&darr;</span></a></div></div>';

      html += '<section class="c-sec" aria-labelledby="s-data">' +
        secHead('The data it needs', 'Here is how the table looks when you open it in a spreadsheet. Copy the layout, or download the CSV file and type over it.', 's-data') +
        '<div class="c-data">' + sheet + guide + '</div></section>';

      /* build it in R */
      html += '<section class="c-sec" aria-labelledby="s-r">' +
        secHead('Build it in R', 'This script reads the CSV file above and draws the chart at the top of this page.', 's-r') +
        '<div class="c-code"><div class="c-code-top"><span>' + esc(c.key) + '.R</span><div>' +
        '<button type="button" id="copyCode">Copy code</button><a href="templates/' + c.key + '.R" download>Download .R</a></div></div>' +
        '<pre><code id="rCode"></code></pre></div>' +
        '<p class="c-code-note">' + packageNote(L.packages || ['tidyverse']) + ' Save the script in the same folder as the CSV file, then run it.</p></section>';

      /* real-world examples */
      var ex = '';
      if(c.ohio){
        ex += '<article class="c-mine"><div class="c-mine-plate"><img src="images/gallery/ohio/' + c.key + '.png" alt="My ' + esc(c.name.toLowerCase()) + ' of Ohio school data: ' + esc(c.ohio.question) + '" loading="lazy"></div>' +
          '<div class="c-mine-body"><p class="c-kicker">My version · Ohio public schools</p><h3>' + esc(c.ohio.question) + '</h3>' +
          '<dl><div><dt>Data used</dt><dd>' + esc(c.ohio.data) + '</dd></div><div><dt>Keep in mind</dt><dd>' + esc(c.ohio.note) + '</dd></div></dl></div></article>';
      }
      ex += '<div class="c-ex-row">';
      (c.famous || []).forEach(function(e){
        ex += '<a class="c-famous" href="' + esc(e.url) + '" target="_blank" rel="noopener"><p class="c-kicker">Famous example</p><h3>' + esc(e.title) + '</h3>' +
          '<p class="by">' + [e.maker, e.year, e.source ? '<i>' + esc(e.source) + '</i>' : ''].filter(Boolean).map(function(x, i){ return i < 2 ? esc(x) : x; }).join(' · ') + '</p><p>' + esc(e.note) + '</p>' +
          '<span class="go">Open at ' + esc(e.site) + ' <span aria-hidden="true">&nearr;</span><span class="sr-only"> (opens in a new tab)</span></span></a>';
      });
      ex += '<a class="c-famous ask" href="contact.html"><p class="c-kicker">Your turn</p><h3>Know a great ' + esc(c.name.toLowerCase()) + '?</h3>' +
        '<p>Send me a link. The best real-world examples get added here, with credit.</p><span class="go">Suggest an example <span aria-hidden="true">&rarr;</span></span></a></div>';
      html += '<section class="c-sec" aria-labelledby="s-ex">' +
        secHead('In the real world', 'My own version with real data, plus famous examples worth a look.', 's-ex') +
        '<div class="c-ex">' + ex + '</div></section>';
    } else {
      html += '<section class="c-sec" aria-labelledby="s-soon">' + secHead('Data, code, and examples', null, 's-soon') +
        '<div class="c-soon"><p><b>This chart\'s full lesson is on the way.</b> It will add a sample CSV file, the R code to draw it, my Ohio version, and famous examples to explore. ' +
        'Until then, see a finished lesson in ' + doneFamilies() + '.</p></div></section>';
    }

    /* related charts */
    var cousins = G.charts.filter(function(o){ return o.family === c.family && o.key !== c.key; });
    html += '<section class="c-sec" aria-labelledby="s-rel">' + secHead('More ' + f.name + ' charts', esc(f.about), 's-rel') +
      '<div class="c-rel">' + cousins.map(function(o){ return tileHTML(o); }).join('') + '</div>' +
      (c.alt.length ? '<p class="c-also">This chart also answers questions in ' + c.alt.map(function(a){ return '<a href="gallery.html#' + a + '">' + esc(FAM[a].name) + '</a>'; }).join(' and ') + '.</p>' : '') +
      '</section>';

    /* previous and next */
    var prev = G.charts[(c.index - 1 + G.charts.length) % G.charts.length];
    var next = G.charts[(c.index + 1) % G.charts.length];
    html += '<nav class="c-pn" aria-label="More charts"><a href="' + chartUrl(prev) + '"><span>&larr; Previous</span><b>' + esc(prev.name) + '</b></a>' +
      '<a class="next" href="' + chartUrl(next) + '"><span>Next &rarr;</span><b>' + esc(next.name) + '</b></a></nav>' +
      '<div class="c-quiz"><p><b>Think you know it?</b> Spot the ' + esc(c.name.toLowerCase()) + ' among its cousins in the Chart Field Guide.</p>' +
      '<a class="btn btn-ghost" href="chart-field-guide.html">Quiz yourself <span class="arr">&rarr;</span></a></div>' +
      '<p class="c-foot-credit">Chart families from the Financial Times Visual Vocabulary. <a href="gallery.html#credits">Read the credits</a>.</p>' +
      '</div>';

    pageRoot.innerHTML = html;

    if(L){
      document.getElementById('rCode').innerHTML = highlightR(L.code);
      var btn = document.getElementById('copyCode');
      btn.addEventListener('click', function(){
        function done(msg){ btn.textContent = msg; setTimeout(function(){ btn.textContent = 'Copy code'; }, 1800); }
        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(L.code).then(function(){ done('Copied'); }, function(){ selectCode(); done('Press Ctrl+C'); });
        } else { selectCode(); done('Press Ctrl+C'); }
      });
    }
  }

  /* ---- 4. R CODE COLORING ------------------------------- */
  function selectCode(){
    var range = document.createRange();
    range.selectNodeContents(document.getElementById('rCode'));
    var sel = window.getSelection();
    sel.removeAllRanges(); sel.addRange(range);
  }

  function highlightR(src){
    var KW = /^(function|if|else|for|in|while|return|TRUE|FALSE|NULL|NA|library)$/;
    var out = '';
    var re = /(#[^\n]*)|("(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_.][A-Za-z0-9_.]*)(?=\s*\()|([A-Za-z_.][A-Za-z0-9_.]*)/g;
    var last = 0, m;
    while((m = re.exec(src))){
      out += esc(src.slice(last, m.index));
      if(m[1]){ out += '<span class="t-com">' + esc(m[1]) + '</span>'; }
      else if(m[2]){ out += '<span class="t-str">' + esc(m[2]) + '</span>'; }
      else if(m[3]){ out += '<span class="t-num">' + esc(m[3]) + '</span>'; }
      else if(m[4]){ out += '<span class="' + (KW.test(m[4]) ? 't-kw' : 't-fn') + '">' + esc(m[4]) + '</span>'; }
      else { out += KW.test(m[5]) ? '<span class="t-kw">' + esc(m[5]) + '</span>' : esc(m[5]); }
      last = re.lastIndex;
    }
    return out + esc(src.slice(last));
  }
})();
