<template>
  <testimonials-slider :slice="mockData" />
</template>
<script>
import { TestimonialsSlider } from '@/../src'
import mockData from '@/../src/slices/TestimonialsSlider/mock.json'
export default {
  components: {
    TestimonialsSlider
	},
	layout: 'example',
  data() {
    return {
      mockData
    }
  }
}
</script>
