<template>
  <main>
    <section
      :style="{
        background: `no-repeat`,
        backgroundSize: `90%`,
        backgroundPosition: `left`,
        backgroundImage: `url('${document.banner_background.url}')`
      }"
    >
      <Container justify="space-around">
        <HomeBanner :document="document" />
      </Container>
    </section>
    <Body class="body--white">
      <row
        v-for="(slice, index) in websiteSlices"
        :key="'slice-' + index"
        class="homerows"
      >
        <GraphicBlock
          v-if="slice.slice_type === 'image_with_description'"
          :slice="slice"
        />
        <VideoBlock v-if="slice.slice_type === 'video_block'" :slice="slice" />
        <ProsBlock v-if="slice.slice_type === 'slice_table'" :slice="slice" />
        <HomeLib v-if="slice.slice_type === 'cards'" :slice="slice" />
      </row>
    </Body>
  </main>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'
import Container from '@/components/Container'

import HomeBanner from '@/components/Homepage/HomeBanner'
import GraphicBlock from '@/components/Homepage/TextGraphic'
import VideoBlock from '@/components/Homepage/VideoBlock'
import ProsBlock from '@/components/Homepage/ProsBlock'
import HomeLib from '@/components/Homepage/HomeLib'

import Body from '@/components/Body'
import Row from '@/components/Row'

export default {
  components: {
    HomeBanner,
    Container,
    GraphicBlock,
    VideoBlock,
    ProsBlock,
    HomeLib,
    Body,
    Row
  },
  async asyncData({ params, error, req }) {
    try {
      // Fetching the API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

      // Query to get the home page content
      let document = {}
      const result = await api.getSingle('home')
      document = result.data

      // Load the edit button
      if (process.client) window.prismic.setupEditButton()

      return {
        // Page content
        document,
        documentId: result.id,

        // Set slices as variable
        websiteSlices: document.body
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Homepage not found' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/_global';

.homerows {
  padding: 50px 0;
}
</style>
