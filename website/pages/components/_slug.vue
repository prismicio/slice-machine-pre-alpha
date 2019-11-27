<template>
  <Body variant="body--white">
    <div class="grid">
      <nav>
        <SideList :comps-data="lst" :side-menu="sideMenu" />
      </nav>
      <main>
        <h3 class="card-section-title">
          {{ slice.meta.title }}
        </h3>
        <p class="card-section-description">
          {{ slice.meta.description }}
        </p>
        <img :src="`/components/${slice.displayName}.png`" />
        <MarkDownBox
          id="markdown-box"
          :edit-url="createEditUrl()"
          style="min-height: 80vh; margin-top: 4em; word-spacing: 0px;"
        >
          {{ slice.readme }}
        </MarkDownBox>
        <div
          v-if="hasSandbox"
          style="width: 100%; margin-top: 3em;"
          v-html="sandbox"
        />
      </main>
      <aside>
        <ContentsTable :document="document" />
      </aside>
    </div>
  </Body>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

import * as Slices from '~/../src/slices'
import { createSlice, sliceRoute } from '~/utils'

import SideList from '@/components/menus/SideList'
import ContentsTable from '@/components/menus/ContentsTable'

import Body from '@/components/Body'
import MarkDownBox from '@/components/MarkDownBox'

const lst = Object.keys(Slices)
  .map(createSlice)
  .filter(e => e) // eslint-disable-line

export default {
  components: {
    ...Slices,
    MarkDownBox,
    Body,
    SideList,
    ContentsTable
  },
  data() {
    return {
      lst,
      slice: createSlice(this.$route.params.slug),
      exampleFolder: `${sliceRoute(this.$route.params.slug)}/examples/nuxt/`
    }
  },
  computed: {
    hasSandbox: ({ slice, $router }) =>
      $router.resolve({ name: `examples-${slice.displayName}` }).href !== '/',
    sandbox: ({ slice: { displayName } }) =>
      `<iframe src="https://codesandbox.io/embed/github/hypervillain/community/tree/master/?autoresize=1&fontsize=14&initialpath=%2Fexamples%2F${displayName}&module=%2Fwebsite%2Fpages%2Fexamples%2F${displayName}.vue&moduleview=0" title="community" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>`
  },
  async asyncData({ params, error, req }) {
    try {
      // Fetching the API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

      // Query to get the main menu content
      let document = {}
      const page = await api.getSingle('sample_pages')
      document = page.data

      // Query to get the side menu content
      let sideMenu = {}
      const side = await api.getByUID('menu', 'side_menu')
      sideMenu = side.data

      // Load the edit button
      if (process.client) window.prismic.setupEditButton()

      return {
        // Page content
        document,
        // Side Menu
        sideMenu
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  async fetch({ store }) {
    await store.dispatch('slices/init')
  },
  methods: {
    createEditUrl() {
      const base =
        'https://github.com/prismicio/slice-machine/tree/master/src/slices/'
      return `${base}${this.slice.displayName}/README.md`
    }
  },
  validate: ({ params: { slug } }) =>
    process.env.NODE_ENV === 'production' ? createSlice(slug) !== null : true
}
</script>

<style lang="scss" scoped>
@import '../../style/_global';

.grid {
  display: grid;
  grid-template-areas: 'content';
  grid-template-columns: 1fr;
  @include lg {
    padding-top: 44px;
    grid-template-areas: 'nav content';
    grid-template-columns: 200px minmax(200px, 1fr);
    grid-gap: 10px;
  }
  @include xl {
    padding-top: 44px;
    grid-template-areas: 'nav content side';
    grid-template-columns: 200px minmax(200px, 1fr) 200px;
    grid-gap: 10px;
  }
}
img {
  max-width: 100%;
}
nav {
  display: none;
  @include lg {
    display: inline;
    grid-area: nav;
    margin-left: 0.5rem;
  }
}
main {
  grid-area: content;
  @include lg {
    padding-left: 44px;
    border-left: 1px solid $grey-transparent;
  }
  @include xl {
    padding: 0 44px;
  }
}
aside {
  display: none;
  @include xl {
    display: inline;
    grid-area: side;
    margin-right: 0.5rem;
  }
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
