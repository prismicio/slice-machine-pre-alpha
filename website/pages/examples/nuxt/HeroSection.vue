<template>
  <hero-section :slice="mockData">
    <template v-slot:top-content>
      <img src="https://picsum.photos/200/100" style="max-width: 640px" />
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
