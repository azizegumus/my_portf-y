(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");

  const getTheme = () => root.getAttribute("data-theme") || "light";

  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Açık moda geç" : "Koyu moda geç"
      );
    }
  };

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      setTheme(getTheme() === "dark" ? "light" : "dark");
    });
    setTheme(getTheme());
  }

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const backdrop = document.querySelector(".nav-backdrop");

  const setNavOpen = (open) => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    if (backdrop) {
      if (open) {
        backdrop.hidden = false;
        requestAnimationFrame(() => {
          backdrop.classList.add("is-visible");
        });
      } else {
        backdrop.classList.remove("is-visible");
        window.setTimeout(() => {
          if (!document.body.classList.contains("nav-open")) {
            backdrop.hidden = true;
          }
        }, 350);
      }
    }
  };

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      setNavOpen(open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setNavOpen(false));
    });

    if (backdrop) {
      backdrop.addEventListener("click", () => setNavOpen(false));
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setNavOpen(false);
    });

    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth > 1100) setNavOpen(false);
      },
      { passive: true }
    );
  }

  const revealTargets = document.querySelectorAll(
    ".section-title, .section-lead, .about-text, .about-meta, .skill-list li, .project, .timeline li, .cert, .contact-item, .eyebrow"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
})();
