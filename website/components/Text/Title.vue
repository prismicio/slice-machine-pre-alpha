<template>
  <h1 :class="`title title--${variant} title--${size}`">
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
    },
    size: {
      type: String,
      required: false,
      default: 'md'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/_variables.scss';

.title {
	font-weight: 600;
	&--main {
		color: $color-main;
	}
	&--black {
		color: $text-darker;
	}
	&--xs {
		font-size: 44px;
	}
	&--sm {
		font-size: 78px;
	}
	&--md {
		font-size: 128px;
	}
}
</style>
