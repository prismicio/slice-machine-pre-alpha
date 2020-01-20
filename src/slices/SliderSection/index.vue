<template>
	<section class="ps ps-slider ps-slider--images ps-carousel">
		<div class="ps__wrap">
			<div class="ps__head">
				<header class="ps__header">
					<span class="ps__kicker">{{ slice.primary.eyebrow_headline }}</span>
					<h2 class="ps__title">{{ $prismic.asText(slice.primary.title) }}</h2>
				</header>
				<prismic-rich-text class="ps__desc" :field="slice.primary.description" />
			</div>

			<div class="ps__main grid grid--12">
				<div class="span-1-12">
					<!-- the crousel label should not have word "crousel" in it -->
					<div class="c-carousel" data-carousel data-aria-label="PROVIDE_LABEL">
						<!-- SR helper will be appended here from the JS to announce to SR users what items are now in view -->
						<div
							v-for="(item, i) in slice.items"
							:key="`data-carousel-card-${item}-${i + 1}`"
							class="c-carousel__cards-container"
							data-carousel-cards
						>
							<div class="c-carousel__cards-wrapper" data-carousel-cards-wrapper>
								<div class="c-carousel__card" data-carousel-card>
									<prismic-image
										class="c-carousel__card__img"
										:field="item.image"
										alt="icon alt or leave empty if decorational"
									/>
									<prismic-rich-text class="c-carousel__card__title" :field="item.title" />
									<prismic-rich-text class="c-carousel__card__content" :field="item.description" />
								</div>
							</div>
						</div>

						<div class="c-carousel__paddleNav" data-carousel-paddlenav hidden>
							<!-- paddleNav (prev and next buttons) provided here for flexibility (choose and use the icon you want) -->
							<button class="c-carousel__paddleNav__prev" aria-label="Previous" data-prev>
								<!-- place icon here -->
								<svg width="8" height="12" viewBox="0 0 8 12" aria-hidden="true" focusable="false">
									<g fill="none" fill-rule="evenodd">
										<path d="M-8-6h24v24H-8z" />
										<path
											fill="currentColor"
											fill-rule="nonzero"
											d="M7.41 10.59L2.83 6l4.58-4.59L6 0 0 6l6 6z"
										/>
									</g>
								</svg>
							</button>
							<button class="c-carousel__paddleNav__next" aria-label="Next" data-next>
								<!-- place icon here -->
								<svg width="8" height="12" viewBox="0 0 8 12" aria-hidden="true" focusable="false">
									<g fill="none" fill-rule="evenodd">
										<path d="M-8-6h24v24H-8z" />
										<path
											fill="currentColor"
											fill-rule="nonzero"
											d="M.59 10.59L5.17 6 .59 1.41 2 0l6 6-6 6z"
										/>
									</g>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	name: 'SliderSection',
	props: {
		slice: {
			validator: function({ slice_type: sliceType, primary, items }) {
				return sliceType && primary && items
			},
			default: function() {
				return {
					items: [1, 2, 3, 4],
					primary: {},
					type: 'carousel'
				}
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
.c-carousel {
	position: relative;
}

.c-carousel__cards-container {
	overflow-x: auto;
	overflow-y: hidden;
	-webkit-overflow-scrolling: touch;

	.js-carousel & {
		overflow: hidden;
	}
}

.c-carousel__cards-wrapper {
	white-space: nowrap;
	transition: transform 0.4s cubic-bezier(0.39, 0.03, 0.56, 0.57);
}

.c-carousel__card {
	width: 100%;
	text-align: center;
	margin-bottom: 1rem; // for no-js
	margin-right: 1.6rem; // for no-js
	white-space: normal;
	display: inline-block;

	@media all and (min-width: 640px) {
		width: 50%;
	}

	@media all and (min-width: 900px) {
		width: 33.3333%;
	}

	@media all and (min-width: 1200px) {
		width: 25%;
	}

	padding: 2.5rem 1.6rem;
	position: relative;

	&::after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		height: 100%;
		left: 0.8rem;
		width: calc(100% - 1.6rem);
		z-index: -1;
		background-color: var(--color--secondary);
		border-radius: 8px;
	}
}

.js-carousel {
	.c-carousel__container {
		overflow: hidden;
	}

	.c-carousel__cards-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		transition: transform 0.3s linear;
	}

	.c-carousel__card {
		margin: 0;
		flex-shrink: 0; // to make sure slides inside the flex container take up 100% of the container and don't shrink to their content size.
	}
}

.c-carousel__card__img {
	margin-bottom: var(--v-margin);
}

.c-carousel__card__title {
	font-size: 1rem;
}

.c-carousel__paddleNav {
	margin-top: 1.5rem;
	text-align: center;

	.js-carousel & {
		display: flex; // only override hidden attribute when JS is enabled, otherwise next/prev buttons are useless
		align-items: center;
		justify-content: center;

		@media all and (min-width: 50em) {
			margin-top: 0;
		}
	}

	.c-carousel__paddleNav__prev,
	.c-carousel__paddleNav__next {
		width: 2.75rem;
		height: 2.75rem;
		padding: 0.5rem;
		z-index: 2;
		top: 50%;

		border: 2px dotted transparent;
		border-radius: 50%;

		line-height: 0;

		@media all and (min-width: 64em) {
			position: absolute;
			margin-top: -1.375rem;
		}

		svg {
			width: 50%;
			height: auto;
			color: #000;
			transition: color 0.1s linear;
		}

		&[aria-disabled='true'] {
			svg {
				color: #ccc;
			}
		}

		svg {
			display: inline;
		}

		&:hover {
			svg {
				color: var(--color--primary);
			}
		}

		&[aria-disabled='true']:hover {
			svg {
				color: #ccc;
			}
		}

		&:focus,
		&:active {
			outline: none;
			border-color: currentColor;
		}

		&[aria-disabled='true']:focus {
			border-color: #ccc;
		}

		&:focus:not(:focus-visible) {
			border-color: transparent;
		}

		.js-focus-visible &:focus:not(.focus-visible) {
			border-color: transparent;
		}
	}

	.c-carousel__paddleNav__prev {
		left: -3.5rem;
	}

	.c-carousel__paddleNav__next {
		right: -3.5rem;
	}
}

/**************************************************\
 * Slider | Images component-specific styles.
 * Main general styles are in the _slider.scss file
 ***************************************************/

.ps-slider--images .c-slider__slide__figure {
	margin: 0;
	padding: 0;
	width: 100%;

	img {
		width: 100%;
	}

	figcaption {
		padding: var(--c-padding);
		max-width: 80ch;
		margin: 0 auto;
	}
}
</style>
