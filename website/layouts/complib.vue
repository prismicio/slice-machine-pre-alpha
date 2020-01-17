<template>
	<div>
		<MainMenu />
		<Body variant="body--white">
			<div class="docs">
				<nav>
					<SliceList :comps-data="lst" />
				</nav>
				<main>
					<nuxt />
				</main>
			</div>
		</Body>
		<FooterMenu />
	</div>
</template>

<script>
import MainMenu from '@/components/menus/MainMenu'
import FooterMenu from '@/components/menus/FooterMenu'
import Body from '@/components/Body'
import SliceList from '@/components/menus/SliceList'

import * as Slices from '@/../src'
import { createSlice, sliceRoute } from '~/utils'

const lst = Object.keys(Slices)
	.filter(e => e !== 'SliceZone')
	.map(createSlice)
	.filter(e => e) // eslint-disable-line

export default {
	components: {
		...Slices,
		MainMenu,
		FooterMenu,
		Body,
		SliceList
	},
	data() {
		return {
			lst,
			slice: createSlice(this.$route.params.slug),
			exampleFolder: `${sliceRoute(this.$route.params.slug)}/examples/nuxt/`
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../style/variables.scss';

html {
	font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		Roboto, 'Helvetica Neue', Arial, sans-serif;
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
}
.docs {
	display: grid;
	grid-template-columns: [container-start] minmax(0, 1fr) [container-end];
	@include lg {
		padding-top: 44px;
		grid-template-areas: 'nav content';
		grid-template-columns: 200px minmax(200px, 1fr);
		grid-gap: 10px;
	}
}
nav {
	display: none;
	padding-bottom: 44px;
	@include lg {
		display: inline;
		grid-area: nav;
		margin-left: 0.5rem;
	}
}
main {
	padding: 44px 0 44px 0;
	@include lg {
		grid-area: content;
		padding: 0 0 44px 44px;
		border-left: 1px solid $grey-transparent;
	}
}
*,
*:before,
*:after {
	box-sizing: border-box;
	margin: 0;
}
</style>
