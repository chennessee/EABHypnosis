# EAB Hypnosis — Claude Code Build Prompt
**Client:** Elizabeth Brager, AEMT, C.HT  
**Brand:** EAB Hypnosis — Elevating Awareness & Balance  
**Deployment:** Railway (push via Git repo)

---

## PROJECT OVERVIEW

Build a multi-page static website for Elizabeth Brager, a Clinical Hypnotherapist and Advanced EMT who specializes in serving women who have experienced trauma. The site must feel **warm, approachable, and personal** — like meeting Elizabeth herself. It should communicate professional credibility without feeling clinical or cold.

---

## TECH STACK

- **Framework:** Plain HTML/CSS/JS (no build step required) OR a simple Vite + Vanilla JS setup for easier asset management
- **Deployment:** Railway via Git repo — keep the project structure clean and Railway-ready
- **Fonts:** Load from Google Fonts (see Design System below)
- **No frameworks required** unless it simplifies things — keep it lightweight

---

## SITE STRUCTURE — 4 PAGES

```
/index.html          → Home
/meet-elizabeth.html → Meet Elizabeth
/services.html       → Services
/free-downloads.html → Free Downloads
```

---

## DESIGN SYSTEM

### Color Palette (from existing brand materials)
```css
--color-navy:       #1a2540;   /* Deep navy — headers, footer */
--color-gold:       #b8943c;   /* Warm gold — accents, CTA buttons */
--color-gold-light: #d4aa5a;   /* Lighter gold — hover states */
--color-cream:      #f7f1e8;   /* Warm cream — page backgrounds */
--color-warm-white: #fdf9f4;   /* Near-white sections */
--color-text:       #2e2e2e;   /* Body text */
--color-text-light: #6b6b6b;   /* Secondary text */
```

### Typography
```
Display/Hero:  'Cormorant Garamond' (Google Fonts) — elegant serif for headlines
Body:          'Lato' (Google Fonts) — clean, readable, warm
Accent/Quote:  'Cormorant Garamond' italic — for pull quotes and callouts
```

### Aesthetic Direction
- **Warm luxury meets compassionate healing** — not cold spa, not clinical therapy office
- **Organic textures**: Use a soft floral/botanical SVG or CSS pattern as a repeating background texture on section dividers (client requested "flower thing for background")
- **Rock/nature photo** for the hero banner (client requested)
- **Generous whitespace** with warm cream backgrounds
- **Gold dividers and accent lines** between sections
- **Rounded corners** on cards and image frames (approx 8–12px)
- **Subtle drop shadows** — soft, warm, not harsh

---

## ASSETS AVAILABLE IN `/assets/` FOLDER

Place the following files in an `assets/` directory:

| Filename | Description | Where Used |
|---|---|---|
| `logo.jpg` | EAB Hypnosis circular logo (black on white) | Header nav, footer |
| `logo-adjusted.jpg` | Alternate logo size variant | Optional fallback |
| `elizabeth-aemt.png` | Elizabeth's photo | Meet Elizabeth page, Home |
| `white-paper.png` | ADHD White Paper promo image | Free Downloads or Meet Elizabeth |
| `free-download-1.png` | "Quieting the Inner Critic" MP3 promo | Free Downloads page |
| `free-download-2.png` | Second free download promo variant | Free Downloads page |
| `nremt-badge.png` | Nationally Registered Advanced EMT badge | Meet Elizabeth page |

> **Note:** The logo has a white background — either use as-is on cream/white sections, or apply CSS `mix-blend-mode: multiply` to blend it seamlessly.

---

## GLOBAL HEADER (all pages)

```
[EAB Logo — left aligned, ~80px tall]   [Nav links — right]   [Email | Phone — far right]

Nav: Home  |  Meet Elizabeth  |  Services  |  Free Downloads
```

- Sticky header with subtle drop shadow on scroll
- Logo links to Home
- Mobile: hamburger menu (pure CSS or minimal JS toggle)
- On scroll: header background transitions from transparent to `--color-navy` with white text

---

## PAGE 1: HOME (`index.html`)

### Hero Section
- **Full-width banner** with a nature/rock landscape photo (placeholder or from assets)
- Overlay: semi-transparent dark navy gradient from bottom
- **Headline text over image:**
  ```
  Medical Intuitive · Clinical Hypnotherapist · ADHD Researcher
  ```
  In elegant gold Cormorant Garamond
