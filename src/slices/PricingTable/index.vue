<template>
	<section class="ps ps-pricing-table">
		<div class="ps__wrap">
			<div class="ps__head">
				<header class="ps__header">
					<slot name="header">
						<span class="ps__kicker">Features</span>
						<h2 class="ps__title" aria-level>Choose a Plan</h2>
					</slot>
				</header>
				<div class="ps__desc">
					<p>
						Choose the plan that works for you and streamline your design
						process in an unlimited number of projects.
					</p>
				</div>
			</div>

			<div class="ps__main">
				<ol
					role="list"
					aria-label
					class="ps-pricing-table__options ps__card-list"
				>
					<li
						class="ps-pricing-table__option ps__card-item ps__card-item--full"
						v-for="(item, index) in slice.items"
						:key="`ps__card-item-${index + 1}`"
					>
						<article>
							<header>
								<h3
									class="ps-pricing-table__option__title ps__card-item__title"
								>
									Small
								</h3>
								<span class="ps-pricing-table__option__price">Free</span>
							</header>
							<prismic-rich-text
								class="ps__card-item__content"
								:field="item.features"
								:htmlSerializer="serialize"
							/>
							<div class="ps__card-item__cta">
								<a href="#" class="ps-button ps-button--secondary">
									Call to Action
								</a>
							</div>
						</article>
					</li>
				</ol>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	name: 'PricingTable',
	props: {
		slice: {
			validator({ slice_type: sliceType, primary, items }) {
				return sliceType && primary && items
			},
			default() {
				return {
					items: [],
					primary: {}
				}
			}
		}
	},
	data() {
		return {
			dataItems: [
				{
					features: [true, false, false]
				},
				{
					features: [true, true, false]
				}
			],
			featureIcon: `<svg
					class="feature-icon"
					aria-hidden="true"
					focusable="false"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g fill="none">
						<path d="M-2-2h24v24h-24z" />
						<path
							d="M10 0c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm-2 15l-5-5 1.41-1.41 3.59 3.58 7.59-7.59 1.41 1.42-9 9z"
							fill="currentColor"
							fill-rule="nonzero"
						/>
					</g>
				</svg>`,
			notIncludedIcon: `
				<svg
					class="feature-icon"
					aria-hidden="true"
					focusable="false"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g fill="none">
						<path d="M-2-2h24v24h-24z" />
						<path
							d="M5 9v2h10v-2h-10zm5-9c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
							fill="currentColor"
							fill-rule="nonzero"
						/>
					</g>
				</svg>`
		}
	},
	methods: {
		serialize(type, props, _, children) {
			if (type === 'list-item') {
				const notIncluded =
					props.spans && props.spans.find(e => e && e.type === 'label')
				const className = `ps-pricing-table__option__feature${
					notIncluded ? ' not-included' : ''
				}`
				return `<li class="${className}">${
					notIncluded ? this.notIncludedIcon : this.featureIcon
				} ${props.text}</li>`
			}
			if (type === 'group-list-item') {
				return `
					<ul role="list" class="ps-pricing-table__option__features" aria-label>
						${children.join('')}
					</ul>`
			}
		}
	}
}
</script>
<style lang="scss">
.ps-pricing-table__option {
	@media all and (min-width: 40em) {
		&:nth-of-type(2) {
			background-color: #fff;
			border: 1px solid;
		}
	}
}

.ps-pricing-table__option__price {
	display: block;
	color: var(--color-text-grey);
}

.ps-pricing-table__option__features {
	list-style: none;
	padding: 0;
}

.ps-pricing-table__option__feature {
	margin-bottom: 1em;
	padding-left: var(--h-padding);
	position: relative;

	.feature-icon {
		color: var(--color--primary);

		display: block;
		width: 1em;
		height: 1em;
		position: absolute;
		left: 0;
		top: 50%;
		margin-top: -0.5em;
	}

	// &::before {
	//     content: "";
	//     display: block;
	//     width: 1em;
	//     height: 1em;
	//     background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3Echeck_circle-24px%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cg fill='none'%3E%3Cpath d='M-2-2h24v24h-24z'/%3E%3Cpath d='M10 0c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm-2 15l-5-5 1.41-1.41 3.59 3.58 7.59-7.59 1.41 1.42-9 9z' fill='%2347C1AF' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E");
	//     background-repeat: no-repeat;
	//     background-size: 97% 97%;
	//     position: absolute;
	//     left: 0;
	//     top: 50%;
	//     margin-top: -.5em;
	// }

	&.not-included {
		// &::before {
		//     background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3Eremove_circle_outline-24px%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cg opacity='.4' fill='none'%3E%3Cpath d='M-2-2h24v24h-24z'/%3E%3Cpath d='M5 9v2h10v-2h-10zm5-9c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' fill='%23000' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E");
		// }

		.feature-icon {
			color: #888;
		}
	}
}
</style>
