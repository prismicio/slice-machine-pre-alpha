'use strict'

const path = require('path')
const mandelbrot = require('@frctl/mandelbrot')
const fractal = (module.exports = require('@frctl/fractal').create())

fractal.set('project.title', 'Prismic Slice-Machine')

fractal.components.set('path', path.join(__dirname, '/src/components'))
fractal.docs.set('path', path.join(__dirname, '/src/docs'))

fractal.web.set('static.path', path.join(__dirname, 'public'))

fractal.components.set('default.status', 'null');

/* =========================================
   Theming
=========================================== */

const jTheme = mandelbrot({
    favicon: '/assets/favicon.ico',
    skin: 'white',
    nav: ['docs', 'components'],
    panels: ['notes', 'html', 'resources', 'info'],
    styles: ['default', '/theme/css/theme.css']
})

fractal.web.theme(jTheme)

jTheme.addLoadPath(path.join(__dirname, '/theme'))
jTheme.addLoadPath(path.join(__dirname, '/theme/views'))
jTheme.addStatic(path.join(__dirname, 'theme'), '/theme')

fractal.web.set('builder.dest', path.join(__dirname, 'dist'))
