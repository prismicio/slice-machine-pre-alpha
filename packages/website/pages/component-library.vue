<template>
	<main>
		<MainMenu :menu="menuContent" />
		<Body class="body--white">
			<h3 class="card-section-title">
				{{ $prismic.asText(pageContent.page_title) }}
			</h3>
			<p class="card-section-description">
				{{ $prismic.asText(pageContent.page_description) }}
			</p>
			<row class="homerows">
				<Card v-for="card in lst" :key="card.displayName" v-bind="card" />
			</row>
		</Body>
		<FooterMenu :menu="menuContent" />
	</main>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'
import MainMenu from '@/components/MainMenu'
import FooterMenu from '@/components/FooterMenu'

import * as Slices from '@slice-machine/vue-essentials'
import { createSlice } from '~/utils'
import Card from '@/components/Card'
import Body from '@/components/Body'
import Row from '@/components/Row'

const lst = Object.keys(Slices)
	.map(createSlice)
  .filter(e => e) // eslint-disable-line

export default {
	name: 'HomeLib',
	components: {
		...Slices,
		Card,
		Body,
		Row,
		MainMenu,
		FooterMenu
	},
	data: () => ({
		lst
	}),
	async asyncData({ params, error, req }) {
		try {
			// Fetching the API object
			const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

			// Query to get the page content
			let pageContent = {}
			const page = await api.getByUID('page', 'component-library')
			pageContent = page.data

			// Query to get the menu content
			let menuContent = {}
			const menu = await api.getByUID('menu', 'main_menu')
			menuContent = menu.data

			// Load the edit button
			if (process.client) window.prismic.setupEditButton()

			return {
				// Page
				pageContent,
				// Menu
				menuContent
			}
		} catch (e) {
			error({ statusCode: 404, message: 'Page not found' })
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../style/_global';

.homerows {
	padding: 25px 0;
}

.card-section {
	margin: 0 auto;
	&-description {
		margin: 0 auto;
		font-size: 20px;
		line-height: 34px;
		font-family: $base-font-primary;
	}
	.button {
		margin: 0 auto;
		width: 250px;
		height: 70px;
		font-size: 20px;
		line-height: 24px;
		display: grid;
	}
}
</style>
