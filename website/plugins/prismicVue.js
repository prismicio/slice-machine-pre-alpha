import Vue from 'vue'
import { common, nuxt } from 'prismic-vue/components/umd'
import '~/style/index.css'

Object.entries({ ...common, ...nuxt }).forEach(([_, component]) => {
  Vue.component(component.name, component)
})
