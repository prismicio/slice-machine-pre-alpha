<template>
  <hero-section :slice="mockData" />
</template>
<script>
import { HeroSection } from '@/../src/slices'
import mockData from '@/../src/slices/HeroSection/mock.json'
export default {
  components: {
    HeroSection
  },
  data() {
    return {
      mockData
    }
  }
}
</script>
