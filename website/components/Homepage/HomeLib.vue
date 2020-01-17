<template>
	<section class="card-section">
		<h2 class="card-section-title">{{ $prismic.asText(slice.primary.card_box_title) }}</h2>
		<prismic-rich-text :field="slice.primary.card_box_description" class="card-section-description" />
		<Row class="card-section-library">
			<Grid columns="3">
				<Card
					v-for="card in lst.slice(0, 3)"
					:key="card.displayName"
					v-bind="card"
					columns="3col"
					class="multiCards"
				/>
			</Grid>
			<Card v-for="card in lst.slice(0, 1)" :key="card.displayName" v-bind="card" class="singeCard" />
		</Row>
		<Button variant="text-white">
			<prismic-link :field="slice.primary.button_link">{{ slice.primary.button_label }}</prismic-link>
		</Button>
	</section>
</template>

<script>
import * as Slices from '@/../src'
import { createSlice } from '~/utils'
import Card from '@/components/Card'
import Row from '@/components/Row'
import Grid from '@/components/Grid'
import Button from '@/components/Button'

const lst = Object.keys(Slices)
	.filter(e => e !== 'SliceZone')
	.map(createSlice)
	.filter(e => e) // eslint-disable-line

export default {
	name: 'HomeLib',
	components: {
		...Slices,
		Card,
		Row,
		Grid,
		Button
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
@import '../../style/variables.scss';

.card-section {
	width: 100%;
	margin: 0 auto;
	display: grid;
	grid-template-columns: [container-start] minmax(0, 1fr) [container-end];
	&-title {
		text-align: left;
		@include md {
			text-align: center;
		}
	}
	&-description {
		max-width: 800px;
		text-align: left;
		margin: 0 auto;
		font-size: 18px;
		line-height: 34px;
		@include md {
			text-align: center;
		}
	}
	&-library {
		margin-bottom: 50px;
	}
	.button {
		margin: 0 auto;
		width: 100%;
		height: 70px;
		font-size: 20px;
		line-height: 24px;
		-webkit-transition: width 1s;
		transition: width 1s;
		a {
			text-decoration: none;
		}
		@include xl {
			width: 250px;
		}
	}
}
.multiCards {
	display: none;
	@include xl {
		display: inline;
	}
}
.singeCard {
	display: inline;
	@include xl {
		display: none;
	}
}
</style>
