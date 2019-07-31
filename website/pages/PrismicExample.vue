<template>
  <div>
    <h1>This is your slice zone:</h1>
    <slice-zone :slices="document.body" />
    <p>Done!</p>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '@/prismic.config.js'
import Slices, { SliceZone } from '@/vueSlices'

export default {
  name: 'PrismicExample',
  components: {
    ...Slices,
    SliceZone
  },
  async asyncData({ error, req }) {
    try {
      // Replace this with your own endPoint
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

      let document = {}
      const result = await api.getSingle('example-request')
      document = result.data

      return {
        document,
        documentId: result.id
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Document not found' })
    }
  }
}
</script>
