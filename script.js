/* ============================================================
   Khyathi Kiran Pediredla — Portfolio
   Interactivity: mobile nav, scroll reveal, active link,
   navbar shadow, contact form handling, footer year.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile menu toggle ---------- */
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add("hidden");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      const isHidden = mobileMenu.classList.toggle("hidden");
      menuBtn.setAttribute("aria-expanded", String(!isHidden));
    });
    // Close after clicking a link
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ---------- Navbar shadow on scroll ---------- */
  const navbar = document.getElementById("navbar");
  function onScroll() {
    if (!navbar) return;
    navbar.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Active nav link on scroll (scroll-spy) ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  /* ---------- Contact form (client-side handling) ---------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  function showStatus(message, ok) {
    if (!status) return;
    status.textContent = message;
    status.classList.remove("hidden");
    status.style.color = ok ? "#34d399" : "#f87171";
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !email || !message) {
        showStatus("Please fill in all the fields.", false);
        return;
      }
      if (!emailOk) {
        showStatus("Please enter a valid email address.", false);
        return;
      }

      // No backend yet — open the user's mail client with a prefilled draft.
      const subject = encodeURIComponent("Portfolio enquiry from " + name);
      const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href =
        "mailto:khyathikiran.pediredla@gmail.com?subject=" + subject + "&body=" + body;

      showStatus("Thanks, " + name + "! Opening your email app…", true);
      form.reset();
    });
  }
})();
