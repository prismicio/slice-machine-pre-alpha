'use strict'

/*
 * Require the path module
 */
const path = require('path')

/*
 * Require the Fractal module
 */
const fractal = (module.exports = require('@frctl/fractal').create())

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Prismic Slice-Machine')

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, '/src/components'))

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, '/src/docs'))

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'))
fractal.web.set('static.path', __dirname + '/public');

fractal.web.set('builder.dest', path.join(__dirname, 'dist'))

/* =========================================
   Theming
=========================================== */

// create a new instance with custom config options
// all the paths inside this are relative to the theme's root folder `theme` locted in the project's source folder
const mandelbrot = require('@frctl/mandelbrot')
const jTheme = mandelbrot({
    // theme config here
    favicon: '/assets/favicon.ico',
    skin: 'white',
    nav: ['docs', 'components'], // show docs above components in the sidebar
    panels: ['notes', 'html', 'resources', 'info'], // possible values: "html", "view", "context", "resources", "info", "notes"
    styles: ['default', '/css/theme.css']
})

// specify a directory to hold the theme override templates
// jTheme.addLoadPath(__dirname + "/theme");
jTheme.addLoadPath(__dirname + '/theme/views')
jTheme.addStatic(__dirname + '/theme')
fractal.web.theme(jTheme) // tell Fractal to use the configured theme by default
