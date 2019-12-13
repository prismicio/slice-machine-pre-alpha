<template>
  <main>
    <ps-faq id="faq-0" :slice="PsFaqMock" />
    <ps-faq :slice="FaqMockAlt" />
    <VideoHighlights :slice="VideoHighlightsMock" />
    <CustomerLogos />
  </main>
</template>
<script>
import Prismic from 'prismic-javascript'

import PsFaq from '@/../src/slices/PsFaq'
import VideoHighlights from '@/../src/slices/VideoHighlights'
import CustomerLogos from '@/../src/slices/CustomerLogos'
import VideoHighlightsMock from '@/../src/slices/VideoHighlights/mock.json'
import PsFaqMock from '@/../src/slices/PsFaq/mock.json'

const FaqMockAlt = { ...PsFaqMock }
// FaqMockAlt.primary.optional_image = {
//   dimensions: {
//     width: 2048,
//     height: 1536
//   },
//   alt: 'an altt',
//   copyright: null,
//   url:
//     'https://images.prismic.io/slicesexamples/b4aeb1e2-e9c1-43ab-82ab-0d0519f9c3cd_float.png?auto=compress,format'
// }
export default {
  components: {
    PsFaq,
    VideoHighlights,
    CustomerLogos
  },
  data() {
    return { PsFaqMock, FaqMockAlt, VideoHighlightsMock }
  },
  async asyncData({ error, req }) {
    try {
      const apiEndpoint = 'https://slicesexamples.prismic.io/api/v2'
      const api = await Prismic.getApi(apiEndpoint, { req })
      const result = await api.getByUID('example', 'video-highlights')
      console.log(JSON.stringify(result.data))
      return {
        document: result.data
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Document not found' })
    }
  }
}
</script>
<style lang="scss">
@import '@/../src/stylesAttempt/global/styles.scss';
@import '@/../src/stylesAttempt/styles.scss';
</style>
