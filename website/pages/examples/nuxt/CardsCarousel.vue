<template>
  <cards-carousel :slice="mockData" />
</template>
<script>
import { CardsCarousel } from '@/../src'
import mockData from '@/../src/slices/CardsCarousel/mock.json'
export default {
  components: {
    CardsCarousel
	},
	layout: 'example',
  data() {
    return {
      mockData
    }
  }
}
</script>
