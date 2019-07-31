# Slice name

-- Insert images, videos, GIFs and CodeSandbox links here --

Hey, this is a short description on my Vue component!
You should now be able to understand what it's used for (~ how it looks).

### Without Prismic

To use this component without Prismic, copy-paste this file into your Slices folder and import it.

Code example:

```javascript
import MyComponent from "./Slices";

return <MyComponent property1 property2="string" />;
```

### With Prismic

To use this component with Prismic, copy-paste its `model.json` and paste it inside your Prismic repository folder:

[IMAGE]

Inside your `SliceZone.js` file, add this:

```javascript
import MyComponent from './Slices/MyComponent'

if etc
```

## Properties

| Property  | Type                 | Description                            | Required | Default          |
| --------- | -------------------- | -------------------------------------- | -------- | ---------------- |
| paragraph | RichText \|\| String | A short paragraph                      | true     | --               |
| title     | RichText \|\| String | A short title                          | true     | --               |
| url       | String               | Url that will be used to redirect user | false    | https://test.com |

