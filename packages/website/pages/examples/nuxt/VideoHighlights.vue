<template>
  <video-highlights :slice="mockData" />
</template>
<script>
import { VideoHighlights } from '@slice-machine/vue-essentials'
import  '@slice-machine/vue-essentials/styles/styles.scss'
import mockData from '@slice-machine/vue-essentials/slices/VideoHighlights/mock.json'
export default {
  components: {
    VideoHighlights
  },
  data() {
    return {
      mockData
    }
  }
}
</script>
