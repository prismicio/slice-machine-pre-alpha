<template>
  <graphic-section :slice="mockData" />
</template>
<script>
import { GraphicSection } from '@/../src/slices'
import mockData from '@/../src/slices/GraphicSection/mock.json'
export default {
  components: {
    GraphicSection
  },
  data() {
    return {
      mockData
    }
  }
}
</script>
