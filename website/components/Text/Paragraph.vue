<template>
  <p :class="`paragraph paragraph--${variant}`">
    {{ content }}
  </p>
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

.paragraph {
  font-family: SF Pro Display;
  font-size: 18px;
  line-height: 38px;
  &--main {
    color: $color-paragraph-main;
  }
}
</style>
