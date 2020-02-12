const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const SM_CONFIG_FILE = 'sm.json'

app.use((req, res) => {
	console.log('here, the webhook!', req.body)

	if (!body.ref || !body.head_commit) {
		res.sendStatus(400)
	}
	const branch = body.ref.split('/').pop()

	if (branch !== 'master') {
		res.sendStatus(200)
	}

	const smFile = body.head_commit.modified.find(e => e === SM_CONFIG_FILE)

	if (smFile) {
		console.log('HEY, UPDATE PLEASE!')
	} else {
		console.log('HEY, LEAVE ME PLEASE!')
	}
	res.sendStatus(200)
})

module.exports = app
