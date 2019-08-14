const path = require('path')

export const srcUrl = path.join(process.cwd(), 'src')
export const slicesUrl = path.join(process.cwd(), 'src/slices')

export const prod = () => process.env.NODE_ENV === 'production'
