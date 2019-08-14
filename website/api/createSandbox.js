const fs = require('fs')
require('isomorphic-fetch')
const app = require('express')()
const bodyParser = require('body-parser')

const { srcUrl, slicesUrl, prod } = require('./utils')

app.use(bodyParser.json())

const createMain = componentName => {
  return `import Vue from "vue";
import ${componentName} from "./${componentName}.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(${componentName})
}).$mount("#app");
`
}

app.use((req, res) => {
  try {
    const sliceUrl = `${slicesUrl}/${req.body.componentName}/index.vue`
    const exampleUrl = `${slicesUrl}/${req.body.componentName}/example.vue`
    const exampleCode = fs.readFileSync(
      `${slicesUrl}/${req.body.componentName}/index.vue`
    )
    const name = 'HeaderSliceExample'

    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link rel="icon" href="<%= BASE_URL %>favicon.ico">
        <title>codesandbox</title>
      </head>
      <body>
        <noscript>
          <strong>We're sorry but codesandbox doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
        </noscript>
        <div id="app"></div>
        <!-- built files will be auto injected -->
      </body>
    </html>
    `

    fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        files: {
          'public/index.html': {
            content: html
          },
          'package.json': {
            content: fs.readFileSync('./package.json.txt', 'utf8')
          },
          'src/main.js': {
            content: createMain(name)
          },
          [`src/${name}.vue`]: {
            content: exampleCode
          }
        }
      })
    })
      .then(x => x.json())
      .then(data => {
        console.log('data', data)
      })

    const sliceNames = req.body.slices
    if (!sliceNames || !sliceNames.length) {
      throw new Error('No slices passed to request')
    }
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

module.exports = app
