# NISIMIN brand identity

The website uses the logo selected by the user from `NISIMIN Brand Identity Presentation.png`. The supplied artwork replaces the earlier provisional pathway concept. No registration symbols are included; trademark status has not been verified.

## Selected mark

The blue, yellow, green, and red folded surfaces connect around an open center. The presentation associates blue with people, yellow with learning, green with growth, and red with action. The site’s hero now features this same mark rather than the previous pathway illustration.

The presentation is the source of the artwork, not a replacement website specification. Product statuses, the website’s structure, and the existing company content remain unchanged.

## Assets

- `public/brand/nisimin-symbol.png`: the exact colored mark extracted from the supplied presentation.
- `public/brand/nisimin-wordmark.png`: the exact NISIMIN lettering, excluding the registration symbol and tagline.
- `public/brand/nisimin-symbol.svg`: a self-contained SVG container embedding the supplied raster mark.
- `public/brand/nisimin-logo.svg`: horizontal symbol and wordmark lockup using the supplied artwork.
- `public/brand/nisimin-logo-dark.svg`: a dark-surface lockup with white wordmark treatment.
- `public/brand/nisimin-symbol-mono.svg`: the monochrome reference extracted from the supplied presentation.
- `public/icon.svg`: the supplied dark app icon in a self-contained SVG container.
- `public/apple-touch-icon.png`: 180px app icon export.
- `public/brand/social.png` and `social.svg`: sharing artwork featuring the selected logo.

The SVG containers embed raster artwork; they are not original vector paths. The presentation provides a 232 × 239px primary symbol and a 459 × 88px wordmark. These are suitable for the current small website lockup. A future original SVG or vector source can replace them for larger, sharper usage without a redesign. The source artwork’s background is preserved, with a multiply blend on light website surfaces. Do not use the light-surface PNGs directly on dark backgrounds.

`node scripts/prepare-brand.mjs '/absolute/path/to/NISIMIN Brand Identity Presentation.png'` reproduces the packaged assets. The script expects the supplied 1672 × 941px presentation layout. The original Downloads file is not required to build or deploy the website; all active assets are committed project files.

Earlier, unselected logo directions are retained only in `docs/archive/provisional-explorations.svg` for historical reference.

## Website foundations

The reusable design tokens remain in `app/globals.css`. Navy and warm white anchor the site, with four brand accents. Interface typography remains self-hosted Manrope; the logo wordmark uses the actual supplied lettering.

PlayTown and EduNisi retain their established website presentations. No new product capabilities or registration claims have been inferred from the presentation. Product pages continue to state their development status and “A product by NISIMIN.”

Motion remains limited to section reveals and hover transitions, with reduced-motion support. Content stays available in the initial HTML.
