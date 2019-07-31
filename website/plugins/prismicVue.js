import Vue from 'vue'
import PrismicVue from 'prismic-vue'
import linkResolver from './linkResolver'
import htmlSerializer from './htmlSerializer'
import PrismicConfig from '~/prismic.config.js'

Vue.use(PrismicVue, {
  endpoint: PrismicConfig.apiEndpoint,
  linkResolver,
  htmlSerializer
})
