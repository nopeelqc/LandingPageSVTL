/**
 * SEN VÒI THĂNG LONG – script.js
 * Version: 3.1.0 (Huge Vietnam + Super 8 Style)
 */

'use strict';

// ============================================================
// 1. TỰ ĐỘNG CUỘN VỀ ĐẦU TRANG KHI LOAD / F5
// ============================================================
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
  // Đảm bảo tải trang luôn ở vị trí đầu tiên
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  // ============================================================
  // 2. STICKY HEADER & ACTIVE NAV SCROLL SPY
  // ============================================================
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header sticky shadow
    if (header) {
      header.classList.toggle('is-scrolled', scrollY > 40);
    }

    // Back to top button
    if (backToTop) {
      backToTop.classList.toggle('is-visible', scrollY > 400);
    }

    // Scroll Spy active nav link
    let currentId = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        navLinks.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // 3. SMOOTH SCROLL VỚI OFFSET CHO TẤT CẢ LIÊN KẾT NEO (#)
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const headerOffset = 76;
        const elemPosition = targetElem.getBoundingClientRect().top;
        const offsetPosition = elemPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================================
  // 4. HIỆU ỨNG CUỘN (SCROLL REVEAL ANIMATIONS)
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target); // Chỉ chạy 1 lần cho mượt mà
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback nếu trình duyệt cũ
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // ============================================================
  // 5. MOBILE MENU DRAWER
  // ============================================================
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (hamburger && mobileDrawer) {
    hamburger.addEventListener('click', () => {
      mobileDrawer.classList.toggle('is-open');
    });

    const drawerLinks = mobileDrawer.querySelectorAll('a, button');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
      });
    });
  }

  // ============================================================
  // 6. NUMBER COUNTER ANIMATION (HUGE STATS)
  // ============================================================
  const counters = document.querySelectorAll('.counter');
  let counted = false;

  const countUp = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800; // 1.8 giây
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const easeOutQuad = t => t * (2 - t);

      const timer = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentCount = Math.round(target * progress);

        if (target >= 1000) {
          counter.textContent = currentCount.toLocaleString('vi-VN');
        } else {
          counter.textContent = currentCount;
        }

        if (frame === totalFrames) {
          clearInterval(timer);
          if (target >= 1000) {
            counter.textContent = target.toLocaleString('vi-VN');
          } else {
            counter.textContent = target;
          }
        }
      }, frameDuration);
    });
  };

  const statsSection = document.querySelector('.stats-overlap');
  if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          countUp();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  }

  // ============================================================
  // 7. PRODUCT FILTER PILLS
  // ============================================================
  const filterPills = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.p-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');

      const filter = pill.getAttribute('data-filter');

      let visible = 0;
      productCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          visible++;
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });

      const visibleCountElem = document.getElementById('visibleCount');
      if (visibleCountElem) visibleCountElem.textContent = visible;
    });
  });

  // ============================================================
  // 8. CATALOGUE MODAL
  // ============================================================
  const catalogueModal = document.getElementById('catalogueModal');
  const catalogueBtns = [
    document.getElementById('catalogueBtn'),
    document.getElementById('catalogueBtnMobile'),
    document.getElementById('catalogueBannerBtn')
  ];
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const downloadForm = document.getElementById('downloadCatalogueForm');

  const openCatalogue = () => {
    if (catalogueModal) {
      catalogueModal.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeCatalogue = () => {
    if (catalogueModal) {
      catalogueModal.classList.remove('is-visible');
      document.body.style.overflow = '';
    }
  };

  catalogueBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', openCatalogue);
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCatalogue);

  if (catalogueModal) {
    catalogueModal.addEventListener('click', (e) => {
      if (e.target === catalogueModal) closeCatalogue();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCatalogue();
  });

  if (downloadForm) {
    downloadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('catName').value.trim();
      closeCatalogue();
      downloadForm.reset();
      showToast(`Cảm ơn ${name}! Link tải Catalogue 2026 đã được gửi đến bạn.`);
    });
  }

  // ============================================================
  // 9. LEAD CONSULTATION FORM
  // ============================================================
  const consultationForm = document.getElementById('consultationForm');
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      consultationForm.reset();
      showToast(`Cảm ơn ${name}! Chuyên viên Thăng Long sẽ gọi điện tư vấn trong vòng 15 phút.`);
    });
  }

  // ============================================================
  // 10. TOAST NOTIFICATION UTILITY
  // ============================================================
  function showToast(message) {
    const existing = document.querySelector('.toast-msg');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 8px;"></i> ${message}`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('is-show');
    });

    setTimeout(() => {
      toast.classList.remove('is-show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // ============================================================
  // 11. TESTIMONIAL SLIDER (KHÁCH HÀNG NÓI VỀ CHÚNG TÔI)
  // ============================================================
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialDots = document.querySelectorAll('.t-dot');
  const testiPrevBtn = document.getElementById('testiPrevBtn');
  const testiNextBtn = document.getElementById('testiNextBtn');
  let currentTestiIndex = 0;

  function showTestimonial(index) {
    if (!testimonialCards.length) return;
    if (index < 0) index = testimonialCards.length - 1;
    if (index >= testimonialCards.length) index = 0;
    currentTestiIndex = index;

    testimonialCards.forEach((card, i) => {
      card.classList.toggle('is-active', i === currentTestiIndex);
    });

    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentTestiIndex);
    });
  }

  if (testiPrevBtn) {
    testiPrevBtn.addEventListener('click', () => showTestimonial(currentTestiIndex - 1));
  }
  if (testiNextBtn) {
    testiNextBtn.addEventListener('click', () => showTestimonial(currentTestiIndex + 1));
  }

  testimonialDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = +dot.getAttribute('data-index');
      showTestimonial(idx);
    });
  });

  if (testimonialCards.length > 0) {
    setInterval(() => {
      showTestimonial(currentTestiIndex + 1);
    }, 8000);
  }

  window.openProductModal = function(sku) {
    openCatalogue();
    showToast(`Đang mở tài liệu kỹ thuật cho mã: ${sku}`);
  };

});
