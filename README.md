# Marella Almazar: UGC Scrapbook

A React, Vite, and TypeScript portfolio using Marella's supplied portrait, videos, brand logos, analytics screenshot, and scrapbook materials.

## Run

```sh
npm install
npm run dev
npm run build
npm run lint
npm test
```

In Windows PowerShell, use `npm.cmd` when script execution is restricted. Browser tests use installed Microsoft Edge through Playwright.

## Netlify

`netlify.toml` configures Node 24, `npm run build`, and the `dist` publish directory. The production build includes the SPA fallback in `_redirects`. Use the prepared `marella-netlify.zip` for a manual upload, or connect a Git repository. See [NETLIFY.md](NETLIFY.md) for both paths.

## Current experience

- A cocoa-and-pink hero with layered Marella/Almazar lettering, real portrait, botanical cutouts, citrus, and fabric star.
- Fourteen videos grouped by their six original folders, shown as alternating descriptions and portrait preview strips.
- Trusted by retains its approved size, six transparent logos, portrait at the floral ribbon's tip, and more creative-approach copy around the artwork.
- About Me sits left of the featured video and Instagram screenshot on desktop. Phones stack the text and media.
- The combined section echoes the hero's background, oversized pink type, paper textures, blue lace, and side decorations.
- The original screenshot keeps its @bymarella caption. The separate metric list and source note are removed.
- The About portrait/caption, signature, five-year callout, accordion notes, and collaboration link are removed.
- Collected Moments and Dear Marella are removed. Navigation and hero links point to the remaining sections.
- User-started video playback, native controls, one active player, offscreen pausing, retry, and original-file download remain functional.
- Keyboard navigation, mobile-menu Escape/focus restoration, reduced motion, and image recovery remain available.

## Source layout

`src/Portfolio.tsx` composes CreatorHero, VideoStories, TrustedBy, and CreatorStory. CreatorStory groups About and Results inside one decorated section. Hooks own hero motion and ribbon text exclusions. VideoPlayer and SmartImage provide media behavior. Local data files contain confirmed identity and video metadata.

Dedicated CSS files keep the hero, collections, Trusted by, and combined story layout scoped. Source for removed sections remains in the checkout but is not rendered.

## Assets and content

Selected files from `C:/Users/aaron/OneDrive/Pictures/scrapbook` are retained under `public/images/ugc`, `public/images/about`, and `public/images/scrapbook`. They are reused without bitmap changes. Blue lace is rotated in CSS to form the top border.

The six transparent logos and exact Plum Floral Serpentine Ribbon are under `public/images/brands`. CSS trims transparent logo edges; Spinnakers is monochrome for legibility. A read-only alpha analysis calculates native text exclusions and preserves a normal-flow image-failure fallback.

The fourteen collection videos preserve their original folder hierarchy under `public/videos`: lifestyle (3), skincare (2), Travel (2), unboxing (4), shopping (1), and product reviews (2). Originals were verified against source SHA256 hashes. The featured 30.3-second Armybomb clip and Insights JPEG come from the supplied analytics folder. Posters are frames extracted from actual footage. Videos total approximately 107 MB and use `preload="none"`.

The biography is user-confirmed: five years running a business, research/marketing/analysis/content experience, full-time UGC work in Canada, and first-time motherhood. Sales language describes her creative aim. The analytics screenshot is supplied evidence without an added date range; its account figures are not presented as results of the featured clip.

## Validation

Build, lint, browser playback/layout/navigation checks, automated WCAG A/AA checks, and desktop/phone visual review are recorded in `anti-slop/DELIVERY-GATE.md`. Trusted by's desktop height is unchanged at the checked widths. Updated browser tests cover remaining navigation and the requested removals; obsolete collection/brief/accordion scenarios were removed with those UI sections.

The installed antislop core, UI, mobile-layout, and code-comment skills were applied in the session's DURING mode. The absent copywriting and human extensions were not claimed as loaded. Design direction and visual purposes are in `DESIGN.md`.

Separate video caption tracks were not supplied; full spoken-audio coverage is not audited. Automated checks do not establish complete media accessibility. No contact form or outbound message action is rendered.
