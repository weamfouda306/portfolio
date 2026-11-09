/* ==========================================================
   EDIT YOUR DETAILS HERE
   ========================================================== */

const CONFIG = {
  phone: "+201097367576",   // <- your phone, international format
  phoneLabel: "+20 109 736 7576",
  whatsapp: "201097367576", // <- same number, digits only
  email: "weamfouda306@gmail.com", // <- your email (leave "" to hide)
  location: "Egypt · working worldwide",
  // Add social links here if you want them, e.g. { label: "Instagram", url: "https://instagram.com/yourname" }
  socials: [],
};

/*
  ADD A PROJECT: copy one block below and change the values.
  - image  (optional) path to a screenshot, e.g. "images/kromax.jpg".
            Without one, a styled preview is generated from title + colors.
  - colors two hex colors used for the generated preview.
*/
const PROJECTS = [
  {
    title: "KROMAX",
    url: "https://kromax.co",
    year: "2026",
    category: "Solar energy · Smart home",
    description:
      "Bilingual website for a solar & smart-home company in Syria — with a live solar-flow animation, an interactive savings calculator, and QR product verification.",
    tags: ["Web design", "Development", "Interactive", "EN / AR"],
    colors: ["#4f9dff", "#1e40af"],
    image: "",
  },
  {
    title: "Siam Ocean",
    url: "https://www.siamocean-eg.com/",
    year: "", // <- add the year you built it
    category: "Food industries · Egypt",
    description:
      "Website for an Egyptian food manufacturer — showcasing its Safana and Fiorella brands, a filterable private-label product catalog, and an international enquiry form.",
    tags: ["Web design", "Development", "Product catalog", "Brands"],
    colors: ["#38bdf8", "#0e7490"],
    image: "",
  },
  {
    title: "Safaga Shore Excursions",
    url: "https://www.safagashoreexcursions.com/",
    year: "", // <- add the year you built it
    category: "Travel & tours · Egypt",
    description:
      "Booking website for a travel agency running shore excursions from Safaga and other Egyptian ports — tour listings with prices and durations, tailor-made trip requests, and a travel blog.",
    tags: ["Web design", "Development", "Tour booking", "Blog"],
    colors: ["#22d3ee", "#1e3a8a"],
    image: "",
  },
];

/*
  REVIEWS: replace these placeholders with real quotes from your clients.
  - rating  1–5 (stars), or 0 to hide the stars
  - photo   (optional) path to a photo, e.g. "images/client.jpg".
            Without one, the person's initials are shown.
  Delete the whole REVIEWS list contents ([]) to hide the section.
*/
const REVIEWS = [
  {
    quote: "Paste a short quote from your KROMAX client here: what working with you was like and what the new site did for them.",
    name: "Client name",
    role: "Role, KROMAX",
    rating: 5,
    photo: "",
  },
  {
    quote: "Second review goes here. One to three sentences works best; the most specific praise is the most convincing.",
    name: "Client name",
    role: "Role, Company",
    rating: 5,
    photo: "",
  },
  {
    quote: "Third review goes here. You can add as many as you like by copying a block.",
    name: "Client name",
    role: "Role, Company",
    rating: 5,
    photo: "",
  },
];

/* ==========================================================
   (no need to edit below)
   ========================================================== */

const $ = (s) => document.querySelector(s);
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function domain(url) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
}

function preview(p) {
  if (p.image) {
    return `<img src="${esc(p.image)}" alt="${esc(p.title)} website screenshot" loading="lazy" />`;
  }
  const [a, b] = p.colors || ["#888", "#444"];
  return `
    <div class="gen" style="--a:${esc(a)};--b:${esc(b)}">
      <div class="gen-bar"><i></i><i></i><i></i><span>${esc(domain(p.url) || "coming-soon")}</span></div>
      <div class="gen-body">
        <div class="gen-orb"></div>
        <strong>${esc(p.title)}</strong>
        <div class="gen-lines"><b></b><b></b><b></b></div>
      </div>
    </div>`;
}

