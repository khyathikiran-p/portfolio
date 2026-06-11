/* ============================================================
   Khyathi Kiran Pediredla — Portfolio
   Theme + accent switcher, preloader, scroll progress, cursor
   glow, particles, typed roles, count-up, tilt, magnetic, reveal.
   ============================================================ */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(hover: none)").matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme + accent (persisted) ---------- */
  try {
    var savedTheme = localStorage.getItem("kp-theme");
    var savedAccent = localStorage.getItem("kp-accent");
    if (savedTheme) root.setAttribute("data-theme", savedTheme);
    if (savedAccent) root.setAttribute("data-accent", savedAccent);
  } catch (e) {}

  function syncAccentUI() {
    var current = root.getAttribute("data-accent");
    document.querySelectorAll("[data-set-accent]").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-set-accent") === current);
    });
  }
  syncAccentUI();

  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("kp-theme", next); } catch (e) {}
    });
  }
  document.querySelectorAll("[data-set-accent]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var accent = btn.getAttribute("data-set-accent");
      root.setAttribute("data-accent", accent);
      try { localStorage.setItem("kp-accent", accent); } catch (e) {}
      syncAccentUI();
    });
  });

  /* ---------- Preloader ---------- */
  window.addEventListener("load", function () {
    var pre = document.getElementById("preloader");
    if (!pre) return;
    setTimeout(function () { pre.classList.add("is-done"); }, reduceMotion ? 0 : 500);
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("menu-btn");
  var mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Navbar shadow + scroll progress + back-to-top ---------- */
  var navbar = document.getElementById("navbar");
  var progress = document.getElementById("scroll-progress");
  var toTop = document.getElementById("to-top");
  function onScroll() {
    var y = window.scrollY || 0;
    if (navbar) navbar.classList.toggle("is-scrolled", y > 12);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
    if (toTop) toTop.classList.toggle("is-visible", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------- Cursor glow ---------- */
  var glow = document.getElementById("cursor-glow");
  if (glow && !isTouch && !reduceMotion) {
    window.addEventListener("mousemove", function (e) {
      glow.style.opacity = "1";
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
    document.addEventListener("mouseleave", function () { glow.style.opacity = "0"; });
  }

  /* ---------- Typed rotating roles ---------- */
  var typedEl = document.getElementById("typed");
  if (typedEl) {
    var roles = ["for the web.", "with AI.", "that ship.", "people love."];
    if (reduceMotion) {
      typedEl.textContent = "for the web.";
    } else {
      var ri = 0, ci = 0, deleting = false;
      (function tick() {
        var word = roles[ri];
        typedEl.textContent = word.substring(0, ci);
        if (!deleting && ci < word.length) { ci++; }
        else if (!deleting && ci === word.length) { deleting = true; return setTimeout(tick, 1600); }
        else if (deleting && ci > 0) { ci--; }
        else { deleting = false; ri = (ri + 1) % roles.length; }
        setTimeout(tick, deleting ? 45 : 95);
      })();
    }
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var siblings = entry.target.parentElement
            ? entry.target.parentElement.querySelectorAll(":scope > [data-reveal]")
            : [entry.target];
          var idx = Array.prototype.indexOf.call(siblings, entry.target);
          entry.target.style.transitionDelay = (reduceMotion ? 0 : Math.min(idx, 6) * 80) + "ms";
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Scroll-spy ---------- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-link");
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (l) {
            l.classList.toggle("is-active", l.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Count-up stats ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        var suffix = el.getAttribute("data-suffix") || "";
        if (reduceMotion) { el.textContent = target + suffix; cio.unobserve(el); return; }
        var start = null, dur = 1400;
        (function step(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ---------- 3D tilt + spotlight on project cards ---------- */
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll(".tilt").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        card.style.transform =
          "perspective(900px) rotateY(" + (px - 0.5) * 8 + "deg) rotateX(" + (0.5 - py) * 8 + "deg) translateY(-4px)";
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll(".magnetic").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + mx * 0.18 + "px," + my * 0.28 + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- Hero particles ---------- */
  var canvas = document.getElementById("particles");
  if (canvas && canvas.getContext && !reduceMotion) {
    var ctx = canvas.getContext("2d");
    var hero = canvas.parentElement;
    var dots = [];
    var raf;

    function accentRGB() {
      var v = getComputedStyle(root).getPropertyValue("--accent-rgb").trim();
      return v || "34,211,238";
    }
    function resize() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
      var count = Math.min(70, Math.floor(canvas.width / 22));
      dots = [];
      for (var i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.8 + 0.6,
        });
      }
    }
    function draw() {
      var rgb = accentRGB();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + rgb + ",0.6)";
        ctx.fill();
        for (var j = i + 1; j < dots.length; j++) {
          var d2 = dots[j];
          var dist = Math.hypot(d.x - d2.x, d.y - d2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.strokeStyle = "rgba(" + rgb + "," + (0.12 * (1 - dist / 120)) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    resize();
    draw();
    window.addEventListener("resize", function () { cancelAnimationFrame(raf); resize(); draw(); });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  function showStatus(msg, ok) {
    if (!status) return;
    status.textContent = msg;
    status.style.color = ok ? "#34d399" : "#f87171";
  }
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !email || !message) return showStatus("Please fill in all the fields.", false);
      if (!emailOk) return showStatus("Please enter a valid email address.", false);
      var subject = encodeURIComponent("Portfolio enquiry from " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href = "mailto:khyathikiran.pediredla@gmail.com?subject=" + subject + "&body=" + body;
      showStatus("Thanks, " + name + "! Opening your email app…", true);
      form.reset();
    });
  }
})();
