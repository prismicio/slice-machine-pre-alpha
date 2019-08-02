// The SliceZone component is used to match Prismic slices with client-side
components. Pass it down an array of slices, it will render your content,
section after section. After creating a slice on Prismic, create the
corresponding component inside `vueSlices/slices` and export it from
`vueSlices/slices/index.js` See `examples/PrismicExample.vue` to see a page
example using SliceZone //

<template>
  <div>
    <template v-for="slice in slices">
      <Component
        :is="camelize(slice.slice_type)"
        v-if="
          ignoreNameCheck || sliceNames.includes(camelize(slice.slice_type))
        "
        :key="slice.id"
        v-bind="slice"
      />
      <unknown-slice
        v-else-if="NODE_ENV !== 'production'"
        :key="slice.id"
        :slice="slice"
      />
    </template>
  </div>
</template>

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
      required: true,
      description:
        'The array of slices you get from a Prismic request (data.body)'
    },
    ignoreNameCheck: {
      type: Boolean,
      required: false,
      default: false,
      description: 'Check for existence of slice before trying to render it'
    }
  },
  data() {
    return {
      camelize,
      sliceNames: Object.entries(Slices).map(([, { name }]) => name),
      NODE_ENV: process.env.NODE_ENV
    }
  }
}
</script>
