<template>
	<Body variant="grey">
		<div class="banner-content">
			<!-- <prismic-image :field="slice.primary.banner_image" /> -->
			<prismic-rich-text :field="slice.primary.banner_title" />
			<prismic-rich-text :field="slice.primary.banner_text" />
		</div>
	</Body>
</template>

<script>
import Body from '@/components/Body'

export default {
	name: 'BannerSlice',
	components: {
		Body
	},
	props: {
		slice: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>


.banner-content {
	max-width: 450px;
	min-height: 240px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>
