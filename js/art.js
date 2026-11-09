/* =========================================================
   Hand-built SVG art for the cat site.
   Every illustration is generated here so the whole site
   recolours from the palette below.
   ========================================================= */
(function () {
  const C = {
    ink: '#2f3bd1',      // cobalt – replaces the original red
    black: '#1d1b26',    // brush strokes
    white: '#ffffff',
    cream: '#f4f1e6',
    cream2: '#fbfaf3',
    yarn: '#ff7a2e',     // tangerine yarn – replaces the yellow ball
    yarnDark: '#d9541a',
    mint: '#cfe6da',
    plum: '#50307f',
    peach: '#fbd0b8',
    pinkNose: '#f29a9a',
    ginger: '#e08a3c',
    gingerDark: '#b8621f',
    grey: '#8d949c',
    greyDark: '#5f666e',
  };

  /* ---------- helpers ---------- */
  function rng(seed) {
    let s = seed >>> 0;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  }
  // Tapered "brush" stroke from A to B bowing through C
  function brush(x1, y1, cx, cy, x2, y2, w, fill) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    const nx = -dy / L, ny = dx / L;
    const f = (n) => n.toFixed(1);
    return `<path d="M${f(x1)} ${f(y1)}Q${f(cx + nx * w)} ${f(cy + ny * w)} ${f(x2)} ${f(y2)}Q${f(cx - nx * w * 0.35)} ${f(cy - ny * w * 0.35)} ${f(x1)} ${f(y1)}Z" fill="${fill}"/>`;
  }
  // Brush tufts along an ellipse arc, pointing outward
  function tufts(cx, cy, rx, ry, a0, a1, n, len, w, fill, seed, inward = 0) {
    const r = rng(seed);
    let out = '';
    for (let i = 0; i < n; i++) {
      const t = a0 + (a1 - a0) * (i + r() * 0.6) / n;
      const ex = cx + Math.cos(t) * rx, ey = cy + Math.sin(t) * ry;
      const ox = Math.cos(t), oy = Math.sin(t);
      const l = len * (0.6 + r() * 0.7);
      const dir = inward ? -1 : 1;
      const sx = ex - ox * l * 0.55 * dir, sy = ey - oy * l * 0.55 * dir;
      const tx = ex + ox * l * 0.45 * dir + oy * l * 0.25, ty = ey + oy * l * 0.45 * dir - ox * l * 0.25;
      const mx = (sx + tx) / 2 + oy * l * 0.15, my = (sy + ty) / 2 - ox * l * 0.15;
      out += brush(sx, sy, mx, my, tx, ty, w * (0.6 + r() * 0.8), fill);
    }
    return out;
  }
  // Wound-yarn ball: circle + clipped thread wraps
  let yid = 0;
  function yarnBall(cx, cy, r, { fill = C.cream2, fill2 = C.cream, line = '#ffffff', sw = 0.035, rot = -30, wraps = 7, tail = false } = {}) {
    const id = 'yb' + (yid++);
    let g = `<defs><clipPath id="${id}c"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
      <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${fill}"/><stop offset="1" stop-color="${fill2}"/></linearGradient></defs>`;
    g += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id}g)"/>`;
    g += `<g clip-path="url(#${id}c)" fill="none" stroke="${line}" stroke-width="${(r * sw).toFixed(2)}" stroke-linecap="round">`;
    for (let i = 0; i < wraps; i++) {
      const off = -r * 0.9 + (i * 1.8 * r) / (wraps - 1);
      g += `<ellipse cx="${cx}" cy="${cy + off}" rx="${r * 1.15}" ry="${r * 0.42}" transform="rotate(${rot} ${cx} ${cy})"/>`;
    }
    for (let i = 0; i < 4; i++) {
      const off = -r * 0.5 + i * r * 0.33;
      g += `<ellipse cx="${cx + off}" cy="${cy}" rx="${r * 0.3}" ry="${r * 1.1}" transform="rotate(${rot + 70} ${cx} ${cy})" opacity=".8"/>`;
    }
    g += `</g>`;
    // volume: soft highlight top-left, shaded rim bottom-right
    g += `<defs><radialGradient id="${id}s" cx=".36" cy=".3" r=".78"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".42" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#2a2350" stop-opacity="0"/><stop offset="1" stop-color="#2a2350" stop-opacity=".2"/></radialGradient></defs>`;
    g += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id}s)"/>`;
    if (tail) {
      g += `<path d="M${cx + r * 0.7} ${cy + r * 0.7} C${cx + r * 1.2} ${cy + r * 1.1} ${cx + r * 0.9} ${cy + r * 1.5} ${cx + r * 1.5} ${cy + r * 1.6}" fill="none" stroke="${fill2}" stroke-width="${r * 0.09}" stroke-linecap="round"/>`;
    }
    return g;
  }

  /* ---------- small yarn ball (replaces the yellow tennis ball) ---------- */
  function smallYarn() {
    return `<svg viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">${yarnBall(27, 27, 25, { fill: '#ff9a57', fill2: C.yarn, line: C.yarnDark, sw: 0.05, rot: -35, wraps: 6 })}</svg>`;
  }

  /* ---------- big cream yarn ball (replaces the cream tennis ball) ---------- */
  function bigYarn(rot = -35) {
    return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">${yarnBall(150, 150, 146, { rot, sw: 0.022, wraps: 8 })}</svg>`;
  }

  /* ---------- cluster of four big yarn balls (care section) ---------- */
  function yarnCluster() {
    return `<svg viewBox="0 0 1440 953" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      ${yarnBall(1304, 565, 228, { rot: -40, sw: 0.02, wraps: 8 })}
      ${yarnBall(930, 361, 255, { rot: -25, sw: 0.02, wraps: 9 })}
      ${yarnBall(624, 604, 255, { rot: 20, sw: 0.02, wraps: 9 })}
      ${yarnBall(209, 506, 255, { rot: -50, sw: 0.02, wraps: 9 })}
    </svg>`;
  }

  /* ---------- coats shared by every cat on the site ---------- */
  const COATS = {
    white: { fur: '#ffffff', brush: C.black, ear: C.peach, face: C.black, nose: C.black, whisk: C.black, stripes: false, eye: '#86b9e6', blush: false },
    orange: { fur: '#ee9b52', brush: '#a24f17', ear: '#fcd9bf', face: '#3a1d0c', nose: '#c4616a', whisk: '#5a2c0e', stripes: true, eye: '#cdd64a', blush: true },
    black: { fur: '#26232f', brush: '#55506a', ear: '#7d5468', face: '#f4f1e6', nose: '#e58aa1', whisk: '#a9a5b8', stripes: false, eye: '#7ccf6a', blush: true },
    grey: { fur: '#a3a9b1', brush: '#4e555d', ear: '#f3c9c0', face: '#22262b', nose: '#d98a94', whisk: '#3c4248', stripes: true, eye: '#e8c13c', blush: true },
  };

  /* ---------- the brushy cat head (drawn around 850,560) ---------- */
  // expr: 'sleepy' | 'happy' | 'open'. hero=true adds both eye states + hooks for animation.
  function catHead(name, expr = 'open', { seed = 0, hero = false, look = [0, 0] } = {}) {
    const k = COATS[name] || COATS.white;
    const W = k.fur, B = k.brush;
    let s = `<g class="hc-head"><g class="hc-look">`;
    // ears (outer group = idle CSS animation, inner = twitch)
    s += `<g class="hc-ear-l"><g class="hc-ear-tw"><path d="M555 470 L520 160 Q530 130 560 145 L780 340 Z" fill="${W}"/><path d="M585 420 L565 215 L720 345 Z" fill="${k.ear}"/>`;
    s += brush(520, 165, 515, 320, 560, 470, 14, B) + brush(525, 150, 640, 220, 770, 330, 12, B) + `</g></g>`;
    s += `<g class="hc-ear-r"><g class="hc-ear-tw"><path d="M1145 470 L1180 160 Q1170 130 1140 145 L920 340 Z" fill="${W}"/><path d="M1115 420 L1135 215 L980 345 Z" fill="${k.ear}"/>`;
    s += brush(1180, 165, 1185, 320, 1140, 470, -14, B) + brush(1175, 150, 1060, 220, 930, 330, -12, B) + `</g></g>`;
    // skull + cheeks
    s += `<ellipse cx="850" cy="560" rx="345" ry="290" fill="${W}"/>`;
    s += `<ellipse cx="555" cy="660" rx="165" ry="120" fill="${W}"/><ellipse cx="1145" cy="660" rx="165" ry="120" fill="${W}"/>`;
    s += tufts(850, 560, 345, 290, Math.PI * 1.08, Math.PI * 1.32, 6, 80, 10, B, 3 + seed);
    s += tufts(850, 560, 345, 290, Math.PI * 1.68, Math.PI * 1.92, 6, 80, 10, B, 4 + seed);
    s += tufts(560, 665, 170, 125, Math.PI * 0.55, Math.PI * 1.15, 8, 75, 10, B, 5 + seed);
    s += tufts(1140, 665, 170, 125, -Math.PI * 0.15, Math.PI * 0.45, 8, 75, 10, B, 6 + seed);
    const sw = k.stripes ? 1.8 : 1;
    s += brush(850, 330, 845, 380, 850, 430, 11 * sw, B) + brush(800, 345, 790, 390, 805, 425, 8 * sw, B) + brush(900, 345, 910, 390, 895, 425, 8 * sw, B);
    if (k.stripes) {
      s += brush(560, 600, 500, 610, 440, 640, 12, B) + brush(570, 650, 505, 668, 450, 700, 10, B);
      s += brush(1140, 600, 1200, 610, 1260, 640, -12, B) + brush(1130, 650, 1195, 668, 1250, 700, -10, B);
    }
    // eyes
    const closed = (type) => type === 'happy'
      ? `<g class="hc-eyes-closed" fill="none" stroke="${k.face}" stroke-width="16" stroke-linecap="round"><path d="M665 580 Q725 520 785 580"/><path d="M915 580 Q975 520 1035 580"/></g>`
      : `<g class="hc-eyes-closed" fill="none" stroke="${k.face}" stroke-width="16" stroke-linecap="round"><path d="M660 555 Q725 610 790 555"/><path d="M910 555 Q975 610 1040 555"/><path d="M672 572 L650 590" stroke-width="8"/><path d="M1028 572 L1050 590" stroke-width="8"/></g>`;
    const [lx, ly] = look;
    const open = `<g class="hc-eyes-open"><g class="hc-blink">
        <path d="M652 560 Q725 486 798 560 Q725 624 652 560 Z" fill="${k.eye}"/><path d="M902 560 Q975 486 1048 560 Q975 624 902 560 Z" fill="${k.eye}"/>
        <g class="hc-pupil"><ellipse cx="${725 + lx}" cy="${558 + ly}" rx="14" ry="44" fill="#121016"/><circle cx="${744 + lx}" cy="${534 + ly}" r="9" fill="#fff"/></g>
        <g class="hc-pupil"><ellipse cx="${975 + lx}" cy="${558 + ly}" rx="14" ry="44" fill="#121016"/><circle cx="${994 + lx}" cy="${534 + ly}" r="9" fill="#fff"/></g>
        <path d="M652 560 Q725 486 798 560" fill="none" stroke="${k.face === '#f4f1e6' ? '#121016' : k.face}" stroke-width="8" stroke-linecap="round"/><path d="M902 560 Q975 486 1048 560" fill="none" stroke="${k.face === '#f4f1e6' ? '#121016' : k.face}" stroke-width="8" stroke-linecap="round"/>
      </g></g>`;
    if (hero) s += (expr === 'open' ? '' : closed(expr)) + open;
    else s += expr === 'open' ? open : closed(expr);
    if (k.blush) s += `<ellipse cx="660" cy="660" rx="55" ry="26" fill="${k.nose}" opacity=".35"/><ellipse cx="1040" cy="660" rx="55" ry="26" fill="${k.nose}" opacity=".35"/>`;
    s += `<path d="M812 638 Q850 624 888 638 Q872 676 850 684 Q828 676 812 638 Z" fill="${k.nose}"/>`;
    s += `<path d="M850 684 Q850 716 812 722 M850 684 Q850 716 888 722" fill="none" stroke="${k.face}" stroke-width="10" stroke-linecap="round"/>`;
    s += `<g class="hc-whiskers" fill="none" stroke="${k.whisk}" stroke-width="5" stroke-linecap="round">
      <path d="M700 660 Q560 620 400 615"/><path d="M700 685 Q550 690 390 720"/><path d="M710 705 Q590 740 470 810"/>
      <path d="M1000 660 Q1140 620 1300 615"/><path d="M1000 685 Q1150 690 1310 720"/><path d="M990 705 Q1110 740 1230 810"/></g>`;
    s += `</g></g>`;
    return s;
  }
  // place a head: centre (x,y), scale s, optional rotation
  const head = (name, expr, x, y, sc, opts = {}) =>
    `<g transform="translate(${x} ${y}) rotate(${opts.rot || 0}) scale(${sc})"><g transform="translate(-850 -560)">${catHead(name, expr, opts)}</g></g>`;

  /* ---------- HERO: three big cats (white, orange tabby, black) ---------- */
  const HERO_COATS = [
    { name: 'white', eyes: 'sleepy', yarn: C.yarn, ball: { fill: '#ff9a57', fill2: C.yarn, line: C.yarnDark } },
    { name: 'orange', eyes: 'happy', yarn: C.ink, ball: { fill: '#6a74ee', fill2: C.ink, line: '#1f2897' } },
    { name: 'black', eyes: 'open', yarn: C.yarn, ball: { fill: '#ff9a57', fill2: C.yarn, line: C.yarnDark } },
  ];
  function heroCat(v = 0) {
    const h = HERO_COATS[v] || HERO_COATS[0];
    const k = COATS[h.name];
    const W = k.fur, B = k.brush;
    let s = `<svg viewBox="0 0 1700 1700" xmlns="http://www.w3.org/2000/svg" class="hero-cat hero-cat--${h.name}${h.eyes === 'open' ? ' eyes-open' : ''}"><g transform="translate(306 115) scale(0.64)">`;
    s += `<g class="hc-body">`;
    s += `<path d="M520 760 C380 900 280 1200 230 2050 L1470 2050 C1420 1200 1320 900 1180 760 Z" fill="${W}"/>`;
    s += `<ellipse cx="850" cy="900" rx="330" ry="230" fill="${W}"/>`;
    s += `<path class="hc-tail" d="M1330 1500 C1520 1430 1600 1250 1520 1120 C1480 1060 1420 1080 1440 1140 C1490 1260 1420 1390 1300 1420 Z" fill="${W}"/>`;
    s += tufts(1480, 1260, 95, 170, -1.4, 1.2, 9, 70, 9, B, 31 + v);
    if (k.stripes) {
      for (let i = 0; i < 5; i++) {
        const y = 1080 + i * 120;
        s += brush(330 + i * 18, y, 420 + i * 10, y - 30, 520, y + 10, 16, B);
        s += brush(1370 - i * 18, y, 1280 - i * 10, y - 30, 1180, y + 10, -16, B);
      }
      s += brush(1500, 1150, 1530, 1190, 1545, 1240, 10, B) + brush(1470, 1330, 1500, 1350, 1520, 1380, 10, B);
    }
    s += tufts(850, 1350, 560, 620, Math.PI * 0.98, Math.PI * 1.35, 16, 110, 12, B, 7 + v);
    s += tufts(850, 1350, 560, 620, Math.PI * 1.65, Math.PI * 2.02, 16, 110, 12, B, 8 + v);
    s += tufts(850, 1000, 220, 200, 0.3, Math.PI - 0.3, 10, 90, 9, B, 11 + v, 1);
    s += tufts(850, 1250, 360, 260, 0.2, Math.PI - 0.2, 12, 100, 10, B, 12 + v, 1);
    s += `</g>`;
    s += catHead(h.name, h.eyes, { seed: v, hero: true });
    s += `<g class="hc-yarn" fill="none" stroke="${h.yarn}" stroke-linecap="round" stroke-linejoin="round">
      <path d="M836 718 C820 820 740 900 720 1030 C700 1170 800 1230 760 1360 C730 1450 640 1470 590 1520" stroke-width="20"/>
      <path d="M866 716 C900 800 930 880 900 960 C870 1040 800 1010 812 950 C824 890 880 900 900 960 C920 1030 930 1100 900 1180" stroke-width="18"/>
    </g>`;
    s += `<g class="hc-yarnball">${yarnBall(560, 1555, 70, { ...h.ball, sw: 0.05, rot: -30, wraps: 7 })}</g>`;
    s += `</g></svg>`;
    return s;
  }
  function heroCats() {
    return HERO_COATS.map((h, i) => `<div class="hc-slide${i === 0 ? ' is-active' : ''}" data-coat="${h.name}">${heroCat(i)}</div>`).join('');
  }

  /* ---------- fluffy body helpers for scenes ---------- */
  // filled blob (ellipse) with outward tufts on chosen arcs
  const fluff = (cx, cy, rx, ry, fill, brushC, seed, arcs = [[Math.PI, Math.PI * 2]], n = 10, len = 28, w = 4) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"/>` + arcs.map(([a, b], i) => tufts(cx, cy, rx, ry, a, b, n, len, w, brushC, seed + i)).join('');
  const paw = (x, y, rx, ry, fill, b, rot = 0) =>
    `<g transform="rotate(${rot} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}"/>${brush(x - rx * 0.35, y - ry * 0.2, x - rx * 0.32, y + ry * 0.2, x - rx * 0.3, y + ry * 0.6, 2.6, b)}${brush(x + rx * 0.1, y - ry * 0.2, x + rx * 0.12, y + ry * 0.2, x + rx * 0.14, y + ry * 0.6, 2.6, b)}</g>`;
  const sparkle = (x, y, r, c) => `<path d="M${x} ${y - r} L${x + r * 0.28} ${y - r * 0.28} L${x + r} ${y} L${x + r * 0.28} ${y + r * 0.28} L${x} ${y + r} L${x - r * 0.28} ${y + r * 0.28} L${x - r} ${y} L${x - r * 0.28} ${y - r * 0.28} Z" fill="${c}"/>`;
  const heart = (x, y, sc, c) => `<path transform="translate(${x} ${y}) scale(${sc})" d="M0 -6 C-6 -18 -26 -14 -24 2 C-22 14 -8 22 0 30 C8 22 22 14 24 2 C26 -14 6 -18 0 -6 Z" fill="${c}"/>`;

  /* ---------- SERVICES slide 1: white cat on a stroll (drop-in visits) ---------- */
  function slideWalk() {
    const B = C.black, W = '#fff', S = '#e2e8e4';
    const leg = (d, fill, w = 40) => `<path d="${d}" fill="none" stroke="${fill}" stroke-width="${w}" stroke-linecap="round"/>`;
    let s = `<svg viewBox="0 0 600 520" xmlns="http://www.w3.org/2000/svg">`;
    s += `<ellipse cx="330" cy="456" rx="230" ry="16" fill="#1d1b26" opacity=".08"/>`;
    // far legs (in shade)
    s += leg('M222 318 C214 368 206 404 202 436', S) + leg('M440 318 C454 362 464 398 472 432', S);
    s += brush(232, 330, 222, 380, 214, 430, 4, B) + brush(452, 330, 464, 380, 478, 428, -4, B);
    // tail, raised in an S
    s += `<path d="M486 262 C552 236 566 168 540 118 C526 92 500 92 498 116" fill="none" stroke="${W}" stroke-width="34" stroke-linecap="round"/>`;
    [[520, 238, 548, 228, 566, 214], [550, 196, 576, 184, 588, 166], [556, 150, 578, 132, 584, 112], [528, 104, 538, 84, 532, 66]].forEach(([a, b, c, d, e, f]) => { s += brush(a, b, c, d, e, f, 6, B); });
    // body
    s += fluff(335, 280, 178, 82, W, B, 21, [[Math.PI * 1.08, Math.PI * 1.92]], 13, 34, 5);
    s += tufts(335, 290, 170, 70, 0.3, Math.PI - 0.3, 9, 30, 4, B, 22, 1);
    // chest ruff
    s += fluff(215, 300, 62, 56, W, B, 23, [[Math.PI * 0.45, Math.PI * 0.95]], 6, 26, 4);
    // near legs
    s += leg('M246 318 C248 368 248 404 248 436', W, 44) + leg('M412 318 C408 368 404 404 402 436', W, 44);
    s += brush(226, 340, 226, 390, 230, 432, 4, B) + brush(432, 336, 428, 388, 424, 430, -4, B);
    s += paw(248, 444, 26, 13, W, B) + paw(402, 444, 26, 13, W, B);
    // head facing us
    s += head('white', 'open', 172, 212, 0.27, { seed: 2, look: [10, 6] });
    s += `</svg>`;
    return s;
  }

  /* ---------- SERVICES slide 2: grey tabby batting yarn (playtime) ---------- */
  function slidePlay() {
    const k = COATS.grey, G = k.fur, D = k.brush, L = '#e9ecee';
    let s = `<svg viewBox="0 0 620 525" xmlns="http://www.w3.org/2000/svg">`;
    s += `<path d="M470 0 C474 50 462 90 470 128" fill="none" stroke="${C.yarnDark}" stroke-width="5" stroke-linecap="round"/>`;
    s += `<g>${yarnBall(470, 175, 48, { fill: '#ff9a57', fill2: C.yarn, line: C.yarnDark, sw: 0.06, wraps: 6 })}</g>`;
    // sitting body
    s += `<path d="M190 525 C180 420 225 330 310 312 C395 330 440 420 430 525 Z" fill="${G}"/>`;
    s += tufts(310, 430, 125, 120, Math.PI * 0.92, Math.PI * 1.32, 8, 34, 5, D, 41);
    s += tufts(310, 430, 125, 120, Math.PI * 1.68, Math.PI * 2.08, 8, 34, 5, D, 42);
    for (let i = 0; i < 4; i++) {
      s += brush(205 + i * 4, 400 + i * 32, 240, 392 + i * 32, 268, 404 + i * 32, 8, D);
      s += brush(415 - i * 4, 400 + i * 32, 380, 392 + i * 32, 352, 404 + i * 32, -8, D);
    }
    s += fluff(310, 420, 62, 80, L, D, 43, [[0.2, Math.PI - 0.2]], 0, 0, 0) + tufts(310, 420, 62, 80, 0.3, Math.PI - 0.3, 7, 30, 4, D, 44, 1);
    // raised paw
    s += `<path d="M378 392 C404 330 426 272 440 236" fill="none" stroke="${G}" stroke-width="54" stroke-linecap="round"/>`;
    s += brush(398, 372, 410, 330, 424, 290, 6, D) + brush(386, 330, 396, 300, 410, 270, 5, D);
    s += paw(444, 226, 30, 26, L, D, -20);
    s += paw(250, 512, 34, 16, L, D);
    s += head('grey', 'open', 300, 215, 0.33, { seed: 5, look: [22, -18] });
    s += `</svg>`;
    return s;
  }

  /* ---------- SERVICES slide 3: curled up sleeping ginger cat (overnight) ---------- */
  function slideSleep() {
    const k = COATS.orange, O = k.fur, D = k.brush, P = '#f6c99a';
    let s = `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">`;
    s += `<ellipse cx="410" cy="590" rx="290" ry="40" fill="#1d1b26" opacity=".08"/>`;
    // body curl
    s += fluff(460, 440, 245, 150, O, D, 61, [[Math.PI * 1.02, Math.PI * 1.98]], 18, 44, 6);
    for (let i = 0; i < 6; i++) { const x = 330 + i * 52; s += brush(x, 300 + Math.abs(2.5 - i) * 8, x + 22, 350, x + 8, 400, 13, D); }
    // tail wrapping the front
    s += `<path d="M690 470 C660 570 480 600 340 576 C262 562 228 540 236 516" fill="none" stroke="${O}" stroke-width="62" stroke-linecap="round"/>`;
    for (let i = 0; i < 5; i++) s += brush(610 - i * 82, 548 + (i === 0 ? -14 : 6), 618 - i * 82, 568, 622 - i * 82, 596, 9, D);
    s += tufts(470, 560, 230, 40, 0.15, Math.PI - 0.15, 10, 26, 4, D, 62);
    // paws peeking out
    s += paw(360, 545, 40, 22, P, D) + paw(432, 552, 40, 22, P, D);
    // head tucked in, fast asleep
    s += head('orange', 'sleepy', 290, 430, 0.31, { seed: 7, rot: -12 });
    s += `<g fill="${C.ink}" font-family="Bayon, sans-serif"><text x="420" y="230" font-size="62">z</text><text x="470" y="182" font-size="46">z</text><text x="508" y="146" font-size="32">z</text></g>`;
    s += `</svg>`;
    return s;
  }

  /* ---------- wheel toy icons (41x41, stroke ink) ---------- */
  const toy = {
    yarn: () => `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="20.5" cy="19" r="15"/><path d="M8 13c6 1 17 6 22 16"/><path d="M7.5 21c6 0 14 4 17 11"/><path d="M15 5.5c4 4 9 14 9 27"/><path d="M33 26c3 4 1 9 6 10"/></svg>`,
    fish: () => `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><path d="M4 20.5C9 12 22 9 30 20.5 22 32 9 29 4 20.5Z"/><path d="M30 20.5 38 13v15l-8-7.5Z"/><circle cx="11" cy="19" r="1.3" fill="currentColor"/><path d="M17 15c2 3 2 8 0 11"/></svg>`,
    mouse: () => `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 26c0-8 7-14 15-14 6 0 10 6 10 14H5Z"/><circle cx="21" cy="12" r="4"/><circle cx="11" cy="21" r="1.2" fill="currentColor"/><path d="M30 26c4 0 6-3 4-6s1-6 5-5"/></svg>`,
  };

  /* ---------- How-it-works illustrations (320x260, brushy style) ---------- */
  function procForm() {
    const B = C.black, W = '#fff';
    let s = `<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">`;
    // cat behind the sheet
    s += fluff(205, 175, 74, 58, W, B, 71, [[Math.PI * 1.05, Math.PI * 1.95]], 8, 18, 3);
    s += head('white', 'open', 205, 96, 0.16, { seed: 11, look: [-14, 22] });
    // the form
    s += `<g transform="rotate(-7 155 185)"><rect x="68" y="118" width="178" height="132" rx="6" fill="#fff"/>`;
    s += brush(70, 120, 150, 116, 244, 121, 2.2, B) + brush(70, 122, 66, 190, 70, 248, 2.2, B) + brush(244, 122, 250, 190, 246, 248, -2.2, B);
    [0, 1, 2].forEach((i) => {
      const y = 140 + i * 36;
      s += `<rect x="84" y="${y}" width="18" height="18" rx="4" fill="none" stroke="${B}" stroke-width="2.5"/>`;
      s += `<path d="M87 ${y + 9} l5 6 l11 -14" fill="none" stroke="${C.yarn}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
      s += `<rect x="112" y="${y + 3}" width="${100 - i * 18}" height="5" rx="2.5" fill="#d9d4ea"/><rect x="112" y="${y + 12}" width="${66 + i * 10}" height="5" rx="2.5" fill="#d9d4ea"/>`;
    });
    s += `</g>`;
    // paws resting on the paper
    s += paw(176, 128, 17, 11, W, B, -8) + paw(238, 122, 17, 11, W, B, -8);
    // pencil
    s += `<g transform="rotate(38 268 178)"><rect x="258" y="96" width="18" height="118" rx="3" fill="${C.yarn}"/><rect x="258" y="96" width="18" height="16" fill="${C.ink}"/><path d="M258 214 L267 238 L276 214 Z" fill="#f6dcc2"/><path d="M264 230 L267 238 L270 230 Z" fill="${B}"/></g>`;
    s += `<g fill="${C.ink}" transform="translate(44 214)"><ellipse cx="0" cy="8" rx="12" ry="10"/><circle cx="-12" cy="-6" r="4.5"/><circle cx="-3" cy="-13" r="4.5"/><circle cx="8" cy="-13" r="4.5"/><circle cx="15" cy="-5" r="4.5"/></g>`;
    s += `</svg>`;
    return s;
  }
  function procContact() {
    const k = COATS.orange, O = k.fur, D = k.brush;
    let s = `<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">`;
    s += fluff(160, 222, 92, 74, O, D, 81, [[Math.PI * 1.02, Math.PI * 1.98]], 10, 22, 3.5);
    s += `<ellipse cx="160" cy="232" rx="42" ry="44" fill="#f6dcc2"/>`;
    s += head('orange', 'open', 160, 100, 0.19, { seed: 12, look: [0, 26] });
    // phone
    s += `<g transform="rotate(-8 160 205)"><rect x="124" y="150" width="74" height="104" rx="14" fill="${C.ink}"/><rect x="131" y="160" width="60" height="84" rx="7" fill="#fff"/>`;
    s += heart(161, 190, 0.6, C.yarn) + `<rect x="139" y="218" width="44" height="5" rx="2.5" fill="#d9d4ea"/><rect x="146" y="228" width="30" height="5" rx="2.5" fill="#d9d4ea"/></g>`;
    s += paw(124, 196, 15, 12, O, D, 20) + paw(198, 190, 15, 12, O, D, -20);
    // chat bubbles
    s += `<g><rect x="22" y="44" width="66" height="38" rx="14" fill="#fff"/><path d="M60 80 L52 96 L74 80 Z" fill="#fff"/>`;
    s += `<circle cx="40" cy="63" r="4.5" fill="${C.ink}"/><circle cx="55" cy="63" r="4.5" fill="${C.ink}"/><circle cx="70" cy="63" r="4.5" fill="${C.ink}"/></g>`;
    s += `<g><rect x="226" y="56" width="86" height="38" rx="14" fill="${C.ink}"/><path d="M248 92 L252 108 L264 92 Z" fill="${C.ink}"/><text x="269" y="82" text-anchor="middle" font-family="Bayon, sans-serif" font-size="19" fill="#fff">MEOW?</text></g>`;
    s += sparkle(286, 140, 9, C.yarn) + sparkle(36, 140, 7, C.ink);
    s += `</svg>`;
    return s;
  }
  function procMeet() {
    const k = COATS.black, K = k.fur, D = k.brush, skin = '#f6dcc2';
    let s = `<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">`;
    // sleeve + hand reaching in
    s += `<path d="M-10 168 C40 160 84 162 112 170 L114 214 C80 210 40 212 -10 218 Z" fill="${C.ink}"/>`;
    s += `<path d="M108 170 C132 160 156 162 172 172 C182 178 178 188 168 186 L160 184 C172 190 172 200 162 202 L150 202 C158 208 152 216 142 214 L112 212 Z" fill="${skin}"/>`;
    s += brush(140, 182, 152, 184, 164, 186, 1.6, C.black) + brush(134, 196, 146, 198, 156, 200, 1.6, C.black);
    // the cat leaning in to sniff
    s += fluff(258, 222, 76, 62, K, D, 91, [[Math.PI * 1.05, Math.PI * 1.95]], 9, 20, 3.5);
    s += `<path d="M310 214 C330 180 322 140 300 130" fill="none" stroke="${K}" stroke-width="18" stroke-linecap="round"/>`;
    s += head('black', 'open', 226, 128, 0.18, { seed: 13, rot: -12, look: [-24, 10] });
    s += paw(214, 250, 18, 10, K, D);
    s += heart(176, 74, 0.9, C.yarn) + sparkle(140, 108, 7, C.ink) + sparkle(204, 40, 6, C.ink);
    s += `</svg>`;
    return s;
  }
  function procService() {
    const k = COATS.grey, G = k.fur, D = k.brush;
    let s = `<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">`;
    // cushion
    s += `<ellipse cx="150" cy="232" rx="128" ry="26" fill="${C.ink}"/><ellipse cx="150" cy="220" rx="128" ry="28" fill="#7f8af0"/>`;
    s += `<g fill="none" stroke="#5b66e0" stroke-width="3" stroke-linecap="round"><path d="M40 222 Q150 238 260 222"/></g>`;
    // loafing tabby
    s += `<path d="M236 214 C268 214 280 190 266 176" fill="none" stroke="${G}" stroke-width="16" stroke-linecap="round"/>`;
    s += fluff(150, 186, 96, 46, G, D, 101, [[Math.PI, Math.PI * 2]], 12, 18, 3);
    for (let i = 0; i < 4; i++) s += brush(170 + i * 18, 150, 176 + i * 18, 166, 172 + i * 18, 182, 5, D);
    s += paw(116, 222, 18, 10, '#e9ecee', D) + paw(160, 224, 18, 10, '#e9ecee', D);
    s += head('grey', 'happy', 120, 128, 0.19, { seed: 14 });
    // crown + sparkles
    s += `<path d="M100 42 L106 22 L116 34 L124 14 L132 34 L142 22 L148 42 Z" fill="${C.yarn}"/>`;
    s += sparkle(46, 70, 10, C.yarn) + sparkle(222, 46, 8, C.ink) + sparkle(200, 96, 6, C.yarn);
    // bowl of fish
    s += `<path d="M236 112 L304 112 C302 136 288 148 270 148 C252 148 238 136 236 112 Z" fill="${C.ink}"/><ellipse cx="270" cy="112" rx="34" ry="7" fill="#5b66e0"/>`;
    s += `<g transform="translate(252 94) rotate(-10)"><path d="M0 0 C10 -12 30 -12 40 0 C30 12 10 12 0 0 Z" fill="${C.yarn}"/><path d="M38 0 L52 -9 L50 0 L52 9 Z" fill="${C.yarn}"/><circle cx="10" cy="-2" r="2" fill="#1d1b26"/></g>`;
    s += `</svg>`;
    return s;
  }

  /* ---------- Instagram block: cat rear with tail up ---------- */
  function catRear() {
    const B = C.plum;
    let s = `<svg viewBox="0 0 1440 744" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">`;
    const F = '#f6f2ea'; // same as the cream block below, so the rump melts into it
    s += `<path d="M640 610 C600 450 610 300 660 170 C690 95 700 40 740 20 C785 0 820 40 800 90 C770 170 720 300 730 450 C735 520 760 580 790 620 Z" fill="${F}"/>`;
    s += `<ellipse cx="720" cy="1010" rx="760" ry="470" fill="${F}"/>`;
    // tail fur
    const r = rng(99);
    for (let i = 0; i < 16; i++) {
      const t = i / 15;
      const y = 600 - t * 560;
      const xl = 640 + Math.sin(t * 2.6) * 10 + t * 40 - 8;
      const xr = 790 - t * 40 + Math.sin(t * 3) * 6;
      const l = 30 + r() * 30;
      s += brush(xl + 14, y + 8, xl - 6, y - 4, xl - 18 - r() * 12, y - l * 0.6, 7 + r() * 5, B);
      s += brush(xr - 14, y + 8, xr + 6, y - 4, xr + 18 + r() * 12, y - l * 0.6, -(7 + r() * 5), B);
    }
    s += tufts(720, 1010, 760, 470, Math.PI * 1.05, Math.PI * 1.43, 20, 70, 9, B, 41);
    s += tufts(720, 1010, 760, 470, Math.PI * 1.57, Math.PI * 1.95, 20, 70, 9, B, 42);
    s += `</svg>`;
    return s;
  }

  /* ---------- "FOUND US HERE" arched label + ig icon ---------- */
  function foundUs() {
    return `<svg viewBox="0 0 169 60" width="169" xmlns="http://www.w3.org/2000/svg"><defs><path id="fu-arc" d="M8 40 Q84 10 161 40"/></defs>
      <text font-family="Bayon, sans-serif" font-size="25" fill="${C.ink}" letter-spacing="-.4" text-anchor="middle"><textPath href="#fu-arc" startOffset="50%">FOUND US HERE</textPath></text></svg>`;
  }

  /* ---------- logo mark: leaping cat ---------- */
  function logoCat() {
    return `<svg viewBox="0 0 76 37" xmlns="http://www.w3.org/2000/svg" class="logo-cat"><path fill="currentColor" d="M1.5 9.2c3.6 1.1 6.4 3.6 9 6.3 2.4 2.5 5.2 3.4 8.6 2.9 6-.9 12-1.6 18-1.6 4.4 0 8.1-1.5 11.4-4.4l3-2.6-.8-5.6 4 3.3 3.5-1.9.2 4.6c2.7 1.4 4 3.6 3.6 6.3l-.4 1.8 6.3 2.4-2 1.6-5.2-1.3c-1.7 2-4 3.3-6.7 3.8l-1.7 3.6 6.8 6.7-3.6.4-7.3-6c-4.7 1-9.5 1-14.3.5l-6.7 4.3-1 3.4H23l1.1-4.1 3.7-4c-4.2-1.4-7.3-3.9-9.6-7.4l-5.3-.3C8.4 22.3 4.7 18.4 2.4 13.8L.3 9.6l1.2-.4Z"/></svg>`;
  }

  /* ---------- small UI icons ---------- */
  const icon = {
    arrowDown: () => `<svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 0v15M1 10l5 5 5-5" stroke="currentColor" stroke-width="1.4"/></svg>`,
    insta: () => `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="currentColor"/><rect x="12" y="12" width="16" height="16" rx="4.5" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="20" cy="20" r="3.8" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="24.6" cy="15.4" r="1.1" fill="#fff"/></svg>`,
    tiktok: () => `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="currentColor"/><path d="M22.5 11v11.6a3.6 3.6 0 1 1-3.1-3.6M22.5 11c.3 2.3 1.9 4 4.3 4.2" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round"/></svg>`,
    whatsapp: () => `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="currentColor"/><path d="M13 27l1.1-3.7A7.6 7.6 0 1 1 17 26.2Z" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/><path d="M17.4 17.2c.3 1.9 2.2 4 4.4 4.7l.9-1.2 1.7.8c-.2 1.3-1.3 1.9-2.6 1.6-2.9-.7-5.3-3.2-5.8-6 0-1.2.7-2.1 1.8-2.2l.8 1.6Z" fill="#fff"/></svg>`,
    igSmall: () => `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="20" rx="6" fill="currentColor"/><circle cx="11" cy="11" r="4.4" stroke="#fff" stroke-width="1.8"/><circle cx="16.4" cy="5.6" r="1.2" fill="#fff"/></svg>`,
    fish: () => `<svg width="67" height="33" viewBox="0 0 67 33" xmlns="http://www.w3.org/2000/svg"><path d="M2 16.5C10 4 34 0 50 16.5 34 33 10 29 2 16.5Z M48 16.5 65 4v25Z" fill="currentColor"/><circle cx="14" cy="14" r="2.4" fill="${C.plum}"/></svg>`,
    consult: () => `<svg viewBox="0 0 230 30" width="230" xmlns="http://www.w3.org/2000/svg"><text x="115" y="24" text-anchor="middle" font-family="Bayon, sans-serif" font-size="26" letter-spacing="-.3" fill="${C.plum}">BOOK YOUR CONSULT</text></svg>`,
  };

  /* ---------- crops of the hero cats, for round portraits ---------- */
  function catFace(v = 0) {
    return heroCat(v).replace('viewBox="0 0 1700 1700"', 'viewBox="530 160 640 640"').replace('class="hero-cat', 'class="cat-face hero-cat');
  }

  /* ---------- rotating text ring, optional yarn ball in the middle ---------- */
  let rid = 0;
  function ring(text, { fill = C.plum, color = '#fff', ball = true, size = 34, bg = true, spacing = 6 } = {}) {
    const id = 'ring' + (rid++);
    const t = (text + ' • ').repeat(3).toUpperCase();
    return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" class="ring">
      ${bg ? `<circle cx="200" cy="200" r="200" fill="${fill}"/>` : ''}
      <defs><path id="${id}" d="M200 200 m-158 0 a158 158 0 1 1 316 0 a158 158 0 1 1 -316 0"/></defs>
      <g class="ring__text"><text font-family="Bayon, sans-serif" font-size="${size}" letter-spacing="${spacing}" fill="${color}"><textPath href="#${id}" textLength="985" lengthAdjust="spacing">${t}</textPath></text></g>
      ${ball ? `<g class="ring__ball">${yarnBall(200, 200, 34, { fill: '#ff9a57', fill2: C.yarn, line: C.yarnDark, sw: 0.06, wraps: 6 })}</g>` : ''}
    </svg>`;
  }

  /* ---------- SERVICES page: big white cat lounging with a fish toy ---------- */
  function lyingCat() {
    const B = C.black, W = '#fff';
    let s = `<svg viewBox="0 0 1400 760" xmlns="http://www.w3.org/2000/svg" class="lying-cat">`;
    // tail
    s += `<path d="M1150 560 C1290 560 1330 420 1260 360 C1230 335 1195 350 1210 385 C1250 470 1200 520 1120 515 Z" fill="${W}"/>`;
    s += tufts(1255, 430, 70, 110, -1.3, 1.6, 8, 55, 8, B, 51);
    // body
    s += `<g class="lc-body"><ellipse cx="720" cy="500" rx="520" ry="215" fill="${W}"/>`;
    s += tufts(720, 500, 520, 215, Math.PI * 1.08, Math.PI * 1.92, 26, 85, 11, B, 52);
    s += tufts(720, 540, 380, 120, 0.3, Math.PI - 0.3, 10, 70, 8, B, 53, 1);
    s += `</g>`;
    // back paws
    s += `<ellipse cx="1050" cy="690" rx="120" ry="50" fill="${W}"/>`;
    s += brush(1000, 690, 1010, 705, 1020, 718, 5, B) + brush(1040, 694, 1048, 708, 1056, 722, 5, B);
    // head
    s += `<g class="lc-head">`;
    s += `<path d="M195 300 L160 95 Q170 75 195 88 L330 220 Z" fill="${W}"/><path d="M212 270 L192 135 L300 230 Z" fill="${C.peach}"/>`;
    s += `<path d="M475 300 L520 95 Q510 75 485 88 L350 220 Z" fill="${W}"/><path d="M458 270 L488 135 L380 230 Z" fill="${C.peach}"/>`;
    s += brush(162, 100, 165, 210, 195, 300, 10, B) + brush(515, 100, 512, 210, 478, 300, -10, B);
    s += `<ellipse cx="335" cy="380" rx="235" ry="200" fill="${W}"/>`;
    s += tufts(335, 380, 235, 200, Math.PI * 0.55, Math.PI * 1.2, 9, 60, 9, B, 54);
    s += tufts(335, 380, 235, 200, -Math.PI * 0.2, Math.PI * 0.45, 9, 60, 9, B, 55);
    s += brush(335, 205, 330, 240, 335, 275, 9, B) + brush(295, 215, 288, 245, 298, 270, 7, B) + brush(375, 215, 382, 245, 372, 270, 7, B);
    s += `<g fill="none" stroke="${B}" stroke-width="12" stroke-linecap="round"><path d="M225 385 Q265 420 305 385"/><path d="M365 385 Q405 420 445 385"/></g>`;
    s += `<path d="M310 440 Q335 430 360 440 Q350 466 335 472 Q320 466 310 440 Z" fill="${B}"/>`;
    s += `<path d="M335 472 Q335 494 312 498 M335 472 Q335 494 358 498" fill="none" stroke="${B}" stroke-width="7" stroke-linecap="round"/>`;
    s += `<g fill="none" stroke="${B}" stroke-width="4" stroke-linecap="round"><path d="M250 455 Q160 430 60 432"/><path d="M250 472 Q150 480 70 510"/><path d="M420 455 Q510 430 610 432"/><path d="M420 472 Q520 480 600 510"/></g>`;
    s += `</g>`;
    // fish toy between the front paws
    s += `<g class="lc-fish" transform="translate(300 600) rotate(-12)"><path d="M0 0 C40 -55 150 -60 200 0 C150 60 40 55 0 0 Z" fill="#b59be6"/><path d="M195 0 L265 -45 L255 0 L265 45 Z" fill="#b59be6"/><circle cx="45" cy="-8" r="9" fill="${C.plum}"/><path d="M90 -30 Q105 0 90 30" stroke="${C.plum}" stroke-width="6" fill="none" stroke-linecap="round"/></g>`;
    // front paws
    s += `<ellipse cx="250" cy="665" rx="125" ry="55" fill="${W}"/><ellipse cx="520" cy="680" rx="125" ry="55" fill="${W}"/>`;
    s += brush(170, 660, 175, 678, 185, 694, 6, B) + brush(215, 665, 220, 683, 228, 700, 6, B) + brush(470, 676, 475, 694, 485, 710, 6, B) + brush(515, 680, 520, 698, 528, 714, 6, B);
    s += `</svg>`;
    return s;
  }

  window.ART = { C, COATS, catHead, head, heroCat, heroCats, catFace, ring, lyingCat, slideWalk, slidePlay, slideSleep, toy, smallYarn, bigYarn, yarnCluster, procForm, procContact, procMeet, procService, catRear, foundUs, logoCat, icon };
})();
