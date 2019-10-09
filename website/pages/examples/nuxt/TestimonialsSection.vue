<template>
  <testimonials-section :slice="mockData" />
</template>
<script>
import { TestimonialsSection } from '@/../src/slices'
import mockData from '@/../src/slices/TestimonialsSection/mock.json'
export default {
  components: {
    TestimonialsSection
  },
  data() {
    return {
      mockData
    }
  }
}
</script>
