const path = require('path')

const { mergeCustomTypesWithSlices } = require('../shared')

const { readCustomTypes, getSliceNames } = require('../../utils')

const {
  createPrismicConfigurationFile,
  createPrismicVuePluginFile,
  linkResolverPluginFile
} = require('./helpers')

const protocol = require('./protocol.json')

export default ({ sliceNames } = { sliceNames: getSliceNames() }) => {
  // Returns stored custom_types for a given framework
  const customTypes = readCustomTypes(path.join(__dirname, 'custom_types'))

  // functions could return both file name and data
  // So, make it an array of functions instead
  const files = [
    {
      name: 'prismic.config.js',
      f: createPrismicConfigurationFile()
    },
    {
      name: 'plugins/link-resolver.js',
      f: linkResolverPluginFile()
    },
    {
      name: 'plugins/prismic-vue.js',
      f: createPrismicVuePluginFile()
    }
  ]
  return {
    customTypes,
    customTypesFolder: path.join(__dirname, 'custom_types'),
    srcUrl: 'src',
    mergeSlices: (
      slices, // definitions of slices user asked for download
      ct = customTypes,
      // custom_type ids that should be merged (eg. ['page', 'homepage', ...])
      customTypesToMerge = protocol.customTypesToMerge
    ) => mergeCustomTypesWithSlices(ct, slices, customTypesToMerge),
    createFiles: (_, handle) => {
      files.forEach(handle)
    },
    protocol
  }
}
