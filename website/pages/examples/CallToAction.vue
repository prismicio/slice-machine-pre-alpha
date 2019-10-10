<template>
  <call-to-action :slice="slice" />
</template>
<script>
import { CallToAction } from '@/../src/slices'
import slice from '@/../src/slices/CallToAction/mock.json'
export default {
  components: {
    CallToAction
  },
  data() {
    return {
      slice
    }
  }
}
</script>
