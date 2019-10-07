# Graphic Section

This component allows you to easily create a beautifully styled responsive image and text section. Install it in your project, add the model in your custom type and fill in the content in the document and your are ready to go. You can also create variations of the component using slots.

### Slots

You have 2 slots available to configure and restructure the content within the template section of the component.

Info:
With the info slot you have access to the non-repeatable data from the slice. You can see these fields in the Properties table below.

Graphic:
With the graphic slot you also have access to all the non-repeatable data from the slice.

```

## Properties

| Property     | Type                 | Description                            | Required | Default          |
| ------------ | -------------------- | -------------------------------------- | -------- | ---------------- |
| title        | RichText \|\| String | A short title                          | true     | --               |
| paragraph    | RichText \|\| String | A short paragraph                      | true     | --               |
| cta_label    | Key Text \|\| String | A label for the button input           | true     | --               |
| cta_link     | String   \|\| URL    | Url that will be used to redirect user | false    | https://test.com |
| graphic_image| Image    \|\| URL    | An Graphic image for the feature       | true     | --               |
