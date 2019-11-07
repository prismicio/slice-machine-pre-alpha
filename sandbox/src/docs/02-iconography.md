---
title: Iconography
---

Some things to know about creating and using icons:

- use SVG whenever you can. Icon fonts are an old and bad practice. Icon fonts are not supported in Opera Mini and can fail to load if the user's connection is slow or if they have chosen to disable custom fonts in their preferences. This is bad especially for critical icons (.e.g icons in icon-only buttons)
- If the SVG is monochrome, use `fill: currentColor`
- If the SVG is just decoration, hide it from SRs
  - else, make sure it has an accessible label
