const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const current = '0.0.1'
const deprecatedUnder = '0.0.0'

app.use((_, res) => {
	res.send({ current, deprecatedUnder })
})

module.exports = app
