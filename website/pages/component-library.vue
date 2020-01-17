<template>
	<div>
		<prismic-rich-text :field="document.page_title" />
		<prismic-rich-text :field="document.page_description" class="card-section-description" />
		<Row>
			<Grid columns="2">
				<Card v-for="card in lst" :key="card.displayName" v-bind="card">
					<template v-slot:description>
						<span style="visible: none"></span>
					</template>
				</Card>
			</Grid>
		</Row>
	</div>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

import * as Slices from '@/../src'
import { createSlice } from '~/utils'
import Card from '@/components/Card'
import Grid from '@/components/Grid'
import Row from '@/components/Row'

const lst = Object.keys(Slices)
	.filter(e => e !== 'SliceZone')
	.map(createSlice)
	.filter(e => e) // eslint-disable-line

export default {
	name: 'HomeLib',
	layout: 'complib',
	components: {
		...Slices,
		Card,
		Grid,
		Row
	},
	async asyncData({ params, error, req }) {
		try {
			// Fetching the API object
			const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

			// Query to get the page content
			let document = {}
			const page = await api.getSingle('component_library')
			document = page.data

			return {
				// Page
				document
			}
		} catch (e) {
			error({ statusCode: 404, message: 'Page not found' })
		}
	},
	data: () => ({
		lst
	})
}
</script>

<style lang="scss" scoped>
@import '../style/_global';

.card-section {
	margin: 0 auto;
	&-description {
		margin: 0 auto;
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
