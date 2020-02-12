const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req, res) => {
	console.log('here, the webhook!', req.body)
	res.sendStatus(200)
})

module.exports = app
