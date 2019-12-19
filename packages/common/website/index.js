/** Takes a path to a Slice folder and returns its data */
export const createSlice = pathToSlice => {
	try {
		const code = require(`!!raw-loader!${pathToSlice}/index.vue`).default
		const readme = require(`!!raw-loader!${pathToSlice}/README.md`).default
		const meta = require(`${pathToSlice}/meta.json`)
		const model = require(`${pathToSlice}/model.json`)

		return {
			code,
			displayName: key,
			meta,
			model,
			readme,
			examples: {} // remove this soon
		}
	} catch (e) {
		if (process.env.NODE_ENV !== 'production') {
			console.error(
				`Could not create slice for key '${key}'. See error below 👇\n\n${e}. \n\nError code: '${e.code}'`
			)
		}
	}
	return null
}
