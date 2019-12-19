<template>
  <call-to-action :slice="mockData" />
</template>
<script>
import { CallToAction } from '@slice-machine/vue-essentials'
import  '@slice-machine/vue-essentials/styles/styles.scss'
import mockData from '@slice-machine/vue-essentials/slices/CallToAction/mock.json'
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
