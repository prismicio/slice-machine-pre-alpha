<template>
  <video-highlights :slice="mockData" />
</template>
<script>
import { VideoHighlights } from '@/../src'
import mockData from '@/../src/slices/VideoHighlights/mock.json'
export default {
  components: {
    VideoHighlights
	},
	layout: 'example',
  data() {
    return {
      mockData
    }
  }
}
</script>
