# EAB Hypnosis — Website

**Elizabeth Brager, AEMT, C.HT**  
Elevating Awareness & Balance

A 4-page static website for EAB Hypnosis, built with plain HTML, CSS, and JavaScript — no build step required.

---

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `meet-elizabeth.html` | Meet Elizabeth |
| `services.html` | Services |
| `free-downloads.html` | Free Downloads |

---

## Running Locally

Just open `index.html` in any browser — no server needed for basic viewing.

For proper local development with asset loading and navigation:

```bash
npx serve .
```

Then open `http://localhost:3000` in your browser.

---

## Deploying to Railway

1. Push this folder to a GitHub repository
2. Go to [railway.app](https://railway.app) and create a new project
3. Select **Deploy from GitHub repo** and connect your repo
4. In Railway settings, set the **Start Command** to:
   ```
   npx serve . -p $PORT
   ```
5. Railway will assign a public URL automatically

---

## Placeholder Content to Update

Search for these comments in the HTML files and replace with live values:

| Comment | What to add |
|---|---|
| `<!-- CLIENT: Insert your email address here -->` | Elizabeth's real email address |
| `<!-- CLIENT: Insert your phone number here -->` | Elizabeth's real phone number |
| `<!-- CLIENT: Replace with your booking link -->` | Link to booking system (e.g. Calendly, Jane App) |
| `<!-- CLIENT: Insert YouTube video URL here -->` | `https://www.youtube.com/embed/VIDEO_ID` |
| `<!-- CLIENT: Insert your YouTube channel link here -->` | Full YouTube channel URL |
| `<!-- CLIENT: Replace placeholder bio text with your full biography -->` | Elizabeth's full written biography |
| `<!-- CLIENT: Upload your actual MP3 file and update the download href -->` | Path to the MP3 file, e.g. `assets/quieting-the-inner-critic.mp3` |
| `<!-- CLIENT: Update Patreon link here -->` | Full Patreon profile URL |
| `<!-- CLIENT: Update this link when the white paper is available online -->` | Link to white paper download or info page |

---

## Assets

All images live in the `assets/` folder:

| File | Used on |
|---|---|
| `logo.jpg` | Header and footer on all pages |
| `logo-adjusted.jpg` | Alternate logo (fallback) |
| `elizabeth-aemt.png` | Home page about section, Meet Elizabeth page |
| `white-paper.png` | Meet Elizabeth — co-authored research card |
| `free-download-1.png` | Home page download banner, Free Downloads card |
| `free-download-2.png` | Available for a second download card |

To add the MP3 for download, place it in `assets/` and update the `href` on the Download button in `free-downloads.html`.

---

## Design System

- **Colors:** Navy `#1a2540` · Gold `#b8943c` · Cream `#f7f1e8`
- **Fonts:** Cormorant Garamond (display) + Lato (body) — loaded from Google Fonts
- **Breakpoints:** Mobile `< 768px` · Tablet `768–1024px` · Desktop `> 1024px`
