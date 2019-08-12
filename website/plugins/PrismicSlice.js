import Vue from 'vue'

import Slices from '@/vueSlices'

const camelizeRE = /-(\w)/g
const camelize = str => {
  str = str.replace(/_/g, '-').replace(camelizeRE, (_, c) => {
    return c ? c.toUpperCase() : ''
  })
  return str[0].toUpperCase() + str.slice(1)
}

Vue.component('PrismicSlice', {
  name: 'PrismicSlice',
  functional: true,
  render(h, { props, data, children }) {
    const { slice } = props
    const Slice = Slices[camelize(slice.slice_type)]

    if (Slice) {
      return h(Slice, data, children)
    }
    // eslint-disable-next-line
    console.warn(`No slice for slice_type [${camelize(slice.slice_type)}]`)
    return null
  }
})
