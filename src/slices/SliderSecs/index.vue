<template>
	<div
		class="c-carousel js-carousel"
		data-carousel
		role="group"
		aria-roledescription="Carousel"
		data-aria-label="Carousel with content"
	>
		<span
			aria-live="polite"
			class="sr-only c-carousel__SRHelper"
		>Showing carousel items {{ Array(itemsInView).fill(1).map((_, i) => i + leftCounter + 1).join(',') }} of 9</span>
		<div class="c-carousel__cards-container" data-carousel-cards ref="carouselContainer">
			<div
				:style="`transform: ${cardsWrapperStyle}`"
				class="c-carousel__cards-wrapper"
				data-carousel-cards-wrapper
			>
				<slot name="content" v-bind="slice" />
			</div>
		</div>

		<div class="c-carousel__paddleNav" data-carousel-paddlenav hidden>
			<button
				@click="slideBack"
				class="c-carousel__paddleNav__prev"
				aria-label="Previous"
				data-prev
				:aria-disabled="leftCounter === 0"
				:tabindex="leftCounter === 0 ? '-1' : '0'"
			>
				<svg width="8" height="12" viewBox="0 0 8 12" aria-hidden="true" focusable="false">
					<g fill="none" fill-rule="evenodd">
						<path d="M-8-6h24v24H-8z" />
						<path fill="currentColor" fill-rule="nonzero" d="M7.41 10.59L2.83 6l4.58-4.59L6 0 0 6l6 6z" />
					</g>
				</svg>
			</button>
			<button
				@click="slideForward"
				class="c-carousel__paddleNav__next"
				aria-label="Next"
				data-next
				:aria-disabled="(leftCounter + itemsInView) === slice.items.length"
				:tabindex="(leftCounter + itemsInView) === slice.items.length ? '-1' : '0'"
			>
				<svg width="8" height="12" viewBox="0 0 8 12" aria-hidden="true" focusable="false">
					<g fill="none" fill-rule="evenodd">
						<path d="M-8-6h24v24H-8z" />
						<path fill="currentColor" fill-rule="nonzero" d="M.59 10.59L5.17 6 .59 1.41 2 0l6 6-6 6z" />
					</g>
				</svg>
			</button>
		</div>
	</div>
</template>
<script>
export default {
	name: 'SliderSection',
	props: {
		slice: {
			validator({ slice_type: sliceType, primary, items }) {
				return sliceType && primary && items
			},
			default() {
				return {
					items: [],
					primary: {},
					type: 'carousel'
				}
			}
		}
	},
	data() {
		return {
			cardsWrapperStyle: '',
			leftCounter: 0,
			rightCounter: 0,
			itemsOutOfView: 0,
			itemsInView: 0,
			timeout: false
		}
	},
	computed: {
		darkMode() {
			return this.slice && this.slice.slice_label === 'dark_mode'
		}
	},
	created() {
		if (process.client) {
			window.addEventListener('resize', this.onWindowResize)
		}
	},
	mounted() {
		this.updateState()
	},
	destroyed() {
		window.removeEventListener('resize', this.onWindowResize)
	},
	methods: {
		onWindowResize() {
			clearTimeout(this.timeout)
			this.timeout = setTimeout(this.updateState, '300')
		},
		slideBack() {
			this.rightCounter =
				this.rightCounter < this.itemsOutOfView
					? ++this.rightCounter
					: this.rightCounter
			this.leftCounter = this.leftCounter > 0 ? --this.leftCounter : 0

			this.slideCards()
		},
		slideForward() {
			if (this.rightCounter > 0) {
				--this.rightCounter
			}
			if (this.leftCounter < this.itemsOutOfView) {
				++this.leftCounter
			}
			this.slideCards()

			// console.log('---')
			// console.log('Items in view: ' + this.itemsInView)
			// console.log('Items out of view: ' + this.itemsOutOfView)
			// console.log('right counter: ' + this.rightCounter)
			// console.log('left counter: ' + this.leftCounter)
		},
		slideCards() {
			const translateValue = this.leftCounter * (100 / this.itemsInView) * -1
			this.cardsWrapperStyle = 'translateX(' + translateValue + '%)'
		},
		updateState() {
			console.log('-- update state')
			if (!this.$refs.items) {
				return
			}
			const card = this.$refs.items[0]
			const carouselContainer = this.$refs.carouselContainer
			const cardWidth = card.offsetWidth
			const containerWidth = carouselContainer.offsetWidth
			this.itemsInView = Math.round(containerWidth / cardWidth)
			this.itemsOutOfView = this.slice.items.length - this.itemsInView
			this.rightCounter = this.itemsOutOfView
			this.leftCounter = 0
			// handlePaddleButtonsState()
			// updateHelper()
			this.slideCards()
		}
	}
}
</script>

<style lang="scss">
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
	margin-bottom: 1rem;
	margin-right: 1.6rem;
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
		align-items: stretch;
	}

	.c-carousel__card {
		margin: 0;
		justify-content: space-between;
		display: flex;
		flex-direction: column;
		flex-shrink: 0; // to make sure slides inside the flex container take up 100% of the container and don't shrink to their content size.
	}
}

.c-carousel__card__img {
	margin-bottom: var(--v-margin);
}

.c-carousel__card__title > h1,
h2,
h3 {
	font-size: 1rem;
	margin-bottom: 1em;
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
