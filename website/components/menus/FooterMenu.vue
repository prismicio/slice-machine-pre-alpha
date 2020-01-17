<template>
	<div class="footerMenu">
		<Container class="foor-container" justify="space-between">
			<div class="logo">
				<nuxt-link to="/">
					<prismic-image v-if="menu.logo" :field="menu.logo" />
				</nuxt-link>
				<nuxt-link to="/">
					<span>
						<b>Slicemachine</b> by prismic
					</span>
				</nuxt-link>
			</div>
			<nav>
				<ul>
					<li v-for="menuLink in menu.menu_item" :key="menuLink.id">
						<prismic-link :field="menuLink.link">{{ menuLink.link_label }}</prismic-link>
					</li>
				</ul>
			</nav>
		</Container>
	</div>
</template>

<script>
import Container from '@/components/Container'

export default {
	name: 'MainMenu',
	components: {
		Container
	},
	computed: {
		menu() {
			return this.$store.state.menus.main
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/_variables.scss';

a {
	display: contents;
	text-decoration: none;
	&:visited {
		color: $black-primary;
	}
}

.footerMenu {
	border-top: 1px solid #d3d2d2;
	padding: 30px 0;
	min-height: 80px;
	.foor-container {
		display: block;
		@include md {
			display: flex;
		}
	}
	.logo {
		display: inline-flex;
		align-items: center;
		b {
			font-size: 20px;
			padding: 0 5px;
		}
	}
	ul {
		display: grid;
		padding: 0;
		font-size: 14px;
		@include md {
			display: inline-flex;
		}
	}
	li {
		display: inline-block;
		padding-top: 15px;
		@include md {
			margin-left: 10px;
		}
	}
	a {
		display: contents;
		text-decoration: none;
		color: $black-primary;
		&:visited {
			color: $black-primary;
		}
		&:hover {
			color: $black-secondary;
		}
	}
}
</style>
