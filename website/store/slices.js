export const state = () => ({
  list: (() => {
    const maybeLS = process.browser && localStorage.getItem('my-slices-list')
    try {
      const ls = JSON.parse(maybeLS)
      if (ls && Array.isArray(ls)) {
        return ls
      }
      return ['HeaderSlice']
    } catch {
      return ['HeaderSlice']
    }
  })()
})

export const mutations = {
  reset(state) {
    state.list = []
  },
  add(state, slice) {
    state.list.push(slice)
  },
  remove(state, sliceName) {
    state.list.filter(e => e.displayName !== sliceName)
  }
}
