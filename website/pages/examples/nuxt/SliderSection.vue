<template>
	<slider-section :slice="mockData" />
</template>
<script>
import { SliderSection } from '@/../src'
// import mockData from '@/../src/slices/SliderSection/mock.json'
export default {
	layout: 'example',
	components: {
		SliderSection
	},
	data() {
		return {
			// mockData
		}
	}
}
</script>
