const { lstatSync, readdirSync, readFileSync } = require('fs')
const path = require('path')
const JSZip = require('jszip')
const app = require('express')()
const bodyParser = require('body-parser')
const zipFolder = require('./helpers/zipFolder')

const { slicesUrl, getModelFromSliceName, getSliceNames } = require('./utils')

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
  if (all !== 'true' && ids) {
    // validate ids here
  }
}

/**
 * Get slices by name, append them to a zip instance,
 * then return their merged JSON definitions
 * @param  {Zip} zip        Your zip instance
 * @param  {Array} sliceNames Array of slice names
 * @return {Object}            Merged representation
 */
const handleSlices = (zip, sliceNames) => {
  let index = ''
  const choices = {}
  const slicesFolder = zip.folder('slices')
  sliceNames.forEach(sliceName => {
    zipFolder(zip, `${slicesUrl}/${sliceName}`, 'src')
    Object.assign(choices, getModelFromSliceName(sliceName))
    index += `export { default as ${sliceName} } from './${sliceName}';\n`
  })
  slicesFolder.file('index.js', index)
  return choices
}

/**
 * Get styles folder and copy everything.
 * Also, add an import to `slices.scss`, an empty file that will contain variable overrides
 * @param  {Zip} zip a zip instance to copy to
 * @param  {String} src path to slices src folder
 * @return {Boolean}     Success ?
 */
const handleStyle = (zip, src) => {
  const p = path.join(src, 'styles')
  if (lstatSync(p).isDirectory()) {
    const maybeFiles = readdirSync(p)
    if (maybeFiles && maybeFiles instanceof Error === false) {
      maybeFiles.forEach(filePath => {
        const f = path.join(p, filePath)
        const pathToFile = path.join('styles', path.basename(f))
        if (f.includes('_variables.scss')) {
          const variables = readFileSync(f, 'utf8')
          zip.file(pathToFile, `${variables}\n@import '~/slices.scss';\n`)
          zip.file('slices.scss', '')
        } else if (lstatSync(f).isFile()) {
          zip.file(pathToFile, readFileSync(f, 'utf8'))
        } else {
          zipFolder(zip, f, 'src')
        }
        return true
      })
    }
    return false
  }
  return false
}

app.use((req, res) => {
  try {
    const maybeErr = failParams(req.query)
    if (maybeErr) {
      throw new Error(maybeErr)
    }

    const sliceNames = getSliceNames(req.params.slices)
    if (!sliceNames || !sliceNames.length) {
      throw new Error('No slices passed to request')
    }

    const zip = new JSZip()
    const model = handleSlices(zip, sliceNames)

    const Scaffolder = require(`./modules/${req.query.framework}`).default

    const scaffolder = Scaffolder()

    const { srcUrl } = scaffolder
    const maybeFiles = readdirSync(srcUrl)
    if (maybeFiles instanceof Error) {
      throw new Error(`Could not parse directory ${srcUrl}.
        This is probably a problem from our side. Contact us!`)
    }
    maybeFiles.forEach(function(maybeFile) {
      const p = path.join(srcUrl, maybeFile)
      if (lstatSync(p).isFile()) {
        zip.file(maybeFile, readFileSync(p, 'utf8'))
      }
    })

    // styles folder
    handleStyle(zip, srcUrl)

    zip.file('protocol.json', JSON.stringify(scaffolder.protocol, null, 4))
    zip.file(
      'slices.json',
      JSON.stringify(scaffolder.mergeSlices(model), null, 4)
    )

    // zip custom_types folder
    zipFolder(zip, scaffolder.customTypesFolder, req.query.framework)

    scaffolder.createFiles(req.query, ({ name, f }) => zip.file(name, f))

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
