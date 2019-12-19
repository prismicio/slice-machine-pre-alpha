<template>
	<section class="banner">
		<div class="call_to_action">
			<!-- <prismic-rich-text :field="document.title" /> -->
			<HomeTitle />
			<prismic-rich-text
				:field="document.description"
				class="big_description"
			/>
			<div class="clipboard" @click.stop.prevent="copyCommand">
				<prismic-rich-text :field="document.copy_paste_embed" />
				<img src="../../static/clipboard.png" />
				<input
					id="command-to-copy"
					type="hidden"
					:value="document.copy_paste_embed[0].text"
				/>
			</div>
			<prismic-rich-text
				:field="document.small_description"
				class="small_description"
			/>
		</div>
	</section>
</template>

<script>
import HomeTitle from '@/components/Homepage/HomeTitle.vue'
export default {
	name: 'HomeBanner',
	components: {
		HomeTitle
	},
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
@import '../../style/_global';

.banner {
	min-height: 576px;
	margin-top: 63px;
}
.call_to_action {
	max-width: 540px;
	padding-top: 44px;
}
.clipboard {
	width: 400px;
	display: flex;
	color: #ffffff;
	background-color: $black-primary;
	border-radius: 5px;
	padding: 20px;
	margin: 20px 0;
	cursor: pointer;
	img {
		margin-left: 30px;
	}
	&:hover {
		background-color: $black-secondary;
	}
}
.big_description {
	max-width: 530px;
	font-size: 24px;
	line-height: 40px;
}
.small_description {
	max-width: 430px;
	font-size: 16px;
	line-height: 24px;
}
</style>
