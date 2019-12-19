export const createSlice = key => {
	try {
		const code = require(`!!raw-loader!@slice-machine/vue-essentials/slices/${key}/index.vue`)
			.default
		const readme = require(`!!raw-loader!@slice-machine/vue-essentials/slices/${key}/README.md`)
			.default
		const meta = require(`@slice-machine/vue-essentials/slices/${key}/meta.json`)
		const model = require(`@slice-machine/vue-essentials/slices/${key}/model.json`)

		return {
			code,
			displayName: key,
			meta,
			model,
			readme,
			examples: {}
		}
	} catch (e) {
		console.log(e)
		if (process.env.NODE_ENV !== 'production') {
			console.error(
				`Could not create slice for key '${key}'. See error below 👇\n\n${e}. \n\nError code: '${e.code}'`
			)
		}
	}
	return null
}

const githubUrl = 'https://github.com/hypervillain/community'
const slicesUrl = `${githubUrl}/tree/master/src/slices`

export const sliceRoute = key => `${slicesUrl}/${key}` // eslint-disable-line
