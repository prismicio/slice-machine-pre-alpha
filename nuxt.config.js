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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', '@/plugins/variables.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/htmlSerializer',
    '@/plugins/prismicVue'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/eslint-module', 'cookie-universal-nuxt'],
  serverMiddleware: [
    { path: '/api/download', handler: '~/api/download.js' },
    { path: '/api/all', handler: '~/api/all.js' },
    { path: '/api/slices', handler: '~/api/slices.js' }
  ],
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
