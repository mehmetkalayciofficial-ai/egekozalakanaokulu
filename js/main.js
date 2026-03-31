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

  // =============================================
  // FLOATING COLORED SEEDS (mobile + desktop hero)
  // Seeds rise upward gently in a continuous loop
  // =============================================
  if (window.innerWidth <= 1024) {
    const heroDrops = document.querySelector('.hero__drops');
    if (heroDrops) {
      // Clear existing inline-styled drops
      const items = heroDrops.querySelectorAll('.hero__drop-item');
      items.forEach(el => el.remove());

      const colors = [
        '#F5C542', '#E8913A', '#E84B8A', '#D94F4F',
        '#9B59B6', '#4AABE8', '#2EAD9B', '#6BBF59'
      ];

      // Create 12 floating seeds
      for (let i = 0; i < 12; i++) {
        const seed = document.createElement('div');
        const size = 10 + Math.random() * 14;
        const left = 5 + Math.random() * 90;
        const delay = i * 0.3;
        const duration = 8 + Math.random() * 7;
        const sway = 15 + Math.random() * 30;
        const color = colors[i % colors.length];

        seed.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50% 50% 50% 0;
          left: ${left}%;
          bottom: -10%;
          opacity: 0;
          pointer-events: none;
          animation: seedRise ${duration}s ease-in-out ${delay}s infinite;
          --sway: ${sway}px;
        `;
        heroDrops.appendChild(seed);
      }
    }
  }

  // =============================================
  // DECORATIVE ELEMENTS - branches, leaves, pinecones
  // =============================================
  addDecorations();
});

/* --- Seed Rise Animation (injected via style tag) --- */
(function() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes seedRise {
      0% {
        bottom: -10%;
        opacity: 0;
        transform: rotate(-45deg) translateX(0);
      }
      8% {
        opacity: 0.7;
      }
      25% {
        transform: rotate(-40deg) translateX(var(--sway, 20px));
      }
      50% {
        transform: rotate(-50deg) translateX(calc(var(--sway, 20px) * -0.7));
        opacity: 0.6;
      }
      75% {
        transform: rotate(-42deg) translateX(calc(var(--sway, 20px) * 0.5));
      }
      92% {
        opacity: 0.5;
      }
      100% {
        bottom: 110%;
        opacity: 0;
        transform: rotate(-48deg) translateX(calc(var(--sway, 20px) * -0.3));
      }
    }
  `;
  document.head.appendChild(style);
})();

/* --- Add decorative SVG elements to the page --- */
function addDecorations() {
  // SVG decoration templates
  const branchTopRight = `<svg class="deco deco--branch-tr" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M200 0 Q180 60 160 100 Q140 140 150 180 Q160 220 140 260 Q130 280 120 300" stroke="#A1887F" stroke-width="2" opacity="0.15"/>
    <path d="M160 100 Q130 90 115 105" stroke="#A1887F" stroke-width="1.5" opacity="0.12"/>
    <path d="M150 180 Q120 170 108 188" stroke="#A1887F" stroke-width="1.5" opacity="0.12"/>
    <path d="M160 100 Q180 85 190 95" stroke="#A1887F" stroke-width="1.5" opacity="0.12"/>
    <ellipse cx="112" cy="102" rx="8" ry="12" transform="rotate(-30 112 102)" fill="#6BBF59" opacity="0.12"/>
    <ellipse cx="105" cy="185" rx="7" ry="11" transform="rotate(-20 105 185)" fill="#6BBF59" opacity="0.1"/>
    <ellipse cx="192" cy="92" rx="6" ry="10" transform="rotate(20 192 92)" fill="#6BBF59" opacity="0.1"/>
    <circle cx="140" cy="258" r="6" fill="#A1887F" opacity="0.1"/>
    <path d="M137 252 Q140 240 143 252 Q146 260 140 268 Q134 260 137 252Z" fill="#8D6E63" opacity="0.08"/>
  </svg>`;

  const branchBottomLeft = `<svg class="deco deco--branch-bl" viewBox="0 0 180 250" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 250 Q20 200 15 160 Q10 120 30 80 Q45 50 40 10" stroke="#A1887F" stroke-width="2" opacity="0.13"/>
    <path d="M30 80 Q55 75 62 58" stroke="#A1887F" stroke-width="1.5" opacity="0.1"/>
    <path d="M15 160 Q45 155 50 140" stroke="#A1887F" stroke-width="1.5" opacity="0.1"/>
    <ellipse cx="64" cy="55" rx="8" ry="12" transform="rotate(25 64 55)" fill="#6BBF59" opacity="0.11"/>
    <ellipse cx="53" cy="137" rx="7" ry="11" transform="rotate(15 53 137)" fill="#6BBF59" opacity="0.09"/>
    <circle cx="38" cy="14" r="5" fill="#A1887F" opacity="0.1"/>
    <path d="M35 8 Q38 -2 41 8 Q44 16 38 22 Q32 16 35 8Z" fill="#8D6E63" opacity="0.08"/>
  </svg>`;

  const leafCluster = `<svg class="deco deco--leaves" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="50" rx="18" ry="30" transform="rotate(-30 30 50)" fill="#6BBF59" opacity="0.07"/>
    <ellipse cx="60" cy="40" rx="15" ry="28" transform="rotate(10 60 40)" fill="#6BBF59" opacity="0.06"/>
    <ellipse cx="85" cy="55" rx="16" ry="25" transform="rotate(-15 85 55)" fill="#6BBF59" opacity="0.05"/>
    <path d="M30 50 L30 20" stroke="#6BBF59" stroke-width="0.5" opacity="0.08"/>
    <path d="M60 40 L58 12" stroke="#6BBF59" stroke-width="0.5" opacity="0.07"/>
  </svg>`;

  const pinecone = `<svg class="deco deco--pinecone" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 5 Q15 15 12 25 Q10 35 14 45 Q17 52 20 55 Q23 52 26 45 Q30 35 28 25 Q25 15 20 5Z" fill="#8D6E63" opacity="0.12"/>
    <path d="M16 18 Q20 14 24 18" stroke="#A1887F" stroke-width="0.8" opacity="0.1"/>
    <path d="M14 28 Q20 23 26 28" stroke="#A1887F" stroke-width="0.8" opacity="0.1"/>
    <path d="M15 38 Q20 33 25 38" stroke="#A1887F" stroke-width="0.8" opacity="0.1"/>
  </svg>`;

  // Place decorations on sections
  const sections = document.querySelectorAll('.section');
  sections.forEach((section, i) => {
    section.style.position = 'relative';
    section.style.overflow = 'hidden';

    if (i % 3 === 0) {
      section.insertAdjacentHTML('beforeend', branchTopRight);
    }
    if (i % 3 === 1) {
      section.insertAdjacentHTML('beforeend', branchBottomLeft);
    }
    if (i % 4 === 2) {
      section.insertAdjacentHTML('beforeend', leafCluster);
    }
  });

  // Add pinecone to page-hero
  const pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    pageHero.style.overflow = 'hidden';
    pageHero.insertAdjacentHTML('beforeend', branchTopRight);
  }

  // Add decorations to footer
  const footer = document.querySelector('.footer');
  if (footer) {
    footer.style.overflow = 'hidden';
    footer.insertAdjacentHTML('beforeend', leafCluster);
    footer.insertAdjacentHTML('beforeend', pinecone);
  }
}
