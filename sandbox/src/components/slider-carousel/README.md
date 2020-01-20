# Notes:

- The carousel is progressively enhanced, with a simple scrollable container for no-js conditions.
- The arrows are thus hidden by default using the `hidden` attribute, and only shown in the JS when the JS runs.
- make sure all data-* attributes are set.
- class names are required for the styles

- an out-of-view card needs to be inaccessible by SR and keyboard users. You could use `visibility: hidden`, but I didn't like the effect it had on the overall animations, so you can kept it visible and, in the JS:
  - use `aria-hidden = "true"` to hide it from SRs
  - use `inert` attribute (with polyfill) to make it keyboard-inaccessible

- I made it so that the carousel resets to card #1 on screen resize, instead of trying to guess or randomly showing other cards as the number of cars decreases or increases.


