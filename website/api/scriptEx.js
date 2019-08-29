const fs = require('fs')
const path = require('path')
const app = require('express')()
const { parse } = require('vue-docgen-api')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const hyphenateRE = /\B([A-Z])/g
// eslint-disable-next-line
const hyphenate = str => str.replace(hyphenateRE, '-$1').toLowerCase()

function getModelFromSliceName(sliceName) {
  try {
    const component = parse(
      path.join(process.cwd(), `../../src/slices/${sliceName}/index.vue`)
    )
    const model = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), `../../src/slices/${sliceName}/model.json`),
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

getModelFromSliceName('HeaderSlice')
