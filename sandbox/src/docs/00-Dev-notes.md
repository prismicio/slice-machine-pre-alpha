---
title: Dev Notes
status: draft
---

## Ensuring proper heading hierarchy in the slices using Vue/React

Page heading hierarchy is of utmost importance for screen reader users because it makes navigating a page more efficient for them, and gives them a proper skeleton of the page similar to what sighted users get. This is why it is important to make sure that heading levels are created in proper order on the page.

In order to ensure full accessibility of the slices _once they have been included in a page_, we need to make sure that the heading levels in each slice create a proper hierarchy on the page.

This article includes everything you need to know: https://medium.com/@Heydon/managing-heading-levels-in-design-systems-18be9a746fa3

The author of the article uses React, but I suspect the Vue components would have something similar.

For each slice, I used a heading `h2` and then `h3`s and `h4`s for subsequent headings. You can either change that, or fill in the `aria-level` attribute, which will override that heading level for screen readers. So for example:

```
<h2 aria-level="3"></h2>
```

will be announced as a level 3 heading, not a level 2 heading. Whatever you choose to use (replace the heading tag or use the ARIA attribute), we need to make sure that we have proper heading hierarchy on the page. We can do this ourselves if possible, or leave it to the (hopefully responsible) developer developer/user of the slices to do.