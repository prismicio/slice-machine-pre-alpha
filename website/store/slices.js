const LS_NAMESPACE = 'slices-list'

const onSave = (state, cookies) => {
  cookies.set(LS_NAMESPACE, JSON.stringify(state))
}

export const state = () => ({
  list: []
})

export const actions = {
  init({ commit }) {
    try {
      const maybeLS = this.$cookies && this.$cookies.get(LS_NAMESPACE)
      if (maybeLS && maybeLS.list && Array.isArray(maybeLS.list)) {
        return commit('init', maybeLS.list)
      }
      return commit('init', [])
    } catch {
      return commit('init', [])
    }
  },
  async nuxtServerInit({ dispatch, commit }) {
    console.log('commit is set -> ', commit)
    await dispatch('init')
  }
}

export const mutations = {
  init(state, list) {
    state.list = list
  },
  add(state, slice) {
    state.list.push(slice)
    onSave(state, this.$cookies)
  },
  remove(state, slice) {
    state.list.splice(
      state.list.findIndex(e => e.displayName === slice.displayName),
      1
    )
    onSave(state, this.$cookies)
  }
}
