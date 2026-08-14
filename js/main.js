/* ============================================================
   IMPERIAL WOMEN INITIATIVE — MAIN SCRIPT
   Handles: loader, sticky header, mobile nav, hero slider,
   counters, testimonial slider, gallery lightbox, back-to-top,
   newsletter + contact form feedback, donate tier toggle,
   impact bar animation, and shared logo path fallback.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Shared logo path ----------
     The logo is stored in the repository inside the project image
     folder. Update all page logos before the loader is displayed. */
  var iwiLogo = 'images/Imperial%20Women%20Initiative/logo2.png';
  document.querySelectorAll('img[src="images/logo.png"], img[src="/images/logo.png"]').forEach(function (img) {
    img.src = iwiLogo;
  });

  /* ---------- Page loader ---------- */
  var loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', function () {
      setTimeout(function () { loader.classList.add('is-hidden'); }, 250);
    });
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
        var d = document.createElement('button');
        d.className = i === 0 ? 'is-active' : '';
        d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        d.addEventListener('click', function () { showSlide(i); });
        dotsWrap.appendChild(d);
        dots.push(d);
      }
    });
    function showSlide(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === current); });
    }
    var prev = document.querySelector('.hero-prev');
    var next = document.querySelector('.hero-next');
    if (prev) prev.addEventListener('click', function () { showSlide(current - 1); });
    if (next) next.addEventListener('click', function () { showSlide(current + 1); });
    setInterval(function () { showSlide(current + 1); }, 6000);
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'), 10) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        var start = 0;
        var duration = 1400;
        var startTime = null;
        function tick(ts) {
          if (!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          var value = Math.floor(start + (target - start) * progress);
          el.textContent = value.toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.35 });
    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  /* ---------- Testimonials ---------- */
  var testimonialSlides = document.querySelectorAll('.testimonial-slide');
  if (testimonialSlides.length) {
    var tCurrent = 0;
    var tDotsWrap = document.querySelector('.testimonial-dots');
    var tDots = [];
    testimonialSlides.forEach(function (s, i) {
      if (tDotsWrap) {
        var d = document.createElement('button');
        d.className = i === 0 ? 'is-active' : '';
        d.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        d.addEventListener('click', function () { showTestimonial(i); });
        tDotsWrap.appendChild(d);
        tDots.push(d);
      }
    });
    function showTestimonial(index) {
      tCurrent = (index + testimonialSlides.length) % testimonialSlides.length;
      testimonialSlides.forEach(function (s, i) { s.classList.toggle('is-active', i === tCurrent); });
      tDots.forEach(function (d, i) { d.classList.toggle('is-active', i === tCurrent); });
    }
    setInterval(function () { showTestimonial(tCurrent + 1); }, 7000);
  }

  /* ---------- Gallery lightbox ---------- */
  var galleryItems = document.querySelectorAll('[data-lightbox], .gallery-item img');
  if (galleryItems.length) {
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img alt="">';
    document.body.appendChild(lightbox);
    var lbImg = lightbox.querySelector('img');
    var closeLb = function () { lightbox.classList.remove('open'); };
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var src = item.getAttribute('data-lightbox') || (item.tagName === 'IMG' ? item.src : item.querySelector('img')?.src);
        if (src) { lbImg.src = src; lightbox.classList.add('open'); }
      });
    });
  }

  /* ---------- Back to top ---------- */
  var topBtn = document.querySelector('.back-to-top');
  if (topBtn) {
    document.addEventListener('scroll', function () { topBtn.classList.toggle('show', window.scrollY > 500); }, { passive: true });
    topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---------- Form feedback ---------- */
  document.querySelectorAll('[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      if (button) {
        var old = button.textContent;
        button.textContent = 'Thank you!';
        button.disabled = true;
        setTimeout(function () { button.textContent = old; button.disabled = false; form.reset(); }, 2500);
      }
    });
  });

  /* ---------- Donate tier toggle ---------- */
  document.querySelectorAll('[data-donate-tier]').forEach(function (button) {
    button.addEventListener('click', function () {
      var amount = button.getAttribute('data-donate-tier');
      var input = document.querySelector('[name="amount"], #amount');
      if (input) { input.value = amount; input.dispatchEvent(new Event('input', { bubbles: true })); }
    });
  });

  /* ---------- Impact bars ---------- */
  var bars = document.querySelectorAll('.impact-bar-fill[data-width]');
  if (bars.length && 'IntersectionObserver' in window) {
    var barObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.width = entry.target.getAttribute('data-width');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.25 });
    bars.forEach(function (bar) { barObserver.observe(bar); });
  }
});
