<template>
	<section class="grid">
		<div>
			<prismic-image class="side-img-sm" :field="slice.primary.graphic.small_main" />
			<prismic-image class="side-img-lg" :field="slice.primary.graphic" />
		</div>
		<div>
			<h2>{{ $prismic.asText(slice.primary.subtitle) }}</h2>
			<prismic-rich-text :field="slice.primary.sub_description" class="home_body_text" />
		</div>
	</section>
</template>

<script>
export default {
	name: 'GraphicBlock',
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

.grid {
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-gap: 4rem;

	* {
		width: 100%;

		img {
			object-fit: contain;
		}
	}

	@include lg {
		grid-template-columns: repeat(2, 1fr);
	}
}
.side-img-sm {
	display: block;
	visibility: hidden;
	@include lg {
		display: none;
	}
}
.side-img-lg {
	display: none;
	@include lg {
		display: block;
	}
}
</style>
