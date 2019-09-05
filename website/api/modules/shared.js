const fs = require('fs')
const path = require('path')
const { parse } = require('vue-docgen-api')
const set = require('lodash.set')
const get = require('lodash.get')
const merge = require('lodash.merge')

/**
 * Merges slices models with custom types
 * @param  {Array} ct                 Array of custom_types [{ id: 'page', name: 'Page' }]
 * @param  {Object} slices            Slices definitions { main_header: {}, other_slice: {}}
 * @param  {Array[String]} customTypesToMerge list of custom types ids to merge (eg. ['page', 'homepage'])
 * @return {Array}                    Merged custom types
 */
export const mergeCustomTypesWithSlices = (ct, slices, customTypesToMerge) => {
  return ct.map(elem => {
    if (customTypesToMerge.includes(elem.id)) {
      // get existing slices
      const currSlices = get(elem, `value.${elem.name}.body.config.choices`, {})
      // merge them with new slices (removes duplicates)
      const merged = merge(currSlices, slices)
      // return updated custom type
      return set(elem, `value.${elem.name}.body.config.choices`, merged)
    }
    return elem
  })
}

const hyphenateRE = /\B([A-Z])/g
const hyphenate = str => str.replace(hyphenateRE, '-$1').toLowerCase()

/**
 * Extracts and returns a slice definition object
 * @param  {String} sliceName name of your slice
 * @return {Object}           An object with snake cased `sliceName`
 */
export const getModelFromSliceName = sliceName => {
  try {
    const component = parse(
      path.join(process.cwd(), `src/slices/${sliceName}/index.vue`)
    )
    const model = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), `src/slices/${sliceName}/model.json`),
        'utf8'
      )
    )
    const key = hyphenate(component.displayName).replace(/-/g, '_')
    return { [key]: model }
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

/**
 * Assembles a custom_types JSON representation
 * @param  {String} folder path to the folder
 * @return {Object}        The JSON representation of given custom_types
 */
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
