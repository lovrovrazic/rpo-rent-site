# RPO Aktiva Vit – rental site

Plain HTML + CSS, one small JS file. No build step. Everything that goes online is in `html/`.

## Files
- `html/index.html` – home: photo tiles, intro, contact form, map
- `html/house.html`, `apartment.html`, `car.html`, `motorcycle.html` – listing pages
- `html/legal.html` – company info + privacy notice (fill in the [brackets])
- `html/css/style.css` – all design; colours and fonts are variables at the top
- `html/js/site.js` – gallery lightbox, click-to-load map, contact form
- `html/images/<item>/cover.webp` – tile photo; `01.webp`… – gallery photos
- `html/images/logo.svg` – temporary wrapper around the old PNG; overwrite with the real SVG

## Common edits
- **Remove an item:** delete its `<a class="tile">` block in `index.html` (and its page). Tiles re-fill the row.
- **Replace photos:** overwrite the files in `images/<item>/` with the same names (WebP, ~1600 px wide).
- **Add a gallery photo:** copy one `<a>` line in the listing's `.gallery` and change both file names.
- **Contact form:** get a free access key at web3forms.com and replace `YOUR_ACCESS_KEY` (5 pages).
- **Booking.com:** paste the listing URL into the button on `house.html` / `apartment.html`.
- **Font:** put `tenor-sans.woff2` in `html/fonts/` (self-hosted, no Google requests).

Search all placeholders: `grep -rn "YOUR_ACCESS_KEY\|example.com\|\[\|booking.com/\"" html`

## Preview locally
    python3 -m http.server 8080 --directory html
