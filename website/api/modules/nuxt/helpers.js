/*
  frameworks: [nuxt]
  pathname: plugins/link-resolver.js
*/
export const linkResolverPluginFile = () => `// -- Links resolution rules
// This function will be used to generate links to Prismic documents
// As your project grows, you should update this function according to your routes
export default (doc) => {
  switch (doc.type) {
    case ('page'): return \`/page/\${doc.uid}\`
    case ('homepage'): return '/'
    default: return '/'
  }
}`

/*
  frameworks: [nuxt]
  pathname: plugins/prismic-vue.js
*/
export const createPrismicVuePluginFile = () => `import Vue from 'vue'
import PrismicVue from 'prismic-vue'
import linkResolver from './link-resolver'

Vue.use(PrismicVue, { linkResolver })`

/*
  frameworks: [nuxt]
  pathname: prismic.config.js

const matches = base
    ? base.match(/(https?:\/\/)(.*)/)
    : ['http://', 'replace-me-with-your-prismic-domain']
  const protocol = matches[1]
  const url = matches[2]
*/
export const createPrismicConfigurationFile = () => {
  return `const api = {
  apiEndpoint: 'https://your-repo-name.prismic.io/api/v2',
}

module.exports = api;`
}

export const createUidPage = ({ configPath, customType, sliceMachinePath }) => {
  return `<template>
  <slice-zone :slices="document.body" />
</template>
<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '${configPath}'
import { SliceZone } from '${sliceMachinePath}'
export default {
  name: 'PrismicExample',
  components: {
    SliceZone
  },
  async asyncData({ params, error, req }) {
    try {
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {req})
      const result = await api.getByUID('${customType}', params.uid)
      return {
        document: result.data,
        documentId: result.id
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Document not found. Make sure you created a document of type "${customType}" in your Prismic repository' })
    }
  }
}
</script>`
}

export const createIndexPage = ({ configPath, customType }) => {
  return `<template>
  <main>
    <h1>Welcome to you under-designed index page</h1>
    <p>We created a page template for you to query your data</p>
    <p>
      Your todo list: add page documents to {{ pathToDocs }}
      and navigate to '/${customType}/{your-uid}' to see the magic happening
    </p>
  </main>
</template>
<script>
import PrismicConfig from '${configPath}'
export default {
  data() {
    const spl = PrismicConfig.apiEndpoint.split('/api')
    return {
      pathToDocs: \`\${spl[0]}/documents\`
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  max-width: 800px;
  margin: auto;
}

</style>`
}
