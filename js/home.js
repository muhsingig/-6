/* =========================================================
   STAY PURR — home page
   services wheel · how it works · testimonials · hero cats
   ========================================================= */
(function () {
  const { $, $$, gsap, ScrollTrigger, lenis, isDesktop, revealLines, fadeUp, onIntro } = window.SITE;
  const EASE = 'expo.out';

  /* ---------------- content ---------------- */
  const SERVICES = [
    { title: 'drop-in visits', desc: 'We pop in once or twice a day to feed, refresh water, scoop the litter and give your cat their daily dose of chin scratches.' },
    { title: 'playtime', desc: 'Wand toys, laser chases and yarn battles — a proper play session so your indoor tiger stays fit, curious and out of mischief.' },
    { title: 'overnight care', desc: 'A sitter stays the night, so your cat keeps their sofa, their sunny window and their routine while you are away.' },
  ];
  const TOYS = ['yarn', 'fish', 'mouse'];

  const STEPS = [
    { title: 'fill out <br>the form', desc: 'Fill out information, upload a photo of your cat and become a basic member.', art: 'procForm' },
    { title: 'you are being contacted', desc: 'Based on your profile we’ll show you the sitters that are near you.', art: 'procContact' },
    { title: 'first <br>meeting', desc: 'Before you can message and arrange a ‘welcome meow’ you’ll need to become a premium member.', art: 'procMeet' },
    { title: 'you receive quality service', desc: 'We recommend members get to know each other really well before a cat is cared for by another cat lover.', art: 'procService' },
  ];
  const CARD_END = [
    { top: 48, rotate: -3.077 }, { top: 76, rotate: -1.206 }, { top: 114, rotate: -4.402 }, { top: 140, rotate: 6.321 },
  ];

  const U = (id) => `https://images.unsplash.com/photo-${id}?w=900&h=900&fit=crop&q=75`;
  const STORIES = [
    { name: 'jane', img: U('1495360010541-f48722b34f7d'), date: 'march 14, 2026', title: 'I recently used the cat sitting service and I couldn’t be happier! The team took excellent care of my shy tabby Mochi while I was away for work and sent updates every single day', msg: 'Mochi usually hides under the bed for hours when anyone new comes over. By day two she was sitting on our sitter’s lap. I got photos, little notes about how much she ate, and a video of her chasing the feather wand. Coming home to a calm, happy cat (and a spotless litter box) was the best feeling.' },
    { name: 'oliversmom', img: U('1513245543132-31f507417b26'), date: 'february 2, 2026', title: 'Oliver is fourteen and needs medication twice a day, so leaving him was always stressful until we found these wonderful people who treat him like their own grumpy grandpa', msg: 'They learned his routine in one meet-and-greet, never missed a dose, and even noticed he was drinking more water than usual — which turned out to matter. I trust them completely.' },
    { name: 'mike', img: U('1529778873920-4da4926a72c2'), date: 'january 19, 2026', title: 'Two kittens, one very tired owner. The playtime visits saved my curtains, my sanity and probably my sofa while I was working long shifts at the hospital', msg: 'The kittens now wait at the door for “their” sitter. Forty minutes of proper play and they sleep through the evening. Worth every penny.' },
    { name: 'priya', img: U('1511044568932-338cba0ad803'), date: 'december 28, 2025', title: 'We went home for the holidays for two weeks and our cat stayed in her own sunny window instead of a scary boarding cage, exactly as she likes it', msg: 'Overnight care meant someone was there in the evenings and mornings. She didn’t even sulk when we came back, which for her is a miracle.' },
    { name: 'clara', img: U('1478098711619-5ab0b478d6e6'), date: 'december 3, 2025', title: 'Booking was simple, the first meeting was relaxed and our sitter asked a hundred thoughtful questions about Biscuit’s quirks before we even left town', msg: 'Biscuit only eats if his bowl is in a specific spot and he is watched. Our sitter respected every odd little rule. Ten out of ten.' },
    { name: 'theo', img: U('1543852786-1cf6624b9987'), date: 'november 21, 2025', title: 'I was nervous about giving a stranger my keys but the whole process felt safe, professional and very kind from the first message to the last', msg: 'Clear updates, tidy home, happy cat. That is all you want and that is exactly what we got.' },
    { name: 'flo', img: U('1526336024174-e58f5cdd8e13'), date: 'november 2, 2025', title: 'My two rescue cats don’t like each other or anyone else, yet somehow our sitter won them both over with patience and an outrageous amount of treats', msg: 'She sat on the floor and let them come to her. By the end of the week they were both headbutting her hand.' },
    { name: 'sam', img: U('1548247416-ec66f4900b2e'), date: 'october 12, 2025', title: 'Fantastic service from start to finish, the daily photo updates genuinely made my business trip so much less stressful than it would have been', msg: 'Every evening a new photo of Pepper loafing in a new spot. I have a whole album now.' },
    { name: 'sofi', img: U('1615789591457-74a63395c990'), date: 'september 30, 2025', title: 'Our fluffy diva needs brushing every day or she turns into a felted rug, and they brushed her gently every visit without a single complaint from either side', msg: 'She came out of the week looking better groomed than when we left. We have booked again for the summer.' },
    { name: 'nik', img: U('1570824104453-508955ab713e'), date: 'september 9, 2025', title: 'Simply the best cat sitters in the area, reliable, warm and clearly obsessed with cats in the best possible way, highly recommend to every cat parent', msg: 'Short and simple: my cat was happy, I was happy, the house was fine. We will be lifelong clients.' },
  ];

  function processCard(step, i, elastic) {
    const label = i === 0 ? `<div class="process-card__label"><svg width="82" height="27" viewBox="0 0 82 27"><path d="M4.7 19.3c1.7 0 3.1-1.4 3.1-3.2V6.3C7.8 2.8 10.7 0 14.2 0h53.2c3.5 0 6.3 2.8 6.3 6.3v9.8c0 1.8 1.5 3.2 3.2 3.2H82v3.6c0 1.8-1.4 3.2-3.2 3.2H3.2C1.4 26.1 0 24.7 0 22.9v-3.6h4.7Z" fill="var(--c-white)"/></svg><p class="process-card__label-name p3-medium">process</p></div>` : '';
    return `<div class="process-card${elastic ? ' elastic' : ''}">${label}
      <div><p class="process-card__title h6">${step.title}</p></div>
      <div><p class="process-card__number h6">0${i + 1}.</p><p class="process-card__description p3-medium">${step.desc}</p>
      <div class="process-card__image-block c${i + 1}"><div class="proc-art">${ART[step.art]()}</div></div></div></div>`;
  }
  $$('.wrap-process-card').forEach((w, i) => { w.innerHTML = processCard(STEPS[i], i); });
  $('#how-slider').innerHTML = STEPS.map((s, i) => processCard(s, i, true)).join('');

  /* ---------------- hero intro (runs as preloader opens) ---------------- */
  onIntro(() => {
    if (isDesktop()) {
      const titles = $$('.main-page__title');
      const tl = gsap.timeline();
      titles.forEach((t, i) => tl.add(revealLines(t, { delay: 0 }, true), i * 0.2));
      tl.to('.bottom-title__letter', { rotate: -13, duration: 0.5, ease: 'bounce.out' });
      fadeUp($('.small_title'), { delay: 0.75 }, true);
      gsap.fromTo('.main-page__social-links .social-link', { opacity: 0, yPercent: 50 }, { opacity: 1, yPercent: 0, stagger: 0.2, ease: 'power3.out', duration: 1.4 });
    } else {
      revealLines($('.mobile-title'), {}, true).eventCallback('onComplete', () => gsap.to('.mobile-title__letter', { rotate: -13, duration: 0.5, ease: 'bounce.out' }));
      fadeUp($('.mobile__sub-title'), {}, true);
    }
    gsap.from('.main-page__white-cat', { yPercent: 6, opacity: 0, duration: 1.6, ease: 'power3.out' });
    setTimeout(startCoats, 2600);
  });

  /* ---------------- hero: white -> orange -> black cat ---------------- */
  const coats = $$('.hc-slide');
  let coat = 0, coatTimer = null, heroVisible = true;
  function nextCoat() {
    if (!heroVisible || document.hidden) return;
    const cur = coats[coat];
    coat = (coat + 1) % coats.length;
    const nxt = coats[coat];
    gsap.timeline()
      .to(cur, { yPercent: 22, duration: 0.55, ease: 'power3.in', onComplete: () => { cur.classList.remove('is-active'); gsap.set(cur, { clearProps: 'transform' }); } })
      .fromTo(nxt, { yPercent: 26 }, { yPercent: 0, duration: 1.1, ease: 'back.out(1.5)', onStart: () => nxt.classList.add('is-active') }, '-=0.1');
    gsap.fromTo('.bottom-title__letter, .mobile-title__letter', { rotate: -13 }, { rotate: 8, duration: 0.25, yoyo: true, repeat: 1, ease: 'power1.inOut', onComplete: () => gsap.set('.bottom-title__letter, .mobile-title__letter', { rotate: -13 }) });
  }
  function startCoats() {
    if (coatTimer || coats.length < 2) return;
    coatTimer = setInterval(nextCoat, 4200);
    ScrollTrigger.create({ trigger: '.main-page__content', start: 'top top', end: 'bottom top', onToggle: (self) => { heroVisible = self.isActive; } });
  }

  /* ---------------- services slider ---------------- */
  const slotBase = [180, 90, 270, 0]; // left, bottom, top, right
  const slots = $$('.toy-wrap');
  const iconWrap = $('.services__slider-icons-wrap');
  let active = 0, turns = 0, timer;
  const setToy = (slot, idx) => { slot.querySelector('.toys-wrap').innerHTML = ART.toy[TOYS[idx]](); };
  setToy(slots[0], 0); setToy(slots[1], 1); setToy(slots[2], 2); setToy(slots[3], 2);
  const fill = $('.progress-line__fill');
  const titleEl = $('.js-slide-title'), descEl = $('.js-slide-desc'), numEl = $('.js-slide-num');

  function swapText(el, txt, dur = 0.4) {
    gsap.timeline()
      .to(el, { yPercent: -100, duration: dur, ease: 'power1.inOut' })
      .add(() => { el.textContent = txt; })
      .fromTo(el, { yPercent: 101 }, { yPercent: 0, duration: dur, ease: 'power1.inOut' });
  }
  function goService(dir = 1) {
    active = (active + dir + 3) % 3;
    $$('.our-services__slide').forEach((s, i) => s.classList.toggle('active', i === active));
    swapText(titleEl, SERVICES[active].title);
    swapText(numEl, String(active + 1), 0.3);
    gsap.timeline().to(descEl, { opacity: 0, duration: 0.3 }).add(() => { descEl.textContent = SERVICES[active].desc; }).to(descEl, { opacity: 1, duration: 0.5 });
    if (isDesktop() && dir > 0) {
      // slot at the far right (off-screen) becomes "next" after this turn
      const right = slots.find((s, i) => (slotBase[i] + 90 * turns) % 360 === 0);
      if (right) setToy(right, (active + 1) % 3);
      turns++;
      gsap.to(iconWrap, { rotate: 90 * turns, duration: 0.7, ease: 'power2.inOut' });
      gsap.to($$('.toys-wrap', iconWrap), { rotate: -90 * turns, duration: 0.7, ease: 'power2.inOut' });
    }
    startTimer();
  }
  function startTimer() {
    if (timer) timer.kill();
    timer = gsap.timeline()
      .to(fill, { scaleX: 0, duration: gsap.getProperty(fill, 'scaleX') > 0.05 ? 0.8 : 0, ease: 'power2.out' })
      .to(fill, { scaleX: 1, duration: 5, ease: 'none', onComplete: () => goService(1) }, '+=0.2');
  }
  slots.forEach((s) => s.addEventListener('click', (e) => { e.stopPropagation(); goService(1); }));
  $('.btn-slide__mob.next').addEventListener('click', () => goService(1));
  $('.btn-slide__mob.prev').addEventListener('click', () => goService(-1));
  ScrollTrigger.create({ trigger: '.our-services__content', start: 'top bottom', once: true, onEnter: startTimer });

  // decor yarn ball drifts toward the cursor
  const decor = $('.our-services__decor-ball');
  const onDecor = (e) => {
    const r = decor.getBoundingClientRect();
    gsap.to(decor, { x: (e.clientX - r.x) / 30, y: (e.clientY - r.y) / 30, duration: 1 });
  };
  ScrollTrigger.create({
    trigger: '.our-services', start: 'top bottom', end: 'bottom center',
    onToggle: (self) => (self.isActive && isDesktop() ? window.addEventListener('mousemove', onDecor) : window.removeEventListener('mousemove', onDecor)),
  });

  /* ---------------- how it works ---------------- */
  const labels = $$('.circle-label');
  function setStep(n) { labels.forEach((l) => l.classList.toggle('active', +l.dataset.step === n)); }
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1025px)', () => {
    $$('.wrap-process-card').forEach((card, i) => {
      gsap.to(card, {
        top: CARD_END[i].top, rotate: CARD_END[i].rotate, ease: 'none',
        scrollTrigger: {
          trigger: `.plash-move-card${i + 1}`, start: 'top bottom', end: 'bottom bottom', scrub: true,
          onEnter: () => setStep(i + 1), onLeaveBack: () => setStep(i),
        },
      });
    });
    const onLabels = (e) => {
      const x = ((e.clientX / window.innerWidth) * 100 - 50) / 2;
      const y = ((e.clientY / window.innerHeight) * 100 - 50) / 2;
      labels.forEach((l, i) => gsap.to(l, { duration: 1.6, xPercent: x * (i % 2 ? 1 : -1), yPercent: y * (i % 2 ? 1 : -1) }));
    };
    const st = ScrollTrigger.create({
      trigger: '.how-section', start: 'top bottom', end: 'bottom top',
      onToggle: (self) => (self.isActive ? window.addEventListener('mousemove', onLabels) : window.removeEventListener('mousemove', onLabels)),
    });
    return () => { st.kill(); window.removeEventListener('mousemove', onLabels); };
  });

  /* ---------------- care section ---------------- */
  gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.care-pet_content', start: 'top bottom', end: 'center center', scrub: true } })
    .to('.care-pet_left-ball', { yPercent: 50 }, 0)
    .to('.care-pet_right-ball', { yPercent: -50 }, 0);
  gsap.from('.care-pet__semicircle', { opacity: 0, bottom: 260, ease: 'none', scrollTrigger: { trigger: '.care-pet__semicircle', start: 'bottom 95%', end: 'bottom center', scrub: true } });
  gsap.from('.care-pet__book-consult', { opacity: 0, bottom: 200, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.care-pet__book-consult', start: 'top 95%' } });

  /* testimonials slider */
  const track = $('#t-track');
  const N = STORIES.length;
  const COPIES = 3;
  let tPos = N; // index inside the middle copy
  let tActive = 0;
  let tBusy = false;
  track.innerHTML = Array.from({ length: COPIES }, () => STORIES.map((s, i) => `
    <div class="testimonial-slide" data-i="${i}">
      <div class="testimonial-slide__line"><div class="testimonial-slide__point"></div></div>
      <p class="testimonial-slide__num p2-medium">${String(i + 1).padStart(2, '0')}</p>
      <p class="testimonial-slide__name p2-medium">${s.name}</p>
    </div>`).join('')).join('');
  const tSlides = $$('.testimonial-slide', track);
  const readEl = $('#t-read');
  function slideW() { return tSlides[0].offsetWidth; }
  function placeTrack(animate) {
    const x = track.parentElement.offsetWidth / 2 - (tPos + 0.5) * slideW();
    if (animate) {
      tBusy = true;
      gsap.to(track, {
        x, duration: 0.5, ease: 'power2.out', onComplete: () => {
          tBusy = false;
          if (tPos < N || tPos >= 2 * N) { tPos = ((tPos % N) + N) % N + N; gsap.set(track, { x: track.parentElement.offsetWidth / 2 - (tPos + 0.5) * slideW() }); }
        },
      });
    } else gsap.set(track, { x });
    tSlides.forEach((s) => s.querySelector('.testimonial-slide__point').classList.toggle('active', +s.dataset.i === tActive));
  }
  function readText(i) {
    const words = STORIES[i].title.split(' ');
    return words.slice(0, 18).join(' ') + '...';
  }
  function setStory(i, animate = true) {
    const prev = tActive;
    tActive = ((i % N) + N) % N;
    if (animate && prev !== tActive) {
      gsap.timeline().to(readEl, { opacity: 0, y: 12, duration: 0.2 }).add(() => { readEl.textContent = readText(tActive); }).to(readEl, { opacity: 1, y: 0, duration: 0.35 });
    } else readEl.textContent = readText(tActive);
  }
  function stepStory(d) {
    if (tBusy) return;
    tPos += d; setStory(tActive + d); placeTrack(true);
  }
  tSlides.forEach((s, k) => s.addEventListener('click', (e) => {
    e.stopPropagation(); if (tBusy) return;
    const i = +s.dataset.i; tPos = k; setStory(i); placeTrack(true);
  }));
  $('.testimonial__btn-prev').addEventListener('click', (e) => { e.stopPropagation(); stepStory(-1); });
  $('.testimonial__btn-next').addEventListener('click', (e) => { e.stopPropagation(); stepStory(1); });
  setStory(0, false); placeTrack(false);
  window.addEventListener('resize', () => placeTrack(false));

  /* "read a story" cursor */
  const cursorEl = $('#cursor-mouse');
  const OFF = [0, 10, 20, 30, 45, 60, 70, 80, 93, 104];
  cursorEl.innerHTML = 'readastory'.split('').map((c) => `<span class="cursor-character">${c}</span>`).join('');
  const chars = $$('.cursor-character', cursorEl);
  const onCursor = (e) => {
    const tl = gsap.timeline();
    chars.forEach((c, i) => tl.to(c, { duration: 1.2, delay: 0.04, x: e.clientX + OFF[i] + 20, y: e.clientY, ease: 'power4.out' }, '<'));
  };
  const readWrap = $('#read-wrap');
  ScrollTrigger.create({
    trigger: '.care-pet_content', start: 'top top', end: 'bottom top',
    onToggle: (self) => (self.isActive && isDesktop() ? window.addEventListener('mousemove', onCursor) : window.removeEventListener('mousemove', onCursor)),
  });
  readWrap.addEventListener('mouseenter', () => isDesktop() && gsap.to(chars, { opacity: 1, duration: 1 }));
  readWrap.addEventListener('mouseleave', () => gsap.to(chars, { opacity: 0, duration: 1 }));
  readEl.addEventListener('click', (e) => { e.stopPropagation(); openModal(); });

  /* modal */
  const modal = $('#modal');
  gsap.set(modal, { yPercent: 100, y: 0 });
  function openModal() {
    const s = STORIES[tActive];
    $('#m-name').textContent = s.name;
    $('#m-count').textContent = `${String(tActive + 1).padStart(2, '0')}-${String(N).padStart(2, '0')}`;
    $('#m-img').src = s.img;
    $('#m-date').textContent = s.date;
    $('#m-title').textContent = s.title;
    $('#m-msg').textContent = s.msg;
    lenis.stop();
    modal.setAttribute('aria-hidden', 'false');
    gsap.to(modal, { visibility: 'visible', yPercent: 0, duration: 1, ease: EASE, onStart() { gsap.to('.overlay-modal', { opacity: 0.6, delay: 0.7, ease: EASE }); } });
  }
  function closeModal() {
    lenis.start();
    modal.setAttribute('aria-hidden', 'true');
    gsap.to('.overlay-modal', { opacity: 0, duration: 0.25 });
    gsap.to(modal, { yPercent: 100, duration: 1, ease: EASE, onComplete() { gsap.set(modal, { visibility: 'hidden' }); } });
  }
  $$('.js-modal-close').forEach((b) => b.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* ---------------- book consult: yarn balls drift with cursor ---------------- */
  const consultBalls = $$('.book-consult .decor__yellow-ball');
  const onConsult = (e) => {
    const x = ((e.clientX / window.innerWidth) * 100 - 50) / 5;
    const y = ((e.clientY / window.innerHeight) * 100 - 50) / 5;
    consultBalls.forEach((b, m) => gsap.to(b, { duration: 1.6, xPercent: x * (m % 2 ? 1 : -1) + m * (m % 2 ? 2 : -2), yPercent: y * (m % 2 ? 1 : -1) + m * (m % 2 ? 2 : -2), rotate: x * (m % 2 ? 2 : -2) }));
  };
  ScrollTrigger.create({
    trigger: '.book-consultation', start: 'top bottom', end: 'bottom top',
    onToggle: (self) => (self.isActive && isDesktop() ? window.addEventListener('mousemove', onConsult) : window.removeEventListener('mousemove', onConsult)),
  });

  /* ---------------- pricing cards ---------------- */
  mm.add('(min-width: 1025px)', () => {
    gsap.from('.cost-of-walking__card', { scrollTrigger: { trigger: '.cost-of-walking__cards-wrap', start: 'top 97%' }, stagger: 0.05, ease: 'power2.out', opacity: 0.8, duration: 1.2, y: 150, clearProps: 'all' });
  });
  mm.add('(max-width: 1024px)', () => {
    $$('.cost-of-walking__card').forEach((c) => gsap.from(c, { scrollTrigger: { trigger: c, start: 'top bottom' }, y: 40, opacity: 0, duration: 0.6 }));
  });
})();
