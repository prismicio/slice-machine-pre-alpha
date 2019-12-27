<template>
  <div :class="`flex flex--justify-${justify} flex--align-${align}`">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: {
    justify: {
      type: String,
      required: false,
      default: 'flex-start',
      description:
				'justify-content properties (flex-start, end, space-between...)'
    },
    align: {
      type: String,
      required: false,
      default: 'center',
      description: 'align-items properties (center, left, right...'
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
	margin: 0 auto;
	display: flex;
	align-items: center;
	&--justify-center {
		justify-content: center;
	}
	&--justify-flex-start {
		justify-content: flex-start;
	}
	&--justify-space-between {
		justify-content: space-between;
	}

	&--align-center {
		align-items: center;
	}
	&--align-end {
		align-items: end;
	}
	&--align-start {
		align-items: start;
	}
}
</style>
