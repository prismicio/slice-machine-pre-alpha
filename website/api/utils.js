const fs = require('fs')
const { lstatSync, readdirSync } = require('fs')
const path = require('path')
const { parse } = require('vue-docgen-api')

export const prod = () => process.env.NODE_ENV === 'production'

const isDirectory = source => lstatSync(source).isDirectory()

export const sliceFolders = {
  nuxt: path.join(process.cwd(), 'src/slices')
}

export const getDirectories = source =>
  readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory)

export const readCustomTypes = folder => {
  if (folder) {
    const customTypesPath = path.join(folder, 'index.json')
    // test path maybe?
    const customTypes = JSON.parse(fs.readFileSync(customTypesPath, 'utf8'))
    customTypes.forEach(t => {
      const customType = t
      const valuePath = path.join(folder, customType.value)
      customType.value = JSON.parse(fs.readFileSync(valuePath, 'utf8'))
    })
    return customTypes
  }
  return null
}

const hyphenateRE = /\B([A-Z])/g
const hyphenate = str => str.replace(hyphenateRE, '-$1').toLowerCase()

/**
 * Extracts and returns a slice definition object
 * @param  {String} sliceName name of your slice
 * @return {Object}           An object with snake cased `sliceName`
 */
export const getModelFromSliceName = (sliceName, url = sliceFolders.nuxt) => {
  console.log('getModelFromSliceName', url, sliceFolders.nuxt)
  try {
    const component = parse(path.join(`${url}/${sliceName}/index.vue`))
    const model = JSON.parse(
      fs.readFileSync(path.join(`${url}/${sliceName}/model.json`), 'utf8')
    )

    const key = hyphenate(component.displayName).replace(/-/g, '_')
    return [key, model]
  } catch (e) {}
}

export const getAllFromSliceName = (sliceName, url = sliceFolders.nuxt) => {
  console.log('getAllFromSliceName', url, sliceFolders.nuxt)
  try {
    const [key, model] = getModelFromSliceName(sliceName, url)
    const meta = JSON.parse(
      fs.readFileSync(`${url}/${sliceName}/meta.json`, 'utf8')
    )
    return {
      key,
      model,
      meta
    }
  } catch (e) {}
}

export const zipFile = (zip, pathFrom, pathTo) => {
  try {
    const f = fs.readFileSync(pathFrom, 'utf8')
    zip.file(pathTo, f)
  } catch (e) {
    if (!prod()) {
      console.error('error in api/utils.js[87]: ', e)
    }
  }
}

// Change this when you allow users to select the slices they want
export const getSliceNames = (slicesParams, url = sliceFolders.nuxt) => {
  const allSlices = getDirectories(url)
  return allSlices.map(path => {
    const spl = path.split('/')
    return spl[spl.length - 1]
  })
}
