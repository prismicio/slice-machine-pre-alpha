<template>
	<images-slider :slice="mockData" />
</template>
<script>
import { ImagesSlider } from '@/../src'
import mockData from '@/../src/slices/ImagesSlider/mock.json'
export default {
	components: {
		ImagesSlider
	},
	layout: 'example',
	data() {
		return {
			mockData
		}
	}
}
</script>
