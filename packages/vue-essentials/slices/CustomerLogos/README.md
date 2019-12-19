# Call to action Section

This component allows you to easily create a beautifully styled responsive call to action section. Install it in your project, add the model in your custom type and fill in the content in the document and your are ready to go. You can also create variations of the component using slots.

### Slots

You have 2 slots available to configure and restructure the content within the template section of the component.

Header:
With the header slot you have access to the non-repeatable data from the slice. You can see these fields in the Properties table below.

Call To Action:
With the callToAction slot you also have access to all the non-repeatable data from the slice.

```

## Properties

| Property    | Type                 | Description                            | Required | Default          |
| ----------- | -------------------- | -------------------------------------- | -------- | ---------------- |
| icon_image  | Image    \|\| URL    | An Icon image for the feature          | true     | --               |
| title       | RichText \|\| String | A short title                          | true     | --               |
| paragraph   | RichText \|\| String | A short paragraph                      | true     | --               |
| button_label| Key Text \|\| String | A label for the button input           | true     | --               |
| button_link | String   \|\| URL    | Url that will be used to redirect user | false    | https://test.com |
