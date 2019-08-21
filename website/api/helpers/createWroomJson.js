const path = require('path')
const { parse } = require('vue-docgen-api')

const hyphenateRE = /\B([A-Z])/g
const hyphenate = str => str.replace(hyphenateRE, '-$1').toLowerCase()

// function format(object, hasSlicesAlready) {
//   let txt = ''

//   if (hasSlicesAlready) {
//     Object.entries(object).map(([key, value], index) => {
//       txt += `,${key}:${JSON.stringify(value)}\n`
//     })
//   }
//   return txt
// }

const createJson = (sliceNames, createPath, hasSlicesAlready = true) => {
  const wroom = {}

  sliceNames.forEach(sliceName => {
    try {
      const component = parse(
        path.join(process.cwd(), `src/slices/${sliceName}/index.vue`)
      )

      console.log('Component', component)
      wroom[
        hyphenate(component.displayName).replace('-', '_')
      ] = require(createPath(sliceName))

      console.log('HELLO', sliceName, wroom)
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(e) // eslint-disable-line
      }
    }
  })

  console.log(JSON.stringify(wroom), 'sliceNames', sliceNames)
  // console.log(format(wroom, hasSlicesAlready))
  return wroom
}

module.exports = createJson
