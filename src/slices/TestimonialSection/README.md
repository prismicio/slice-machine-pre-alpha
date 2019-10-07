# Testimonials Section

This component allows you to easily create a beautifully styled responsive testimonial section. Install it in your project, add the model in your custom type and fill in the content in the document and your are ready to go. You can also create variations of the component using slots.

### Slots

You have 2 slots available to configure and restructure the content within the template section of the component.

Title:
With the header slot you have access to the rich text field data from the slice.

Item:
With the item slot you have access to all the repeatable data from the slice.

```

## Properties

| Property    | Type                 | Description                            | Required | Default          |
| ----------- | -------------------- | -------------------------------------- | -------- | ---------------- |
| title       | RichText \|\| String | A short title                          | true     | --               |
| paragraph   | RichText \|\| String | A short paragraph                      | true     | --               |
| logo_image  | Image    \|\| URL    | An image for the logo                  | true     | --               |