function renderProjects() {
  const wrap = $("#projects");
  wrap.innerHTML = PROJECTS.map((p, i) => {
    const live = Boolean(p.url);
    const tag = live ? "a" : "div";
    const attrs = live ? `href="${esc(p.url)}" target="_blank" rel="noopener"` : "";
    const [ca, cb] = p.colors || ["#4f9dff", "#1e40af"];
    return `
      <${tag} class="project reveal" style="--a:${esc(ca)};--b:${esc(cb)}" ${attrs}>
        <div class="project-media">${preview(p)}</div>
        <div class="project-info">
          <div class="project-top">
            <span class="num">${String(i + 1).padStart(2, "0")}</span>
            <span class="meta">${esc([p.category, p.year].filter(Boolean).join(" · "))}</span>
          </div>
          <h3>${esc(p.title)} ${live ? '<span class="arrow">↗</span>' : ""}</h3>
          <p>${esc(p.description)}</p>
          <ul class="tags">${(p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          ${live ? `<span class="visit">Visit ${esc(domain(p.url))}</span>` : ""}
        </div>
      </${tag}>`;
  }).join("");
  $("#work-count").textContent = `(${String(PROJECTS.length).padStart(2, "0")})`;

  // hover glow follows the mouse inside each card
  wrap.querySelectorAll(".project").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

function initials(name) {
  return String(name).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}

function renderReviews() {
  if (!REVIEWS.length) {
    $("#reviews").remove();
    document.querySelector('a[href="#reviews"]')?.remove();
    return;
  }
  $("#review-grid").innerHTML = REVIEWS.map((r) => {
    const stars = Math.max(0, Math.min(5, Math.round(r.rating || 0)));
    const avatar = r.photo
      ? `<img src="${esc(r.photo)}" alt="" loading="lazy" />`
      : esc(initials(r.name));
    return `
      <figure class="review reveal">
        ${stars ? `<div class="stars" aria-label="${stars} out of 5 stars">${"★".repeat(stars)}</div>` : ""}
        <blockquote>${esc(r.quote)}</blockquote>
        <figcaption class="reviewer">
          <div class="avatar" aria-hidden="true">${avatar}</div>
          <div><strong>${esc(r.name)}</strong><span>${esc(r.role)}</span></div>
        </figcaption>
      </figure>`;
  }).join("");
  $("#review-count").textContent = `(${String(REVIEWS.length).padStart(2, "0")})`;
}

const ICONS = {
  whatsapp: '<path d="M3 21l1.65-3.8A9 9 0 1 1 7.8 20.3L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
};
const icon = (k) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[k]}</svg>`;

function renderContact() {
  const cards = [
    CONFIG.whatsapp && {
      icon: icon("whatsapp"), label: "WhatsApp", value: CONFIG.phoneLabel,
      href: `https://wa.me/${CONFIG.whatsapp}`, external: true, primary: true,
    },
    CONFIG.phone && { icon: icon("phone"), label: "Call me", value: CONFIG.phoneLabel, href: `tel:${CONFIG.phone}` },
    CONFIG.email && { icon: icon("mail"), label: "Email", value: CONFIG.email, href: `mailto:${CONFIG.email}` },
    CONFIG.location && { icon: icon("pin"), label: "Based in", value: CONFIG.location },
  ].filter(Boolean);

  $("#contact-cards").innerHTML = cards.map((c) => {
    const tag = c.href ? "a" : "div";
    const attrs = c.href ? `href="${esc(c.href)}"${c.external ? ' target="_blank" rel="noopener"' : ""}` : "";
    return `
      <${tag} class="contact-card reveal${c.primary ? " primary" : ""}" ${attrs}>
        <span class="c-icon" aria-hidden="true">${c.icon}</span>
        <span class="c-text"><span>${esc(c.label)}</span><strong>${esc(c.value)}</strong></span>
        ${c.href ? '<span class="c-arrow" aria-hidden="true">↗</span>' : ""}
      </${tag}>`;
  }).join("");

  const form = $("#contact-form");
  const err = $("#form-error");
  form.addEventListener("input", () => { err.hidden = true; });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const message = form.message.value.trim();
    if (!name || !message) { err.hidden = false; return; }
    err.hidden = true;
    const text = `Hi Weam, I'm ${name}.\n\n${message}`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });

  if (CONFIG.socials.length) {
    $("#socials").innerHTML = CONFIG.socials
      .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`)
      .join("");
  } else {
    $("#socials").remove();
  }
  $("#year").textContent = new Date().getFullYear();
}

function setupReveal() {
  // every section fades in as a whole...
  const sections = document.querySelectorAll("main > section, .footer");
  sections.forEach((s) => s.classList.add("section-fade"));

  // ...and the items inside it follow one after another (stagger)
  const els = document.querySelectorAll(".reveal");
  els.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    const i = siblings.indexOf(el);
    if (i > 0) {
      el.style.transitionDelay = `${Math.min(i, 6) * 110}ms`;
      // drop the delay once shown so hover effects stay instant
      el.addEventListener("transitionend", () => { el.style.transitionDelay = ""; }, { once: true });
    }
  });

  const targets = [...sections, ...els];
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }),
    { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
  );
  targets.forEach((el) => io.observe(el));
}

function setupNav() {
  const nav = $(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* Live background: drifting particles that link up and react to the mouse */
function setupBackground() {
  const canvas = $("#bg-canvas");
  const ctx = canvas?.getContext("2d");
  if (!ctx) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LINK = 140;          // max distance for connecting lines
  const MOUSE_R = 180;       // mouse influence radius
  let w, h, dpr, dots = [], raf = null;
  const mouse = { x: -9999, y: -9999 };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(90, Math.max(28, (w * h) / 16000)));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
      p: Math.random() * Math.PI * 2, // twinkle phase
    }));
  }

  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    const parallax = (window.scrollY * 0.08) % h;

    for (const d of dots) {
      if (!reduceMotion) {
        // gentle push away from the cursor
        const dx = d.x - mouse.x, dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_R && dist > 0) {
          const f = (1 - dist / MOUSE_R) * 0.6;
          d.x += (dx / dist) * f; d.y += (dy / dist) * f;
        }
        d.x += d.vx; d.y += d.vy;
        if (d.x < -20) d.x = w + 20; else if (d.x > w + 20) d.x = -20;
        if (d.y < -20) d.y = h + 20; else if (d.y > h + 20) d.y = -20;
      }
      d.sy = (d.y - parallax + h) % h; // screen y with scroll parallax
    }

    // links
    for (let i = 0; i < dots.length; i++) {
      const a = dots[i];
      for (let j = i + 1; j < dots.length; j++) {
        const b = dots[j];
        const dx = a.x - b.x, dy = a.sy - b.sy;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          const alpha = (1 - Math.sqrt(d2) / LINK) * 0.22;
          ctx.strokeStyle = `rgba(110, 168, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.sy); ctx.lineTo(b.x, b.sy); ctx.stroke();
        }
      }
      // link to cursor
      const mdx = a.x - mouse.x, mdy = a.sy - mouse.y;
      const md = Math.hypot(mdx, mdy);
      if (md < MOUSE_R) {
        ctx.strokeStyle = `rgba(79, 157, 255, ${(1 - md / MOUSE_R) * 0.45})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.sy); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }

    // dots
    for (const d of dots) {
      const tw = reduceMotion ? 0.7 : 0.55 + Math.sin(t / 900 + d.p) * 0.35;
      ctx.fillStyle = `rgba(190, 215, 255, ${tw})`;
      ctx.beginPath(); ctx.arc(d.x, d.sy, d.r, 0, Math.PI * 2); ctx.fill();
    }

    if (!reduceMotion) raf = requestAnimationFrame(frame);
  }

  function start() { if (!raf) raf = requestAnimationFrame(frame); }
  function stop() { if (raf) cancelAnimationFrame(raf); raf = null; }

  resize();
  window.addEventListener("resize", () => { resize(); if (reduceMotion) frame(0); });
  window.addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  document.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : !reduceMotion && start()));
  if (reduceMotion) frame(0); else start();
}

setupBackground();
renderProjects();
renderReviews();
renderContact();
setupReveal();
setupNav();
