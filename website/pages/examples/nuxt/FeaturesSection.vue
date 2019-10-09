<template>
  <features-section :slice="mockData" />
</template>
<script>
import { FeaturesSection } from '@/../src/slices'
import mockData from '@/../src/slices/FeaturesSection/mock.json'
export default {
  components: {
    FeaturesSection
  },
  data() {
    return {
      mockData
    }
  }
}
</script>
