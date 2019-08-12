const isJsProp = prop => {
  if (typeof prop !== 'string') {
    return true
  }
  return false
}

const spreadExamples = (slices, mode) => {
  const createValue = (key, value) => {
    if (mode === 'withPrismic') {
      return `slice.${key}`
    }
    return value
  }
  let txt = ''
  const entries = Object.entries(slices)
  entries.map(([, value], index) => {
    const tagName = value.displayName
    txt += `\t\t<${tagName}`
    const { mockData } = value
    Object.entries(mockData).map(([key, value]) => {
      txt += ` ${isJsProp(value) ? ':' : ''}${key}="${createValue(key, value)}"`
    })
    txt += ` />${index < entries.length - 1 ? '\n' : ''}`
  })
  return txt
}

const createExampleFile = (slices, mode = 'withoutPrismic') => {
  const template = `/* Paste this file in \`pages\` folder and go to /example */
<template>
  <main>
${spreadExamples(slices, mode)}
  </main>
</template>
`

  const script = `<script>
import Slices from "../vueSlices";

export default {
  components: { ...Slices },
  name: "slicezone-example"
};
</script>
`

  return `${template}\n${script}`
}

module.exports = createExampleFile
