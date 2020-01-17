<template>
	<section class="auto-grid">
		<div class="text">
			<h2>{{ $prismic.asText(slice.primary.subtitle) }}</h2>
			<p class="home_body_text">{{ $prismic.asText(slice.primary.sub_description) }}</p>
		</div>
		<div>
			<video :src="slice.primary.video.url" controls />
		</div>
	</section>
</template>

<script>
export default {
	name: 'VideoBlock',
	props: {
		slice: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

.auto-grid {
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-gap: 4rem;

	* {
		width: 100%;

		video {
			object-fit: contain;
		}
	}

	@include lg {
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>
