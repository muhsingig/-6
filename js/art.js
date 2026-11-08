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

  /* ---------- HERO: three big cats (white, orange tabby, black) ---------- */
  const HERO_COATS = [
    { name: 'white', fur: '#ffffff', brush: C.black, ear: C.peach, face: C.black, nose: C.black, whisk: C.black, eyes: 'sleepy', stripes: false,
      yarn: C.yarn, ball: { fill: '#ff9a57', fill2: C.yarn, line: C.yarnDark } },
    { name: 'orange', fur: '#ee9b52', brush: '#a24f17', ear: '#fcd9bf', face: '#3a1d0c', nose: '#c4616a', whisk: '#5a2c0e', eyes: 'happy', stripes: true,
      yarn: C.ink, ball: { fill: '#6a74ee', fill2: C.ink, line: '#1f2897' } },
    { name: 'black', fur: '#26232f', brush: '#55506a', ear: '#7d5468', face: '#f4f1e6', nose: '#e58aa1', whisk: '#a9a5b8', eyes: 'open', stripes: false,
      yarn: C.yarn, ball: { fill: '#ff9a57', fill2: C.yarn, line: C.yarnDark } },
  ];
  function heroCat(v = 0) {
    const k = HERO_COATS[v] || HERO_COATS[0];
    const W = k.fur, B = k.brush;
    let s = `<svg viewBox="0 0 1700 1700" xmlns="http://www.w3.org/2000/svg" class="hero-cat hero-cat--${k.name}"><g transform="translate(306 115) scale(0.64)">`;
    // body (breathing group)
    s += `<g class="hc-body">`;
    s += `<path d="M520 760 C380 900 280 1200 230 2050 L1470 2050 C1420 1200 1320 900 1180 760 Z" fill="${W}"/>`;
    s += `<ellipse cx="850" cy="900" rx="330" ry="230" fill="${W}"/>`;
    // tail curling round the front
    s += `<path d="M1330 1500 C1520 1430 1600 1250 1520 1120 C1480 1060 1420 1080 1440 1140 C1490 1260 1420 1390 1300 1420 Z" fill="${W}"/>`;
    s += tufts(1480, 1260, 95, 170, -1.4, 1.2, 9, 70, 9, B, 31 + v);
    if (k.stripes) {
      for (let i = 0; i < 5; i++) {
        const y = 1080 + i * 120;
        s += brush(330 + i * 18, y, 420 + i * 10, y - 30, 520, y + 10, 16, B);
        s += brush(1370 - i * 18, y, 1280 - i * 10, y - 30, 1180, y + 10, -16, B);
      }
      s += brush(1500, 1150, 1530, 1190, 1545, 1240, 10, B) + brush(1470, 1330, 1500, 1350, 1520, 1380, 10, B);
    }
    // fur on body edges
    s += tufts(850, 1350, 560, 620, Math.PI * 0.98, Math.PI * 1.35, 16, 110, 12, B, 7 + v);
    s += tufts(850, 1350, 560, 620, Math.PI * 1.65, Math.PI * 2.02, 16, 110, 12, B, 8 + v);
    // chest fur, inward strokes
    s += tufts(850, 1000, 220, 200, 0.3, Math.PI - 0.3, 10, 90, 9, B, 11 + v, 1);
    s += tufts(850, 1250, 360, 260, 0.2, Math.PI - 0.2, 12, 100, 10, B, 12 + v, 1);
    s += `</g>`;
    // head (tilting group)
    s += `<g class="hc-head">`;
    s += `<g class="hc-ear-l"><path d="M555 470 L520 160 Q530 130 560 145 L780 340 Z" fill="${W}"/><path d="M585 420 L565 215 L720 345 Z" fill="${k.ear}"/>`;
    s += brush(520, 165, 515, 320, 560, 470, 14, B) + brush(525, 150, 640, 220, 770, 330, 12, B) + `</g>`;
    s += `<g class="hc-ear-r"><path d="M1145 470 L1180 160 Q1170 130 1140 145 L920 340 Z" fill="${W}"/><path d="M1115 420 L1135 215 L980 345 Z" fill="${k.ear}"/>`;
    s += brush(1180, 165, 1185, 320, 1140, 470, -14, B) + brush(1175, 150, 1060, 220, 930, 330, -12, B) + `</g>`;
    s += `<ellipse cx="850" cy="560" rx="345" ry="290" fill="${W}"/>`;
    s += `<ellipse cx="555" cy="660" rx="165" ry="120" fill="${W}"/><ellipse cx="1145" cy="660" rx="165" ry="120" fill="${W}"/>`;
    // head fur
    s += tufts(850, 560, 345, 290, Math.PI * 1.08, Math.PI * 1.32, 6, 80, 10, B, 3 + v);
    s += tufts(850, 560, 345, 290, Math.PI * 1.68, Math.PI * 1.92, 6, 80, 10, B, 4 + v);
    s += tufts(560, 665, 170, 125, Math.PI * 0.55, Math.PI * 1.15, 8, 75, 10, B, 5 + v);
    s += tufts(1140, 665, 170, 125, -Math.PI * 0.15, Math.PI * 0.45, 8, 75, 10, B, 6 + v);
    // forehead stripes (bolder "M" on the tabby)
    const sw = k.stripes ? 1.8 : 1;
    s += brush(850, 330, 845, 380, 850, 430, 11 * sw, B) + brush(800, 345, 790, 390, 805, 425, 8 * sw, B) + brush(900, 345, 910, 390, 895, 425, 8 * sw, B);
    if (k.stripes) {
      s += brush(560, 600, 500, 610, 440, 640, 12, B) + brush(570, 650, 505, 668, 450, 700, 10, B);
      s += brush(1140, 600, 1200, 610, 1260, 640, -12, B) + brush(1130, 650, 1195, 668, 1250, 700, -10, B);
    }
    // eyes: white = sleepy, orange = happy, black = wide awake
    if (k.eyes === 'open') {
      s += `<g class="hc-eyes">
        <path d="M655 560 Q725 490 795 560 Q725 620 655 560 Z" fill="#7ccf6a"/><path d="M905 560 Q975 490 1045 560 Q975 620 905 560 Z" fill="#7ccf6a"/>
        <ellipse class="hc-pupil" cx="725" cy="558" rx="13" ry="44" fill="#121016"/><ellipse class="hc-pupil" cx="975" cy="558" rx="13" ry="44" fill="#121016"/>
        <circle cx="745" cy="535" r="9" fill="#fff"/><circle cx="995" cy="535" r="9" fill="#fff"/></g>`;
    } else if (k.eyes === 'happy') {
      s += `<g class="hc-eyes" fill="none" stroke="${k.face}" stroke-width="16" stroke-linecap="round">
        <path d="M665 580 Q725 520 785 580"/><path d="M915 580 Q975 520 1035 580"/></g>`;
    } else {
      s += `<g class="hc-eyes" fill="none" stroke="${k.face}" stroke-width="16" stroke-linecap="round">
        <path d="M660 555 Q725 610 790 555"/><path d="M910 555 Q975 610 1040 555"/>
        <path d="M672 572 L650 590" stroke-width="8"/><path d="M1028 572 L1050 590" stroke-width="8"/></g>`;
    }
    if (k.name !== 'white') s += `<ellipse cx="660" cy="660" rx="55" ry="26" fill="${k.nose}" opacity=".35"/><ellipse cx="1040" cy="660" rx="55" ry="26" fill="${k.nose}" opacity=".35"/>`;
    // nose + mouth
    s += `<path d="M812 638 Q850 624 888 638 Q872 676 850 684 Q828 676 812 638 Z" fill="${k.nose}"/>`;
    s += `<path d="M850 684 Q850 716 812 722 M850 684 Q850 716 888 722" fill="none" stroke="${k.face}" stroke-width="10" stroke-linecap="round"/>`;
    // whiskers
    s += `<g class="hc-whiskers" fill="none" stroke="${k.whisk}" stroke-width="5" stroke-linecap="round">
      <path d="M700 660 Q560 620 400 615"/><path d="M700 685 Q550 690 390 720"/><path d="M710 705 Q590 740 470 810"/>
      <path d="M1000 660 Q1140 620 1300 615"/><path d="M1000 685 Q1150 690 1310 720"/><path d="M990 705 Q1110 740 1230 810"/></g>`;
    s += `</g>`;
    // yarn hanging from mouth
    s += `<g class="hc-yarn" fill="none" stroke="${k.yarn}" stroke-linecap="round" stroke-linejoin="round">
      <path d="M836 718 C820 820 740 900 720 1030 C700 1170 800 1230 760 1360 C730 1450 640 1470 590 1520" stroke-width="20"/>
      <path d="M866 716 C900 800 930 880 900 960 C870 1040 800 1010 812 950 C824 890 880 900 900 960 C920 1030 930 1100 900 1180" stroke-width="18"/>
    </g>`;
    s += `<g class="hc-yarnball">${yarnBall(560, 1555, 70, { ...k.ball, sw: 0.05, rot: -30, wraps: 7 })}</g>`;
    s += `</g></svg>`;
    return s;
  }
  // all three coats stacked; main.js cycles them
  function heroCats() {
    return HERO_COATS.map((k, i) => `<div class="hc-slide${i === 0 ? ' is-active' : ''}" data-coat="${k.name}">${heroCat(i)}</div>`).join('');
  }

  /* ---------- SERVICES slide 1: white cat walking (drop-in visits) ---------- */
  function slideWalk() {
    const B = C.black;
    const leg = (d, fill, w = 34) => `<path d="${d}" fill="none" stroke="${B}" stroke-width="${w + 8}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${fill}" stroke-width="${w}" stroke-linecap="round"/>`;
    let s = `<svg viewBox="0 0 600 520" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">`;
    s += `<ellipse cx="320" cy="452" rx="220" ry="16" fill="#000" opacity=".07"/>`;
    // far legs (shaded)
    s += leg('M212 320 C206 370 200 405 196 436', '#dde5e0', 30) + leg('M438 318 C452 365 462 400 470 432', '#dde5e0', 30);
    // tail, raised and curled
    s += leg('M486 262 C548 240 566 178 548 126 C538 98 512 92 502 112', '#fff', 30);
    // body
    s += `<path d="M175 258 C185 206 262 190 342 195 C424 200 482 216 496 266 C506 312 480 346 430 351 C360 358 262 359 215 346 C180 336 168 297 175 258 Z" fill="#fff" stroke="${B}" stroke-width="4"/>`;
    s += `<path d="M215 338 C280 352 400 352 470 336 C452 350 372 360 300 359 C255 358 228 352 215 338 Z" fill="#e3ebe6"/>`;
    s += brush(300, 205, 312, 222, 318, 238, 4, B) + brush(340, 203, 350, 220, 354, 234, 4, B) + brush(380, 206, 388, 222, 390, 236, 4, B);
    // near legs
    s += leg('M236 318 C238 368 238 404 238 438', '#fff') + leg('M408 318 C404 368 400 404 398 438', '#fff');
    s += `<g fill="${B}"><circle cx="232" cy="446" r="2.5"/><circle cx="242" cy="446" r="2.5"/><circle cx="394" cy="446" r="2.5"/><circle cx="404" cy="446" r="2.5"/></g>`;
    // head
    s += `<path d="M112 172 L104 104 L156 148 Z" fill="#fff" stroke="${B}" stroke-width="4"/>`;
    s += `<path d="M186 146 L226 102 L232 170 Z" fill="#fff" stroke="${B}" stroke-width="4"/>`;
    s += `<path d="M120 158 L116 124 L142 146 Z" fill="${C.peach}"/><path d="M196 146 L218 122 L222 158 Z" fill="${C.peach}"/>`;
    s += `<path d="M100 220 C98 172 130 142 170 142 C210 142 242 172 240 220 C238 252 214 274 170 276 C126 274 102 252 100 220 Z" fill="#fff" stroke="${B}" stroke-width="4"/>`;
    s += brush(170, 150, 168, 162, 170, 175, 4, B) + brush(152, 154, 148, 164, 152, 174, 3, B) + brush(188, 154, 192, 164, 188, 174, 3, B);
    s += `<path d="M128 214 Q142 226 156 214" fill="none" stroke="${B}" stroke-width="6" stroke-linecap="round"/>`;
    s += `<path d="M184 214 Q198 226 212 214" fill="none" stroke="${B}" stroke-width="6" stroke-linecap="round"/>`;
    s += `<ellipse cx="128" cy="236" rx="13" ry="7" fill="${C.peach}" opacity=".8"/><ellipse cx="212" cy="236" rx="13" ry="7" fill="${C.peach}" opacity=".8"/>`;
    s += `<path d="M161 234 L179 234 L170 245 Z" fill="${C.pinkNose}"/>`;
    s += `<path d="M170 245 Q170 256 159 258 M170 245 Q170 256 181 258" fill="none" stroke="${B}" stroke-width="3" stroke-linecap="round"/>`;
    s += `<g stroke="${B}" stroke-width="2" fill="none" stroke-linecap="round"><path d="M140 242 Q100 236 66 238"/><path d="M140 250 Q104 256 72 268"/><path d="M200 242 Q240 236 274 238"/><path d="M200 250 Q236 256 268 268"/></g>`;
    s += `</svg>`;
    return s;
  }

  /* ---------- SERVICES slide 2: grey cat batting yarn (playtime) ---------- */
  function slidePlay() {
    const B = C.black, G = C.grey, D = C.greyDark;
    let s = `<svg viewBox="0 0 620 525" xmlns="http://www.w3.org/2000/svg">`;
    // string + ball
    s += `<path d="M470 0 C470 60 480 90 470 130" fill="none" stroke="${C.yarnDark}" stroke-width="5"/>`;
    s += `<g>${yarnBall(470, 175, 48, { fill: '#ff9a57', fill2: C.yarn, line: C.yarnDark, sw: 0.06, wraps: 6 })}</g>`;
    // body
    s += `<path d="M150 525 C150 400 200 330 300 320 C400 330 450 400 450 525 Z" fill="${G}"/>`;
    s += `<path d="M250 340 C280 380 320 380 350 340 C340 420 260 420 250 340 Z" fill="#e9ecee"/>`;
    // raised paw
    s += `<path d="M390 400 C420 330 430 260 440 230" fill="none" stroke="${G}" stroke-width="54" stroke-linecap="round"/>`;
    s += `<ellipse cx="442" cy="222" rx="32" ry="28" fill="#e9ecee"/>`;
    // head
    s += `<path d="M180 175 L170 55 L270 125 Z" fill="${G}"/><path d="M420 175 L430 55 L330 125 Z" fill="${G}"/>`;
    s += `<path d="M195 150 L190 90 L245 128 Z" fill="${C.peach}"/><path d="M405 150 L410 90 L355 128 Z" fill="${C.peach}"/>`;
    s += `<ellipse cx="300" cy="215" rx="150" ry="125" fill="${G}"/>`;
    s += `<ellipse cx="300" cy="275" rx="75" ry="55" fill="#e9ecee"/>`;
    // stripes
    s += brush(300, 95, 296, 125, 300, 150, 9, D) + brush(265, 100, 258, 128, 268, 150, 7, D) + brush(335, 100, 342, 128, 332, 150, 7, D);
    s += brush(155, 200, 175, 205, 195, 215, 7, D) + brush(150, 230, 170, 232, 190, 238, 6, D);
    s += brush(445, 200, 425, 205, 405, 215, -7, D) + brush(450, 230, 430, 232, 410, 238, -6, D);
    // eyes looking up-right at the ball
    s += `<ellipse cx="245" cy="205" rx="30" ry="34" fill="#cfe06a"/><ellipse cx="355" cy="205" rx="30" ry="34" fill="#cfe06a"/>`;
    s += `<ellipse cx="256" cy="196" rx="12" ry="24" fill="${B}"/><ellipse cx="366" cy="196" rx="12" ry="24" fill="${B}"/>`;
    s += `<circle cx="262" cy="186" r="5" fill="#fff"/><circle cx="372" cy="186" r="5" fill="#fff"/>`;
    s += `<path d="M286 258 L314 258 L300 274 Z" fill="${C.pinkNose}"/>`;
    s += `<path d="M300 274 Q300 290 284 292 M300 274 Q300 290 316 292" fill="none" stroke="${B}" stroke-width="4" stroke-linecap="round"/>`;
    s += `<g stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"><path d="M250 270 L150 255"/><path d="M250 282 L155 295"/><path d="M350 270 L450 255"/><path d="M350 282 L445 295"/></g>`;
    s += `</svg>`;
    return s;
  }

  /* ---------- SERVICES slide 3: curled up sleeping ginger cat (overnight) ---------- */
  function slideSleep() {
    const B = C.black, O = C.ginger, D = C.gingerDark;
    let s = `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">`;
    s += `<ellipse cx="400" cy="560" rx="270" ry="40" fill="#000" opacity=".07"/>`;
    // body curl
    s += `<path d="M150 430 C140 290 290 220 430 230 C590 240 670 330 650 440 C635 520 560 560 430 560 C280 560 160 530 150 430 Z" fill="${O}"/>`;
    // stripes
    for (let i = 0; i < 7; i++) {
      const x = 300 + i * 50;
      s += brush(x, 245 + Math.abs(3 - i) * 6, x + 18, 290, x + 6, 330, 12, D);
    }
    // tail wrapping the front
    s += `<path d="M640 470 C600 560 420 590 300 560 C230 545 200 520 215 505" fill="none" stroke="${D}" stroke-width="58" stroke-linecap="round"/>`;
    s += `<path d="M640 470 C600 560 420 590 300 560 C230 545 200 520 215 505" fill="none" stroke="${O}" stroke-width="48" stroke-linecap="round"/>`;
    for (let i = 0; i < 4; i++) s += brush(560 - i * 85, 540 + (i === 0 ? -10 : 8), 570 - i * 85, 560, 575 - i * 85, 585, 8, D);
    // head tucked in
    s += `<g stroke="${D}" stroke-width="5" stroke-linejoin="round"><path d="M190 330 L170 245 L250 300 Z" fill="${O}"/><path d="M290 302 L336 236 L352 326 Z" fill="${O}"/></g>`;
    s += `<path d="M197 315 L185 268 L232 300 Z" fill="${C.peach}"/><path d="M305 304 L332 262 L340 316 Z" fill="${C.peach}"/>`;
    s += `<ellipse cx="265" cy="400" rx="120" ry="100" fill="${O}" stroke="${D}" stroke-width="5"/>`;
    s += `<ellipse cx="260" cy="440" rx="70" ry="45" fill="#f6dcc2"/>`;
    s += brush(265, 305, 262, 330, 266, 350, 8, D) + brush(235, 312, 228, 335, 238, 352, 6, D);
    // closed eyes
    s += `<path d="M205 395 Q228 412 251 395" fill="none" stroke="${B}" stroke-width="7" stroke-linecap="round"/>`;
    s += `<path d="M280 395 Q303 412 326 395" fill="none" stroke="${B}" stroke-width="7" stroke-linecap="round"/>`;
    s += `<path d="M254 425 L276 425 L265 437 Z" fill="${C.pinkNose}"/>`;
    // paws
    s += `<ellipse cx="330" cy="500" rx="40" ry="24" fill="#f6dcc2"/><ellipse cx="395" cy="505" rx="40" ry="24" fill="#f6dcc2"/>`;
    // collar
    s += `<path d="M175 470 C220 500 300 505 350 480" fill="none" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/>`;
    s += `<circle cx="265" cy="505" r="12" fill="${C.yarn}"/>`;
    // zzz
    s += `<g fill="${C.ink}" font-family="Bayon, sans-serif"><text x="380" y="210" font-size="56">z</text><text x="425" y="165" font-size="42">z</text><text x="462" y="130" font-size="30">z</text></g>`;
    s += `</svg>`;
    return s;
  }

  /* ---------- wheel toy icons (41x41, stroke ink) ---------- */
  const toy = {
    yarn: () => `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="20.5" cy="19" r="15"/><path d="M8 13c6 1 17 6 22 16"/><path d="M7.5 21c6 0 14 4 17 11"/><path d="M15 5.5c4 4 9 14 9 27"/><path d="M33 26c3 4 1 9 6 10"/></svg>`,
    fish: () => `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><path d="M4 20.5C9 12 22 9 30 20.5 22 32 9 29 4 20.5Z"/><path d="M30 20.5 38 13v15l-8-7.5Z"/><circle cx="11" cy="19" r="1.3" fill="currentColor"/><path d="M17 15c2 3 2 8 0 11"/></svg>`,
    mouse: () => `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 26c0-8 7-14 15-14 6 0 10 6 10 14H5Z"/><circle cx="21" cy="12" r="4"/><circle cx="11" cy="21" r="1.2" fill="currentColor"/><path d="M30 26c4 0 6-3 4-6s1-6 5-5"/></svg>`,
  };

  /* ---------- How-it-works illustrations ---------- */
  function procForm() {
    return `<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(-6 160 140)">
        <rect x="85" y="30" width="150" height="200" rx="12" fill="#fff" stroke="${C.black}" stroke-width="4"/>
        <rect x="128" y="20" width="64" height="24" rx="8" fill="${C.ink}"/>
        ${[0, 1, 2].map(i => `<rect x="105" y="${70 + i * 45}" width="22" height="22" rx="5" fill="none" stroke="${C.black}" stroke-width="3"/>
        <path d="M108 ${81 + i * 45} l6 7 l12 -16" fill="none" stroke="${C.yarn}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="138" y="${74 + i * 45}" width="${78 - i * 14}" height="6" rx="3" fill="#d9d4ea"/><rect x="138" y="${85 + i * 45}" width="${50 + i * 8}" height="6" rx="3" fill="#d9d4ea"/>`).join('')}
      </g>
      <g transform="rotate(35 250 160)"><rect x="238" y="70" width="22" height="140" rx="4" fill="${C.yarn}" stroke="${C.black}" stroke-width="3"/><path d="M238 210 L249 238 L260 210 Z" fill="#f6dcc2" stroke="${C.black}" stroke-width="3"/><rect x="238" y="70" width="22" height="18" fill="${C.ink}"/></g>
      <g fill="${C.ink}" transform="translate(52 196)"><ellipse cx="0" cy="8" rx="14" ry="12"/><circle cx="-14" cy="-8" r="5"/><circle cx="-4" cy="-15" r="5"/><circle cx="8" cy="-15" r="5"/><circle cx="17" cy="-7" r="5"/></g>
    </svg>`;
  }
  function procContact() {
    const phone = (x, r, face) => `<g transform="rotate(${r} ${x + 50} 140)"><rect x="${x}" y="40" width="100" height="190" rx="16" fill="${C.ink}"/><rect x="${x + 8}" y="56" width="84" height="158" rx="8" fill="#fff"/>${face}</g>`;
    const catFace = (x) => `<circle cx="${x + 50}" cy="110" r="26" fill="${C.ginger}"/><path d="M${x + 28} 98 l2 -24 l16 14Z M${x + 72} 98 l-2 -24 l-16 14Z" fill="${C.ginger}"/><path d="M${x + 38} 110 q5 5 10 0 M${x + 52} 110 q5 5 10 0" stroke="${C.black}" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="${x + 22}" y="150" width="56" height="8" rx="4" fill="#d9d4ea"/><rect x="${x + 30}" y="166" width="40" height="8" rx="4" fill="#d9d4ea"/>`;
    const person = (x) => `<circle cx="${x + 50}" cy="102" r="18" fill="#f6dcc2"/><path d="M${x + 32} 96 q18 -26 36 0 q-4 -16 -18 -16 q-14 0 -18 16Z" fill="${C.plum}"/><path d="M${x + 22} 150 q28 -40 56 0Z" fill="${C.yarn}"/><rect x="${x + 22}" y="166" width="56" height="8" rx="4" fill="#d9d4ea"/>`;
    return `<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
      ${phone(55, -10, catFace(55))}${phone(165, 9, person(165))}
      <path d="M150 40 q10 -14 20 0 q10 -14 20 0 q0 14 -20 26 q-20 -12 -20 -26Z" fill="${C.yarn}"/>
      <g fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"><path d="M40 70 q-14 10 -2 24"/><path d="M28 60 q-24 18 -2 46"/><path d="M282 70 q14 10 2 24"/><path d="M294 60 q24 18 2 46"/></g>
    </svg>`;
  }
  function procMeet() {
    return `<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 150 C60 140 110 150 150 160 L150 200 C100 196 50 200 0 205 Z" fill="${C.ink}"/>
      <path d="M140 150 C170 140 190 150 200 165 C205 175 196 182 186 178 L170 172 C175 185 168 196 150 196 Z" fill="#f6dcc2" stroke="${C.black}" stroke-width="3"/>
      <path d="M290 260 C290 190 270 150 250 150 C225 150 215 190 215 260 Z" fill="${C.cream2}" stroke="${C.black}" stroke-width="4"/>
      <path d="M205 110 L198 60 L235 88 Z" fill="${C.cream2}" stroke="${C.black}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M275 92 L292 48 L300 100 Z" fill="${C.cream2}" stroke="${C.black}" stroke-width="4" stroke-linejoin="round"/>
      <ellipse cx="250" cy="130" rx="55" ry="48" fill="${C.cream2}" stroke="${C.black}" stroke-width="4"/>
      <path d="M206 98 L203 74 L224 90 Z M285 92 L292 70 L296 98 Z" fill="${C.peach}"/>
      <circle cx="232" cy="124" r="6" fill="${C.black}"/><circle cx="270" cy="124" r="6" fill="${C.black}"/>
      <path d="M200 145 L214 143 L206 152 Z" fill="${C.pinkNose}"/>
      <g stroke="${C.black}" stroke-width="2" fill="none" stroke-linecap="round"><path d="M215 150 L185 140"/><path d="M215 156 L188 160"/></g>
      <path d="M150 70 q12 -16 24 0 q12 -16 24 0 q0 16 -24 30 q-24 -14 -24 -30Z" fill="${C.yarn}"/>
      <g fill="${C.ink}"><circle cx="120" cy="90" r="4"/><circle cx="210" cy="40" r="3"/><circle cx="105" cy="120" r="3"/></g>
    </svg>`;
  }
  function procService() {
    return `<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="160" cy="225" rx="120" ry="30" fill="${C.ink}"/>
      <ellipse cx="160" cy="212" rx="120" ry="30" fill="#7f8af0"/>
      <path d="M110 215 C100 150 120 110 160 108 C200 110 220 150 210 215 Z" fill="${C.ginger}"/>
      <path d="M210 205 C250 200 262 170 245 150" fill="none" stroke="${C.ginger}" stroke-width="20" stroke-linecap="round"/>
      <path d="M118 78 L112 30 L148 58 Z M202 78 L208 30 L172 58 Z" fill="${C.ginger}"/>
      <path d="M124 68 L121 44 L140 60 Z M196 68 L199 44 L180 60 Z" fill="${C.peach}"/>
      <ellipse cx="160" cy="95" rx="52" ry="44" fill="${C.ginger}"/>
      <path d="M135 92 q8 8 16 0 M169 92 q8 8 16 0" stroke="${C.black}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M153 106 L167 106 L160 114 Z" fill="${C.pinkNose}"/>
      <ellipse cx="160" cy="165" rx="30" ry="40" fill="#f6dcc2"/>
      <path d="M128 52 L135 30 L148 44 L160 24 L172 44 L185 30 L192 52 Z" fill="${C.yarn}" stroke="${C.black}" stroke-width="3" stroke-linejoin="round"/>
      <g fill="${C.yarn}"><path d="M60 80 l5 12 12 5 -12 5 -5 12 -5 -12 -12 -5 12 -5Z"/><path d="M262 110 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4Z"/><path d="M250 40 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3Z"/></g>
    </svg>`;
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

  window.ART = { C, heroCat, heroCats, catFace, ring, lyingCat, slideWalk, slidePlay, slideSleep, toy, smallYarn, bigYarn, yarnCluster, procForm, procContact, procMeet, procService, catRear, foundUs, logoCat, icon };
})();
