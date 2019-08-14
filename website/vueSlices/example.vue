/* Paste this file in `pages` folder and go to /example */
<template>
  <main>
    <HeaderSlice
      paragraph="this paragraph is mocked"
      title="Oh hello how are you?"
    />
    <QuoteSlice />
  </main>
</template>

<script>
import Slices from '../vueSlices'

export default {
  name: 'SlicezoneExample',
  components: { ...Slices }
}
</script>
