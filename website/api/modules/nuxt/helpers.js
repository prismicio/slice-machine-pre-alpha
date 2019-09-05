/*
  frameworks: [nuxt]
  pathname: plugins/link-resolver.js
*/
export const linkResolverPluginFile = () => `// -- Links resolution rules
// This function will be used to generate links to Prismic documents
// As your project grows, you should update this function according to your routes
export default (doc) => {
  switch (doc.type) {
    case ('page'): return \`/\${doc.uid}\`
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
