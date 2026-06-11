# Khyathi Kiran Pediredla — Portfolio

A personal portfolio website built for the **Finlatics ANDP — Project 1 (Personal Portfolio)**.

🔗 **Live site:** https://portfolio-five-lake-24.vercel.app
💻 **Repo:** https://github.com/khyathikiran-p/portfolio

---

## About

I'm an Electrical Engineering undergraduate at **IIT (BHU) Varanasi** (2024–2028) who
builds AI-powered web applications. This single-page portfolio showcases who I am,
my skills, and a selection of projects.

## Sections

- **Hero** — intro + call-to-action
- **About** — background and focus
- **Skills** — languages, frameworks, and tools
- **Projects** — fusfit, LexNyaya, LostHour, and the IIT (BHU) Sustainability & Innovation Club platform
- **Contact** — form (opens your mail client) + direct links

## Tech Stack

- **HTML5** — semantic structure
- **Tailwind CSS** (via CDN) — utility-first styling
- **Custom CSS** (`styles.css`) — gradients, animations, scroll-reveal
- **Vanilla JavaScript** (`script.js`) — mobile nav, scroll-spy, reveal-on-scroll, form handling
- **Vercel** — deployment

No build step required — it's a static site.

## Run locally

```bash
# Option 1: any static server
npm install
npm start          # runs: npx serve .

# Option 2: just open index.html in your browser
```

Then visit the URL printed in the terminal (usually http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub (already done).
2. Go to [vercel.com](https://vercel.com) → **Add New… → Project** → import `khyathikiran-p/portfolio`.
3. Framework preset: **Other** · Build command: _none_ · Output directory: _root_.
4. Click **Deploy** and copy the live URL.

## Project structure

```
portfolio/
├── index.html        # main page (all sections)
├── styles.css        # custom styles & animations
├── script.js         # interactivity
├── package.json      # static-server script
├── vercel.json       # Vercel config
├── assets/
│   ├── avatar.svg     # KP monogram avatar
│   └── favicon.svg    # site icon
└── README.md
```

## Customisation notes

- **Use a real photo instead of the monogram:** drop your image into `assets/`
  (e.g. `assets/profile.jpg`) and change the avatar `src` in `index.html` to
  `assets/profile.jpg`.
- Update text, skills, and project cards directly in `index.html`.

---

© Khyathi Kiran Pediredla · MIT License
