<template>
	<slider-section :slice="mockData" />
</template>
<script>
import { SliderSection } from '@/../src'
import mockData from '@/../src/slices/SliderSection/mock.json'
export default {
	components: {
		SliderSection
	},
	layout: 'example',
	data() {
		return {
			mockData
		}
	}
}
</script>
