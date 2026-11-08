# -6

**Stay Purr** — an in-home cat sitting website (static HTML/CSS/JS).

Pages: home, pricing, about, services, blog + article page, contacts, book now (6-step booking), FAQ, privacy policy, terms of use.

## Run locally

```bash
python -m http.server 5187
```

Then open http://localhost:5187.

## Where things live

- `index.html` and the other `*.html` files — page content
- `css/style.css` — shared styles and the home page; `css/pages.css` — inner pages
- `js/core.js` — shared header, footer, Instagram block, preloader, smooth scroll
- `js/home.js` — home page animations; `js/pages.js` — inner-page logic
- `js/art.js` — every illustration (generated SVG)
- `js/blog-data.js` — blog posts

Cat photos are hotlinked from Unsplash. The contact and booking forms show a thank-you message but are not connected to email yet.
