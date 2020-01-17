<template>
	<section class="banner">
		<div class="site-intro">
			<!-- <prismic-rich-text :field="document.title" /> -->
			<h1 class="site-intro-title">Slİcemachİne</h1>
			<!-- <div class="clipboard" @click.stop.prevent="copyCommand">
				<prismic-rich-text class="embed-text" :field="document.copy_paste_embed" />
				<img src="../../static/clipboard.svg" />
				<input id="command-to-copy" type="hidden" :value="document.copy_paste_embed[0].text" />
			</div>-->
			<p class="site-intro-description">{{ document.description[0].text }}</p>
			<div class="site-intro-cta">
				<prismic-link
					:field="document.button_1_link"
					class="site-intro-cta-button"
				>{{ document.button_1_label }}</prismic-link>
				<prismic-link
					:field="document.button_2_link"
					class="site-intro-cta-button"
				>{{ document.button_2_label }}</prismic-link>
			</div>
			<!-- <prismic-rich-text :field="document.small_description" class="site-intro-tagline" /> -->
		</div>
	</section>
</template>

<script>
export default {
	name: 'HomeBanner',
	props: {
		document: {
			type: Object,
			required: true
		}
	},
	methods: {
		copyCommand() {
			const commandToCopy = document.querySelector('#command-to-copy')
			commandToCopy.setAttribute('type', 'text')
			commandToCopy.select()

			try {
				const successful = document.execCommand('copy')
				const msg = successful ? 'successful' : 'unsuccessful'
				alert('Command was copied ' + msg)
			} catch (err) {
				alert('Oops, unable to copy')
			}

			/* unselect the range */
			commandToCopy.setAttribute('type', 'hidden')
			window.getSelection().removeAllRanges()
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

.banner {
	height: 288px;
	padding-top: 12px;
	@include md {
		padding-top: 44px;
	}
	@include lg {
		max-width: 450px;
		height: 500px;
		max-height: 582px;
	}
	@include xl {
		max-width: 540px;
		height: 576px;
	}
}
.site-intro {
	padding-top: 12px;
	@include lg {
		padding-top: 58px;
	}
	&-title {
		text-transform: uppercase;
		font-weight: 800;
		@include xl {
			font-size: 60px;
			line-height: 71px;
		}
	}
	&-description {
		font-size: 20px;
		line-height: 34px;
		color: $text-primary;
		margin: 10px 0 20px 0;
		@include lg {
			max-width: 530px;
		}
		@include xl {
			font-size: 24px;
			line-height: 40px;
		}
	}
	&-cta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		width: 100%;
		&-button {
			margin: 0 10px 20px 0;
			padding: 10px 12px;
			background-color: $black-primary;
			border-radius: 5px;
			width: 100%;
			text-align: center;
			font-size: 13px;
			color: #ffffff;
			font-weight: bold;
			text-decoration: none;
			&:hover {
				text-decoration: none;
				background-color: $black-secondary;
			}
			@include sm {
				font-size: 16px;
			}
		}
		@include sm {
			width: 80%;
			font-size: 16px;
		}
	}
	// &-tagline {
	// 	font-size: 16px;
	// 	line-height: 24px;
	// 	color: $text-primary;
	// 	@include lg {
	// 		max-width: 430px;
	// 	}
	// }
}
// .clipboard {
// 	display: flex;
// 	justify-content: space-between;
// 	color: #ffffff;
// 	background-color: $black-primary;
// 	border-radius: 5px;
// 	padding: 20px;
// 	margin: 20px 0;
// 	cursor: pointer;
// 	max-width: 400px;
// 	img {
// 		display: none;
// 		max-height: 20px;
// 		@include rwd(400) {
// 			margin-left: 30px;
// 			display: inline-block;
// 		}
// 	}
// 	.embed-text {
// 		text-align: center;
// 		font-size: 13px;
// 		@include sm {
// 			font-size: 16px;
// 		}
// 	}
// 	&:hover {
// 		background-color: $black-secondary;
// 	}
// }
</style>
