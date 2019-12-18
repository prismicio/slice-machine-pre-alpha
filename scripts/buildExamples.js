const fs = require('fs')
const path = require('path')

const utils = require('../website/api/utils')

const pathToFiles = path.join(process.cwd(), 'website', 'pages', 'examples')

/**
 * For each framework, we should build examples:
 * - fetch file system and get slice
 * - get info from slice (mainly its name)
 * - check if file exists in examples
 * - if not, create the file
 */

const createFile = ({
	relativePathToSlice,
	sliceName,
	key,
	title,
	description
}) => {
	return `<template>
  <${key.replace(/_/g, '-')} :slice="mockData" />
</template>
<script>
import { ${sliceName} } from '@/..${relativePathToSlice}'
import mockData from '@/..${relativePathToSlice}/${sliceName}/mock.json'
export default {
  components: {
    ${sliceName}
  },
  data() {
    return {
      mockData
    }
  }
}
</script>
`
}
async function main() {
	await onBefore()
	Object.entries(utils.sliceFolders).map(([framework, pathToSlices]) => {
		console.log(framework, pathToSlices)
		const sliceNames = utils.getSliceNames(null, pathToSlices)
		sliceNames.map(sliceName => {
			const slice = utils.getAllFromSliceName(sliceName, pathToSlices)
			if (!slice) {
				console.error(`Unable to get slice for sliceName: ${sliceName}`)
				return
			}
			const {
				key,
				meta: { title, description }
			} = slice
			const pToFile = path.join(pathToFiles, framework, `${sliceName}.vue`)
			const fileExists = fs.existsSync(pToFile)
			if (!fileExists) {
				const file = createFile({
					relativePathToSlice: pathToSlices.split(process.cwd())[1],
					sliceName,
					key,
					title,
					description
				})
				fs.writeFileSync(pToFile, file, 'utf8')
			}
		})
	})
}

/**
 * Build folders to files
 */
function onBefore() {
	const promises = []
	Object.keys(utils.sliceFolders).forEach(framework => {
		const p = new Promise(resolve => {
			try {
				fs.promises
					.mkdir(path.join(pathToFiles, framework), {
						recursive: true
					})
					.then(resolve)
			} catch (e) {
				console.error('onBefore err: ', e)
			}
		})
		promises.push(p)
	})
	return Promise.all(promises)
}

main()
