<template>
  <Body class="body--white">
    <div class="grid">
      <nav>
        <SideList :comps-data="lst" :side-menu="sideMenu" />
      </nav>
      <main>
        <h3 class="card-section-title">
          {{ $prismic.asText(document.page_title) }}
        </h3>
        <p class="card-section-description">
          {{ $prismic.asText(document.page_description) }}
        </p>
        <row class="homerows">
          <Card
            v-for="card in lst"
            :key="card.displayName"
            v-bind="card"
            variant="2col"
          >
            <template v-slot:description>
              <span style="visible: none"></span>
            </template>
          </Card>
        </row>
      </main>
    </div>
  </Body>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

import SideList from '@/components/menus/SideList'

import Slices from '@/../src'
import { createSlice } from '~/utils'
import Card from '@/components/Card'
import Body from '@/components/Body'
import Row from '@/components/Row'

const lst = Object.keys(Slices)
  .map(createSlice)
  .filter(e => e) // eslint-disable-line

export default {
  name: 'HomeLib',
  components: {
    ...Slices,
    Card,
    Body,
    Row,
    SideList
  },
  data: () => ({
    lst
  }),
  async asyncData({ params, error, req }) {
    try {
      // Fetching the API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

      // Query to get the page content
      let document = {}
      const page = await api.getSingle('component_library')
      document = page.data

      // Query to get the side menu content
      let sideMenu = {}
      const side = await api.getByUID('menu', 'side_menu')
      sideMenu = side.data

      // Load the edit button
      if (process.client) window.prismic.setupEditButton()

      return {
        // Page
        document,
        // Side Menu
        sideMenu
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/_global';

.grid {
  display: grid;
  grid-template-areas: 'nav content';
  grid-template-columns: 200px 1fr;
  grid-gap: 10px;
  width: 100%;
  padding-top: 44px;
}
nav {
  grid-area: nav;
  margin-left: 0.5rem;
}
main {
  grid-area: content;
  border-left: 1px solid $grey-transparent;
  padding-left: 112px;
}

.homerows {
  padding: 25px 0;
}

.card-section {
  margin: 0 auto;
  &-description {
    margin: 0 auto;
    font-size: 20px;
    line-height: 34px;
    font-family: $base-font-primary;
  }
  .button {
    margin: 0 auto;
    width: 250px;
    height: 70px;
    font-size: 20px;
    line-height: 24px;
    display: grid;
  }
}
</style>
