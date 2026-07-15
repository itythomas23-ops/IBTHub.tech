(function () {
  'use strict';

  const loader = document.getElementById('loader');
  window.addEventListener('load', () => loader.classList.add('hidden'));
  setTimeout(() => loader.classList.add('hidden'), 2000);

  const nav = document.getElementById('nav');
  const links = nav.querySelectorAll('.nav-links a');
  const progress = document.querySelector('.progress-bar');
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const sections = ['ai-tools', 'pdf-tools', 'cv-makers', 'programming-tools'];

  /* -- Nav transparent → solid on scroll -- */
  function handleNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  /* -- Hamburger toggle -- */
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  links.forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  /* -- Scroll reveal -- */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  /* -- Progress bar -- */
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
  }
  window.addEventListener('scroll', updateProgress);
  updateProgress();

  /* -- Active nav link -- */
  function updateActive() {
    const scrollY = window.scrollY + 130;
    let activeIdx = 0;
    sections.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) activeIdx = i;
    });
    links.forEach((a, i) => a.classList.toggle('active', i === activeIdx));
  }
  window.addEventListener('scroll', updateActive);
  window.addEventListener('resize', updateActive);
  setTimeout(updateActive, 100);

  /* -- Smooth scroll -- */
  links.forEach((a, i) => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(sections[i]);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* -- Card mouse-follow glow -- */
  document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });
})();
