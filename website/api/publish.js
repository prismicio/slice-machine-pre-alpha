const fetch = require('node-fetch')
const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const SM_CONFIG_FILE = 'sm.json'

const whiteList = {
	'prismicio/vue-essential-slices': true
}

app.use(async (req, res) => {
	console.log('here, the webhook!', req.body, req.params)

	const body = req.body
	if (!body.ref || !body.head_commit || !body.repository) {
		return res.sendStatus(400)
	}

	const repoName = body.repository.full_name
	if (!whiteList[repoName]) {
		return res.sendStatus(403)
	}

	const branch = body.ref.split('/').pop()
	if (branch !== 'master') {
		return res.sendStatus(200)
	}

	const smFile =
		body.head_commit.modified.find(e => e === SM_CONFIG_FILE) ||
		body.head_commit.added.find(e => e === SM_CONFIG_FILE)

	if (smFile) {
		console.log('HEY, UPDATE PLEASE!')
		const smFileUrl = `https://raw.githubusercontent.com/${repoName}/master/${SM_CONFIG_FILE}`

		const response = await fetch(smFileUrl)
		const sm = await response.text()
		return res.send(sm)
	}
	console.log('HEY, LEAVE ME PLEASE!')
	res.sendStatus(200)
})

module.exports = app
