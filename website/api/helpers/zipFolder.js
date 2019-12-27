const fs = require('fs')
const path = require('path')

function getFilePathsRecursiveSync(dir) {
	let results = []
	const list = fs.readdirSync(dir)

	for (let file of list) {
		file = path.resolve(dir, file)
		const stat = fs.statSync(file)
		if (stat && stat.isDirectory()) {
			const res = getFilePathsRecursiveSync(file)
			results = results.concat(res)
		} else {
			results.push(file)
		}
	}
	return results
}

/**
 * Copy folders to a zip instance, recursively.
 * @param  {Zip} zip      A zip instance
 * @param  {String} dir      Absolute path to directory to copy from
 * @param  {[type]} basePath Base path to build to zip path. See example
 * @return {Undefined}          No return
 *
 * @example Given dir = "/a/b/src/styles" and basePath = "src",
 * will create zip path "src/styles/[files...]"
 */
function main(zip, dir, basePath) {
	const results = getFilePathsRecursiveSync(dir)
	results.forEach(r => {
		const split = dir.split(basePath.concat('/'))
		const zipDirName = path.join(split[split.length - 1])
		const p = path.join(zipDirName, path.basename(r))
		zip.file(p, fs.readFileSync(r, 'utf8'))
	})
}

module.exports = main
