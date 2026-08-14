# Imperial Women Initiative — Website

A 9-page responsive website for Imperial Women Initiative, built with plain HTML, CSS and JavaScript (no build step required).

## What's inside
```
iwi/
├── index.html          Landing page — full-screen hero slider
├── about.html           Mission, story, timeline, team
├── programs.html        The four program pillars
├── projects.html        Active & completed projects
├── impact.html          Impact stats + funding breakdown
├── news.html            Story/update cards
├── gallery.html         Photo grid with lightbox
├── contact.html         Contact form
├── donate.html           Donation form with tiered amounts
├── 404.html              Custom error page
├── css/style.css         All styling (design tokens at the top)
├── js/main.js            Slider, counters, lightbox, forms, nav
├── images/logo.png       Your uploaded logo
├── robots.txt
└── sitemap.xml
```

## Running it locally
No build tools needed — just open `index.html` in a browser, or serve the folder:
```
cd iwi
python3 -m http.server 8080
```
Then visit `http://localhost:8080`.

## Deploying
Upload the whole `iwi` folder to any static host:
- **Netlify / Vercel**: drag-and-drop the folder, or connect a Git repo.
- **GitHub Pages**: push to a repo, enable Pages on the `main` branch.
- **Hostinger / cPanel**: upload the contents of `iwi/` to `public_html/`.

## Notes
- Placeholder photography is pulled from Unsplash by URL — swap any `<img src="...">` for your own photos in `images/` when ready.
- Partner logos on the homepage are text placeholders — replace with real partner logos.
- Forms (contact, newsletter, donate) are front-end only right now — they show a success message but don't send data anywhere. Connect them to a form service (Formspree, Netlify Forms) or your own backend endpoint to go live.
- Colors, fonts and spacing are all controlled by CSS variables at the top of `css/style.css`.
