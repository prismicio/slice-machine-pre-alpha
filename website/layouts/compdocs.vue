<template>
  <div>
    <MainMenu />
    <Body variant="body--white">
      <div class="docs">
        <nav>
          <SideList :comps-data="lst" />
        </nav>
        <main>
          <nuxt />
        </main>
      </div>
    </Body>
    <FooterMenu />
  </div>
</template>

<script>
import MainMenu from '@/components/menus/MainMenu'
import FooterMenu from '@/components/menus/FooterMenu'
import Body from '@/components/Body'
import SideList from '@/components/menus/SideList'

import * as Slices from '~/../src/slices'
import { createSlice, sliceRoute } from '~/utils'

const lst = Object.keys(Slices)
  .map(createSlice)
  .filter(e => e) // eslint-disable-line

export default {
  components: {
    ...Slices,
    MainMenu,
    FooterMenu,
    Body,
    SideList
  },
  data() {
    return {
      lst,
      slice: createSlice(this.$route.params.slug),
      exampleFolder: `${sliceRoute(this.$route.params.slug)}/examples/nuxt/`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/_global';

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.docs {
  display: grid;
  grid-template-columns: [container-start] minmax(0, 1fr) [container-end];
  @include lg {
    padding-top: 44px;
    grid-template-areas: 'nav content';
    grid-template-columns: 200px minmax(200px, 1fr);
    grid-gap: 10px;
  }
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
  grid-column: container;
  @include lg {
    grid-area: content;
    padding-left: 44px;
    border-left: 1px solid $grey-transparent;
  }
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
