# Weam Fouda — Portfolio

Personal portfolio site: selected work, services, reviews and contact.

**Live:** https://weamfouda306.github.io/portfolio/

Plain HTML, CSS and JavaScript — no build step.

## Edit content

Everything you'd normally change lives at the top of `script.js`:

- `CONFIG` — phone, WhatsApp, email, location, social links
- `PROJECTS` — work shown in "Selected work"
- `REVIEWS` — client quotes in "Kind words"

## Publishing changes

After editing `styles.css` or `script.js`, bump the `?v=` number on their links in `index.html` (e.g. `?v=2` → `?v=3`) so visitors' browsers load the new files instead of a cached copy.

## Run locally

```bash
npx http-server@14.1.1 . -p 5173
```

Then open http://localhost:5173.
