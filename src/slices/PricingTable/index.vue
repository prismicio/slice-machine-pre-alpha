<template>
	<section class="ps ps-pricing-table">
		<div class="ps__wrap">
			<div class="ps__head">
				<header class="ps__header">
					<span
						v-if="slice.primary.eyebrow_headline"
						class="ps__kicker"
					>{{ slice.primary.eyebrow_headline }}</span>
					<h2
						v-if="slice.primary.title"
						class="ps__title"
						aria-level="2"
					>{{ $prismic.asText(slice.primary.title) }}</h2>
				</header>
				<div v-if="slice.primary.description" class="ps__desc">
					<p>{{ $prismic.asText(slice.primary.description) }}</p>
				</div>
			</div>
			<div class="ps__main">
				<ol role="list" aria-label class="ps-pricing-table__options ps__card-list">
					<li
						class="ps-pricing-table__option ps__card-item ps__card-item--full"
						v-for="(item, index) in slice.items"
						:key="`ps__card-item-${index + 1}`"
					>
						<article>
							<header v-if="item.plan_title">
								<h3 class="ps-pricing-table__option__title ps__card-item__title">{{ item.plan_title }}</h3>
								<span class="ps-pricing-table__option__price">{{ item.price_option }}</span>
							</header>
							<prismic-rich-text
								class="ps__card-item__content"
								:field="item.features"
								:htmlSerializer="listSerializer"
							/>
							<div v-if="item.call_to_action && item.call_to_action_text" class="ps__card-item__cta">
								<prismic-link
									:field="item.call_to_action"
									class="ps-button ps-button--secondary"
								>{{ item.call_to_action_text }}</prismic-link>
							</div>
						</article>
					</li>
				</ol>
			</div>
		</div>
	</section>
</template>
<script>
import { featureIcon, notIncludedIcon } from './icons'

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
	methods: {
		listSerializer(type, props, _, children) {
			if (type === 'list-item') {
				const isNotIncluded =
					props.spans &&
					props.spans.find(e => e && e.data.label === 'not-included')
				const className = `ps-pricing-table__option__feature${
					isNotIncluded ? ' not-included' : ''
				}`
				return `<li class="${className}">${
					isNotIncluded ? notIncludedIcon : featureIcon
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
		&:nth-of-type(2n) {
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
