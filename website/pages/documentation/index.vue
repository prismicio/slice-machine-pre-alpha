<template>
	<section>
		<!-- Slice section template -->
		<div v-for="(slice, index) in sliceContent" :key="'slice-' + index">
			<!-- Text slice component -->
			<TextSlice v-if="slice.slice_type === 'text'" :slice="slice" />
			<!-- Text slice component -->
			<TitleSlice v-if="slice.slice_type === 'title'" :slice="slice" />
			<!-- Image component -->
			<FullWidthImage v-if="slice.slice_type === 'image'" :slice="slice" />
			<!-- Banner component -->
			<BannerSlice v-if="slice.slice_type === 'banner'" :slice="slice" />
			<!-- Code Snippet component -->
			<CodeSlice v-else-if="slice.slice_type === 'code'" :slice="slice" />
		</div>
	</section>
</template>

<script>
// Imports for all slices
const TextSlice = () => import('../../components/Pages/TextSlice.vue')
const TitleSlice = () => import('../../components/Pages/TitleSlice.vue')
const FullWidthImage = () => import('../../components/Pages/FullWidthImage.vue')
const BannerSlice = () => import('../../components/Pages/BannerSlice.vue')
const CodeSlice = () => import('../../components/Pages/CodeSlice.vue')

export default {
	name: 'page',
	layout: 'docs',
	components: {
		TextSlice,
		TitleSlice,
		FullWidthImage,
		BannerSlice,
		CodeSlice
	},
	async asyncData({ $prismic, params, error }) {
		try {
			const document = (await $prismic.api.getByUID('page', 'documentation'))
				.data
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
img {
	max-width: 100%;
}
</style>
