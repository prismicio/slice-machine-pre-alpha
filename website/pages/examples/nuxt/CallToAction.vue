<template>
  <call-to-action :slice="mockData" />
</template>
<script>
import { CallToAction } from '@/../src/slices'
import mockData from '@/../src/slices/CallToAction/mock.json'
export default {
  components: {
    CallToAction
  },
  data() {
    return {
      mockData
    }
  }
}
</script>
