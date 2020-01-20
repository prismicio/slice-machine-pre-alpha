# Notes:

- The slider is progressively enhanced, with a basic scrollable div of items for no-js conditions.
- Since it is enhanced, the dot nav is only needed when the JS runs. 
- The dot nav is thus generated in the JS based on the number of items in the slider.
- It is **very important** to provide a meaningful short title/label for each slide in the `data-slide-label` attribute. This label will be used as a tab title for the dot navigation and will be shown on hover.
- The title of each dot is shown on hover and focus to make it possible for users of voice dictation to select and interact with the dot.
- Labels should be short and succinct. They're not meant to be long decsriptions like the image description, for example.
- The slider requires a name to be announced to screen readers. The ARIA attributes are all already set. You only need to provide a short name in the `data-aria-label` attribute. Note that this name does not need the word "slider" in it because "slider" will be announced in the `aria-roledescription` attribute added in the JS.
- The ARIA attributes are added in the JS not in the markup because, should the JS fail, the user will hear "slider" but won't be able to interact with it as one. Only add the ARIA attributes to the interactive component when the component becomes interactive.

- The paddle navigation (left/right arrow keys) are kept in the markup and hidden with the `hidden` attribute by default, and only shown the JS runs.
- Use the arrow icons you want. Make sure you add the SVG inline. Inline SVGs are the most accessible in environments such as Windows High Contrast Mode.

- Try to abide to the markup in the HTML and use the data attributes as required in the HTML. If you change anything, make sure to adapt the CSS and JS to match your markup.