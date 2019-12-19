<template>
  <customer-logos :slice="mockData" />
</template>
<script>
import { CustomerLogos } from '@slice-machine/vue-essentials'
import  '@slice-machine/vue-essentials/styles/styles.scss'
import mockData from '@slice-machine/vue-essentials/slices/CustomerLogos/mock.json'
export default {
  components: {
    CustomerLogos
  },
  data() {
    return {
      mockData
    }
  }
}
</script>
