const vElse = `\n\t\t<template v-else-if="process.env.NODE_ENV !== 'production'">
      <h1>
        Slice of type {{ slice.slice_type }} has no corresponding component!
      </h1>
      <p>
        Make sure you created a component with a kebab-cased tag that matches
        the slice type
      </p>
      <p>
        More info in the documentation:
        <a target="_blank" href="https://google.com">a link</a>
      </p>
    </template>`

const spreadSliceZone = slices => {
  let txt = ''
  Object.entries(slices).map(([, value], index) => {
    const tagName = value.displayName
    const snakeCased = tagName.replace(/-/g, '_')
    txt += `\n\t\t<${tagName} v-${
      index ? 'else-' : ''
    }if="slice.slice_type === '${snakeCased}'" v-bind="slice" />`
  })
  return txt
}

const createSliceZone = slices => {
  const template = `<template>
  <main>${spreadSliceZone(slices)}${vElse}
  </main>
</template>
  `

  const script = `<script>
import * as Slices from "./slices";

export default {
  components: { ...Slices },
  name: "slice-zone",
  props: {
    slice: Object
  }
};
</script>
`

  return `${template}\n${script}`
}

module.exports = createSliceZone
