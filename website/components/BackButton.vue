<template>
  <button class="back-button" @click="goBack()">
    <!-- eslint-disable-next-line -->
    <img :src="back" :style="imgStyle" />
  </button>
</template>

<script>
export default {
  name: 'BackButton',
  props: {
    imgStyle: {
      type: String,
      default: 'height=16px',
      required: false
    }
  },
  data() {
    return {
      back:
				'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIxIDExSDYuODNsMy41OC0zLjU5TDkgNmwtNiA2IDYgNiAxLjQxLTEuNDFMNi44MyAxM0gyMXoiLz48L3N2Zz4K'
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/global.scss';

.back-button {
  background: $black-primary;
  border: none;
  padding: 16px;
  border-radius: 50%;
  cursor: pointer;
  img {
    position: relative;
    top: 2px;
  }
}
</style>
