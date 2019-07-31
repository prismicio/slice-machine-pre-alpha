export const state = () => ({
  isOpen: false
})

export const mutations = {
  toggle(state) {
    state.isOpen = !state.isOpen
  },
  open(state) {
    state.isOpen = true
  },
  close(state) {
    state.isOpen = false
  }
}
