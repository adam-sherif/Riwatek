# Media assets needed here

This folder is referenced by the components but is intentionally empty —
drop in real photography and the site will pick it up automatically.

## Required files

| Path | Used by | Suggested content |
|---|---|---|
| `hero-irrigation.jpg` | `Hero.jsx` (MaskedHeading `src`) | A wide, high-contrast photo/still of an irrigation sprinkler in action — water spray reads clearly through the Arabic wordmark letterforms. Landscape, at least 1600×1000. |
| `categories/controllers.jpg` | `Categories.jsx` | Rain Bird-style irrigation controller / timer unit. |
| `categories/sprinklers.jpg` | `Categories.jsx` | Pop-up sprinkler or rotor head. |
| `categories/valves.jpg` | `Categories.jsx` | Valve or valve box, installed or product shot. |
| `categories/pipes.jpg` | `Categories.jsx` | PE/PVC pipe and fittings. |
| `categories/accessories.jpg` | `Categories.jsx` | Fittings, connectors, or small irrigation accessories. |

The Rain Bird scraper (`../scrape-rain-bird.js`, project root) can supply real
product photography once it's run — its `image_url` fields point to
`cdn.salla.sa` product images that can replace these placeholders directly.
