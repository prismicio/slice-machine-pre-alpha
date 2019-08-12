const path = require('path')
const { parse } = require('vue-docgen-api')

function format(object, hasSlicesAlready) {
  let txt = ''

  if (hasSlicesAlready) {
    Object.entries(object).map(([key, value], index) => {
      txt += `,${key}:${JSON.stringify(value)}\n`
    })
  }
  return txt
}
const createJson = (sliceNames, createPath, hasSlicesAlready = true) => {
  const wroom = {}

  sliceNames.forEach(sliceName => {
    try {
      const component = parse(
        path.join(process.cwd(), `src/slices/${sliceName}/index.vue`)
      )
      wroom[component.displayName.replace('-', '_')] = require(createPath(
        sliceName
      ))
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(e); // eslint-disable-line
      }
    }
  })

  console.log(JSON.stringify(wroom))
  console.log(format(wroom, hasSlicesAlready))
  return wroom
}

module.exports = createJson
