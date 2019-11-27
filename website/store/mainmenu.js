export const state = () => ({
  menu: []
})

export const mutations = {
  SET_MENU: (state, payload) => {
    state.menu = payload
  }
}
