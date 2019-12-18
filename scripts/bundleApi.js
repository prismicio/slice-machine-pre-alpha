const path = require('path')
const fs = require('fs-extra')

// Move this elsewhere
const utils = require('../website/api/utils')

const pathToFiles = path.join(process.cwd(), 'website', 'api', 'files')
const pathToStatic = path.join(process.cwd(), 'website', 'static', 'components')

/**
 * For each framework, we should build endpoints for:
 * - all slice + meta definitions: /slices?framework=nuxt
 * - each slice definition: /single?framework=nuxt&slice=x
 */

async function main() {
	try {
		await onBefore()
		Object.entries(utils.sliceFolders).map(([framework, pathToSlices]) => {
			const sliceNames = utils.getSliceNames()
			const allSlices = sliceNames.map(sliceName => {
				const slice = utils.getAllFromSliceName(sliceName, pathToSlices)
				if (!slice) {
					console.error(`Unable to find slice for sliceName: ${sliceName}`)
					return
				}
				const previewExists = fs.existsSync(
					path.join(pathToSlices, sliceName, 'preview.png')
				)
				if (previewExists) {
					const maybeErr = fs.copyFileSync(
						path.join(pathToSlices, sliceName, 'preview.png'),
						path.join(pathToStatic, `${sliceName}.png`)
					)
					if (maybeErr) {
						throw maybeErr
					}
				} else {
					// throw new Error(
					// 	`Unable to find preview for component ${sliceName}.\nPlease add a preview before continuing.`
					// )
				}
				slice.meta.imageUrl = previewExists
					? `/components/${sliceName}.png`
					: undefined

				fs.writeFileSync(
					path.join(pathToFiles, framework, 'single', `${sliceName}.json`),
					JSON.stringify(slice),
					'utf8'
				)
				return slice
			})
			fs.writeFileSync(
				path.join(pathToFiles, framework, 'slices.json'),
				JSON.stringify(allSlices),
				'utf8'
			)
		})
	} catch (e) {
		console.error(e)
		process.exit(-1)
	}
}

/**
 * Build folders to files
 */
async function onBefore() {
	const promises = []
	await fs.remove(pathToFiles)
	Object.keys(utils.sliceFolders).forEach(framework => {
		const p = new Promise(resolve => {
			try {
				const pathToSingleApi = path.join(pathToFiles, framework, 'single')
				if (fs.existsSync(pathToSingleApi)) {
					return resolve()
				}
				return fs.promises
					.mkdir(pathToSingleApi, {
						recursive: true
					})
					.then(resolve)
			} catch (e) {
				resolve(e)
			}
		})
		promises.push(p)
	})
	return Promise.all(promises)
}

main()
