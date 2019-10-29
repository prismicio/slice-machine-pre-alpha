<template>
  <hero-section :slice="mockData">
    <template v-slot:top-content>
      <span role="img" aria-label="smiley face">😊</span>
    </template>
  </hero-section>
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
