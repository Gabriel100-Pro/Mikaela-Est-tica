/* ============================================
   MIKAELA ESTÉTICA — script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. HEADER — scroll effect
  // ============================================
  const header = document.getElementById('header');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });


  // ============================================
  // 2. MOBILE MENU — hamburger
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ============================================
  // 3. COOKIE BANNER
  // ============================================
  const cookieBanner  = document.getElementById('cookieBanner');
  const acceptCookies = document.getElementById('acceptCookies');

  // Show banner only if not yet accepted
  if (!localStorage.getItem('cookiesAccepted')) {
    // Small delay so it doesn't pop instantly
    setTimeout(() => {
      cookieBanner.style.display = 'block';
    }, 1200);
  } else {
    cookieBanner.style.display = 'none';
  }

  acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.add('hidden');
  });


  // ============================================
  // 4. TRATAMENTOS TABS
  // ============================================
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabFacial  = document.getElementById('tabFacial');
  const tabCorporal = document.getElementById('tabCorporal');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (btn.dataset.tab === 'facial') {
        tabFacial.classList.remove('hidden');
        tabCorporal.classList.add('hidden');
      } else {
        tabFacial.classList.add('hidden');
        tabCorporal.classList.remove('hidden');
      }

      // Re-trigger reveal for newly visible cards
      triggerReveal();
    });
  });


  // ============================================
  // 5. SCROLL REVEAL
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger the animation for grid items
        const delay = (entry.target.parentElement?.children
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
          : 0);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  const triggerReveal = () => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      revealObserver.observe(el);
    });
  };

  triggerReveal();


  // ============================================
  // 6. SMOOTH SCROLL for anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // header height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // ============================================
  // 7. HERO SCROLL INDICATOR — hide on scroll
  // ============================================
  const heroScroll = document.getElementById('heroScroll');
  if (heroScroll) {
    window.addEventListener('scroll', () => {
      heroScroll.style.opacity = window.scrollY > 100 ? '0' : '1';
    }, { passive: true });

    heroScroll.addEventListener('click', () => {
      const sobre = document.getElementById('sobre');
      if (sobre) {
        const top = sobre.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }


  // ============================================
  // 8. ACTIVE NAV LINK on scroll
  // ============================================
  const sections  = document.querySelectorAll('section[id], footer[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => sectionObserver.observe(sec));

});
