export const state = () => ({
  main: {},
  side: {}
})

export const mutations = {
  SET: (state, { main, side }) => {
    state.main = main
    state.side = side
  }
}
