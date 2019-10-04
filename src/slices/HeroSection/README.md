# Hero Section

This component allows you to easily create a beautifully styled responsive hero section to greet your website users with. Install it in your project, add the model in your custom type and fill in the content in the document and your are ready to go. You can also create variations of the component using slots.

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
| title       | RichText \|\| String | A short title                          | true     | --               |
| paragraph   | RichText \|\| String | A short paragraph                      | true     | --               |
| placeholder | Key Text \|\| String | Placeholder text for the text input    | true     | --               |
| button_label| Key Text \|\| String | A label for the button input           | true     | --               |
| button_link | String               | Url that will be used to redirect user | false    | https://test.com |
