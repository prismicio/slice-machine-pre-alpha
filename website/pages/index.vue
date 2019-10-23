<template>
  <main
    :style="{ backgroundImage: `url('${document.banner_background.url}')` }"
  >
    <Container justify="space-around">
      <div style="max-width: 450px">
        <prismic-rich-text :field="document.title" />
        <prismic-rich-text :field="document.description" />
        <prismic-rich-text :field="document.copy_paste_embed" />
        <prismic-rich-text :field="document.small_description" />
      </div>
    </Container>
    <Body>
      <row v-for="(slice, index) in slices" :key="'slice-' + index">
        <GraphicBlock
          v-if="slice.slice_type === 'image_with_description'"
          :slice="slice"
        />
        <VideoBlock v-if="slice.slice_type === 'video_block'" :slice="slice" />
      </row>
      <Row>
        <Card v-for="card in lst" :key="card.displayName" v-bind="card" />
      </Row>
    </Body>
  </main>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'
import Slices from '@/../src'
import { createSlice } from '~/utils'

import Container from '@/components/Container'
import GraphicBlock from '@/components/TextGraphic'
import VideoBlock from '@/components/VideoBlock'
import Body from '@/components/Body'

import Card from '@/components/Card'
import Row from '@/components/Row'

const lst = Object.keys(Slices)
  .map(createSlice)
  .filter(e => e) // eslint-disable-line

export default {
  components: {
    ...Slices,
    Container,
    GraphicBlock,
    VideoBlock,
    Body,
    Card,
    Row
  },
  data: () => ({
    lst
  }),
  async asyncData({ params, error, req }) {
    try {
      // Fetching the API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

      // Query to get the home page content
      let document = {}
      const result = await api.getSingle('home')
      document = result.data

      // Query to get the menu content
      let menuContent = {}
      const menu = await api.getSingle('header')
      menuContent = menu.data

      // Load the edit button
      if (process.client) window.prismic.setupEditButton()

      return {
        // Page content
        document,
        documentId: result.id,

        // Set slices as variable
        slices: document.body,

        // Menu
        menuContent,
        menuLinks: menuContent.links
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
