<template>
  <customer-logos :slice="mockData" />
</template>
<script>
import { CustomerLogos } from '@/../src'
import mockData from '@/../src/slices/CustomerLogos/mock.json'
export default {
  components: {
    CustomerLogos
	},
	layout: 'example',
  data() {
    return {
      mockData
    }
  }
}
</script>
