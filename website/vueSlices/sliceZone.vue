<template>
  <div>
    <ul>
      <li>
        <template v-for="slice in slices">
          <Component
            :is="camelize(slice.slice_type)"
            v-if="sliceNames.includes(camelize(slice.slice_type))"
            :key="slice.id"
          />
          <unknown-slice
            v-else-if="NODE_ENV !== 'production'"
            :key="slice.id"
            :slice="slice"
          />
        </template>
      </li>
    </ul>
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
      required: true
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
