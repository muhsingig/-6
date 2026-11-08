/* =========================================================
   STAY PURR — shared core for every page
   header · menu · footer · instagram block · preloader ·
   Lenis smooth scroll · line/fade reveals · art injection
   ========================================================= */
(function () {
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const isDesktop = () => window.innerWidth > 1024;
  const body = document.body;
  const PAGE = body.dataset.page || 'home';

  const BRAND = {
    name: 'Stay Purr',
    email: 'hello@staypurr.com',
    phone: '555-014-2290',
    area: 'san diego–carlsbad, ca metropolitan area',
    insta: '#', tiktok: '#', whatsapp: '#',
  };
  const NAV = [
    ['pricing', 'pricing.html'], ['about us', 'about.html'], ['services', 'services.html'],
    ['blog', 'blog.html'], ['contacts', 'contacts.html'],
  ];
  const LEGAL = [['privacy policy', 'privacy.html'], ['terms of use', 'terms.html'], ['faq', 'faq.html'], ['instagram', BRAND.insta], ['tik-tok', BRAND.tiktok]];
  const isActive = (href) => href.replace('.html', '') === PAGE;

  /* ---------------- art ---------------- */
  function renderArt(spec) {
    const [name, arg] = spec.split(':');
    if (name.startsWith('icon.')) return ART.icon[name.slice(5)]();
    const fn = ART[name];
    return fn ? fn(arg !== undefined ? +arg : undefined) : '';
  }
  function injectArt(root = document) { $$('[data-art]', root).forEach((el) => { if (!el.dataset.artDone) { el.innerHTML = renderArt(el.dataset.art); el.dataset.artDone = '1'; } }); }

  /* ---------------- layout pieces ---------------- */
  const socials = () => `
    <a class="social-link" href="${BRAND.insta}" aria-label="Instagram" data-art="icon.insta"></a>
    <a class="social-link" href="${BRAND.tiktok}" aria-label="TikTok" data-art="icon.tiktok"></a>
    <a class="social-link" href="${BRAND.whatsapp}" aria-label="WhatsApp" data-art="icon.whatsapp"></a>`;

  function headerHTML() {
    return `<header class="header" id="header">
      <div class="header__menu-overlay"></div>
      <div class="header__menu">
        <div class="header__menu-circle n1"></div><div class="header__menu-circle n2"></div><div class="header__menu-circle n3"></div><div class="header__menu-circle n4"></div><div class="header__menu-circle n5"></div>
        <div class="header-menu__mob-header">
          <a href="index.html" class="common-logo"><span data-art="logoCat" class="header-cat"></span></a>
          <button class="p2-medium js-menu-close">close</button>
        </div>
        <nav class="header-menu__nav-wrap">
          ${NAV.map(([t, h]) => `<a class="header-menu__nav-link h6${isActive(h) ? ' is-current' : ''}" href="${h}">${t}</a>`).join('')}
          <div class="header-menu__social-links">${socials()}</div>
        </nav>
      </div>
      <div class="header__left-part">
        <a href="index.html" class="common-logo" aria-label="${BRAND.name} home">
          <span data-art="logoCat" class="header-cat"></span>
          <span class="header__wordmark">stay<br>purr</span>
        </a>
      </div>
      <button class="header__left-mob-btn p2-medium js-menu-open">menu</button>
      <nav class="header__menu-nav active">
        ${NAV.map(([t, h]) => `<a class="btn-nav${isActive(h) ? ' is-current' : ''}" href="${h}"><span class="link__text p2-medium">${t}</span></a>`).join('')}
      </nav>
      <button class="header__burger-btn js-burger" aria-label="Open menu">
        <svg width="40" height="12" viewBox="0 0 40 12"><rect class="burger-line__top" width="40" height="2" y="1"/><rect class="burger-line__bottom" width="40" height="2" y="9"/></svg>
      </button>
      <div class="header__right-part"><a class="btn-book p2-medium" href="book.html">book now</a></div>
      <a class="header__right-mob-btn p2-medium" href="book.html">book</a>
    </header>`;
  }

  function footerHTML() {
    return `<footer class="footer-wrap">
      <div class="footer__top-part">
        <div class="footer__top-left">
          <a href="index.html" class="footer__logo-link" aria-label="${BRAND.name}">
            <span class="footer__wordmark">stay<br>purr</span>
            <span class="footer__logo-cat" data-art="logoCat"></span>
          </a>
          <div class="footer__top-left-details">
            <p class="p2-medium">${BRAND.area}</p>
            <a class="p2-medium underline-hover" href="mailto:${BRAND.email}">${BRAND.email}</a>
          </div>
        </div>
        <div class="footer__top-right">
          <div class="footer__top-right_left">${NAV.map(([t, h]) => `<a class="footer-link p2-medium${isActive(h) ? ' is-current' : ''}" href="${h}">${t}</a>`).join('')}</div>
          <div class="footer__top-right_right">${LEGAL.map(([t, h]) => `<a class="footer-link p2-medium${isActive(h) ? ' is-current' : ''}" href="${h}">${t}</a>`).join('')}</div>
        </div>
      </div>
      <a class="mobile-email-link p2-medium" href="mailto:${BRAND.email}">${BRAND.email}</a>
      <div class="footer__bottom-part">
        <p class="footer-text p2-medium">© ${new Date().getFullYear()} stay purr. all rights reserved</p>
        <div class="made-by__wrap"><p class="p2-medium">made with <span class="our-website__link">a lot of purrs</span></p></div>
      </div>
    </footer>`;
  }

  const UNS = (id, w = 400) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${w}&fit=crop&q=70`;
  const INST = [
    ['1514888286974-6c03e2ca1dba', 'Black and white cat leaning on a table'], ['1573865526739-10659fec78a5', 'Ginger cat lying on the floor'],
    ['1518791841217-8f162f1e1131', 'Tabby cat resting on a cushion'], ['1574158622682-e40e69881006', 'Cat with green eyes looking up'],
    ['1592194996308-7b43878e84a6', 'Kitten raising a paw'], ['1519052537078-e6302a4968d4', 'Ginger cat napping'],
    ['1533738363-b7f9aef128ce', 'Grey cat wearing sunglasses'], ['1494256997604-768d1f608cac', 'Kittens in a wicker basket'],
    ['1561948955-570b270e7c36', 'Surprised white cat'],
  ];
  function instHTML(variant) {
    const about = variant === 'about';
    return `<div class="inst-block${about ? ' page-about' : ''}" id="inst-block">
      <div class="inst-block__top-part">
        <p class="inst-block__text-blue inst-block__text-left p2-medium js-fade">share the love</p>
        <p class="inst-block__text-blue inst-block__text-right p2-medium js-fade">of your cat</p>
        <a class="inst-block__found-us" href="${BRAND.insta}" aria-label="Find us on Instagram"><span data-art="foundUs"></span><span class="icon-inst" data-art="icon.igSmall"></span></a>
        ${about ? '' : '<div class="inst-block__image" data-art="catRear"></div>'}
      </div>
      <div class="inst-block__content">
        <a class="link-inst h6" href="${BRAND.insta}">@staypurr</a>
        ${INST.map(([id, alt], i) => `<div class="cat-card card${i + 1}"><img alt="${alt}" loading="lazy" src="${UNS(id, i === 2 || i === 3 || i === 5 || i === 7 ? 500 : 400)}"></div>`).join('')}
        <div class="inst-block__mob-slider"><div class="inst-marquee">${[...INST, ...INST].map(([id, alt]) => `<img src="${UNS(id)}" alt="${alt}" loading="lazy">`).join('')}</div></div>
      </div>
      ${footerHTML()}
    </div>`;
  }

  function preloaderHTML() {
    return `<div class="preloader" id="preloader">
      <svg class="preloader__svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs><mask id="pl-mask"><rect width="103%" height="100%" fill="#fff"/><circle id="pl-circle" cx="50%" cy="50%" r="0" fill="#000"/></mask></defs>
        <rect width="100%" height="100%" class="preloader__fill" mask="url(#pl-mask)"/>
      </svg>
      <button class="preloader__ball-wrap" aria-label="Toss the yarn" data-art="smallYarn"></button>
      <div class="preloader__content-wrap">
        <p class="preloader__title">toss the yarn to get to the site</p>
        <p class="preloader__title-mob">loading <span id="pl-count">0</span>%</p>
        <p class="preloader__description">You've landed on a cat sitting site. Follow our rules to keep your cat happy</p>
      </div>
    </div>`;
  }

  // mount
  $$('[data-site="header"]').forEach((el) => { el.outerHTML = headerHTML(); });
  $$('[data-site="footer"]').forEach((el) => { el.outerHTML = footerHTML(); });
  $$('[data-site="inst"]').forEach((el) => { el.innerHTML = instHTML(el.dataset.variant); });
  const theme = body.dataset.theme;
  if (theme) { const h = $('#header'); if (h) h.dataset.theme = theme; }
  const footerTheme = body.dataset.footer;
  if (footerTheme) $$('.footer-wrap').forEach((f) => f.classList.add('footer--' + footerTheme));

  let seen = false;
  try { seen = sessionStorage.getItem('sp-entered') === '1'; } catch (e) { /* storage blocked */ }
  const usePreloader = !seen && body.dataset.preloader !== 'off';
  if (usePreloader) { body.classList.add('is-loading'); body.insertAdjacentHTML('afterbegin', preloaderHTML()); }
  injectArt();

  /* ---------------- smooth scroll ---------------- */
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  window.lenis = lenis;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (usePreloader) { lenis.stop(); window.scrollTo(0, 0); }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const t = $(id);
    if (!t) return;
    e.preventDefault();
    closeMenu();
    lenis.scrollTo(t, { offset: id === '#top' ? 0 : -40, duration: 1.6 });
  });

  /* ---------------- header + menu ---------------- */
  const header = $('#header');
  const nav = $('.header__menu-nav');
  const burger = $('.js-burger');
  function openMenu() { if (!header) return; header.classList.add('menu-open'); lenis.stop(); }
  function closeMenu() { if (!header || !header.classList.contains('menu-open')) return; header.classList.remove('menu-open'); lenis.start(); }
  if (header) {
    burger.addEventListener('click', () => (header.classList.contains('menu-open') ? closeMenu() : openMenu()));
    $('.js-menu-open').addEventListener('click', openMenu);
    $('.js-menu-close').addEventListener('click', closeMenu);
    $('.header__menu-overlay').addEventListener('click', closeMenu);
    lenis.on('scroll', ({ scroll }) => {
      const scrolled = scroll > 120;
      nav.classList.toggle('active', !scrolled);
      burger.classList.toggle('active', scrolled);
    });
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  /* ---------------- reveal helpers ---------------- */
  function splitLines(el) {
    if (el.dataset.split) return $$('.text-line', el);
    const words = []; let cur = [];
    const push = () => { if (cur.length) { words.push(cur); cur = []; } };
    [...el.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) push(); else cur.push(document.createTextNode(part));
        });
      } else if (n.nodeName === 'BR') { push(); words.push('br'); } else cur.push(n);
    });
    push();
    el.innerHTML = '';
    const spans = words.map((w) => {
      if (w === 'br') { const br = document.createElement('br'); el.appendChild(br); return br; }
      const s = document.createElement('span');
      s.style.display = 'inline-block';
      w.forEach((n) => s.appendChild(n));
      el.appendChild(s); el.appendChild(document.createTextNode(' '));
      return s;
    });
    const lines = []; let top = null;
    spans.forEach((s) => {
      if (s.nodeName === 'BR') { top = null; return; }
      const t = s.offsetTop;
      if (top === null || Math.abs(t - top) > 4) { lines.push([]); top = t; }
      lines[lines.length - 1].push(s);
    });
    el.innerHTML = '';
    lines.forEach((ws) => {
      const wrap = document.createElement('span'); wrap.className = 'text-line-wrap';
      const line = document.createElement('span'); line.className = 'text-line';
      ws.forEach((w, i) => { line.appendChild(w); if (i < ws.length - 1) line.appendChild(document.createTextNode(' ')); });
      wrap.appendChild(line); el.appendChild(wrap);
    });
    el.dataset.split = '1';
    return $$('.text-line', el);
  }
  function revealLines(el, opts = {}, immediate = false) {
    if (!el) return gsap.timeline();
    const lines = splitLines(el);
    gsap.set(el, { opacity: 1 });
    return gsap.from(lines, {
      yPercent: 100, rotate: 30, transformOrigin: 'left', stagger: 0.15, duration: 0.8, delay: 0.1, ease: 'power4.out', clearProps: 'transform',
      ...(immediate ? {} : { scrollTrigger: { trigger: el, start: 'top bottom' } }), ...opts,
    });
  }
  function fadeUp(el, opts = {}, immediate = false) {
    if (!el) return gsap.timeline();
    return gsap.from(el, {
      yPercent: 28, opacity: 0, duration: 1.2, ease: 'power2.out',
      ...(immediate ? {} : { scrollTrigger: { trigger: el, start: 'top bottom' } }), ...opts,
    });
  }

  /* ---------------- intro (after preloader, or straight away) ---------------- */
  const introFns = [];
  let introDone = false;
  function runIntro() {
    if (introDone) return; introDone = true;
    // generic first-view animation for inner pages
    $$('.js-intro-lines').forEach((el, i) => revealLines(el, { delay: 0.1 + i * 0.15 }, true));
    $$('.js-intro-fade').forEach((el, i) => fadeUp(el, { delay: 0.35 + i * 0.1 }, true));
    if (header) gsap.from('.header__left-part, .header__menu-nav, .header__right-part, .header__left-mob-btn, .header__right-mob-btn', { yPercent: -60, opacity: 0, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.2, clearProps: 'transform,opacity' });
    introFns.forEach((fn) => fn());
  }
  function onIntro(fn) { if (introDone) fn(); else introFns.push(fn); }

  /* ---------------- preloader ---------------- */
  function preloader() {
    const pre = $('#preloader');
    const ball = $('.preloader__ball-wrap');
    const circle = $('#pl-circle');
    let preDone = false;
    function finish(x, y, rMax) {
      try { sessionStorage.setItem('sp-entered', '1'); } catch (e) { /* ignore */ }
      const tl = gsap.timeline();
      tl.to('.preloader__content-wrap', { xPercent: -30, opacity: 0, duration: 0.4 });
      if (x !== undefined) {
        gsap.set(circle, { attr: { cx: x, cy: y } });
        tl.to(ball, { scale: 1, duration: 1.2, x: x - 27, y: y - 27, ease: 'bounce.out' }, '<');
        tl.to(ball, { duration: 0.3, opacity: 0, scale: 0 }, '<+=0.95');
      }
      tl.to(circle, {
        attr: { r: rMax }, duration: 1.3, ease: 'power2.inOut',
        onStart() { setTimeout(runIntro, 400); },
        onComplete() { pre.remove(); body.classList.remove('is-loading'); lenis.start(); ScrollTrigger.refresh(); },
      });
    }
    const tl = gsap.timeline({ delay: 0.15 });
    if (isDesktop()) {
      gsap.set(ball, { x: window.innerWidth * 0.69, y: window.innerHeight * 0.6, scale: 2 });
      tl.fromTo('.preloader__title', { xPercent: -150, yPercent: -50, opacity: 0 }, { xPercent: -50, yPercent: -50, opacity: 1, duration: 0.7 });
      tl.fromTo('.preloader__description', { opacity: 0, xPercent: -150 }, { opacity: 1, xPercent: 0, duration: 0.7 }, '<+=0.25');
      const move = (e) => gsap.to(ball, { x: e.clientX + 20, y: e.clientY + 20, duration: 0.5 });
      window.addEventListener('mousemove', move);
      pre.addEventListener('click', (e) => {
        if (preDone) return; preDone = true;
        window.removeEventListener('mousemove', move);
        const x = e.clientX || window.innerWidth / 2, y = e.clientY || window.innerHeight / 2;
        finish(x, y, Math.hypot(window.innerWidth, window.innerHeight) * 1.1);
      });
      pre.setAttribute('tabindex', '0');
      pre.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') pre.click(); });
      pre.focus({ preventScroll: true });
    } else {
      const n = { v: 0 };
      tl.fromTo('.preloader__title-mob', { xPercent: -150, yPercent: -50, opacity: 0 }, { xPercent: -50, yPercent: -50, opacity: 1, duration: 0.7 });
      tl.to('.preloader__description', { opacity: 1, duration: 0.7 }, '<+=0.15');
      tl.to(n, {
        v: 100, duration: 3, ease: 'none', onUpdate: () => { $('#pl-count').textContent = Math.round(n.v); },
        onComplete: () => setTimeout(() => finish(undefined, undefined, Math.hypot(window.innerWidth, window.innerHeight)), 500),
      }, '<');
    }
  }

  /* ---------------- instagram cards follow cursor ---------------- */
  const inst = $('#inst-block');
  if (inst) {
    const cards = $$('.cat-card', inst);
    inst.addEventListener('mousemove', (e) => {
      if (!isDesktop()) return;
      const r = inst.getBoundingClientRect();
      const x = (e.clientX - r.width / 2) / 25;
      const y = (e.clientY - r.top - r.height / 2) / 25;
      cards.forEach((c) => gsap.to(c, { x, y, duration: 0.8 }));
    });
  }

  /* ---------------- boot ---------------- */
  window.SITE = { $, $$, gsap, ScrollTrigger, lenis, isDesktop, BRAND, revealLines, fadeUp, splitLines, onIntro, openMenu, closeMenu, injectArt, renderArt, PAGE };

  document.fonts.ready.then(() => {
    $$('.js-lines').forEach((el) => revealLines(el));
    $$('.js-fade').forEach((el) => fadeUp(el));
    ScrollTrigger.refresh();
    if (usePreloader) preloader();
    else requestAnimationFrame(runIntro);
  });
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
