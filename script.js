/* ============================================================
   Lea Ademilola — small progressive enhancements.
   The page is fully usable with this file blocked or failing.
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Current year in footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Mobile menu ---------- */
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");
  var DESKTOP = window.matchMedia("(min-width: 60rem)");

  function collapseNav(collapsed) {
    if (!siteNav || !navToggle) return;
    siteNav.setAttribute("data-collapsed", collapsed ? "true" : "false");
    navToggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
  }

  if (navToggle && siteNav) {
    collapseNav(true);

    navToggle.addEventListener("click", function () {
      collapseNav(navToggle.getAttribute("aria-expanded") === "true");
    });

    // Close after picking a destination, so the page isn't hidden behind the menu.
    siteNav.addEventListener("click", function (e) {
      if (e.target.closest("a") && !DESKTOP.matches) collapseNav(true);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        collapseNav(true);
        navToggle.focus();
      }
    });

    // Reset state when crossing the desktop breakpoint.
    var onBreakpoint = function () { collapseNav(true); };
    if (DESKTOP.addEventListener) DESKTOP.addEventListener("change", onBreakpoint);
    else if (DESKTOP.addListener) DESKTOP.addListener(onBreakpoint);
  }

  /* ---------- Larger text toggle (remembered between visits) ---------- */
  var sizeBtn = document.getElementById("textSizeBtn");

  function applyBigText(on) {
    root.classList.toggle("big-text", on);
    if (sizeBtn) sizeBtn.setAttribute("aria-pressed", on ? "true" : "false");
  }

  var stored = null;
  try { stored = window.localStorage.getItem("lea-big-text"); } catch (err) {}
  if (stored === "1") applyBigText(true);

  if (sizeBtn) {
    sizeBtn.addEventListener("click", function () {
      var on = sizeBtn.getAttribute("aria-pressed") !== "true";
      applyBigText(on);
      try { window.localStorage.setItem("lea-big-text", on ? "1" : "0"); } catch (err) {}
    });
  }

  /* ---------- Copy email (only shown if the browser can actually do it) ---------- */
  var copyBtn = document.getElementById("copyEmail");
  var copyStatus = document.getElementById("copyStatus");
  var EMAIL = "coachlea.ai@gmail.com";

  if (copyBtn && navigator.clipboard && window.isSecureContext) {
    copyBtn.hidden = false;
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(EMAIL).then(function () {
        if (copyStatus) copyStatus.textContent = "Copied " + EMAIL + " to your clipboard.";
      }).catch(function () {
        if (copyStatus) copyStatus.textContent = "Couldn't copy — the address is " + EMAIL + ".";
      });
    });
  }

  /* ---------- Photos: fall back to a drawing if a file is missing ----------
     The <img> is the default in the markup. If it fails to load, we hide it and
     reveal the drawn stand-in, so the page never shows a broken-image icon. */
  function wirePhoto(imgId, fallbackId) {
    var img = document.getElementById(imgId);
    var fallback = document.getElementById(fallbackId);
    if (!img || !fallback) return;

    function useFallback() {
      img.hidden = true;
      fallback.hidden = false;
    }

    img.addEventListener("error", useFallback);
    // The image may already have failed before this script ran.
    if (img.complete && img.naturalWidth === 0) useFallback();
  }

  wirePhoto("heroPhoto", "heroPhotoFallback");
  wirePhoto("leaPhoto", "portraitFallback");

  /* ---------- Pinned mini card in About ----------
     Fades in once the big photo has scrolled out of view. */
  var pin = document.getElementById("aboutPin");
  var banner = document.querySelector(".about-banner");

  if (pin && banner && "IntersectionObserver" in window) {
    var pinWatch = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        pin.classList.toggle("is-shown", !entry.isIntersecting);
      });
    }, { rootMargin: "-20% 0px 0px 0px" });
    pinWatch.observe(banner);
  }

  /* ---------- Which section am I in (desktop nav) ---------- */
  var navLinks = siteNav ? Array.prototype.slice.call(siteNav.querySelectorAll('a[href^="#"]')) : [];
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var match = link.getAttribute("href") === "#" + entry.target.id;
          if (match) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Gentle reveal on scroll ---------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    /* Structural blocks only. Body paragraphs are deliberately left out —
       fading in one paragraph at a time interrupts reading. */
    var targets = document.querySelectorAll(
      ".section .kicker, .section h2, .section-lede, .card, .who-list li, .offer, " +
      ".principles li, .volunteer, .pull-quote, .bg-card"
    );
    Array.prototype.forEach.call(targets, function (el) { el.classList.add("reveal"); });

    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el) { revealer.observe(el); });
  }
})();
