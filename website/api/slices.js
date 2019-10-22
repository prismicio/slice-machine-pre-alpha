const path = require('path')
const JSZip = require('jszip')
const app = require('express')()
const bodyParser = require('body-parser')
const zipFolder = require('./helpers/zipFolder')

const {
  getModelFromSliceName,
  getSliceNames,
  parseSlicesQuery,
  sliceFolders
} = require('./utils')

app.use(bodyParser.json())

const validFrameworks = ['nuxt', 'react']

/**
 * Validates request parameters for query `api/slices`
 * @param  {String} params req.params asked (could be 'all' or a list, etc.)
 * @return {String} return error message, if any
 */
const failParams = ({ framework, ids, all }) => {
  if (!framework) {
    return `No \`framework\` param was passed. Valid values are one of:\n
    ${validFrameworks.map(f => '- ' + f)}
    `
  }
  if (validFrameworks.includes(framework) === false) {
    return `Invalid framework passed. Valid values are :\n
    ${validFrameworks.map(f => '- ' + f)}
    `
  }
}

/**
 * Get slices by name, append them to a zip instance,
 * then return their merged JSON definitions
 * @param  {Zip} zip        Your zip instance
 * @param  {Array} sliceNames Array of slice names
 * @param  {String} slicesUrl path to slices
 * @return {Object}            Merged representation
 */
const handleSlices = (zip, sliceNames, slicesUrl) => {
  let index = ''
  const choices = {}
  const slicesFolder = zip.folder('slices')
  sliceNames.forEach(sliceName => {
    zipFolder(zip, `${slicesUrl}/${sliceName}`, 'src')
    const [key, value] = getModelFromSliceName(sliceName, slicesUrl)
    choices[key] = value
    index += `export { default as ${sliceName} } from './${sliceName}';\n`
  })
  slicesFolder.file('index.js', index)
  return choices
}

app.use((req, res) => {
  try {
    const maybeErr = failParams(req.query)
    if (maybeErr) {
      throw new Error(maybeErr)
    }

    const sliceNames =
      req.query.slices && req.query.slices.length
        ? parseSlicesQuery(req.query.slices)
        : getSliceNames(sliceFolders[req.query.framework])
    if (!sliceNames || !sliceNames.length) {
      throw new Error('Unable to find slices')
    }

    const zip = new JSZip()

    const Scaffolder = require(`./modules/${req.query.framework}`).default

    const scaffolder = Scaffolder()

    const { srcUrl } = scaffolder
    const model = handleSlices(zip, sliceNames, path.join(srcUrl, 'slices'))

    zip.file('model.json', JSON.stringify(model, null, 4))

    res.statusCode = 200
    res.setHeader('Content-disposition', 'attachment; filename=slices.zip')
    zip
      .generateNodeStream({
        type: 'nodebuffer',
        streamFiles: true
      })
      .pipe(res)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

module.exports = app
