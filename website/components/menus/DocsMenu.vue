<template>
	<nav>
		<ul>
			<li v-for="menuLink in docs.menu_item" :key="menuLink.id">
				<prismic-link :field="menuLink.link">{{ menuLink.link_label }}</prismic-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'DocsMenu',
	computed: {
		docs() {
			return this.$store.state.menus.docs
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
