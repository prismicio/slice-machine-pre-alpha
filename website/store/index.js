import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    Prismic.getApi(PrismicConfig.apiEndpoint, { req }).then(api => {
      return api.getByUID('menu', 'main_menu').then(main => {
        commit('mainmenu/SET_MENU', main.data)
      })
    })
  }
}
