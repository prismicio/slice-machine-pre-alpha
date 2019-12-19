import Vue from 'vue'
import VueGitHubButtons from 'vue-github-buttons'
import { common, nuxt } from 'prismic-vue/components/umd'
import '~/style/index.css'

Vue.use(VueGitHubButtons, { useCache: false })

Object.entries({ ...common, ...nuxt }).forEach(([_, component]) => {
	Vue.component(component.name, component)
})
