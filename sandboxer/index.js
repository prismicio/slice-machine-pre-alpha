const fs = require('fs')
require('isomorphic-fetch')

const createMain = componentName => {
  return `import Vue from "vue";
import ${componentName} from "./${componentName}.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(${componentName})
}).$mount("#app");
`
}

const exampleCode = `
<template>
  <div class="app">
    <h1>Hello!</h1>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss" scoped>
.app {
  margin-top: 60px;
  text-align: center;
  h1 {
    color: tomato;
  }
}
</style>
`
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
