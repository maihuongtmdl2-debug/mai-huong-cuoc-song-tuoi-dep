/**
 * MAI HƯỜNG — CUỘC SỐNG TƯƠI ĐẸP
 * Interactive UI & Animations Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Theme Toggle (Light / Dark Mode)
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('mh_theme');

  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

      if (nextTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      localStorage.setItem('mh_theme', nextTheme);
    });
  }

  // 3. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });

    mainNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
      });
    });
  }

  // 4. Sticky Header & Active Section Spy
  const siteHeader = document.getElementById('siteHeader');
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');

  const onScroll = () => {
    if (window.scrollY > 30) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }

    let currentSectionId = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentSectionId = section.getAttribute('id') || '';
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${currentSectionId}`
        );
      });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 5. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // 6. Inspirational Daily Quotes Rotator
  const quotes = [
    '“Cùng nhau tạo nên những giai điệu, những hình ảnh và những khoảnh khắc thật đẹp từ chính cảm xúc trong trái tim bạn!”',
    '“Vì bạn xứng đáng có một tác phẩm âm nhạc và một cuộc sống tươi đẹp rạng rỡ của riêng mình!”',
    '“Sáng tạo • Kết nối • Lan tỏa • Yêu thương — Bốn từ khóa mở ra cánh cửa hạnh phúc mỗi ngày.”',
    '“Hãy mỉm cười với cuộc đời mỗi sớm mai, cuộc đời sẽ dịu dàng trao lại cho bạn muôn vàn điều tuyệt diệu.”',
    '“Công nghệ AI khi chạm đến trái tim sẽ trở thành cây cầu kết nối cảm xúc và lưu giữ kỷ niệm vượt thời gian.”'
  ];

  let quoteIndex = 0;
  const newQuoteBtn = document.getElementById('newQuoteBtn');
  const dailyQuoteText = document.getElementById('dailyQuoteText');

  if (newQuoteBtn && dailyQuoteText) {
    newQuoteBtn.addEventListener('click', () => {
      quoteIndex = (quoteIndex + 1) % quotes.length;
      dailyQuoteText.style.opacity = '0';
      setTimeout(() => {
        dailyQuoteText.textContent = quotes[quoteIndex];
        dailyQuoteText.style.opacity = '1';
      }, 200);
    });
  }

  // 7. Copy Phone Number with Toast
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  const showToast = (message) => {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', async () => {
      const phone = copyPhoneBtn.getAttribute('data-copy') || '0982909515';
      try {
        await navigator.clipboard.writeText(phone);
        showToast(`Đã sao chép số điện thoại: ${phone}`);
      } catch {
        showToast(`Số điện thoại Mai Hường: ${phone}`);
      }
    });
  }

  // 8. Image Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

  const openLightbox = (src, alt) => {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Mai Hường Cuộc Sống Tươi Đẹp';
    if (lightboxCaption) {
      lightboxCaption.textContent = alt || '';
    }
    lightboxModal.classList.add('open');
    lightboxModal.setAttribute('aria-hidden', 'false');
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('open');
    lightboxModal.setAttribute('aria-hidden', 'true');
  };

  lightboxTriggers.forEach((img) => {
    img.addEventListener('click', () => {
      openLightbox(img.getAttribute('src'), img.getAttribute('alt'));
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // 9. Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const feedbackText = document.getElementById('feedbackText');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('senderName');
      const senderName = nameInput && nameInput.value ? nameInput.value.trim() : 'bạn';

      if (feedbackText) {
        feedbackText.innerHTML = `Cảm ơn <strong>${senderName}</strong> đã gửi lời nhắn yêu thương đến Mai Hường! Bạn cũng có thể kết nối trực tiếp ngay qua số điện thoại / Zalo <strong>0982 909 515</strong> nhé.`;
      }
      formFeedback.hidden = false;
      contactForm.reset();
      showToast('Đã gửi lời nhắn thành công! ❤️');
    });
  }
});
