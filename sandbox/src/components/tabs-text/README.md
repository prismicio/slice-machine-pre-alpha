## Notes:

- The accordion uses progressive enhancement as an approach to build the interactivity of the component.
- This means that the accordion starts out as a non-interactive component, and then interactivity and appropriate styles are added to it when the JavaScript runs.
- By default, an accordion is a series of sections, each with a title and some content after it.
- The heading level I used is H3, assuming the heading level of the slice is H2. Both these heading levels need to be adjusted in the `aria-level` attribute if needed (for example, if the slice is part of a page where the title of the slice is an H3, not an H2. In that case the accordion headings should go down one level as well.)
- When the JavaScript runs:
    - Each heading becomes interactive.
    - Clicking on a heading opens the panel that contains the content corresponding to that heading.
    - The interactivity of the heading comes from the fact that the heading becomes a button.
    - Or more precisely: the JS creates a button and uses the heading's content as content for that button, and then appends that button to the heading itself.
    - An accordion is a set of disclosure widgets: a series of buttons that open and close a series of corresponding panels.
    - Each panel is hidden by default, both from view and from screen readers.
    - When a button is clicked, the corresponding panel is shown.
    - The ARIA attributes on the buttons and their panels tell the screen reader user what the current state is.
    - Each button gets an `aria-expanded` attribute. This attribute tells the SR that the panel controlled by this button, and which *must* come after the button in the DOM, is either expanded or collapsed.
    - When a button is clicked/pressed and its panel is open, `aria-expanded` is set to `true`. It is set to `false` when the panel is collapsed.
    - Each panel has `aria-hidden` set to either `true` (when the panel is collapsed) or `false` (when the panel is open).
    - This is mainly enough for the a11y of the accordion.
    - Additionally, each button also has an ID and an `aria-controls` attribute telling the SR what panel it controls. And each panel has an ID referenced in its button's `aria-controls`, and an `aria-labelledby` attribute referencing the ID of the button, allowing the SR to know that this panel is labelled by the content of that button.
    - Note that `aria-controls` does not really have any browser support and can therefore be omitted altogether. I just have it included in the script anyway.

## Requirements:

- In order for the script to enhance the series of sections to an accordion, the sections need to be wrapped in a container with a `data-accordion` attribute set on it.
- The each heading in each section has `data-accordion-heading`,
- and each "panel" is a container that wraps the section's content and has a `data-accordion-panel` attribute.
- The script comes with a few customization options:
    - You can have all panels be open or collapsed by default. Specify that in the `allCollapsed` property (`true` or `false`);
    - You can allow more than one panel to be open at a time. Specify that in the `showOneAnswerAtATime` attribute (`true` or `false`);
    - You can allow the script to add "controls" to the accordion, which are basically two buttons: "Collapse All" and "Expand All", which do as their names suggest. The `withControls` property is used to enable or disable that (`true` or `false`). 
    - Note that since the design does not have the controls as a possible option, the buttons will be added without any styles.
