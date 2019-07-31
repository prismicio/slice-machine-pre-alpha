<template>
  <main>
    <header-slice v-if="slice.slice_type === 'header_slice'" v-bind="slice" />
    <quote-slice
      v-else-if="slice.slice_type === 'quote_slice'"
      v-bind="slice"
    />
    <template v-else>
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
  components: { ...Slices }
}
</script>
