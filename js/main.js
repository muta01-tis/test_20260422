/**
 * LAKOTA HOUSE - Main JavaScript
 * Vanilla JS only (no jQuery)
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Header Scroll Behavior
     ========================================================================== */
  const siteHeader = document.querySelector('.site-header');

  function handleHeaderScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 60) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // run on load

  /* ==========================================================================
     2. Hamburger Menu
     ========================================================================== */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('is-active');
      if (isOpen) {
        mobileNav.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      } else {
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    // Close mobile nav when a link is clicked
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('is-active');
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ==========================================================================
     3. Scroll Fade-In Animation (IntersectionObserver)
     ========================================================================== */
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  }

  /* ==========================================================================
     4. Gallery Filter
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Update active state
        filterBtns.forEach(function (b) {
          b.classList.remove('is-active');
        });
        btn.classList.add('is-active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(function (item) {
          if (filter === 'all') {
            item.classList.remove('is-hidden');
          } else {
            const category = item.getAttribute('data-category');
            if (category === filter) {
              item.classList.remove('is-hidden');
            } else {
              item.classList.add('is-hidden');
            }
          }
        });
      });
    });
  }

  /* ==========================================================================
     5. Gallery Modal
     ========================================================================== */
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalImg = document.querySelector('.modal-overlay .modal-img');
  const modalClose = document.querySelector('.modal-close');
  const modalPrev = document.querySelector('.modal-nav--prev');
  const modalNext = document.querySelector('.modal-nav--next');

  let currentModalIndex = 0;
  let visibleItems = [];

  function getVisibleItems() {
    return Array.from(galleryItems).filter(function (item) {
      return !item.classList.contains('is-hidden');
    });
  }

  function openModal(index) {
    visibleItems = getVisibleItems();
    if (!modalOverlay || !modalImg || visibleItems.length === 0) return;

    currentModalIndex = index;
    const item = visibleItems[currentModalIndex];
    const img = item.querySelector('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function showPrev() {
    visibleItems = getVisibleItems();
    currentModalIndex = (currentModalIndex - 1 + visibleItems.length) % visibleItems.length;
    const img = visibleItems[currentModalIndex].querySelector('img');
    if (modalImg) {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
    }
  }

  function showNext() {
    visibleItems = getVisibleItems();
    currentModalIndex = (currentModalIndex + 1) % visibleItems.length;
    const img = visibleItems[currentModalIndex].querySelector('img');
    if (modalImg) {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
    }
  }

  if (galleryItems.length > 0 && modalOverlay) {
    galleryItems.forEach(function (item, index) {
      item.addEventListener('click', function () {
        visibleItems = getVisibleItems();
        const visibleIndex = visibleItems.indexOf(item);
        openModal(visibleIndex >= 0 ? visibleIndex : 0);
      });
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  if (modalPrev) {
    modalPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      showPrev();
    });
  }

  if (modalNext) {
    modalNext.addEventListener('click', function (e) {
      e.stopPropagation();
      showNext();
    });
  }

  // Keyboard navigation for modal
  document.addEventListener('keydown', function (e) {
    if (!modalOverlay || !modalOverlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    } else if (e.key === 'ArrowRight') {
      showNext();
    }
  });

  /* ==========================================================================
     6. Contact Form Validation
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const thanksMessage = document.querySelector('.thanks-message');

  if (contactForm) {
    // Real-time validation
    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(function (field) {
      field.addEventListener('blur', function () {
        validateField(field);
      });
      field.addEventListener('input', function () {
        if (field.classList.contains('is-error')) {
          validateField(field);
        }
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      requiredFields.forEach(function (field) {
        if (!validateField(field)) {
          isValid = false;
        }
      });

      if (isValid) {
        // Show thanks message, hide form
        contactForm.style.display = 'none';
        if (thanksMessage) {
          thanksMessage.classList.add('is-visible');
          // Scroll to thanks message
          thanksMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }

  function validateField(field) {
    const errorEl = document.getElementById(field.id + '-error');
    let isValid = true;
    let errorMsg = '';

    if (field.type === 'checkbox') {
      if (!field.checked) {
        isValid = false;
        errorMsg = 'プライバシーポリシーへの同意が必要です。';
      }
    } else if (field.value.trim() === '') {
      isValid = false;
      errorMsg = 'この項目は必須です。';
    } else if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        isValid = false;
        errorMsg = '正しいメールアドレスを入力してください。';
      }
    }

    if (errorEl) {
      if (!isValid) {
        field.classList.add('is-error');
        errorEl.textContent = errorMsg;
        errorEl.classList.add('is-visible');
      } else {
        field.classList.remove('is-error');
        errorEl.textContent = '';
        errorEl.classList.remove('is-visible');
      }
    }

    return isValid;
  }

  /* ==========================================================================
     7. Smooth scroll for anchor links
     ========================================================================== */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

})();
