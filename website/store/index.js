export const actions = {
  nuxtServerInit({ commit }, { $prismic }) {
    try {
      return $prismic.api.query($prismic.predicates.at('document.type', 'menu'))
        .then(menus => {
          commit('menus/SET', {
            main: menus.results.find(e => e.uid === 'main_menu').data,
            side: menus.results.find(e => e.uid === 'side_menu').data,
            docs: menus.results.find(e => e.uid === 'docs_menu').data
          })
        })
    } catch (e) {
      const error = 'Please create a menu document'

      commit('menus/SET', error);
    }
  }
}
