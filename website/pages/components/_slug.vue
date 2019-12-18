<template>
  <main>
    <Header
      justify="space-between"
      :style="{ backgroundImage: `url('${slice.meta.imageUrl}')` }"
    >
      <div style="max-width: 450px">
        <BackButton />
        <Title :content="slice.meta.title" size="sm" />
        <Paragraph style="margin-top: 18px" :content="slice.meta.description" />
      </div>
    </Header>
    <Body variant="white" style="margin: 3em 0;">
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
    </Body>
  </main>
</template>

<script>
import * as Slices from '~/../src/slices'
import { createSlice, sliceRoute } from '~/utils'

import Header from '@/components/Header'
import Body from '@/components/Body'
import Title from '@/components/Text/Title'
import Paragraph from '@/components/Text/Paragraph'
import MarkDownBox from '@/components/MarkDownBox'
import BackButton from '@/components/BackButton'

export default {
  components: {
    ...Slices,
    BackButton,
    MarkDownBox,
    Header,
    Body,
    Title,
    Paragraph
  },
  data() {
    return {
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

<style>
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
