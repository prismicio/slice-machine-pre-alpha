const path = require('path')
const { lstatSync, readdirSync } = require('fs')

export const srcUrl = path.join(process.cwd(), 'src')
export const slicesUrl = path.join(process.cwd(), 'src/slices')

export const prod = () => process.env.NODE_ENV === 'production'

const isDirectory = source => lstatSync(source).isDirectory()

export const getDirectories = source =>
  readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory)
