# Images

Drop your automotive photography here and reference it from `index.html`.

## Recommended hero image
The hero currently uses a lightweight inline SVG illustration so the site works
out of the box with zero external assets. For a premium look, replace it with a
real photo of a mechanic performing a mobile oil change:

1. Add an optimized image here, e.g. `images/hero-mechanic.jpg`
   (recommended: ~1600px wide, compressed, WebP or JPG).
2. In `index.html`, find the `.hero__image` block and replace the inline
   `<svg>` with:

   ```html
   <img
     src="images/hero-mechanic.jpg"
     alt="Mechanic performing a mobile oil change in a driveway"
     width="480" height="360"
     loading="eager" fetchpriority="high" />
   ```

## Tips for a Lighthouse score above 95
- Compress images (TinyPNG, Squoosh) and prefer modern formats (WebP/AVIF).
- Always include `width` and `height` attributes to avoid layout shift.
- Use `loading="lazy"` for below-the-fold images.
- Keep the hero image reasonably sized (< 250 KB if possible).
