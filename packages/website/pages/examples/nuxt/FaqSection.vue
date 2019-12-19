<template>
  <faq-section :slice="mockData" />
</template>
<script>
import { FaqSection } from '@slice-machine/vue-essentials'
import  '@slice-machine/vue-essentials/styles/styles.scss'
import mockData from '@slice-machine/vue-essentials/slices/FaqSection/mock.json'
export default {
  components: {
    FaqSection
  },
  data() {
    return {
      mockData
    }
  }
}
</script>
