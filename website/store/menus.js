export const state = () => ({
  main: {},
  side: {},
  docs: {},
  error: {}
})

export const mutations = {
  SET: (state, {
    main,
    side,
    docs,
    error
  }) => {
    state.main = main
    state.side = side
    state.docs = docs
    state.error = error
  }
}
