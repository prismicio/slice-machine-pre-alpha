const createExamples = (slice, exampleFiles) =>
  Object.entries(exampleFiles).reduce((acc, [key, value]) => {
    acc[key] = {
      component: value,
      content: require(`!!raw-loader!~/../src/slices/${slice}/examples/WithoutPrismic.vue`)
        .default
    }
    return acc
  }, {})

const requireExamples = (key) => {
  let exampleFiles
  try {
    exampleFiles = require(`~/../src/slices/${key}/examples`)
  } catch (_) {
    // we don't want to throw
    // when no example is provided
    exampleFiles = {}
  }
  return createExamples(key, exampleFiles)
}

export const createSlice = (key) => {
  try {
    const code = require(`!!raw-loader!~/../src/slices/${key}/index.vue`)
      .default
    const readme = require(`!!raw-loader!~/../src/slices/${key}/README.md`)
      .default
    const meta = require(`~/../src/slices/${key}/meta.json`)
    const model = require(`~/../src/slices/${key}/model.json`)

    const examples = requireExamples(key)

    return {
      code,
      key,
      meta,
      model,
      readme,
      examples
    }
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        `Could not create slice for key '${key}'. See error below 👇\n\n${e}. \n\nError code: '${e.code}'`
      )
    }
  }
  return null
}

const githubUrl = 'https://github.com/hypervillain/community'
const slicesUrl = `${githubUrl}/tree/master/src/slices`

export const sliceRoute = (key) => `${slicesUrl}/${key}` // eslint-disable-line
