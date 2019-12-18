<template>
	<main>
		<call-to-action :slice="CallToActionMock" />
		<faq-section id="faq-0" :slice="FaqSectionMock" />
		<VideoHighlights :slice="VideoHighlightsMock" />
		<PricingTable :slice="document.body[0]" />
		<CustomerLogos :slice="CustomerLogosMock" />
	</main>
</template>
<script>
import Prismic from 'prismic-javascript'

import HeroMock from '@/../src/slices/HeroSection/mock.json'
import HeroSection from '@/../src/slices/HeroSection'

import FaqSection from '@/../src/slices/FaqSection'
import VideoHighlights from '@/../src/slices/VideoHighlights'
import CustomerLogos from '@/../src/slices/CustomerLogos'
import VideoHighlightsMock from '@/../src/slices/VideoHighlights/mock.json'
import FaqSectionMock from '@/../src/slices/FaqSection/mock.json'
import CustomerLogosMock from '@/../src/slices/CustomerLogos/mock.json'

import PricingTable from '@/../src/slices/PricingTable'
import PricingTableMock from '@/../src/slices/PricingTable/mock.json'

import CallToAction from '@/../src/slices/CallToAction'
import CallToActionMock from '@/../src/slices/CallToAction/mock.json'

const FaqMockAlt = { ...FaqSectionMock }

export default {
	components: {
		CallToAction,
		HeroSection,
		FaqSection,
		VideoHighlights,
		CustomerLogos,
		PricingTable
	},
	data() {
		return {
			CallToActionMock,
			HeroMock,
			FaqSectionMock,
			FaqMockAlt,
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
			console.log(JSON.stringify(result.data))
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
@import '@/../src/stylesAttempt/global/styles.scss';
@import '@/../src/stylesAttempt/styles.scss';
</style>
