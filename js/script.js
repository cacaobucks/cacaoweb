/* ============================================================
   script.js — Cacao Personal Website
   ============================================================ */

// ── Introduction: bilingual text content ──────────────────────
const EN_TEXT = `Thank you for visiting my website. I'm Cacao. I work as an AI consultant for disaster mitigation. In parallel with that, I'm developing personal projects in my free time outside of work on weekdays and on weekends. I became interested in jobs that utilize IT and AI technologies during my student days, and I've been continuously improving myself ever since. In graduate school, I researched RAG, and at a national research institute, I implemented AI chatbots and open-source image recognition using LLM. In the future, I aim to be active in the field of generative AI, and I want to continue growing through my main job and self-improvement.`;

const JA_TEXT = `WEBサイトをご覧いただきありがとうございます。カカオです。現在はAIコンサルタントとして、仕事をしています。それと並行し、平日の業務外や休日の時間を使って個人開発しております。学生時代にITやAIの技術を活用する仕事に興味を持ち、そこから日々自己研鑽を重ねてきました。大学院ではRAGの研究や、国立研究所にて、AIチャットボットや、LLMを活用した画像判定OSSを実装していました。今後は生成AIの領域で活躍することを目指し、本業や自己研鑽を通じて成長し続けたいと考えています。`;

// ── Introduction: language toggle ─────────────────────────────
function initIntroToggle() {
  const introText   = document.getElementById('intro-text');
  const translateBtn = document.getElementById('translate-btn');
  if (!introText || !translateBtn) return;

  let isJapanese = false;

  translateBtn.addEventListener('click', () => {
    introText.classList.add('fade-out');

    setTimeout(() => {
      isJapanese = !isJapanese;
      introText.textContent = isJapanese ? JA_TEXT : EN_TEXT;
      translateBtn.querySelector('span')
        ? (translateBtn.querySelector('span').textContent = isJapanese ? 'Translate into English' : 'Translate into Japanese')
        : null;

      // Update button label text node (skip pure-whitespace nodes, preserve the SVG icon)
      const textNode = [...translateBtn.childNodes].find(
        n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0
      );
      if (textNode) {
        textNode.textContent = isJapanese ? ' Translate into English' : ' Translate into Japanese';
      }

      introText.classList.remove('fade-out');
    }, 300);
  });
}

// ── Scroll reveal with IntersectionObserver ───────────────────
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
}

// ── Active nav link on scroll ──────────────────────────────────
function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__links a[data-section]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const activeLink = document.querySelector(`.nav__links a[data-section="${entry.target.id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ── Fix translate button text node after render ────────────────
function patchTranslateButtonLabel() {
  const btn = document.getElementById('translate-btn');
  if (!btn) return;
  const svg = btn.querySelector('svg');
  // Ensure there's a trailing text node we can update later
  if (svg && !btn.lastChild.textContent.trim()) {
    btn.appendChild(document.createTextNode(' Translate into Japanese'));
  }
}

// ── Hamburger menu (mobile nav) ───────────────────────────────
function initHamburgerMenu() {
  const hamburger = document.getElementById('nav-hamburger');
  const nav       = document.getElementById('nav');
  const navLinks  = nav ? nav.querySelector('.nav__links') : null;
  if (!hamburger || !nav || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      nav.classList.remove('nav-open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── Hide nav while hero is visible ────────────────────────────
function initHeroNav() {
  const nav  = document.getElementById('nav');
  const hero = document.getElementById('top');
  if (!nav || !hero) return;

  function updateNavStyle() {
    nav.classList.toggle('nav--hidden', window.scrollY < hero.offsetHeight);
  }

  // Apply initial state without transition to avoid flash
  nav.style.transition = 'none';
  updateNavStyle();
  requestAnimationFrame(() => requestAnimationFrame(() => { nav.style.transition = ''; }));

  window.addEventListener('scroll', updateNavStyle, { passive: true });
}

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  patchTranslateButtonLabel();
  initIntroToggle();
  initScrollReveal();
  initActiveNav();
  initHamburgerMenu();
  initHeroNav();
});
