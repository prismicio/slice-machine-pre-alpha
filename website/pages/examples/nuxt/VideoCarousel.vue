<template>
  <video-carousel :slice="mockData" />
</template>
<script>
import { VideoCarousel } from '@/../src/slices'
import mockData from '@/../src/slices/VideoCarousel/mock.json'
export default {
  components: {
    VideoCarousel
  },
  data() {
    return {
      mockData
    }
  }
}
</script>
