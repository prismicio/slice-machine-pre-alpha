import fs from 'fs'
import path from 'path'

const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req, res) => {
  try {
    if (!req.query.framework) {
      throw new Error(
        'Expected a query string parameter `framework` but none was reeceived'
      )
    }
    const file = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, 'files', req.query.framework, 'slices.json'),
        'utf8'
      )
    )
    res.json(file)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

module.exports = app
