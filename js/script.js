/* ====== Helpers / state ====== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ====== Active nav link ====== */
(function setActiveNav(){
  const page = document.body.getAttribute('data-page');
  $$('.nav-links a').forEach(a=>{
    const href = (a.getAttribute('href')||'').split('#')[0];
    if ((page==='home' && href==='index.html')
     || (page==='projects' && href==='projets.html')
     || (page==='skills' && href==='competences.html')
     || (page==='contact' && href==='contact.html')) {
      a.classList.add('current');
    }
  });
})();

/* ====== Hamburger ====== */
(function mobileMenu(){
  const btn = $('.hamburger');
  const menu = $('#nav-menu');
  if(!btn || !menu) return;
  btn.addEventListener('click', ()=>{
    const open = menu.classList.toggle('open');
    btn.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', String(open));
  });
})();

/* ====== Theme (dark / light) ====== */
(function theme(){
  const KEY = 'portfolio:theme';
  const apply = (t) => document.documentElement.classList.toggle('dark', t==='dark');
  const current = localStorage.getItem(KEY) || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  apply(current);
  $$('.theme-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem(KEY, next);
      apply(next);
    });
  });
})();

/* ====== Reveal on scroll ====== */
(function reveal(){
  const groups = $$('.reveal');
  if(!('IntersectionObserver' in window)) { groups.forEach(g=>g.classList.add('visible')); return; }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }});
  }, {rootMargin:'-10% 0px'});
  groups.forEach(g=>io.observe(g));
})();

/* ====== Typing effect (home) ====== */
(function typing(){
  const el = $('#typing');
  if(!el) return;
  const words = ['MIAGE','Développeuse Full-Stack','Data-Driven'];
  let i = 0;
  setInterval(()=>{
    el.textContent = words[i];
    i = (i+1) % words.length;
  }, 2000);
})();

/* ====== Project filters (projets.html) ====== */
(function filters(){
  const chips = $$('.chip');
  const cards = $$('#projects-grid .project');
  if(!chips.length || !cards.length) return;
  const setActive = (btn)=>{ chips.forEach(c=>c.classList.toggle('active', c===btn)); };
  chips.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      setActive(btn);
      const f = btn.dataset.filter;
      cards.forEach(card=>{
        if(f==='all') { card.style.display=''; return; }
        const tags = (card.dataset.tags||'').toLowerCase();
        card.style.display = tags.includes(f) ? '' : 'none';
      });
    });
  });
})();

/* ====== Contact form (fake submit) ====== */
(function contactForm(){
  const form = $('#contactForm');
  if(!form) return;
  const success = $('#formSuccess');

  const validate = () => {
    let ok = true;
    $$('.form-group', form).forEach(g=>g.classList.remove('invalid'));
    const name = $('#name', form), email = $('#email', form), subject = $('#subject', form), message = $('#message', form);

    if(!name.value.trim()){ $('#name', form).closest('.form-group').classList.add('invalid'); ok=false; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){ email.closest('.form-group').classList.add('invalid'); ok=false; }
    if(!subject.value){ subject.closest('.form-group').classList.add('invalid'); ok=false; }
    if(!message.value.trim()){ message.closest('.form-group').classList.add('invalid'); ok=false; }
    return ok;
  };

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!validate()) return;
    // Simuler l’envoi
    form.reset();
    success.hidden = false;
    success.scrollIntoView({behavior:'smooth', block:'center'});
  });
})();
