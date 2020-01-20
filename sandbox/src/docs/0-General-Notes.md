---
title: 📝 About the Components in this Library
status: ready
---

## Progressive Enhancement

All interactive components are progressively enhanced. This means that the components are built so that a basic non-interactive (no-JS) experience is provided and then enhanced into a full-featured interactive one when the JS runs.

- When the JS runs, each component gets a corresponding `js-*` class which is used in the style sheet to style the component in a manner suitable for its interactivity. For example, image carousels and sliders start out as a basic scrolling container with a list of items inside of it, and are enhanced into a component using Flexbox with items hidden and shown when the arrows are used to "scroll". Said arrows are also hidden by default and only shown after the JS runs. Dot navigation is generated in the JavaScript for most components.

- Styles are also applied in a PE manner. CSS Grid and Flexbox are used for layout in supporting browsers by means of CSS feature queries (e.g. `@supports (display: grid)`). Non-supporting browsers get a basic layout which is just enough.

- `data-*` attributes are used as JavaScript hooks to avoid polluting the class list of a component with JS-related behavior. This is a nice way to separate style and behavior within the markup and is mainly a developer preference.

## Mobile-First

Mobile-first goes hand-in-hand with progressive enhancement. The layouts start as a one-column layout ensuring proper document and content hierarchy. Then CSS Grid and Flexbox are used to optimize the components for larger viewport sizes. 

Mobile-first helps you write less CSS because it means you'll have less styles to override. Instead, you add styles as the viewport size increases and only as and when needed.

## Accessible by Default

All components in this library are accessible. ARIA attributes are used when and where needed — mostly in the interactive components.

