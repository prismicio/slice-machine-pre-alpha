<template>
  <div v-if="showDrawer" class="drawer">
    <p @click="toggleDrawer()">
      {{ this.$store.state.slices.list.length }} slices selected
      <!-- eslint-disable-line -->
    </p>
    <div v-if="drawerIsOpen" class="open">
      <button @click="download">
        Click to download
      </button>

      <div v-if="wroomObject">
        {{ JSON.stringify(wroomObject) }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'CollectionDrawer',
  data() {
    return {
      wroomObject: null
    }
  },
  computed: {
    slices() {
      return this.$store.state.slices.list
    },
    drawerIsOpen() {
      return this.$store.state.drawer.isOpen
    },
    showDrawer: vm => {
      // Hide on example page, to not display the drawer on CodeSandbox
      return vm.slices.length && vm.$route.path.indexOf('/examples/') !== 0
    }
  },
  methods: {
    ...mapMutations({
      toggleDrawer: 'drawer/toggle'
    }),
    download() {
      fetch('/api/download', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slices: this.$store.state.slices.list })
      })
        .then(data => data.json()) // eslint-disable-line
        .then(data => {
          const downloadLink = document.createElement('a')
          const fileName = 'vueSlices.zip'

          downloadLink.href = data.base64
          downloadLink.download = fileName
          downloadLink.click()
          this.wroomObject = data.wroomObject
        })
        .catch(console.error) // eslint-disable-line
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer {
	position: fixed;
	bottom: 12px;
	right: 24px;
}

.open {
	border: 1px solid #111;
	height: 220px;
	width: 300px;
}
</style>
