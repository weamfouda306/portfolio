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
  Keep the description to one short sentence.
  - logo    path to the site's logo, e.g. "images/logos/name.png" (leave "" for none)
  Logos sit on a white panel, so use a version with dark/coloured text.
*/
const PROJECTS = [
  {
    title: "KROMAX",
    url: "https://kromax.co",
    logo: "images/logos/kromax.svg",
    year: "2026",
    category: "Solar energy · Smart home",
    description:
      "Bilingual site for a solar and smart-home company, with a live energy animation and savings calculator.",
  },
  {
    title: "Siam Ocean",
    url: "https://www.siamocean-eg.com/",
    logo: "images/logos/siam-ocean.png",
    year: "2024",
    category: "Food industries · Egypt",
    description:
      "Brand and product-catalog site for an Egyptian food manufacturer.",
  },
  {
    title: "Safaga Shore Excursions",
    url: "https://www.safagashoreexcursions.com/",
    logo: "images/logos/safaga.webp",
    year: "2022",
    category: "Travel & tours · Egypt",
    description:
      "Tour booking site for shore excursions from Egyptian ports.",
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

function renderProjects() {
  $("#projects").innerHTML = PROJECTS.map((p, i) => {
    const live = Boolean(p.url);
    const tag = live ? "a" : "div";
    const attrs = live ? `href="${esc(p.url)}" target="_blank" rel="noopener"` : "";
    const meta = [p.category, p.year].filter(Boolean).join(" · ");
    return `
      <${tag} class="project reveal" ${attrs}>
        ${p.logo ? `<div class="logo-plate"><img src="${esc(p.logo)}" alt="${esc(p.title)} logo" loading="lazy" /></div>` : ""}
        <span class="num">${String(i + 1).padStart(2, "0")}</span>
        <div class="project-main">
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.description)}</p>
        </div>
        <div class="project-side">
          <span class="meta">${esc(meta)}</span>
          ${live ? `<span class="domain">${esc(domain(p.url))}</span>` : ""}
        </div>
        ${live ? '<span class="go" aria-hidden="true">↗</span>' : ""}
      </${tag}>`;
  }).join("");
  $("#work-count").textContent = `(${String(PROJECTS.length).padStart(2, "0")})`;
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

/* Hero: the browser window tilts toward the mouse */
function setupHeroTilt() {
  const hero = $(".hero");
  const box = $("#browser");
  if (!hero || !box) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover)").matches) return; // phones keep the resting angle

  const REST = "rotateY(-14deg) rotateX(6deg)";
  let frame = null;

  hero.addEventListener("pointermove", (e) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = null;
      const r = box.getBoundingClientRect();
      // -1 … 1 from the window's centre, clamped
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 0.9)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 0.9)));
      box.style.transform = `rotateY(${nx * 18}deg) rotateX(${-ny * 14}deg) translateZ(20px)`;
      box.style.setProperty("--gx", `${(e.clientX - r.left) / r.width * 100}%`);
      box.style.setProperty("--gy", `${(e.clientY - r.top) / r.height * 100}%`);
    });
  });
  hero.addEventListener("pointerleave", () => {
    box.style.transform = REST;
    box.style.removeProperty("--gx");
    box.style.removeProperty("--gy");
  });
}

function setupNav() {
  const nav = $(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

renderProjects();
renderReviews();
renderContact();
setupReveal();
setupNav();
setupHeroTilt();
