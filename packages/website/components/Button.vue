<template>
	<button :class="`button button--${variant}`" :type="type" v-on="$listeners">
		<slot />
	</button>
</template>

<script>
export default {
	name: 'Container',
	props: {
		variant: {
			type: String,
			default: 'default',
			required: false
		},
		type: {
			type: String,
			default: 'button',
			required: false
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../style/_variables';

.button {
	position: relative;
	height: auto;
	padding: 14px 20px;
	font-size: 18px;
	line-height: 21px;
	transition-duration: 0.2s;
	transition-property: all;
	transition-timing-function: cubic-bezier(0.6, 0, 0.3, 0.67);
	border-radius: 3px;
	outline: 0;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	line-height: 14px;
	text-decoration: none;
	text-rendering: optimizeLegibility;
	box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
	cursor: pointer;
	&--default {
		background: #f9f9fb;
		color: #1d2230;
		border: 1px solid #c9d0d8;
	}
	&--icon {
		background: transparent;
		border: none;
		padding: 7px 10px;
	}
	&--success {
		background: $color-main;
		border: 1px solid $color-main;
		color: #fff;
	}
	&--reverse {
		color: $color-main;
		border: 1px solid #fff;
		background: #fff;
	}
	&--text-white {
		color: #fff;
		border: none;
		background: transparent;
	}
	&--text-black {
		color: $text-dark;
		border: none;
		background: transparent;
	}
}
</style>
