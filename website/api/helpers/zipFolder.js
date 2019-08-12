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

function main(zip, dir) {
  const results = getFilePathsRecursiveSync(dir)
  results.forEach(r => {
    const split = r.split('/src/')
    zip.file(split[1], fs.readFileSync(r, 'utf8'))
  })
}

module.exports = main
