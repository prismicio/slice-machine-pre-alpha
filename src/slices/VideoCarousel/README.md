# Video Section

This component allows you to easily create a beautifully styled responsive Video section. Install it in your project, add the model in your custom type and fill in the content in the document and your are ready to go. You can also create variations of the component using slots.

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
| video       | Video    \|\| URL    | A video url coming from Prismic        | true     | --               |
