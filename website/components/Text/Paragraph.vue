<template>
  <p :class="`paragraph paragraph--${variant} ${bold && 'paragraph--bold'}`">
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
    },
    bold: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/_variables.scss';

.paragraph {
	font-size: 18px;
	line-height: 38px;
	&--main {
		color: $color-paragraph-main;
	}
	&--bold {
		font-weight: 500;
	}
}
</style>
