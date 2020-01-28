<template>
	<main>
		<VideoHighlights :slice="VideoHighlightsMock" />
		{{ document.body.find(e => e.slice_type === 'video_highlights') }}
	</main>
</template>
<script>
import Prismic from 'prismic-javascript'

import FaqSection from '@/../src/slices/FaqSection'
import PsFaqMock from '@/../src/slices/FaqSection/mock.json'

import VideoHighlights from '@/../src/slices/VideoHighlights'
import CustomerLogos from '@/../src/slices/CustomerLogos'
import VideoHighlightsMock from '@/../src/slices/VideoHighlights/mock.json'
import CustomerLogosMock from '@/../src/slices/CustomerLogos/mock.json'

import PricingTable from '@/../src/slices/PricingTable'
import PricingTableMock from '@/../src/slices/PricingTable/mock.json'

import CallToAction from '@/../src/slices/CallToAction'
import CallToActionMock from '@/../src/slices/CallToAction/mock.json'

import SliceZone from '@/utils/SliceZone'

export default {
	layout: 'example',
	components: {
		CallToAction,
		FaqSection,
		VideoHighlights,
		CustomerLogos,
		PricingTable,
		SliceZone
	},
	data() {
		return {
			CallToActionMock,
			PsFaqMock,
			VideoHighlightsMock,
			CustomerLogosMock,
			PricingTableMock
		}
	},
	async asyncData({ error, req }) {
		try {
			const apiEndpoint = 'https://slicesexamples.prismic.io/api/v2'
			const api = await Prismic.getApi(apiEndpoint, { req })
			const result = await api.getByUID('example', 'pricing-table')

			console.log(JSON.stringify(result.data.body[0]))
			return {
				document: result.data
			}
		} catch (e) {
			error({ statusCode: 404, message: 'Document not found' })
		}
	}
}
</script>
<style lang="scss">
@import '@/../src/styles/styles.scss';
</style>
