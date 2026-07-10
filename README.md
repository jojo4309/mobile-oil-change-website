# Mobile Oil Change — Website

A modern, fast, fully responsive marketing website for a **mobile oil change
service**. Built with plain **HTML5, CSS3, and vanilla JavaScript** — no
frameworks, no build step — so it can be hosted for free on **GitHub Pages**.

![Starting at $55](assets/og-image.svg)

## ✨ Features

- **Sticky navigation** with animated mobile hamburger menu and active-section highlighting
- **Hero** with headline, dual CTAs, feature cards, and a floating price badge
- **Prominent pricing** section ($55 + oil & filter)
- **Services**, **Why Choose Us**, and **How It Works** sections with hover animations
- **Booking form** with client-side validation, ready to connect to a form service
- **Contact** section with call/email/schedule buttons
- **FAQ accordion** with smooth expand/collapse
- **Blue CTA banner** + full footer with social links
- **Scroll-to-top** button, **page loader**, and **fade-in scroll animations**
- **SEO-ready**: semantic HTML, Open Graph tags, Twitter cards, and Schema.org LocalBusiness markup
- **Accessible**: skip link, focus styles, ARIA attributes, reduced-motion support
- **Fast**: single CSS + JS file, inline SVG graphics, deferred JS — built to score 95+ on Lighthouse

## 📁 Project structure

```
/
├── index.html          # All page markup
├── css/
│   └── style.css       # All styles (CSS variables at the top for theming)
├── js/
│   └── script.js       # All interactivity (vanilla JS)
├── images/             # Add your automotive photography here
├── assets/
│   ├── favicon.svg     # Browser tab icon
│   └── og-image.svg    # Social sharing preview image
├── .nojekyll           # Tells GitHub Pages to serve files as-is
└── README.md
```

## 🚀 Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Select your branch (e.g. `main`) and the `/ (root)` folder, then **Save**.
5. Your site will be live at `https://<username>.github.io/<repo>/` within a minute or two.

> A `.nojekyll` file is included so GitHub Pages serves the folder structure as-is.

## 🎨 Customization

Almost everything is designed to be easy to change:

| What to change | Where |
| --- | --- |
| **Brand colors, radius, shadows, fonts** | CSS variables at the top of `css/style.css` (`:root { … }`) |
| **Phone, email, hours, address** | Search `index.html` for `(555) 123-4567`, `hello@mobileoilchange.com`, etc. |
| **Business name / SEO / Schema.org** | `<head>` of `index.html` |
| **Hero photo** | See `images/README.md` |
| **Social links** | Footer `.footer__social` links in `index.html` |

## 📨 Connecting the booking form

GitHub Pages can't process forms server-side, so the form is structured to plug
into a form service. See the detailed comments in **`index.html`** (the
`#booking-form` block) and **`js/script.js`** (the `setupBookingForm` function).
Supported out of the box with minimal edits:

- **Formspree** — set `action="https://formspree.io/f/YOUR_ID"` and `method="POST"`
- **Netlify Forms** — add `data-netlify="true"` and a hidden `form-name` input
- **Basin** — set `action="https://usebasin.com/f/YOUR_ID"`
- **Google Forms** — point `action` to your form's `formResponse` URL
- **EmailJS** — enable the commented example in `js/script.js`

Until a service is connected, the form validates input and shows a friendly
confirmation message (no data leaves the browser).

## 🧰 Tech

- HTML5 · CSS3 (custom properties, grid, flexbox) · Vanilla JavaScript (ES5-friendly)
- No Bootstrap, jQuery, React, Vue, or Angular
- Google Fonts: **Poppins** (headings) + **Inter** (body)

## 📄 License

Free to use and customize for your business.
