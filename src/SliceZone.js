/* The SliceZone component is used to match Prismic slices with client-side
components. Pass it down an array of slices, it will render your content,
section after section. After creating a slice on Prismic, create the
corresponding component inside `vueSlices/slices` and export it from
`vueSlices/slices/index.js` See `examples/PrismicExample.vue` to see a page
example using SliceZone
*/

import UnknownSlice from './UnknownSlice'
import { camelize } from './utils'

export default {
  name: 'SliceZone',
  props: {
    components: {
      required: false
    },
    slices: {
      required: true
    },
    path: {
      required: false,
      type: [String, Array],
      default: './slices',
      description: 'Path(s) to your slices components'
    }
  },
  components: {
    UnknownSlice
  },
  computed: {
    computedImports: ({ path, slices }) => {
      const names = slices.map(e => camelize(e.slice_type))
      return (slices || []).map((slice, i) => () => {
        return import(`${path}/${names[i]}/index.vue`).catch(e => {
          console.error(e)
          return UnknownSlice
        })
      })
    },
    computedSlices: ({ slices, computedImports }) => {
      return (slices || []).map((slice, i) => ({
        import: computedImports[i],
        data: {
          props: { slice },
          key: slice.id
        },
        name: camelize(slice.slice_type)
      }))
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

    return h(
      'div',
      {},
      this.computedSlices.map(e => {
        return h(
          e.import,
          {
            ...e.data,
            scopedSlots: scopedSlots[e.name]
          },
          []
        )
      })
    )
  }
}
