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
@import '../style/variables.scss';

.container {
	width: 98%;
	max-width: $container-width;
	padding: 0 24px;
	flex-wrap: wrap;
	@include lg {
		width: 90%;
	}
	@include xl {
		width: 80%;
	}
}

@media screen and (max-width: 790px) {
	.container {
		padding: 0 16px;
	}
}
</style>
