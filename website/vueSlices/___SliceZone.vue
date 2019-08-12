<template>
  <component :is="Slice" />
</template>

<script>
import Slices from '../vueSlices'

const camelizeRE = /-(\w)/g
const camelize = str => {
  str = str.replace(/_/g, '-').replace(camelizeRE, (_, c) => {
    return c ? c.toUpperCase() : ''
  })
  return str[0].toUpperCase() + str.slice(1)
}

export default {
  name: 'PrismicSlice',
  components: {
    ...Slices
  },
  data() {
    return {
      Slice: camelize(this.slice.slice_type)
    }
  }
}
</script>
