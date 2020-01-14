<template>
	<call-to-action :slice="mockData" />
</template>
<script>
import { CallToAction } from '@/../src'
import '@/../src/styles/styles.scss'
import mockData from '@/../src/slices/CallToAction/mock.json'
export default {
	components: {
		CallToAction
	},
	data() {
		return {
			mockData
		}
	}
}
</script>
