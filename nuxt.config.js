export default {
  mode: 'universal',

  srcDir: 'website/',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', '../src/styles/_global.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui', '@/plugins/prismicVue'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'cookie-universal-nuxt',
    [
      'vue-github-buttons/nuxt',
      {
        css: false,
        useCache: false
      }
    ],
    [
      'prismic-nuxt',
      {
        endpoint: 'https://slice-machine.prismic.io/api/v2',
        linkResolver: function(doc, ctx) {
          if (doc.isBroken) {
            return '/not-found'
          }
          if (doc.type === 'home') {
            return `/`
          }
          if (doc.type === 'component_library') {
            return `/component-library`
          }
          if (doc.type === 'page') {
            return `/${doc.uid}`
          }
          return '/not-found'
        }
      }
    ]
  ],
  serverMiddleware: [
    { path: '/api/models', handler: '~/api/models.js' },
    { path: '/api/slices', handler: '~/api/slices.js' }
  ],
  devModules: ['@nuxtjs/eslint-module'],
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    // eslint-disable-next-line
    extend(config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    }
  }
}
