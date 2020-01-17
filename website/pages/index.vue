<template>
	<main>
		<section
			class="banner-bg"
			:style="{
        backgroundImage: `url('${document.banner_background.url}')`
      }"
		>
			<Container justify="space-around">
				<HomeBanner :document="document" />
			</Container>
		</section>
		<Body class="body--white home-body-img" :style="imageVars">
			<Row v-for="(slice, index) in websiteSlices" :key="'slice-' + index" class="homerows">
				<GraphicBlock v-if="slice.slice_type === 'image_with_description'" :slice="slice" />
				<VideoBlock v-if="slice.slice_type === 'video_block'" :slice="slice" />
				<ProsBlock v-if="slice.slice_type === 'slice_table'" :slice="slice" />
				<HomeLib v-if="slice.slice_type === 'cards'" :slice="slice" />
			</Row>
		</Body>
	</main>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'
import Container from '@/components/Container'

import HomeBanner from '@/components/Homepage/HomeBanner'
import GraphicBlock from '@/components/Homepage/TextGraphic'
import VideoBlock from '@/components/Homepage/VideoBlock'
import ProsBlock from '@/components/Homepage/ProsBlock'
import HomeLib from '@/components/Homepage/HomeLib'

import Body from '@/components/Body'
import Row from '@/components/Row'

export default {
	components: {
		HomeBanner,
		Container,
		GraphicBlock,
		VideoBlock,
		ProsBlock,
		HomeLib,
		Body,
		Row
	},
	async asyncData({ params, error, req }) {
		try {
			// Fetching the API object
			const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

			// Query to get the home page content
			let document = {}
			const result = await api.getSingle('home')
			document = result.data

			return {
				// Page content
				document,
				documentId: result.id,

				// Set slices as variable
				websiteSlices: document.body,
				smallBg: document.body.find(
					x => x.slice_type === 'image_with_description'
				).primary.graphic.small_main.url
			}
		} catch (e) {
			error({ statusCode: 404, message: 'Homepage not found' })
		}
	},
	computed: {
		imageVars() {
			return {
				'--bg-image': `url(${this.smallBg})`
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../style/variables.scss';

.banner-bg {
	background: no-repeat;
	background-size: 0;
	background-position: left;
	background-origin: content-box;
	padding-top: 22px;
	@include lg {
		background-size: 88%;
	}
	@include rwd(1724) {
		background-position: center;
		background-size: 1342px;
	}
}

.home-body-img {
	background: var(--bg-image) no-repeat content-box;
	background-size: contain;
	padding-top: 50px;
	@include lg {
		background: none;
		padding-top: inherit;
	}
}

.homerows {
	padding: 50px 0;
}
</style>
