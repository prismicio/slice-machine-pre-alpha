---
title: CSS Utilities and Helpers
status: ready
---

## Visually Hidden Text

```
/* Visually hide any element (mostly text) accessibly. 
   Support includes IE9+ */

.sr-only {
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    width: 1px;
    white-space: nowrap; 
    word-wrap: normal;
}
```


This utility class is essentially shrinking an element into a 1px square, hiding any overflow, and absolutely positioning the element to remove any trace of it from the normal document flow.

## Hiding text using the `hidden` attribute

The `hidden` attribute is the HTML equivalent of CSS’s `display: none`. In order to provide support for IE, the following rule is added in the CSS:

```
[hidden] {
    display: none
}
```

The above rule selects all elements that have the `hidden` attribute on them and explicitly sets their `display` to `none`;