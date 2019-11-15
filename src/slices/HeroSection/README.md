# Hero Section

This component allows you to greet your website users with a cool catchphrase and some additional content.

![Example of Hero section in use](https://ibin.co/w800/4zWqvrOIhiKx.png)

# Fields

After you added the slice definition to your custom type, simply add an instance of Hero Section to your slice zone.

| Fields    | Required | Use case                                                          |
| --------- | -------- | ----------------------------------------------------------------- |
| title     | true     | A catchy 1 liner                                                  |
| paragraph | true     | 1 to 2 sentences to compliment your title                         |
| items     | true     | An array of 1 or 2 link buttons, that line up next to each other. |

# Slots

Additionally, You have 3 slots available to configure and restructure the content within the template section of the component.

#### 1. header

Header slot gives you access to `primary`, the non-repeatable data from the slice. Use it to eg. reorder your title and paragraph, or to add any other element.

Example use👇

```html
<template>
  <hero-section :slice="document.data.body">
    <template v-slot:header="primary">
      <h1>A custom header here</h1>
      <p>And some useful JSON to go with it:</p>
      <p>{{ primary }}</p>
    </template>
  </hero-section>
</template>
```

#### 2. cta

CallToAction slot gives you access to `items`, the repeatable part of the slice. Use it to customize buttons even more, to add any other relevant data or to replace the links in 1 of your headers.

Example use👇

```html
<template>
  <hero-section :slice="document.data.body">
    <template v-slot:cta>
      <p>I'm too shy to show you my links</p>
    </template>
  </hero-section>
</template>
```

#### 3. top-content

Top Content is an empty slot, which means that using it will not _replace_ existing markup but add more to it. As it stands, `top-content` will add content before your title and paragraph.

Example use👇

```html
<template>
  <hero-section :slice="document.data.body">
    <template v-slot:top-content>
      <img src="https://picsum.photos/200/100" style="max-width: 640px" />
    </template>
  </hero-section>
</template>
```

# SASS Variables

- `$color-primary`: used for color of primary button
- `$font-size-button`: used for font size of buttons
- `$text-primary`: used for text primary color
- `$screen-lg-min`: used for max-width of the container

Modify them in `slices.scss`, available at the root of your project!
