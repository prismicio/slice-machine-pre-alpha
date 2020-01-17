<template>
	<prismic-rich-text :field="slice.primary.text" />
</template>

<script>
import Body from '@/components/Body'

export default {
	name: 'TextSlice',
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
