<template>
	<nav>
		<ul>
			<li v-for="menuLink in side.menu_item" :key="menuLink.id">
				<prismic-link :field="menuLink.link">{{ menuLink.link_label }}</prismic-link>
			</li>
			<li class="menu-sub-title">
				<b>Slice Components</b>
			</li>
			<li v-for="card in compsData" :key="card.displayName" v-bind="card.displayName">
				<nuxt-link :to="`/components/${card.displayName}`">{{ card.meta.title }}</nuxt-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'SliceList',
	props: {
		compsData: {
			type: Array,
			required: true
		}
	},
	computed: {
		side() {
			return this.$store.state.menus.side
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

ul {
	padding: 0;
}
li {
	list-style-type: none;
	padding: 8px 0;
}
.menu-sub-title {
	padding: 28px 0 24px 0;
}
a {
	text-decoration: none;
	color: #7b7979;
	&:active {
		color: $black-secondary;
	}
	&:hover {
		color: $black-secondary;
	}
}
</style>
