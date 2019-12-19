<template>
  <pricing-table :slice="mockData" />
</template>
<script>
import { PricingTable } from '@slice-machine/vue-essentials'
import  '@slice-machine/vue-essentials/styles/styles.scss'
import mockData from '@slice-machine/vue-essentials/slices/PricingTable/mock.json'
export default {
  components: {
    PricingTable
  },
  data() {
    return {
      mockData
    }
  }
}
</script>
