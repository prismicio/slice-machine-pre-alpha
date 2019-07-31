export const state = () => ({
  list: ['HeaderSlice', 'QuoteSlice']
})

export const mutations = {
  reset(state) {
    state.list = []
  },
  add(state, slice) {
    state.list.push(slice)
  },
  remove(state, sliceName) {
    state.list.splice(state.list.indexOf(sliceName), 1)
  }
}
