import Vue from 'vue'

export const store = Vue.observable({
  isNavOpen: false
})

export const mutations = {
  toggleNav() {
    store.isNavOpen = !store.isNavOpen
  }
}
