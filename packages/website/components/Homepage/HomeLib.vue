<template>
	<section class="card-section">
		<h3 class="card-section-title">
			{{ $prismic.asText(slice.primary.card_box_title) }}
		</h3>
		<prismic-rich-text
			:field="slice.primary.card_box_description"
			class="card-section-description"
		/>
		<row class="homerows">
			<Card v-for="card in lst" :key="card.displayName" v-bind="card" />
		</row>
		<row class="homerows">
			<div class="button">
				<prismic-link :field="slice.primary.button_link">
					{{ slice.primary.button_label }}
				</prismic-link>
			</div>
		</row>
	</section>
</template>

<script>
import * as Slices from '@slice-machine/vue-essentials'
import { createSlice } from '~/utils'
import Card from '@/components/Card'
import Row from '@/components/Row'

const lst = Object.keys(Slices)
	.map(createSlice)
  .filter(e => e) // eslint-disable-line

export default {
	name: 'HomeLib',
	components: {
		...Slices,
		Card,
		Row
	},
	props: {
		slice: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		lst
	})
}
</script>

<style lang="scss" scoped>
@import '../../style/_global';
.homerows {
	padding: 25px 0;
}

.card-section {
	margin: 0 auto;
	.card-section-description {
		font-size: 18px;
		line-height: 34px;
	}
	.button {
		margin: 0 auto;
		width: 250px;
		height: 70px;
		font-size: 20px;
		line-height: 24px;
		display: grid;
		a {
			text-decoration: none;
		}
	}
}
</style>