- **Subtext:** "Specializing in supporting women who are ready to heal."
- **CTA Button:** "Book a Session" (gold, links to contact or external booking)

### About Snippet (2-column layout)
- Left: Photo of Elizabeth (elizabeth-aemt.png) in a warm-toned frame
- Right: Short intro paragraph + credentials badge (NREMT badge small)
- "Learn More About Elizabeth →" link to /meet-elizabeth.html

### Services Grid (3 columns)
Quick preview cards for the specialty areas — each card has an icon, title, and 1-line description. Link to /services.html.

Cards:
1. Childhood Trauma
2. ADHD
3. Relationships (Home & Work)
4. Anxiety & Stress
5. Self-Doubt & Negative Self-Talk
6. Negative Self-Image & Fear

### Free Download CTA Banner
- Full-width warm gold section
- Promo image (free-download-1.png or free-download-2.png) alongside:
  - "Free Guided Meditation MP3"
  - "Quieting the Inner Critic"
  - CTA: "Download Now →" (links to /free-downloads.html)

### YouTube Section
- Embed or link to Elizabeth's YouTube channel
- Section title: "Watch & Learn"
- Display 1–2 YouTube video iframes (placeholders with `src=""` and a comment: `<!-- INSERT YOUTUBE VIDEO URL HERE -->`)
- Or use a YouTube channel link button if no specific video URLs are provided yet

### Footer
- Logo, nav links, email, phone
- Disclaimer text (small, light): "Services are not a substitute for medical advice or treatment by a licensed medical professional. EAB Hypnosis does not diagnose or prescribe medications."
- © 2025 EAB Hypnosis — Elizabeth Brager, AEMT, C.HT

---

## PAGE 2: MEET ELIZABETH (`meet-elizabeth.html`)

### Hero / Header Section
- Full-width header with warm botanical/floral background pattern (CSS or SVG)
- Page title: "Meet Elizabeth" in large Cormorant Garamond

### Main Bio Section (2-column)
- **Left column:** Large photo of Elizabeth, NREMT Advanced EMT badge below it
- **Right column:** 
  - Name + credentials: **Elizabeth Brager, AEMT, C.HT**
  - Bio content (placeholder — client to provide full bio):
    > *Placeholder: Elizabeth earned a Diploma in Clinical Hypnotherapy and graduated with Honors. She has chosen her areas of specialty to serve women who have experienced trauma. As an Advanced EMT, she has witnessed trauma firsthand and brings that lived experience to her work as a Clinical Hypnotherapist and Medical Intuitive.*
  - Credentials list (styled as elegant tags or a simple list):
    - Advanced EMT (AEMT) — Nationally Registered
    - Diploma in Clinical Hypnotherapy, Honors Graduate
    - Medical Intuitive
    - ADHD Researcher
    - Co-Author: *Advanced Method of Hypnosis Techniques When Addressing ADHD*

### White Paper Section
- Feature the white paper promo image (white-paper.png) in a prominent card
- Title: "Co-Authored Research"
- Description: "Elizabeth co-authored a research-based white paper: *Advanced Method of Hypnosis Techniques When Addressing ADHD*, alongside Richard L. Senninger, CGC, C.HT."
- CTA: "Learn More / Request Copy" (placeholder link)

### YouTube Section
- Same YouTube section component as Home (reuse the pattern)
- Title: "Elizabeth's Channel"

---

## PAGE 3: SERVICES (`services.html`)

### Page Header
- Warm botanical background section header
- Title: "Hypnotherapy Services"
- Subtitle: "Elizabeth earned a Diploma in Clinical Hypnotherapy and graduated with Honors, specializing in services for women who have experienced trauma."

### Services Detail Cards
Each specialty gets a full card with an icon, heading, and description paragraph. Lay them out in a 2-column grid on desktop, single column on mobile.

```
1. Childhood Trauma
   Description: [placeholder — client to provide]

2. ADHD
   Description: [placeholder — client to provide]

3. Relationships (Home and Work)
   Description: [placeholder — client to provide]

4. Anxiety
   Description: [placeholder — client to provide]

5. Stress
   Description: [placeholder — client to provide]

6. Self-Doubt
   Description: [placeholder — client to provide]

7. Negative Self-Talk
   Description: [placeholder — client to provide]

8. Negative Self-Image
   Description: [placeholder — client to provide]

9. Fear
   Description: [placeholder — client to provide]
```

