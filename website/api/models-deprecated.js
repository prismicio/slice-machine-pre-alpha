const app = require('express')()
const bodyParser = require('body-parser')

const { sliceFolders, getAllFromSliceName, getSliceNames } = require('./utils')

app.use(bodyParser.json())

app.use((req, res) => {
  try {
    if (!sliceFolders[req.query.framework]) {
      throw new Error('Framework not found')
    }
    const sliceNames = getSliceNames(null, sliceFolders[req.query.framework])
    const response = sliceNames.map(sliceName => getAllFromSliceName(sliceName))

    res.json(response)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

module.exports = app
