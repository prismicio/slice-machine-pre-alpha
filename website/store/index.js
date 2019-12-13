import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    return Prismic.getApi(PrismicConfig.apiEndpoint, { req }).then(api => {
      return api
        .query(Prismic.Predicates.at('document.type', 'menu'))
        .then(menus => {
          commit('menus/SET', {
            main: menus.results.find(e => e.uid === 'main_menu').data,
            side: menus.results.find(e => e.uid === 'side_menu').data
          })
        })
    })
  }
}
