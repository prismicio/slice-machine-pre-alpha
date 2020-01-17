<template>
	<div class="clipboard" @click.stop.prevent="copyCommand">
		<prismic-rich-text class="embed-text" :field="slice.primary.snippet" />
		<img src="../../static/clipboard.svg" />
		<input :id="`command-to-copy-${index}`" type="hidden" :value="slice.primary.snippet[0].text" />
	</div>
</template>

<script>
import Body from '@/components/Body'

export default {
	name: 'CodeSlice',
	components: {
		Body
	},
	props: {
		slice: {
			type: Object,
			required: true
		},
		index: {
			type: Number,
			required: true
		}
	},
	methods: {
		copyCommand() {
			const commandToCopy = document.querySelector(
				`#command-to-copy-${this.index}`
			)
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

.clipboard {
	display: flex;
	justify-content: space-between;
	background-color: $black-primary;
	border-radius: 5px;
	padding: 20px;
	margin: 20px 0;
	cursor: pointer;
	img {
		display: none;
		@include rwd(400) {
			margin-left: 30px;
			display: inline-block;
		}
	}
	.embed-text {
		color: #ffffff;
		text-align: left;
		font-size: 13px;
		@include sm {
			font-size: 16px;
		}
	}
	&:hover {
		background-color: $black-secondary;
	}
}
</style>
