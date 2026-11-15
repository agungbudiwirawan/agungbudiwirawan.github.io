(function () {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");

  // Solid navbar after scrolling (index page starts transparent over the hero)
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.querySelector("use").setAttribute("href", open ? toggle.dataset.close : toggle.dataset.open);
    });
    nav.querySelectorAll(".nav-links a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.querySelector("use").setAttribute("href", toggle.dataset.open);
      })
    );
  }

  // Highlight the nav link of the section in view
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  // Reveal on scroll + animate bar charts
  const reveal = (el) => {
    el.classList.add("in");
    el.querySelectorAll(".bar-fill[data-w]").forEach((b) => (b.style.width = b.dataset.w + "%"));
  };
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach(reveal);
  }

  // Project filters
  const filters = document.querySelectorAll(".filter");
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      filters.forEach((b) => { b.classList.toggle("active", b === btn); b.setAttribute("aria-pressed", String(b === btn)); });
      const cat = btn.dataset.filter;
      document.querySelectorAll(".project").forEach((p) =>
        p.classList.toggle("hide", cat !== "all" && !p.dataset.cat.split(" ").includes(cat))
      );
    })
  );

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
