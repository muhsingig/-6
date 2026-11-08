/* =========================================================
   STAY PURR — inner pages
   pricing · about · services · blog · post · contacts · book · faq
   ========================================================= */
(function () {
  const { $, $$, gsap, ScrollTrigger, isDesktop, onIntro, revealLines, fadeUp, PAGE, BRAND } = window.SITE;
  const UNS = (id, w = 900, h = w) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=75`;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- shared bits ---------- */
  $$('[data-ring]').forEach((el) => {
    el.innerHTML = ART.ring(el.dataset.ring, {
      fill: el.dataset.fill || ART.C.plum, color: el.dataset.color || '#fff', ball: el.dataset.ball !== '0', bg: el.dataset.bg !== '0', size: +(el.dataset.size || 34),
    });
  });
  $$('.js-rotate-scroll').forEach((el) => gsap.to(el, { rotate: '+=200', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }));
  $$('[data-year]').forEach((e) => (e.textContent = new Date().getFullYear()));

  function dotBtn(text, href, cls = '', vars = '') {
    return `<a href="${href}" class="btn-dot ${cls}" style="${vars}"><span class="button-wrap"><span class="button-wrap__content"><span class="button-wrap__left-circle"></span><span class="button-wrap__text h9">${text}</span><span class="button-wrap__right-circle"></span></span></span></a>`;
  }
  window.SITE.dotBtn = dotBtn;

  /* =========================================================
     PRICING
     ========================================================= */
  if (PAGE === 'pricing') {
    onIntro(() => {
      gsap.fromTo('.price-item', { y: 150, opacity: 0.8 }, { y: 0, opacity: 1, stagger: 0.06, duration: 1.2, ease: 'power2.out', delay: 0.3, clearProps: 'all' });
    });
  }

  /* =========================================================
     ABOUT
     ========================================================= */
  if (PAGE === 'about') {
    const slides = [
      { title: 'here when you need us', img: '1548247416-ec66f4900b2e', desc: 'Last-minute trip, late flight, long shift? We keep flexible hours and a team of backup sitters, so your cat is never left waiting for dinner.' },
      { title: 'personalized care', img: '1615789591457-74a63395c990', desc: 'Every cat is different. From special diets and medication to the exact way they like to be brushed, we learn your cat’s routine and follow it to the letter.' },
      { title: 'professional', img: '1570824104453-508955ab713e', desc: 'Our sitters are vetted, insured and trained in feline first aid. They love cats — and it shows in the quality of care, the detailed updates and the happy cats we leave behind.' },
    ];
    const txt = $('#about-slide-text'), img = $('#about-slide-img');
    txt.innerHTML = slides.map((s, i) => `<div class="about-slide${i === 0 ? ' is-active' : ''}"><p class="slider__slide-num h4">0${i + 1}</p><div class="slide__bottom-wrap"><p class="slider__slide-title h7">${s.title}</p><p class="slider__slide-description h9">${s.desc}</p></div></div>`).join('');
    img.innerHTML = slides.map((s, i) => `<div class="about-slider__slide${i === 0 ? ' is-active' : ''}"><img src="${UNS(s.img, 1000, 1100)}" alt="" loading="lazy"></div>`).join('');
    $('#about-dots').innerHTML = slides.map((_, i) => `<span class="pagination-item${i === 0 ? ' active' : ''}"></span>`).join('');
    let cur = 0, busy = false;
    function go(d) {
      if (busy) return; busy = true;
      const n = (cur + d + slides.length) % slides.length;
      const tOut = $$('.about-slide', txt)[cur], tIn = $$('.about-slide', txt)[n];
      const iOut = $$('.about-slider__slide', img)[cur], iIn = $$('.about-slider__slide', img)[n];
      gsap.timeline({ onComplete: () => { busy = false; } })
        .to(tOut, { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in', onComplete: () => tOut.classList.remove('is-active') })
        .fromTo(tIn, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', onStart: () => tIn.classList.add('is-active') })
        .fromTo(iIn, { clipPath: d > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0%)', duration: 1, ease: 'expo.inOut', onStart: () => { iIn.classList.add('is-active'); iIn.style.zIndex = 2; iOut.style.zIndex = 1; }, onComplete: () => iOut.classList.remove('is-active') }, 0);
      cur = n;
      $$('.pagination-item', $('#about-dots')).forEach((p, i) => p.classList.toggle('active', i === cur));
    }
    $('.slider-btn.next').addEventListener('click', () => go(1));
    $('.slider-btn.prev').addEventListener('click', () => go(-1));

    // yarn ball rolls through the big statement as you scroll
    gsap.timeline({ scrollTrigger: { trigger: '.describe-block', start: 'top 80%', end: 'bottom 40%', scrub: true } })
      .fromTo('.moving-ball', { xPercent: -50, x: 0, y: 0, rotate: 0 }, { x: () => $('.describe-block').offsetWidth * 0.8, rotate: 720, ease: 'none' })
      .to('.moving-ball', { keyframes: { y: [0, -90, 0, -60, 0, -30, 0] }, ease: 'none' }, 0);
    gsap.timeline({ scrollTrigger: { trigger: '.about-us__mission-content', start: 'top bottom', end: 'bottom top', scrub: true } })
      .fromTo('.circle-cat__wrap', { yPercent: 20, rotate: -8 }, { yPercent: -20, rotate: 8, ease: 'none' });
  }

  /* =========================================================
     SERVICES
     ========================================================= */
  if (PAGE === 'services') {
    const LIST = [
      { name: 'daily visit care (30 min)', time: '0,5 hours', price: '$25', desc: 'A 30-minute drop-in covers the essentials: fresh food and water, a full litter scoop, a quick health check and some quality play or lap time. Perfect for independent cats who just need their routine kept while you’re at work or away for a night.' },
      { name: 'overnight care', time: '(day charge of $25 + $65) 24 hours', price: '$90', desc: 'A sitter arrives in the evening and stays until morning, so your cat has company through the night and breakfast right on time. Includes everything in a daily visit, plus plant watering, mail, lights and curtains so your home looks lived-in while you travel.' },
      { name: 'half day care', time: '4 hours', price: '$50', desc: 'Four dedicated hours for kittens, seniors, post-surgery recovery or cats with medical needs. We handle meals, medication, gentle grooming, enrichment play and plenty of quiet company — with a detailed report at the end of every visit.' },
      { name: 'daily visit care (60 min)', time: '1 hour', price: '$35', desc: 'For social cats and multi-cat homes. A full hour gives time for everything in the 30-minute visit plus brushing, a long play session, and the cuddles your cat would otherwise be saving up for you. Ideal for longer trips.' },
    ];
    const tabs = $('#svc-tabs'), panel = $('#svc-panel');
    tabs.innerHTML = LIST.map((s, i) => `<button class="svc-tab h10${i === 0 ? ' is-active' : ''}" data-i="${i}"><span class="svc-tab__line"><span class="svc-tab__fill"></span></span><span class="svc-tab__name">${s.name}</span><span class="svc-tab__time">${s.time}</span></button>`).join('');
    let cur = 0, timer;
    function render(i, animate = true) {
      cur = i;
      const s = LIST[i];
      $$('.svc-tab', tabs).forEach((t, k) => { t.classList.toggle('is-active', k === i); gsap.set($('.svc-tab__fill', t), { scaleX: k < i ? 1 : 0 }); });
      const html = `<div class="svc-panel__top"><p class="service__full-name h4">${s.name}</p><p class="service__price h4">${s.price}</p></div>
        <div class="svc-panel__bottom"><div class="svc-panel__cat" data-art="smallYarn"></div><div class="svc-panel__right">${dotBtn('book now', 'book.html', 'service__book-btn', '--bg-btn-color:var(--c-ink);--text-btn-color:var(--c-gray2)')}<p class="service__description p2-medium">${s.desc}</p></div></div>`;
      if (!animate) { panel.innerHTML = html; SITE.injectArt(panel); }
      else gsap.timeline().to(panel, { opacity: 0, y: 20, duration: 0.25 }).add(() => { panel.innerHTML = html; SITE.injectArt(panel); }).to(panel, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      if (timer) timer.kill();
      timer = gsap.fromTo($$('.svc-tab__fill', tabs)[i], { scaleX: 0 }, { scaleX: 1, duration: 8, ease: 'none', onComplete: () => render((cur + 1) % LIST.length) });
    }
    $$('.svc-tab', tabs).forEach((t) => t.addEventListener('click', () => render(+t.dataset.i)));
    render(0, false);
    timer.pause();
    ScrollTrigger.create({ trigger: '.services__list', start: 'top 80%', once: true, onEnter: () => timer.play() });
    gsap.fromTo('.services__cat-wrap', { yPercent: 8 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.services__details', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* =========================================================
     BLOG
     ========================================================= */
  const fmtDate = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ (\d{4})$/, ', $1');
  function card(p) {
    return `<a class="article-wrap" href="post.html?p=${p.slug}" data-cat="${esc(p.cat)}">
      <article class="blog-card">
        <div class="blog-card__top"><p class="blog-card__date p2-medium">${fmtDate(p.date)}</p><div class="blog-card__image"><img src="${UNS(p.img, 700, 520)}" alt="" loading="lazy"></div></div>
        <p class="blog-card__cat p3-medium">${esc(p.cat)}</p>
        <p class="blog-card__title h9">${esc(p.title)}</p>
      </article></a>`;
  }
  if (PAGE === 'blog') {
    const posts = window.BLOG_POSTS || [];
    const cats = ['all', ...new Set(posts.map((p) => p.cat))];
    const grid = $('#blog-grid');
    let cat = 'all', sort = 'newest';
    $('#blog-cats').innerHTML = cats.map((c) => `<li><button class="category-item p2-medium${c === 'all' ? ' is-active' : ''}" data-c="${esc(c)}">${esc(c)}</button></li>`).join('');
    function draw() {
      let list = posts.filter((p) => cat === 'all' || p.cat === cat);
      list = list.slice().sort((a, b) => (sort === 'popular' ? b.views - a.views : sort === 'oldest' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));
      grid.innerHTML = list.map(card).join('') || '<p class="p2-medium blog__empty">no stories here yet.</p>';
      gsap.fromTo($$('.article-wrap', grid), { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.8, ease: 'power3.out' });
      ScrollTrigger.refresh();
    }
    $$('.category-item').forEach((b) => b.addEventListener('click', () => {
      cat = b.dataset.c; $$('.category-item').forEach((x) => x.classList.toggle('is-active', x === b)); draw();
    }));
    const sel = $('#blog-sort');
    sel.addEventListener('click', (e) => {
      const opt = e.target.closest('[data-sort]');
      if (opt) { sort = opt.dataset.sort; $('.select__current', sel).textContent = sort; sel.classList.remove('open'); draw(); return; }
      sel.classList.toggle('open');
    });
    document.addEventListener('click', (e) => { if (!sel.contains(e.target)) sel.classList.remove('open'); });
    draw();
    gsap.to('.blog-decor-ball', { y: -40, rotate: 200, ease: 'none', scrollTrigger: { trigger: '.blog-page__wrap', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* =========================================================
     POST
     ========================================================= */
  if (PAGE === 'post') {
    const posts = window.BLOG_POSTS || [];
    const slug = new URLSearchParams(location.search).get('p');
    const p = posts.find((x) => x.slug === slug) || posts[0];
    document.title = `${p.title.replace(/\.$/, '')} — Stay Purr blog`;
    $('#post-cat').textContent = p.cat;
    $('#post-date').textContent = fmtDate(p.date);
    $('#post-title').textContent = p.title;
    $('#post-img').innerHTML = `<img src="${UNS(p.img, 1600, 900)}" alt="">`;
    $('#post-body').innerHTML = p.body.map((t) => `<p class="p1-medium">${esc(t)}</p>`).join('');
    $('#post-more').innerHTML = posts.filter((x) => x.slug !== p.slug).slice(0, 3).map(card).join('');
    revealLines($('#post-title'), {}, true);
  }

  /* =========================================================
     CONTACTS
     ========================================================= */
  if (PAGE === 'contacts') {
    const form = $('#contact-form');
    const rules = {
      name: (v) => (v.trim() ? '' : 'Field is empty'),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Invalid email'),
      phone: (v) => (v.replace(/\D/g, '').length >= 8 ? '' : 'Minimum 8 symbols'),
    };
    const check = (input) => {
      const r = rules[input.name]; if (!r) return true;
      const msg = r(input.value);
      const wrap = input.closest('.input__wrap');
      wrap.classList.toggle('has-error', !!msg && input.dataset.touched === '1');
      $('.error-message', wrap).textContent = msg;
      return !msg;
    };
    const valid = () => $$('input', form).every((i) => !rules[i.name](i.value));
    const submit = $('.submit-btn', form);
    $$('input, textarea', form).forEach((i) => {
      i.addEventListener('input', () => { i.closest('.input__wrap, .textarea__wrap').classList.toggle('filled', !!i.value); check(i); submit.disabled = !valid(); });
      i.addEventListener('blur', () => { i.dataset.touched = '1'; check(i); });
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      $$('input', form).forEach((i) => { i.dataset.touched = '1'; check(i); });
      if (!valid()) return;
      form.classList.add('is-sent');
      gsap.fromTo('.contacts-form__thanks', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    });
    // peeking cat bobs up out of the yarn
    gsap.fromTo('.contacts__peek', { yPercent: 40 }, { yPercent: 0, duration: 1.4, ease: 'back.out(1.6)', delay: 0.6 });
    const balls = $$('.contacts__circle-link');
    window.addEventListener('mousemove', (e) => {
      if (!isDesktop()) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30, y = (e.clientY / window.innerHeight - 0.5) * 30;
      balls.forEach((b, i) => gsap.to(b, { x: x * (i ? 1 : -1), y: y * (i ? 1 : -1), duration: 1.4 }));
    });
  }

  /* =========================================================
     BOOK NOW — six-step wizard
     ========================================================= */
  if (PAGE === 'book') {
    const SERV = ['Daily visit care (30 min)', 'Daily visit care (60 min)', 'Half day care', 'Overnight care'];
    const data = { service: '', pet: '', length: '', date: '', time: '', notes: '', name: '', phone: '' };
    const STEPS = [
      { title: 'choose a service you would like', html: () => `<div class="select" id="svc-select"><button type="button" class="select__current p2-medium">${data.service || 'select option'}</button><span class="select__arrow">${ART.icon.arrowDown()}</span><div class="select__options">${SERV.map((s) => `<button type="button" class="select__option p2-medium" data-v="${s}">${s}</button>`).join('')}</div></div>`, ok: () => !!data.service },
      { title: 'your cat’s name', html: () => `<label class="book-input"><input class="input p2-medium" name="pet" value="${esc(data.pet)}" placeholder="e.g. mochi" autocomplete="off"></label>`, ok: () => !!data.pet.trim() },
      { title: 'how long should each visit be?', html: () => `<div class="book-pills">${['30 min', '60 min', '4 hours', 'overnight'].map((v) => `<button type="button" class="book-pill p2-medium${data.length === v ? ' is-active' : ''}" data-v="${v}">${v}</button>`).join('')}</div>`, ok: () => !!data.length },
      { title: 'when do you want to meet a potential sitter?', html: () => `<div class="book-row"><label class="book-input"><span class="p3-medium">date</span><input type="date" class="input p2-medium" name="date" value="${data.date}"></label><label class="book-input"><span class="p3-medium">time</span><input type="time" class="input p2-medium" name="time" value="${data.time}"></label></div>`, ok: () => !!data.date && !!data.time },
      { title: 'we also need to know that...', html: () => `<label class="book-input"><textarea class="input p2-medium" name="notes" rows="5" placeholder="allergies, medication, hiding spots, quirks — anything that helps">${esc(data.notes)}</textarea></label>`, ok: () => true },
      { title: 'your phone number and name', html: () => `<div class="book-row"><label class="book-input"><span class="p3-medium">name</span><input class="input p2-medium" name="name" value="${esc(data.name)}" autocomplete="name"></label><label class="book-input"><span class="p3-medium">phone</span><input class="input p2-medium" name="phone" value="${esc(data.phone)}" autocomplete="tel"></label></div>`, ok: () => !!data.name.trim() && data.phone.replace(/\D/g, '').length >= 8 },
    ];
    $('.js-book-close').addEventListener('click', (e) => {
      if (document.referrer && new URL(document.referrer).origin === location.origin) { e.preventDefault(); history.back(); }
    });
    const qs = new URLSearchParams(location.search).get('service');
    if (qs) data.service = SERV.find((s) => s.toLowerCase().startsWith(qs.toLowerCase())) || '';
    let step = 0;
    const titleEl = $('#book-title'), body = $('#book-body'), next = $('#book-next'), back = $('#book-back'), count = $('#book-count'), bar = $('#book-bar');
    function bind() {
      const sel = $('#svc-select', body);
      if (sel) sel.addEventListener('click', (e) => {
        const o = e.target.closest('.select__option');
        if (o) { data.service = o.dataset.v; $('.select__current', sel).textContent = o.dataset.v; sel.classList.remove('open'); update(); return; }
        sel.classList.toggle('open');
      });
      $$('.book-pill', body).forEach((b) => b.addEventListener('click', () => { data.length = b.dataset.v; $$('.book-pill', body).forEach((x) => x.classList.toggle('is-active', x === b)); update(); }));
      $$('input, textarea', body).forEach((i) => i.addEventListener('input', () => { data[i.name] = i.value; update(); }));
      const first = $('input, textarea', body); if (first && isDesktop()) first.focus({ preventScroll: true });
    }
    function update() { next.disabled = !STEPS[step].ok(); }
    function show(dir = 1) {
      const s = STEPS[step];
      const tl = gsap.timeline();
      tl.to([titleEl, body], { opacity: 0, y: -24 * dir, duration: 0.25, ease: 'power2.in' })
        .add(() => {
          titleEl.textContent = s.title; body.innerHTML = s.html(); bind(); update();
          count.textContent = `${step + 1}-${STEPS.length}`;
          back.classList.toggle('is-hidden', step === 0);
          $('.button-wrap__text', next).textContent = step === STEPS.length - 1 ? 'send' : 'next';
        })
        .fromTo([titleEl, body], { opacity: 0, y: 30 * dir }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' });
      gsap.to(bar, { scaleX: (step + 1) / STEPS.length, duration: 0.6, ease: 'power2.out' });
    }
    next.addEventListener('click', () => {
      if (!STEPS[step].ok()) return;
      if (step < STEPS.length - 1) { step++; show(1); return; }
      // finished — no backend wired yet, so we just thank the visitor
      $('.book-now__wrap').classList.add('is-done');
      $('#book-thanks-name').textContent = data.pet ? `${data.pet} is in good paws.` : '';
      gsap.to(bar, { scaleX: 1, duration: 0.4 });
      gsap.fromTo('.book-thanks', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
    });
    back.addEventListener('click', () => { if (step > 0) { step--; show(-1); } });
    document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.tagName === 'INPUT' && !next.disabled) next.click(); });
    titleEl.textContent = STEPS[0].title; body.innerHTML = STEPS[0].html(); bind(); update();
    count.textContent = `1-${STEPS.length}`; back.classList.add('is-hidden');
    gsap.set(bar, { scaleX: 1 / STEPS.length });
  }

  /* =========================================================
     FAQ / accordions
     ========================================================= */
  $$('.accordion-faq').forEach((item) => {
    const head = $('.accordion__main', item), content = $('.accordion__content', item);
    gsap.set(content, { height: 0 });
    head.addEventListener('click', () => {
      const open = item.classList.toggle('is-open');
      gsap.to(content, { height: open ? 'auto' : 0, duration: 0.6, ease: 'power3.inOut', onComplete: () => ScrollTrigger.refresh() });
    });
  });
  $$('.accordion__underline').forEach((l) => gsap.fromTo(l, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: l, start: 'top 95%' } }));
})();
