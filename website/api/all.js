// const fs = require('fs')
// const path = require('path')
const JSZip = require('jszip')
const app = require('express')()
const bodyParser = require('body-parser')

// const zipFolder = require('./helpers/zipFolder')

// const { srcUrl, slicesUrl, prod } = require('./utils')

app.use(bodyParser.json())

app.use((req, res) => {
  try {
    const zip = new JSZip()
    res.statusCode = 200
    res.setHeader('Content-disposition', 'attachment; filename=slices.zip')
    zip
      .file('slice.json', '{}')
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
