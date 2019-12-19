const fs = require('fs')

function compare(a, b) {
	if (a.name < b.name) {
		return -1
	}
	if (a.name > b.name) {
		return 1
	}
	return 0
}

const rewrite = path => {
	const files = fs
		.readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory()) // eslint-disable-line

	let txt = ''
	files.sort(compare).forEach(dirent => {
		txt += `export { default as ${dirent.name} } from './${dirent.name}';\n`
	})
	return txt
}

module.exports = rewrite
