<template>
	<div>
		<h3 class="card-section-title">
			{{ slice.meta.title }}
		</h3>
		<p class="card-section-description">
			{{ slice.meta.description }}
		</p>
    <nuxt-link :to=“`/examples/nuxt/${slice.displayName}`“>
      <img :src=“`/components/${slice.displayName}.png`” />
    </nuxt-link>
		<MarkDownBox
			id="markdown-box"
			:edit-url="createEditUrl()"
			style="min-height: 80vh; margin-top: 4em; word-spacing: 0px;"
		>
			{{ slice.readme }}
		</MarkDownBox>
		<div
			v-if="hasSandbox"
			style="width: 100%; margin-top: 3em;"
			v-html="sandbox"
		/>
	</div>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

import * as Slices from '@/../src/slices'
import { createSlice, sliceRoute } from '~/utils'

import MarkDownBox from '@/components/MarkDownBox'

const lst = Object.keys(Slices)
	.filter(e => e !== 'SliceZone')
	.map(createSlice)
	.filter(e => e) // eslint-disable-line

export default {
	layout: 'compdocs',
	components: {
		...Slices,
		MarkDownBox
	},
	async fetch({ store }) {
		await store.dispatch('slices/init')
	},
	async asyncData({ params, error, req }) {
		try {
			// Fetching the API object
			const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

			// Query to get the main menu content
			let document = {}
			const page = await api.getSingle('sample_pages')
			document = page.data

			return {
				// Page content
				document
			}
		} catch (e) {
			error({ statusCode: 404, message: 'Page not found' })
		}
	},
	data() {
		return {
			lst,
			slice: createSlice(this.$route.params.slug),
			exampleFolder: `${sliceRoute(this.$route.params.slug)}/examples/nuxt/`
		}
	},
	computed: {
		hasSandbox: ({ slice, $router }) =>
			$router.resolve({ name: `examples-${slice.displayName}` }).href !== '/',
		sandbox: ({ slice: { displayName } }) =>
			`<iframe src="https://codesandbox.io/embed/github/hypervillain/community/tree/master/?autoresize=1&fontsize=14&initialpath=%2Fexamples%2F${displayName}&module=%2Fwebsite%2Fpages%2Fexamples%2F${displayName}.vue&moduleview=0" title="community" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>`
	},
	methods: {
		createEditUrl() {
			const base =
				'https://github.com/prismicio/slice-machine/tree/master/src/slices/'
			return `${base}${this.slice.displayName}/README.md`
		}
	},
	validate: ({ params: { slug } }) =>
		process.env.NODE_ENV === 'production' ? createSlice(slug) !== null : true
}
</script>

<style lang="scss" scoped>
@import '../../style/_global';

img {
	max-width: 100%;
}
.subtitle {
	font-weight: 300;
	font-size: 42px;
	color: #526488;
	word-spacing: 5px;
	padding-bottom: 15px;
}

.links {
	padding-top: 15px;
}
</style>
