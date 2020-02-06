<template>
  <faq-section :slice="mockData" />
</template>
<script>
import { FaqSection } from '@/../src'
import mockData from '@/../src/slices/FaqSection/mock.json'
export default {
  components: {
    FaqSection
	},
	layout: 'example',
  data() {
    return {
      mockData
    }
  }
}
</script>
