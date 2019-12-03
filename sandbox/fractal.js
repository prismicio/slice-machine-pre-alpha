'use strict'

const path = require('path')
const fractal = (module.exports = require('@frctl/fractal').create())

const paths = {
  build: `${__dirname}/dist`,
  src: `${__dirname}/src`,
  static: `${__dirname}/public`,
  docs: `${__dirname}/src/docs`,
};

fractal.set('project.title', 'Prismic Slice-Machine')

fractal.components.set('path', path.join(paths.src, 'components'))

fractal.docs.set('path', paths.docs)

fractal.web.set('static.path', paths.static)

/* =========================================
   Theming
=========================================== */

// const mandelbrot = require('@frctl/mandelbrot')
// const jTheme = mandelbrot({
//   favicon: '/assets/favicon.ico',
//   skin: 'white',
//   nav: ['docs', 'components'],
//   panels: ['notes', 'html', 'resources', 'info'],
//   styles: ['default', '/css/theme.css']
// })

// jTheme.addLoadPath(__dirname + '/theme/views')
// jTheme.addStatic(__dirname + '/theme')

// fractal.web.theme(jTheme)

fractal.web.set('static.path', paths.static);
fractal.web.set('builder.dest', paths.build);
fractal.web.set('builder.urls.ext', '.html');

module.exports = fractal;