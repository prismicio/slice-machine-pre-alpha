<template>
	<section :class="`body body--${variant}`">
		<Container justify="space-between" align="start">
			<slot />
		</Container>
	</section>
</template>

<script>
import Container from '@/components/Container'

export default {
	name: 'Body',
	components: {
		Container
	},
	props: {
		variant: {
			type: String,
			default: 'default',
			required: false
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../style/_variables.scss';

.body {
	&--default {
		background: $bg-secondary;
		padding: 32px 0;
	}
	&--white {
		background: #fff;
	}
	&--grey {
		background: $grey-secondary;
	}
	&--title {
		padding: 16px 0 0 0;
	}
	&--text {
		padding: 8px 0 32px 0;
	}
}
</style>
