export const state = () => ({
  main: {},
  side: {},
  docs: {}
})

export const mutations = {
  SET: (state, {
    main,
    side,
    docs
  }) => {
    state.main = main
    state.side = side
    state.docs = docs
  }
}
