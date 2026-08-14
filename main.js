/* ============================================================
   IMPERIAL WOMEN INITIATIVE — MAIN SCRIPT
   Handles: loader, sticky header, mobile nav, hero slider,
   counters, testimonial slider, gallery lightbox, back-to-top,
   newsletter + contact form feedback, donate tier toggle,
   impact bar animation.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Page loader ---------- */
  var loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', function () {
      setTimeout(function () { loader.classList.add('is-hidden'); }, 250);
    });
    // Fallback in case 'load' already fired
    setTimeout(function () { loader.classList.add('is-hidden'); }, 1800);
  }

  /* ---------- Sticky header ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 40) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      var expanded = mainNav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded);
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { mainNav.classList.remove('open'); });
    });
  }

  /* ---------- Hero slider ---------- */
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length) {
    var current = 0;
    var dotsWrap = document.querySelector('.hero-dots');
    var dots = [];
    slides.forEach(function (s, i) {
      if (dotsWrap) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        if (i === 0) b.classList.add('is-active');
        b.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(b);
        dots.push(b);
      }
    });
    function goTo(i) {
      slides[current].classList.remove('is-active');
      if (dots[current]) dots[current].classList.remove('is-active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      if (dots[current]) dots[current].classList.add('is-active');
    }
    var prevBtn = document.querySelector('.hero-prev');
    var nextBtn = document.querySelector('.hero-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); resetAuto(); });
    var auto = setInterval(function () { goTo(current + 1); }, 6000);
    function resetAuto() { clearInterval(auto); auto = setInterval(function () { goTo(current + 1); }, 6000); }
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1600;
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var value = Math.floor(eased * target);
          el.textContent = value.toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target.toLocaleString() + suffix;
        }
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  /* ---------- Impact bar fill ---------- */
  var bars = document.querySelectorAll('.bar-fill');
  if (bars.length && 'IntersectionObserver' in window) {
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.width = entry.target.getAttribute('data-pct') + '%';
        barObserver.unobserve(entry.target);
      });
    }, { threshold: 0.3 });
    bars.forEach(function (b) { barObserver.observe(b); });
  }

  /* ---------- Testimonial slider ---------- */
  var tSlides = document.querySelectorAll('.testimonial-slide');
  if (tSlides.length) {
    var tCurrent = 0;
    var tDotsWrap = document.querySelector('.testimonial-dots');
    var tDots = [];
    tSlides.forEach(function (s, i) {
      if (tDotsWrap) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
        if (i === 0) b.classList.add('is-active');
        b.addEventListener('click', function () { tGoTo(i); });
        tDotsWrap.appendChild(b);
        tDots.push(b);
      }
    });
    function tGoTo(i) {
      tSlides[tCurrent].classList.remove('is-active');
      if (tDots[tCurrent]) tDots[tCurrent].classList.remove('is-active');
      tCurrent = (i + tSlides.length) % tSlides.length;
      tSlides[tCurrent].classList.add('is-active');
      if (tDots[tCurrent]) tDots[tCurrent].classList.add('is-active');
    }
    setInterval(function () { tGoTo(tCurrent + 1); }, 5500);
  }

  /* ---------- Gallery lightbox ---------- */
  var galleryItems = document.querySelectorAll('.gallery-item');
  var lightbox = document.querySelector('.lightbox');
  if (galleryItems.length && lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbIndex = 0;
    var sources = Array.prototype.map.call(galleryItems, function (item) {
      return item.querySelector('img').getAttribute('src');
    });
    function openLB(i) {
      lbIndex = i;
      lbImg.setAttribute('src', sources[lbIndex]);
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closeLB() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    function stepLB(dir) {
      lbIndex = (lbIndex + dir + sources.length) % sources.length;
      lbImg.setAttribute('src', sources[lbIndex]);
    }
    galleryItems.forEach(function (item, i) {
      item.addEventListener('click', function () { openLB(i); });
    });
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn2 = lightbox.querySelector('.lightbox-prev');
    var nextBtn2 = lightbox.querySelector('.lightbox-next');
    if (closeBtn) closeBtn.addEventListener('click', closeLB);
    if (prevBtn2) prevBtn2.addEventListener('click', function () { stepLB(-1); });
    if (nextBtn2) nextBtn2.addEventListener('click', function () { stepLB(1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLB(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowLeft') stepLB(-1);
      if (e.key === 'ArrowRight') stepLB(1);
    });
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    document.addEventListener('scroll', function () {
      if (window.scrollY > 500) backToTop.classList.add('is-visible');
      else backToTop.classList.remove('is-visible');
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Forms (contact + newsletter) — front-end only ---------- */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var successEl = form.querySelector('.form-success') || form.parentElement.querySelector('.form-success');
      if (successEl) successEl.classList.add('is-visible');
      form.reset();
      if (successEl) {
        setTimeout(function () { successEl.classList.remove('is-visible'); }, 6000);
      }
    });
  });

  /* ---------- Donate tiers ---------- */
  var tierBtns = document.querySelectorAll('.tier-btn');
  var donateAmountInput = document.querySelector('#donate-amount');
  if (tierBtns.length) {
    tierBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tierBtns.forEach(function (b) { b.classList.remove('is-selected'); });
        btn.classList.add('is-selected');
        if (donateAmountInput) donateAmountInput.value = btn.getAttribute('data-amount');
      });
    });
  }
  var donateToggleBtns = document.querySelectorAll('.donate-toggle button');
  if (donateToggleBtns.length) {
    donateToggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        donateToggleBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
      });
    });
  }

  /* ---------- Active nav link highlight ---------- */
  var here = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === here || (here === '' && href === 'index.html')) link.classList.add('active');
  });

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

});
