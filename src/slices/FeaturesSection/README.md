# Features Section

This component allows you to easily create a beautifully styled responsive section for features, skills or products etc. Install it in your project, add the model in your custom type and fill in the content in the document and your are ready to go. You can also create variations of the component using slots.

### Slots

You have 2 slots available to configure and restructure the content within the template section of the component.

Header:
With the header slot you have access to the non-repeatable data from the slice, these are the title and paragraph fields.

Item:
With the item slot you have access to the repeatable data from the slice, these are the icon_image, head and desc fields.

```

## Properties

| Property   | Type                 | Description                            | Required | Default          |
| ---------- | -------------------- | -------------------------------------- | -------- | ---------------- |
| title      | RichText \|\| String | A short title                          | true     | --               |
| paragraph  | RichText \|\| String | A short paragraph                      | true     | --               |
| icon_image | Image    \|\| URL    | An Icon image for the feature          | true     | --               |
| head       | RichText \|\| String | A short item title                     | true     | --               |
| desc       | RichText \|\| String | A short item descrition                | true     | --               |
