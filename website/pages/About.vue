<template>
	<main>
		<!-- Slice section template -->
		<div v-for="(slice, index) in sliceContent" :key="'slice-' + index">
			<!-- Text slice component -->
			<Container v-if="slice.slice_type === 'text'">
				<TextSlice :slice="slice" />
			</Container>
			<!-- Text slice component -->
			<Container v-if="slice.slice_type === 'title'">
				<TitleSlice :slice="slice" />
			</Container>
			<!-- Image component -->
			<FullWidthImage v-else-if="slice.slice_type === 'image'" :slice="slice" />
			<!-- Banner component -->
			<div class="banner" v-else-if="slice.slice_type === 'banner'">
				<BannerSlice :slice="slice" />
			</div>
		</div>
	</main>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

const Container = () => import('../components/Container.vue')
// Imports for all slices
const TextSlice = () => import('../components/Pages/TextSlice.vue')
const TitleSlice = () => import('../components/Pages/TitleSlice.vue')
const FullWidthImage = () => import('../components/Pages/FullWidthImage.vue')
const BannerSlice = () => import('../components/Pages/BannerSlice.vue')

export default {
	components: {
		Container,
		TextSlice,
		TitleSlice,
		FullWidthImage,
		BannerSlice
	},
	async asyncData({ params, error, req }) {
		try {
			// Fetching the API object
			const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

			// Query to get the side menu content
			let document = {}
			const page = await api.getByUID('page', 'about')
			document = page.data

			return {
				// Page content
				document,
				// Slices
				sliceContent: document.body
			}
		} catch (e) {
			error({ statusCode: 404, message: 'Page not found' })
		}
	}
}
</script>

<style lang="scss" scoped>
main {
	padding-bottom: 44px;
}
.banner {
	padding-bottom: 44px;
}
img {
	max-width: 100%;
}
</style>
