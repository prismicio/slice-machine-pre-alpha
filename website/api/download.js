const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')
const { parse } = require('vue-docgen-api')
const app = require('express')()
const bodyParser = require('body-parser')

const zipFolder = require('./helpers/zipFolder')
const createExampleFile = require('./helpers/createExampleFile')
const createSliceZone = require('./helpers/createSliceZone')
const createWroomJson = require('./helpers/createWroomJson')

const { srcUrl, slicesUrl, prod } = require('./utils')

app.use(bodyParser.json())

function writeExampleFile(zip, sliceNames) {
  try {
    const components = sliceNames.reduce((acc, curr) => {
      acc[curr] = {
        ...parse(path.join(process.cwd(), `src/slices/${curr}/index.vue`)),
        mockData: require(path.join(
          process.cwd(),
          `src/slices/${curr}/mock.json`
        ))
      }
      return acc
    }, {})

    const txt = createExampleFile(components)
    zip.file('example.vue', txt)
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

function writeSliceZone(zip, sliceNames) {
  try {
    const components = sliceNames.reduce((acc, curr) => {
      acc[curr] = parse(
        path.join(process.cwd(), `src/slices/${curr}/index.vue`)
      )
      return acc
    }, {})

    const txt = createSliceZone(components)
    zip.file('sliceZone.vue', txt)
  } catch (e) {
    console.error(e)
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

app.use((req, res) => {
  try {
    const sliceNames = req.body.slices
    if (!sliceNames || !sliceNames.length) {
      throw new Error('No slices passed to request')
    }
    const zip = new JSZip()
    const slicesFolder = zip.folder('slices')
    //
    let index = ''
    sliceNames.forEach(sliceName => {
      zipFolder(zip, `${slicesUrl}/${sliceName}`)
      index += `export { default as ${sliceName} } from "./${sliceName}";\n`
    })
    slicesFolder.file('index.js', index)

    const wroomObject = createWroomJson(
      sliceNames,
      sliceName => `${slicesUrl}/${sliceName}/model.json`, // eslint-disable-line
      true
    )

    zipFile(zip, `${__dirname}/helpers/importerWithoutPrismic.txt`, 'index.js')

    writeExampleFile(zip, sliceNames)
    writeSliceZone(zip, sliceNames)
    zipFile(zip, path.join(srcUrl, '/utils.js'), 'utils.js')
    zipFolder(zip, path.join(srcUrl, '/styles'))
    zip.generateAsync({ type: 'base64' }).then(base64 => {
      res.send({
        base64: 'data:application/zip;base64,' + base64,
        wroomObject
      })
    })
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

module.exports = app
