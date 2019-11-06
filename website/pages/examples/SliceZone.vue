<template>
  <slice-zone :slices="document.body" />
</template>

<script>
import Prismic from 'prismic-javascript'
import { SliceZone } from '@/../src'
export default {
  name: 'PrismicExample',
  components: {
    SliceZone
  },
  async asyncData({ error, req }) {
    try {
      const apiEndpoint = 'https://vue-slices.prismic.io/api/v2'
      const api = await Prismic.getApi(apiEndpoint, { req })
      const result = await api.getSingle('example-request')
      return {
        document: result.data
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Document not found' })
    }
  }
}
</script>
