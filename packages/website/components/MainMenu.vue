<template>
	<div class="mainMenu">
		<Container justify="space-between">
			<nav id="menu">
				<div class="logo">
					<nuxt-link to="/">
						<prismic-image :field="menu.logo" />
					</nuxt-link>
					<nuxt-link to="/">
						<span class="text"><b>Slicemachine</b> by prismic</span>
					</nuxt-link>
				</div>
				<ul class="horizontal-nav">
					<li v-for="menuLink in menu.menu_item" :key="menuLink.id">
						<prismic-link :field="menuLink.link">
							{{ menuLink.link_label }}
						</prismic-link>
					</li>
					<li>
						<gh-btns-star slug="prismicio/slice-machine" class="gh-button star">
						</gh-btns-star>
					</li>
					<li>
						<gh-btns-fork slug="prismicio/slice-machine" class="gh-button fork">
						</gh-btns-fork>
					</li>
				</ul>
				<Burger></Burger>
			</nav>
		</Container>
		<Sidebar>
			<ul class="sidebar-panel-nav">
				<li v-for="menuLink in menu.menu_item" :key="menuLink.id">
					<prismic-link :field="menuLink.link">
						{{ menuLink.link_label }}
					</prismic-link>
				</li>
				<li>
					<gh-btns-star slug="prismicio/slice-machine" class="star">
					</gh-btns-star>
				</li>
				<li>
					<gh-btns-fork slug="prismicio/slice-machine" class="fork">
					</gh-btns-fork>
				</li>
			</ul>
		</Sidebar>
	</div>
</template>

<script>
import Burger from '@/components/Menu/Burger.vue'
import Sidebar from '@/components/Menu/Sidebar.vue'
import Container from '@/components/Container'

export default {
	name: 'MainMenu',
	components: {
		Container,
		Burger,
		Sidebar
	},
	props: {
		menu: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../style/_global';

.mainMenu {
	border-bottom: 1px solid #d3d2d2;
	height: 30px;
	padding: 20px 0;
	min-height: 80px;
	.logo {
		display: inline-flex;
		align-items: center;
		.text {
			padding: 0 5px;
			text-decoration: none;
			color: $black-primary;
		}
		b {
			font-size: 20px;
		}
	}
	#menu {
		display: contents;
	}
	.horizontal-nav {
		display: none;
		font-size: 14px;
		align-items: center;
		@include lg {
			display: inline-flex;
		}
		li {
			display: inline-block;
			margin-left: 10px;
			a {
				display: contents;
				text-decoration: none;
				color: $black-primary;
				&:visited {
					font-weight: 500;
				}
			}
		}
	}
	.sidebar-panel-nav {
		li {
			list-style-type: none;
			a {
				text-decoration: none;
				&:visited {
					color: $black-primary;
				}
			}
			.star {
				background-color: #ffffff;
				background-image: none;
				color: #000000;
			}
			.gh-button {
				background-color: $black-primary;
				background-image: none;
				a {
					background-color: $black-primary;
					background-image: none;
				}
			}
		}
	}
	.gh-button-container {
		display: inline-block;
		margin: 0 5px;
	}
	.gh-button {
		border-radius: 0.25em;
		border: 1px solid $black-primary;
		color: #24292e;
		cursor: pointer;
		display: inline-block;
		font-family: $base-font-primary;
		font-size: 12px;
		font-weight: 600;
		line-height: 20px;
		padding: 3px 10px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		vertical-align: middle;
		white-space: nowrap;
	}
	svg.octicon.octicon-star {
		display: inline-block;
		fill: currentColor;
		vertical-align: text-top;
	}
	.star {
		background-color: #ffffff;
		background-image: none;
		color: #000000;
		display: inline-block;
		fill: currentColor;
		vertical-align: text-top;
	}
	.fork {
		background-color: $black-primary;
		background-image: none;
		color: #ffffff;
		a:visited {
			color: #ffffff;
		}
	}
	@include lg {
		#burger {
			display: none;
		}
	}
}
</style>
