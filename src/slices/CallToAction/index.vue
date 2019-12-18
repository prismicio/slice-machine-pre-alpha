<template>
	<section :class="`ps${darkMode ? ' ps--black' : ''} ps-cta`">
		<div class="ps__wrap">
			<div class="ps__head">
				<header class="ps__header">
					<slot name="header" v-bind="slice.primary">
						<prismic-image
							v-if="slice.primary.icon_image"
							aria-hidden="true"
							class="ps__kicker-icon"
							:field="slice.primary.icon_image"
						/>
						<h2
							v-if="slice.primary.title"
							class="ps__title h1 text--4xl"
							aria-level="2"
						>
							{{ $prismic.asText(slice.primary.title) }}
						</h2>
					</slot>
				</header>
				<div v-if="slice.primary.paragraph" class="ps__desc text--xl">
					<p>
						{{ $prismic.asText(slice.primary.paragraph) }}
					</p>
				</div>
				<slot name="cta" v-bind="slice.primary">
					<prismic-link
						class="ps-cta ps-button ps-button--primary"
						:field="slice.primary.button_link"
					>
						{{ slice.primary.button_label }}
					</prismic-link>
				</slot>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	name: 'CallToAction',
	props: {
		slice: {
			validator: function(value) {
				return value.slice_type
			},
			default: function() {
				return {}
			}
		}
	},
	computed: {
		darkMode: function() {
			return this.slice && this.slice.slice_label === 'dark_mode'
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../stylesAttempt/styles.scss';
.ps-cta {
	text-align: center;
}

.ps-cta .ps-button {
	@media all and (min-width: 30em) {
		display: inline-block;
		margin-top: var(--h-padding);
	}
}
</style>
