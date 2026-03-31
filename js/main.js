/* ============================================
   Ege Kozalak Anaokulu - Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll Reveal ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // --- Nav Scroll ---
  const nav = document.querySelector('.nav');
  const handleNavScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Mobile Menu ---
  const burger = document.querySelector('.nav__burger');
  const navLinks = document.querySelector('.nav__links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Page Progress Bar ---
  const progressBar = document.querySelector('.page-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

  // --- Accordion ---
  document.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion__body');
      const isOpen = item.classList.contains('open');

      // Close siblings
      item.closest('.accordion').querySelectorAll('.accordion__item').forEach(sib => {
        sib.classList.remove('open');
        sib.querySelector('.accordion__body').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Open first accordion item by default
  document.querySelectorAll('.accordion').forEach(acc => {
    const first = acc.querySelector('.accordion__item');
    if (first) {
      first.classList.add('open');
      const body = first.querySelector('.accordion__body');
      if (body) body.style.maxHeight = body.scrollHeight + 'px';
    }
  });

  // --- Active Nav Link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Mobile Floating Seeds ---
  if (window.innerWidth <= 1024) {
    const drops = document.querySelectorAll('.hero__drop-item');
    const anims = ['mFloat1', 'mFloat2', 'mFloat3'];
    const positions = [
      { right: '8%',  top: '6%',  size: 18 },
      { right: '72%', top: '10%', size: 14 },
      { right: '4%',  top: '32%', size: 12 },
      { right: '82%', top: '48%', size: 16 },
      { right: '10%', top: '62%', size: 11 },
      { right: '76%', top: '76%', size: 14 },
      { right: '5%',  top: '86%', size: 10 },
      { right: '85%', top: '28%', size: 13 },
    ];

    drops.forEach((drop, i) => {
      const pos = positions[i] || positions[0];
      const anim = anims[i % 3];
      const dur = 5.5 + (i * 0.7);
      const delay = i * 0.4;

      drop.style.cssText = `
        position: absolute;
        right: ${pos.right};
        top: ${pos.top};
        left: auto;
        width: ${pos.size}px;
        height: ${pos.size}px;
        opacity: 0.65;
        border-radius: 50% 50% 50% 0;
        animation: ${anim} ${dur}s ease-in-out ${delay}s infinite;
      `;
    });
  }
});
