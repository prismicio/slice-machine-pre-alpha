const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')
const app = require('express')()
const { parse } = require('vue-docgen-api')
const bodyParser = require('body-parser')

const zipFolder = require('./helpers/zipFolder')

const { srcUrl, slicesUrl, prod, getDirectories } = require('./utils')

app.use(bodyParser.json())

const hyphenateRE = /\B([A-Z])/g
const hyphenate = str => str.replace(hyphenateRE, '-$1').toLowerCase()

function getModelFromSliceName(sliceName) {
  try {
    const component = parse(
      path.join(process.cwd(), `src/slices/${sliceName}/index.vue`)
    )
    const model = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), `src/slices/${sliceName}/model.json`),
        'utf8'
      )
    )
    const key = hyphenate(component.displayName).replace(/-/g, '_')
    console.log({ [key]: model })
    return { [key]: model }
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

function zipFile(zip, pathFrom, pathTo) {
  try {
    const f = fs.readFileSync(pathFrom, 'utf8')
    zip.file(pathTo, f)
  } catch (e) {
    if (!prod()) {
      console.error('error: ', e) // eslint-disable-line
    }
  }
}

// Change this when you allow users to select their slices
const getSliceNames = slicesParams => {
  const allSlices = getDirectories(slicesUrl)
  return allSlices.map(path => {
    const spl = path.split('/')
    return spl[spl.length - 1]
  })
}

app.use((req, res) => {
  try {
    const sliceNames = getSliceNames(req.params.slices)
    if (!sliceNames || !sliceNames.length) {
      throw new Error('No slices passed to request')
    }
    const zip = new JSZip()
    const slicesFolder = zip.folder('slices')

    let index = ''
    const choices = {}
    sliceNames.forEach(sliceName => {
      zipFolder(zip, `${slicesUrl}/${sliceName}`)
      Object.assign(choices, getModelFromSliceName(sliceName))
      index += `export { default as ${sliceName} } from './${sliceName}';\n`
    })
    slicesFolder.file('index.js', index)

    zipFile(zip, `${__dirname}/helpers/importerWithoutPrismic.txt`, 'index.js')

    zipFile(zip, path.join(srcUrl, '/SliceZone.js'), 'SliceZone.js')
    zipFile(zip, path.join(srcUrl, '/UnknownSlice.vue'), 'UnknownSlice.vue')
    zipFile(zip, path.join(srcUrl, '/utils.js'), 'utils.js')
    zipFile(zip, path.join(srcUrl, '/index.js'), 'index.js')
    zipFile(
      zip,
      path.join(srcUrl, '/examples/vue-slices-example.vue'),
      'example.vue'
    )

    zip.file('model.json', JSON.stringify(choices))
    // TODO: APPEND `@import '~/slices.scss';` to variables.scss file
    zipFolder(zip, path.join(srcUrl, '/styles'))

    res.statusCode = 200
    res.setHeader('Content-disposition', 'attachment; filename=slices.zip')
    zip
      .generateNodeStream({
        type: 'nodebuffer',
        streamFiles: true
      })
      .pipe(res)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

module.exports = app
