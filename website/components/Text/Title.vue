<template>
  <h1 :class="`title title--${variant}`">
    {{ content }}
  </h1>
</template>

<script>
export default {
  name: 'Title',
  props: {
    content: {
      type: [String],
      required: true
    },
    variant: {
      type: String,
      required: false,
      default: 'main'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/_variables.scss';

.title {
  font-family: SF Pro Display;
  font-size: 128px;
  &--main {
    color: $color-main;
  }
}
</style>
