import fs from 'fs'
import path from 'path'
import cors from 'cors'

const app = require('express')()
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

app.use((req, res) => {
  try {
    if (!req.query.framework) {
      throw new Error(
        'Expected a query string parameter `framework` but none was received'
      )
    }
    const file = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, 'files', req.query.framework, 'slices.json'),
        'utf8'
      )
    )
    res
      .status(200)
      .send(
        req.query.demo ? file.filter(e => e.key !== 'call_to_action') : file
      )
  } catch (e) {
    console.error(e)
    if (e.code === 'ENOENT') {
      return res.sendStatus(500)
    }
    res.status(400).send({ error: e })
  }
})

module.exports = app
