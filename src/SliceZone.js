/*
  The SliceZone component is used to match Prismic slices with client-side
  components. Pass it down an array of slices, it will render your content,
  section after section. After creating a slice on Prismic, create the
  corresponding component inside `vueSlices/slices` and export it from
  `vueSlices/slices/index.js` See `examples/PrismicExample.vue` to see a page
  example using SliceZone
*/

import * as Slices from './slices'
import UnknownSlice from './UnknownSlice'
const camelizeRE = /-(\w)/g
const camelize = str => {
  str = str.replace(/_/g, '-').replace(camelizeRE, (_, c) => {
    return c ? c.toUpperCase() : ''
  })
  return str[0].toUpperCase() + str.slice(1)
}
export default {
  name: 'SliceZone',
  components: { ...Slices, UnknownSlice },
  props: {
    slices: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      camelize,
      NODE_ENV: process.env.NODE_ENV
    }
  },
  render(h) {
    const scopedSlots = {}
    const slotNames = Object.keys(this.$scopedSlots)
    for (const name of slotNames) {
      const [sliceName, sliceSlot] = name.split('.')
      // skip if not parsed correctly
      if (!sliceName) continue
      scopedSlots[sliceName] = scopedSlots[sliceName] || {}
      // TODO: dev warning if found duplicated entries for the same slot
      scopedSlots[sliceName][sliceSlot || 'default'] = this.$scopedSlots[name]
    }

    const a = { ...Slices }
    return h(
      'section',
      {},
      (this.slices || []).map(elem => {
        const name = camelize(elem.slice_type)
        return h(
          a[name],
          {
            attrs: { ...elem.primary, primary: undefined },
            key: elem.id,
            scopedSlots: scopedSlots[name]
          },
          []
        )
      })
    )
  }
}
