// The SliceZone component is used to match Prismic slices with client-side
components. Pass it down an array of slices, it will render your content,
section after section. After creating a slice on Prismic, create the
corresponding component inside `vueSlices/slices` and export it from
`vueSlices/slices/index.js` See `examples/PrismicExample.vue` to see a page
example using SliceZone //
<script>
import * as Slices from './slices'
import UnknownSlice from './UnknownSlice'

const camelizeRE = /-(\w)/g
const camelize = (str) => {
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
      sliceNames: Object.entries(Slices).map(([, { name }]) => name),
      NODE_ENV: process.env.NODE_ENV
    }
  },

  render(h) {
    return h(
      'div',
      {},
      this.slices.map((elem) => {
        const name = camelize(elem.slice_type)
        const component = () =>
          import(`./slices/${name}/index.vue`).catch((e) => {
            console.error(e)
            return UnknownSlice
          })
        return h(
          component,
          { attrs: { ...elem.primary, primary: undefined }, key: elem.id },
          []
        )
      })
    )
  }
}
</script>
