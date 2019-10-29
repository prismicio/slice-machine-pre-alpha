'use strict'
const path = require('path')
const fs = require('fs')
const fileSave = require('file-save')
const glob = require('glob')
const prompts = require('prompts')

const createIndex = require('./methods/createIndex')
const createMetaFile = require('./methods/createMetaFile')
const rewriteExportFile = require('./methods/rewriteExportFile')

// Takes PascalCase and returns kebab-case
const hyphenateRE = /\B([A-Z])/g
// eslint-disable-next-line
const hyphenate = str => str.replace(hyphenateRE, '-$1').toLowerCase()

process.on('exit', code => {
  if (code === 0) {
    // eslint-disable-next-line
    console.log(
      `\n\nNew slice created! Refresh your files tree, if you can't see the new files :)\n\n`
    )
  }
})

const PACKAGE_TYPE = ['vue']

const slicesFolder = './src/slices'
const sliceReadmeTemplateSrc = './SLICE_README_TEMPLATE.md'

const questions = [
  {
    type: 'select',
    name: 'framework',
    message: 'Which framework do you want to create the slice with?',
    choices: PACKAGE_TYPE
  },
  {
    type: 'text',
    name: 'name',
    message: 'Enter the name of your slice (2 words, PascalCased)',
    initial: 'eg. LargeHeader',
    validate: value => {
      if (fs.existsSync(`${slicesFolder}/${value}`)) {
        return 'Slice exists already, pick another name'
      }
      const kebabCased = hyphenate(value)
      if (kebabCased.indexOf('-') < 1) {
        return `Value has to be 2-worded when transformed into kebab-case.\neg. 'LargeHeader' will become 'large-header'`
      }
      return true
    }
  }
  // {
  //   type: "text",
  //   name: "twitterHandler",
  //   message: "What's your Twitter handler?",
  //   initial: "hyperVillain"
  // }
]

;(async () => {
  const response = await prompts(questions)

  const framework = PACKAGE_TYPE[response.framework]
  const { name } = response

  createSlice(framework, name, 'your_contributor_handler')

  function createSlice(framework, name, twitterHandler) {
    const tagName = hyphenate(name)

    const packagePath = path.resolve(process.cwd(), 'src/slices')

    const ret = glob.sync(`${packagePath}/${name}`)

    if (ret.length > 0) {
      // eslint-disable-next-line
      console.warn(`It seems that ${name} slice exists already. Exiting\n`)
      process.exit(-1)
    }

    const files = [
      {
        txt: createIndex({ name, tagName }),
        path: '/index.vue'
      },
      {
        txt: createMetaFile({ name, twitterHandler }),
        path: '/meta.json'
      },
      {
        txt: '{}',
        path: '/mock.json'
      },
      {
        txt: '{}',
        path: '/model.json'
      },
      {
        txt: fs.readFileSync(sliceReadmeTemplateSrc, 'utf8'),
        path: '/README.md'
      }
    ]

    files.forEach(file => {
      fileSave(path.join(slicesFolder, name.concat(file.path)))
        .write(file.txt, 'utf8')
        .end('\n')
    })

    const newExportFile = rewriteExportFile(slicesFolder, name)
    fileSave(path.join(slicesFolder, '/index.js'))
      .write(newExportFile, 'utf8')
      .end('\n')
  }
})()
