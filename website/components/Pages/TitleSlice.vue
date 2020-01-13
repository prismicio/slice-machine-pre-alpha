<template>
	<div>
		<prismic-rich-text :field="slice.primary.title" />
	</div>
</template>

<script>
import Body from '@/components/Body'

export default {
	name: 'TitleSlice',
	components: {
		Body
	},
	props: {
		slice: {
			type: Object,
			required: true
		}
	}
}
</script>
