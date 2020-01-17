<template>
	<section class="box">
		<h2 class="adv-title">{{ $prismic.asText(slice.primary.slice_table_title) }}</h2>
		<div class="wrapper">
			<section v-for="(item, index) in slice.items" :key="'item-' + index" class="grid-items">
				<prismic-image :field="item.row_image" />
				<section class="adv-copy">
					<h3>{{ $prismic.asText(item.row_title) }}</h3>
					<p class="home_body_text">{{ $prismic.asText(item.row_description) }}</p>
				</section>
			</section>
		</div>
	</section>
</template>

<script>
export default {
	name: 'ProsBlock',
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

.box {
	border: 1px solid #000000;
	.adv-title {
		padding: 15px 0;
		text-align: center;
	}
}

.wrapper {
	border-top: 1px solid #000000;
	padding: 20px;

	* {
		width: 100%;

		img {
			min-width: 95px;
			min-height: 95px;
		}
	}

	.grid-items {
		display: flex;
		justify-content: center;
		padding: 20px 0;
		border-bottom: 1px solid #000000;

		&:first-child {
			padding-top: 0;
		}

		&:last-child {
			padding-bottom: 0;
			border-bottom: 0;
		}

		img {
			float: left;
			width: 95px;
			height: 95px;
		}
		.adv-copy {
			padding-left: 10px;
			h3 {
				font-size: 16px;
				margin-bottom: 10px;
			}
			p {
				font-size: 16px;
				line-height: 24px;
			}
		}
	}
}

@include lg {
	.wrapper {
		display: grid;
		grid-template-columns: repeat(1fr);
		border-top: 1px solid #000000;

		.grid-items {
			.adv-copy {
				padding-left: 0;
			}
			&:nth-child(1) {
				grid-column: 1 / 2;
				border-right: 1px solid #000000;
				padding: 0 20px 20px 0;
				img {
					margin: 0 20px 0 0;
				}
			}
			&:nth-child(2) {
				grid-column: 2 / 2;
				padding: 0 0 20px 0;
				img {
					margin: 0 20px 20px 20px;
				}
			}
			&:nth-child(3) {
				grid-column: 1 / 2;
				border-right: 1px solid #000000;
				margin: 0 0 20px 0;
				padding: 20px 20px 0 0;
				border-bottom: 0;
				img {
					margin: 0 20px 20px 0;
				}
			}
			&:nth-child(4) {
				grid-column: 2 / 2;
				margin: 0 0 20px 0;
				padding: 20px 0 0 0;
				border-bottom: 0;
				img {
					margin: 0 20px 20px 20px;
				}
			}
			&:nth-child(5) {
				border-top: 1px solid #000000;
				img {
					margin: 0 20px 0 0;
				}
			}
			&:last-child {
				padding: 20px 0 0 0;
				grid-column: 1 /4;
			}
		}
	}
}
</style>
