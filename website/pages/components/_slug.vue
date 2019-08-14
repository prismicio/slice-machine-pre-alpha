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
    <Body variant="white">
      <MarkDownBox
        id="markdown-box"
        :edit-url="createEditUrl()"
        style="min-height: 80vh; margin-top: 4em"
      >
        {{ slice.readme }}
      </MarkDownBox>
      <Row>
        <div
          v-if="Object.keys(slice.examples).length === 0"
          style="border: 4px solid #111;"
        >
          <h2 class="subtitle">
            No example yet, that'd make for a great PR!
          </h2>
        </div>
        <div v-if="Object.keys(slice.examples).some(e => e)">
          <Title content="Examples" size="xs" variant="black" />
          <ul>
            <li
              v-for="(key, index) in Object.keys(slice.examples)"
              :key="'example-slice-' + (index + 1)"
            >
              <div style="border: 4px solid #111; margin-top: 2em">
                -
                <a
                  target="_blank"
                  :href="`${exampleFolder.concat(`${key}.vue`)}`"
                >
                  {{ key }}.vue
                </a>
                <component :is="slice.examples[key].component" />
                <h3>Code</h3>
                <code style="white-space: pre">
                  {{ slice.examples[key].content }}
                </code>
              </div>
            </li>
          </ul>
        </div>
      </Row>
    </Body>
  </main>
</template>

<script>
import * as Slices from '~/../src/slices'
import { createSlice, sliceRoute } from '~/utils'

import Header from '@/components/Header'
import Body from '@/components/Body'
import Row from '@/components/Row'
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
    Row,
    Title,
    Paragraph
  },
  data() {
    return {
      slice: createSlice(this.$route.params.slug),
      exampleFolder: `${sliceRoute(this.$route.params.slug)}/examples/`
    }
  },
  methods: {
    createEditUrl() {
      const base =
        'https://github.com/hypervillain/community/blob/master/src/slices/'
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