### Disclaimer Section
Styled as a soft beige/cream box with a thin gold left border:

> *These services are not to be substituted for medical advice or medical treatment by a licensed medical professional, doctor, psychologist, or psychiatrist. Elizabeth does not diagnose or prescribe medications. Services are within the scope of supportive hypnosis. An acknowledgment form provided by a physician you are currently being treated by may be required prior to hypnosis sessions.*

### CTA at Bottom
- Gold button: "Ready to Begin? Book a Session"

---

## PAGE 4: FREE DOWNLOADS (`free-downloads.html`)

### Page Header
- Title: "Free Downloads"
- Subtitle: "Gifts to support your healing journey."

### Download Cards (1–2 cards, expandable later)

**Card 1: Quieting the Inner Critic**
- Show promo image (free-download-1.png)
- Title: "Quieting the Inner Critic"
- Format badge: MP3 | Guided Meditation
- Description: "A guided meditation designed to help quiet the critical inner voice and create space for awareness, balance, and inner peace."
- CTA Button: "Download Free" (placeholder `href="#"` — client to link actual file)
- Icons: Awareness · Balance · Inner Peace

**Card 2: Placeholder for future download**
- Ghost/outline card with "Coming Soon" — easy to fill in later

### Patreon Teaser Section *(optional — client mentioned this)*
- Simple section at bottom: "Support Elizabeth's Work on Patreon"
- Brief description: "Access exclusive content, meditations, and ADHD research updates."
- CTA: "Visit Patreon" button (placeholder link — `href="#"`)

---

## RESPONSIVE DESIGN REQUIREMENTS

- **Mobile first** CSS approach
- **Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px–1024px
  - Desktop: > 1024px
- Mobile nav: hamburger toggle
- All grids collapse to single column on mobile
- Touch-friendly tap targets (min 44px)

---

## ACCESSIBILITY

- Semantic HTML (header, nav, main, section, footer)
- All images have descriptive `alt` attributes
- Color contrast ratio meets WCAG AA
- Focus states visible on all interactive elements
- Skip-to-content link

---

## PLACEHOLDER NOTES FOR CLIENT

Add HTML comments throughout for easy client edits:

```html
<!-- CLIENT: Replace with your booking link -->
<!-- CLIENT: Insert YouTube video URL here: src="https://www.youtube.com/embed/VIDEO_ID" -->
<!-- CLIENT: Insert your email address here -->
<!-- CLIENT: Insert your phone number here -->
<!-- CLIENT: Update Patreon link here -->
<!-- CLIENT: Replace placeholder bio text with your full biography -->
<!-- CLIENT: Upload your actual MP3 file and update the download href -->
```

---

## FILE STRUCTURE

```
/
├── index.html
├── meet-elizabeth.html
├── services.html
├── free-downloads.html
├── assets/
│   ├── logo.jpg
│   ├── logo-adjusted.jpg
│   ├── elizabeth-aemt.png
│   ├── white-paper.png
│   ├── free-download-1.png
│   ├── free-download-2.png
│   └── nremt-badge.png
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── README.md
```

---

## README.md — INCLUDE THIS FILE

The README should contain:
- Project description
- How to run locally (just open index.html, or `npx serve .`)
- How to deploy to Railway:
  1. Push to GitHub repo
  2. Connect repo in Railway dashboard
  3. Set start command: `npx serve . -p $PORT` or use Railway's static site template
- Where to update placeholder content (links, email, phone, YouTube, Patreon)

---

## THINGS TO EXPLICITLY AVOID

- ❌ Do NOT include the quote "I have experienced trauma" on any page (removed per client request)
- ❌ Do NOT use purple gradient aesthetics or generic wellness/spa clichés
- ❌ Do NOT use Inter, Roboto, or Arial as fonts
- ❌ Do NOT make it feel cold, clinical, or corporate
- ❌ Do NOT use Lorem Ipsum — use the placeholder language provided above

---

## TONE SUMMARY

The site should feel like: **"A warm, wise, trustworthy woman is taking your hand and saying, 'I understand, and there is a better life.'"** Elegant but not intimidating. Professional but not distant. Every design choice — typography, color, spacing — should reinforce that feeling.
