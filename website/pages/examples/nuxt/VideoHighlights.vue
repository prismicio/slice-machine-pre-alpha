<template>
  <video-highlights :slice="mockData" />
</template>
<script>
import { VideoHighlights } from '@/../src/slices'
import mockData from '@/../src/slices/VideoHighlights/mock.json'
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
