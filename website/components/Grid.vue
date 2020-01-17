<template>
	<div :class="`columns columns--${columns}`">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'Grid',
	props: {
		columns: {
			type: String,
			default: '1',
			required: false
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../style/variables.scss';

.columns {
	width: 100%;
	display: grid;
	grid-gap: 1em;
	&--1 {
		grid-template-columns: repeat(1, 1fr);
	}
	&--2 {
		grid-template-columns: repeat(1, 1fr);
		@include xl {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	&--3 {
		grid-template-columns: repeat(3, 1fr);
	}
}
</style>
