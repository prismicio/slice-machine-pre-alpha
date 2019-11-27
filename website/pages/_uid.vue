<template>
  <Body variant="body--white">
    <main>
      <!-- Slice section template -->
      <div v-for="(slice, index) in sliceContent" :key="'slice-' + index">
        <!-- Text slice component -->
        <TextSlice v-if="slice.slice_type === 'text'" :slice="slice" />
        <!-- Text slice component -->
        <TitleSlice v-if="slice.slice_type === 'title'" :slice="slice" />
        <!-- Image component -->
        <FullWidthImage
          v-else-if="slice.slice_type === 'image'"
          :slice="slice"
        />
        <!-- Banner component -->
        <BannerSlice v-else-if="slice.slice_type === 'banner'" :slice="slice" />
      </div>
    </main>
  </Body>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

import Body from '@/components/Body'

// Imports for all slices
const TextSlice = () => import('../components/Text/TextSlice.vue')
const TitleSlice = () => import('../components/Text/TitleSlice.vue')
const FullWidthImage = () => import('../components/Text/FullWidthImage.vue')
const BannerSlice = () => import('../components/Text/BannerSlice.vue')

export default {
  components: {
    Body,
    TextSlice,
    TitleSlice,
    FullWidthImage,
    BannerSlice
  },
  async asyncData({ params, error, req }) {
    try {
      // Fetching the API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

      // Query to get the side menu content
      let document = {}
      const page = await api.getByUID('page', params.uid)
      document = page.data

      // Load the edit button
      if (process.client) window.prismic.setupEditButton()

      return {
        // Page content
        document,
        // Slices
        sliceContent: document.body
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
}
</style>
