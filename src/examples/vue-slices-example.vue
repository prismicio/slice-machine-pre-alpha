<template>
  <slice-zone :slices="document.body" />
</template>

<script>
// We assume you already installed prismic-javascript
import Prismic from 'prismic-javascript'
import { SliceZone } from '@/vueSlices'

export default {
  name: 'PrismicExample',
  components: {
    SliceZone
  },
  async asyncData({ error, req }) {
    try {
      // Replace this with your own endPoint,
      // once you're done playing around
      const apiEndpoint = 'https://vue-slices.prismic.io/api/v2'
      const api = await Prismic.getApi(apiEndpoint, {
        req
      })

      const result = await api.getSingle('example-request')

      return {
        document: result.data,
        documentId: result.id
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Document not found' })
    }
  }
}
</script>
