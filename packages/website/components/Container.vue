<template>
	<Flex class="container" :justify="justify" :align="align">
		<slot />
	</Flex>
</template>

<script>
import Flex from './Flex'
export default {
	name: 'Container',
	components: {
		Flex
	},
	props: {
		...Flex.props
	}
}
</script>

<style lang="scss" scoped>
@import '../style/_variables';

.container {
	width: 70%;
	max-width: $container-width;
	padding: 0 24px;
	flex-wrap: wrap;
}

@media screen and (max-width: 790px) {
	.container {
		padding: 0 16px;
	}
}
</style>
