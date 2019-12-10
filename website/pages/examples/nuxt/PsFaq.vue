<template>
  <ps-faq :slice="mockData" />
</template>
<script>
import { PsFaq } from '@/../src/slices'
import mockData from '@/../src/slices/PsFaq/mock.json'
export default {
  components: {
    PsFaq
  },
  data() {
    return {
      mockData
    }
  }
}
</script>
