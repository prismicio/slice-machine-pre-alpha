<template>
  <div class="container grid">
    <div>
      <a href="/">Back</a>
      <h1 class="title">
        {{ this.$route.params.slug }}
      </h1>
      <h2>Contributors</h2>
      <ul>
        <li
          v-for="(elem, index) in slice.meta.contributors"
          :key="'slice' + index"
        >
          -
          <a target="_blank" :href="`https://twitter.com/@${elem}`">{{
            elem
          }}</a>
        </li>
      </ul>
      <div
        v-if="Object.keys(slice.examples).length === 0"
        style="border: 4px solid #111;"
      >
        <h2 class="subtitle">
          No example yet, that'd make for a great PR!
        </h2>
      </div>
      <div v-if="Object.keys(slice.examples).some(e => e)">
        <h2 class="subtitle">
          Examples
        </h2>
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
              <code>
                {{ slice.examples[key].content }}
              </code>
            </div>
          </li>
        </ul>
      </div>
      <h2 class="subtitle">
        README:
      </h2>
      <vue-markdown>
        {{ slice.readme }}
      </vue-markdown>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import * as Slices from '~/../src/slices'
import { createSlice, sliceRoute } from '~/utils'

export default {
  components: {
    ...Slices,
    VueMarkdown
  },
  data() {
    return {
      slice: createSlice(this.$route.params.slug),
      exampleFolder: `${sliceRoute(this.$route.params.slug)}/examples/`
    }
  },
  validate: ({ params: { slug } }) =>
    process.env.NODE_ENV === 'production' ? createSlice(slug) !== null : true
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

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
