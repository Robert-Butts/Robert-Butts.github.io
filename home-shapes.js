/* ============================================================
   PROJECT SHAPES (home-shapes.js)
   The shapes the home page and the Deep dives page build out of
   their triangle grids, one per project.
   Each shape is drawn on the same grid it is built from: every
   square (S units on a side) is cut by its diagonal into two right
   triangles, and a triangle belongs to a shape when its center does.
   Each paint function says which triangles belong and their color.
   Used by home-hero.js (index.html) and dive.js (deep-dives.html),
   which match each shape to a project by its data-shape name.

   The shapes:
     ball    a basketball ........................ NBA Game Explorer
     sankey  one pot of money fanning out into four kinds of spending
             (an icon only: no labels or real numbers yet; the band
             widths can be set from the finished report) ............ Where Ohio's school money goes
     steps   a score line: a run given up, a timeout, a climb back .. Which NBA coaches stop runs?
     bars    a bar chart in the gallery's family colors ............ The Chart Gallery
     ohio    the outline of Ohio with Dublin marked ................. Data-Driven Dublin
     brick   a LEGO-style brick with studs .......................... LEGO complexity analysis
     goose   a brant swimming, with its white neck ring ............. Helicopters and Pacific brant
   ============================================================ */
window.HOME_SHAPES = (function () {
  'use strict';
  var S = 0.8;     /* the side of one grid square, in scene units */
  var H = 11;      /* every shape fits in a box 11 units tall */

  var seed = 11;
  var rand = function () { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  var clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  var smooth = function (a, b, v) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  var hex = function (h) { var n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  var COL = {
    blue: hex('#75AADB'), green: hex('#7FD18C'), violet: hex('#B79CFF'), amber: hex('#F0B95A'), red: hex('#F2716F'),
    pink: hex('#F38ABE'), teal: hex('#46D6D1'), orange: hex('#FA934E'), pale: hex('#C9D3E6'), axis: hex('#5A6678'),
    seam: hex('#2A2218'), slate: hex('#4A5767'), white: hex('#EEF2F7')
  };
  /* a color, made lighter or darker: f = 1 is the color itself */
  var shade = function (rgb, f) { return [Math.min(1, rgb[0] * f / 255), Math.min(1, rgb[1] * f / 255), Math.min(1, rgb[2] * f / 255)]; };
  var jitter = function (f, amt) { return f + (rand() - 0.5) * (amt || 0.1); };

  /* every triangle of the grid in a box halfW wide on each side of the middle, kept when paint() gives it a color */
  var cut = function (halfW, paint) {
    var tiles = [], x0, y0, k, cx, cy, c;
    var tri = [[[0, 0], [S, 0], [S, S]], [[0, 0], [S, S], [0, S]]];
    for (y0 = 0; y0 < H - 1e-6; y0 += S) {
      for (x0 = -Math.ceil(halfW / S) * S; x0 < halfW - 1e-6; x0 += S) {
        for (k = 0; k < 2; k++) {
          cx = x0 + (tri[k][0][0] + tri[k][1][0] + tri[k][2][0]) / 3;
          cy = y0 + (tri[k][0][1] + tri[k][1][1] + tri[k][2][1]) / 3;
          c = paint(cx, cy);
          if (c) tiles.push({ x0: x0, y0: y0, v: tri[k], cx: cx, cy: cy, rgb: c });
        }
      }
    }
    return tiles;
  };

  /* ---- ball: an amber basketball, lit from the upper left, with dark seams ---- */
  var ball = function () {
    var R = 5.4, C = H / 2;
    return cut(R + 0.4, function (x, y) {
      var dx = x, dy = y - C, d = Math.hypot(dx, dy);
      if (d > R) return null;
      var arc = Math.abs(Math.hypot(Math.abs(dx) - R * 1.42, dy) - R * 1.07);
      if (Math.abs(dx) < 0.34 || Math.abs(dy) < 0.34 || arc < 0.36) return shade(COL.seam, 1);
      return shade(COL.amber, clamp(0.86 + 0.22 * ((-dx * 0.55 + dy * 0.8) / R) + (rand() - 0.5) * 0.12, 0.55, 1.12));
    });
  };

  /* ---- sankey: one pot of money on the left, fanning out into four kinds of spending ---- */
  var sankey = function () {
    var L0 = -6.6, L1 = -5.6, R0 = 5.0, R1 = 6.2;
    var flows = [2.4, 1.6, 1.0, 0.8], cols = [COL.green, COL.blue, COL.violet, COL.amber];
    var total = flows.reduce(function (a, b) { return a + b; }, 0);
    var lTop = H / 2 + total / 2;                       /* the source node, centered */
    var GAP = (H - 0.4 - total) / (flows.length - 1);   /* the spending nodes, spread top to bottom */
    var bands = [], yl = lTop, yr = H - 0.2;
    flows.forEach(function (h, i) { bands.push({ lt: yl, rt: yr, h: h, c: cols[i] }); yl -= h; yr -= h + GAP; });
    return cut(R1, function (x, y) {
      var i, b, tp;
      if (x >= L0 && x <= L1) return y <= lTop && y >= lTop - total ? shade(COL.pale, jitter(1, 0.06)) : null;
      for (i = 0; i < bands.length; i++) {
        b = bands[i];
        if (x >= R0 && x <= R1) { if (y <= b.rt && y >= b.rt - b.h) return shade(b.c, jitter(1.1, 0.06)); continue; }
        if (x > L1 && x < R0) {
          tp = b.lt + (b.rt - b.lt) * smooth(L1 + 0.6, R0 - 0.6, x);
          if (y <= tp && y >= tp - b.h) return shade(b.c, jitter(0.7, 0.08));
        }
      }
      return null;
    });
  };

  /* ---- steps: the score difference through part of a game, drawn the way the NBA Game Explorer
     draws it. The team gives up a run (red, below the middle line), a timeout stops it (the dashed
     column), and they climb back (amber) ---- */
  var steps = function () {
    var ST = [[40, 90, 160], [90, 130, 146], [130, 170, 152], [170, 210, 132], [210, 250, 140], [250, 300, 124], [300, 318, 140],
      [318, 336, 158], [336, 352, 176], [352, 370, 196], [370, 396, 214], [396, 430, 206], [430, 470, 192], [470, 510, 178], [510, 560, 170]];
    var LW = 6.75, V0 = 0.3 + 54 * (10.4 / 90), VK = 10.4 / 90;     /* the middle line sits at V0 */
    var ux = function (px) { return (px - 300) / 520 * LW * 2; };
    var colVal = function (c) {
      var x = c * S + S / 2;
      for (var i = 0; i < ST.length; i++) if (x >= ux(ST[i][0]) && x < ux(ST[i][1])) return V0 + (160 - ST[i][2]) * VK;
      return null;
    };
    var rowOf = function (v) { return Math.floor(v / S); };
    var R0 = rowOf(V0), TOC = Math.floor(ux(396) / S);
    return cut(LW, function (x, y) {
      var c = Math.floor(x / S), v = colVal(c);
      if (v === null) return null;
      var r = rowOf(y), rv = rowOf(v), prev = colVal(c - 1), rp = prev === null ? rv : rowOf(prev);
      var hue = v >= V0 ? COL.amber : COL.red;
      if (c === TOC && r % 2 === 0) return shade(COL.pale, 0.75);                                  /* the timeout */
      if (r >= Math.min(rp, rv) && r <= Math.max(rp, rv)) return shade(hue, jitter(1.1, 0.1));     /* the stepped line */
      if (r === R0) return shade(COL.axis, 1);                                                      /* the middle line */
      if ((r > R0 && r < rv) || (r < R0 && r > rv)) return shade(hue, jitter(0.42, 0.08));          /* the area */
      return null;
    });
  };

  /* ---- bars: a bar chart, one bar per color of the gallery's chart families ---- */
  var bars = function () {
    var hs = [4.8, 8.0, 5.6, 10.2, 7.2, 3.2], cols = [COL.red, COL.violet, COL.blue, COL.green, COL.amber, COL.pink];
    var W = 1.6, G = 0.8, total = hs.length * W + (hs.length - 1) * G, x0 = -total / 2;
    return cut(total / 2 + 0.4, function (x, y) {
      if (y < S) return x >= x0 - 0.4 && x <= -x0 + 0.4 ? shade(COL.axis, 1) : null;   /* the baseline */
      for (var i = 0; i < hs.length; i++) {
        var a = x0 + i * (W + G);
        if (x >= a && x <= a + W && y <= S + hs[i]) return shade(cols[i], y > S + hs[i] - S ? 1.15 : jitter(0.88, 0.1));
      }
      return null;
    });
  };

  /* ---- ohio: the state's outline (U.S. Census boundaries via us-atlas, simplified), with Dublin marked ---- */
  var OH = [-84.81,41.7,-83.45,41.73,-82.93,41.51,-82.84,41.59,-82.72,41.54,-82.62,41.43,-82.48,41.38,-82.01,41.52,-81.74,41.49,-81.29,41.76,-80.52,41.98,-80.52,40.64,-80.67,40.57,-80.6,40.46,-80.6,40.32,-80.74,40.08,-80.76,39.91,-80.8,39.92,-80.79,39.87,-80.87,39.76,-80.83,39.71,-80.88,39.62,-81.21,39.39,-81.39,39.34,-81.47,39.4,-81.56,39.34,-81.57,39.27,-81.68,39.27,-81.73,39.22,-81.74,39.1,-81.81,39.08,-81.77,39.02,-81.78,38.92,-81.81,38.95,-81.89,38.87,-81.94,38.99,-82.03,39.03,-82.14,38.84,-82.22,38.8,-82.17,38.62,-82.29,38.58,-82.32,38.45,-82.53,38.41,-82.72,38.56,-82.85,38.59,-82.89,38.76,-83.02,38.73,-83.16,38.62,-83.31,38.6,-83.37,38.66,-83.52,38.7,-83.66,38.63,-83.95,38.79,-84.21,38.81,-84.33,39.03,-84.43,39.06,-84.44,39.11,-84.6,39.07,-84.76,39.15,-84.82,39.11];
  var ohio = function () {
    var LAT0 = 38.41, LAT1 = 41.98, LONC = -82.67, KX = Math.cos(40.2 * Math.PI / 180), SC = H / (LAT1 - LAT0);
    var at = function (lon, lat) { return [(lon - LONC) * KX * SC, (lat - LAT0) * SC]; };
    var poly = [];
    for (var i = 0; i < OH.length; i += 2) poly.push(at(OH[i], OH[i + 1]));
    var inside = function (x, y) {
      var c = false;
      for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        if ((poly[i][1] > y) !== (poly[j][1] > y) && x < (poly[j][0] - poly[i][0]) * (y - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0]) c = !c;
      }
      return c;
    };
    var dub = at(-83.1141, 40.0992);   /* Dublin, Ohio */
    return cut(5.4, function (x, y) {
      if (!inside(x, y)) return null;
      if (Math.hypot(x - dub[0], y - dub[1]) < 0.45) return shade(COL.amber, 1.15);
      return shade(COL.blue, clamp(0.78 + 0.18 * (y / H) + (rand() - 0.5) * 0.14, 0.55, 1.1));
    });
  };

  /* ---- brick: a brick seen from a little above and to the right, with four big studs ---- */
  var brick = function () {
    var F0 = -6.0, F1 = 4.4, FB = 0.6, FT = 6.0, DX = 1.6, DY = 1.6;   /* the front face, and how far back the brick goes */
    var studs = [-4.6, -1.8, 1.0, 3.8].map(function (x) { return [x + DX * 0.5, FT + DY * 0.5]; });
    var inPar = function (x, y, ox, oy, ax, ay, bx, by) {   /* inside the parallelogram from (ox, oy) with sides a and b */
      var det = ax * by - ay * bx, px = x - ox, py = y - oy;
      var s1 = (px * by - py * bx) / det, t = (ax * py - ay * px) / det;
      return s1 >= 0 && s1 <= 1 && t >= 0 && t <= 1;
    };
    return cut(6.4, function (x, y) {
      for (var i = 0; i < studs.length; i++) {
        var sx = studs[i][0], sy = studs[i][1];
        if (Math.pow((x - sx) / 1.0, 2) + Math.pow((y - sy - 1.5) / 0.5, 2) <= 1) return shade(COL.red, 1.32);   /* stud top */
        if (Math.abs(x - sx) <= 1.0 && y >= sy && y <= sy + 1.5) return shade(COL.red, x > sx + 0.3 ? 0.78 : 1.02);
      }
      if (x >= F0 && x <= F1 && y >= FB && y <= FT) return shade(COL.red, jitter(y > FT - 0.9 ? 1.02 : 0.92, 0.06));   /* front */
      if (inPar(x, y, F0, FT, F1 - F0, 0, DX, DY)) return shade(COL.red, jitter(1.18, 0.05));                           /* top */
      if (inPar(x, y, F1, FB, DX, DY, 0, FT - FB)) return shade(COL.red, jitter(0.64, 0.05));                           /* side */
      return null;
    });
  };

  /* ---- goose: a brant swimming to the right: a dark head and neck with a white band, pale under the tail.
     Drawn bold, a little like a cartoon, so it still reads at this grid size. ---- */
  var GOOSE = [[-7.2, 5.4], [-5.8, 5.0], [-3.0, 5.5], [0.2, 5.7], [1.8, 5.6], [2.1, 6.6], [2.3, 8.0], [2.3, 9.2], [2.7, 10.2],
    [3.5, 10.7], [4.5, 10.6], [5.2, 10.0], [6.9, 9.4], [5.2, 8.8], [4.6, 8.2], [4.3, 7.2], [4.4, 6.0], [5.2, 5.0],
    [5.2, 3.6], [4.0, 2.4], [-4.4, 2.4], [-6.0, 3.6]];
  var goose = function () {
    var inside = function (x, y) {
      var c = false;
      for (var i = 0, j = GOOSE.length - 1; i < GOOSE.length; j = i++) {
        if ((GOOSE[i][1] > y) !== (GOOSE[j][1] > y) && x < (GOOSE[j][0] - GOOSE[i][0]) * (y - GOOSE[i][1]) / (GOOSE[j][1] - GOOSE[i][1]) + GOOSE[i][0]) c = !c;
      }
      return c;
    };
    var WATER = 2.4;
    return cut(7.2, function (x, y) {
      if (inside(x, y)) {
        if (Math.hypot(x - 4.25, y - 9.75) < 0.4) return shade(COL.white, 0.95);                                  /* the eye */
        if (x > 1.9 && y > 5.7) return y > 7.0 && y < 7.8 ? shade(COL.white, 1) : shade(COL.slate, jitter(1.05, 0.08));   /* head, neck, white band */
        if (x < -4.4 && y < 4.4) return shade(COL.white, 0.88);                                                    /* under the tail */
        return shade(COL.teal, y < 3.4 ? jitter(0.66, 0.06) : jitter(0.98 - (x + 6) * 0.02, 0.08));
      }
      if (y >= WATER - S && y < WATER && x > -6.8 && x < 6.4 && Math.floor(x / S) % 3 !== 1) return shade(COL.pale, 0.55);   /* ripples */
      return null;
    });
  };

  return { S: S, H: H, make: { ball: ball, sankey: sankey, steps: steps, bars: bars, ohio: ohio, brick: brick, goose: goose } };
})();
