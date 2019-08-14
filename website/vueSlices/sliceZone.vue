<template>
  <main>
    <HeaderSlice v-if="slice.slice_type === 'HeaderSlice'" v-bind="slice" />
    <QuoteSlice v-else-if="slice.slice_type === 'QuoteSlice'" v-bind="slice" />
    <template v-else-if="process.env.NODE_ENV !== 'production'">
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
    </template>
  </main>
</template>

<script>
import * as Slices from './slices'

export default {
  name: 'SliceZone',
  components: { ...Slices },
  props: {
    slice: Object
  }
}
</script>
