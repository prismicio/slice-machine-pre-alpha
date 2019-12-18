'use strict'

const path = require('path')
const mandelbrot = require('@frctl/mandelbrot')
const fractal = (module.exports = require('@frctl/fractal').create())

fractal.set('project.title', 'Prismic Slice-Machine')

fractal.components.set('path', path.join(__dirname, '/src/components'))
fractal.docs.set('path', path.join(__dirname, '/src/docs'))

fractal.web.set('static.path', path.join(__dirname, 'public'))



/****************************************************************************
 * Fractal Status badges customizations
 * Source: https://fractal.build/guide/core-concepts/statuses.html
 ****************************************************************************/
fractal.components.set('default.status', 'null');

fractal.components.set('statuses', {
    prototype: {
        label: "Prototype",
        description: "Do not implement.",
        color: "#FF3333"
    },
    wip: {
        label: "WIP",
        description: "Work in progress. Implement with caution.",
        color: "#FF9233"
    },
    ready: {
        label: "Ready",
        description: "Ready to implement.",
        color: "#29CC29"
    },
    doing: {
        label: "Doing",
        description: "I'm doing it.",
        color: '#F00'
    },
    done: {
        label: "Done",
        description: "I'm done with this.",
        color: "green"
    }
});

fractal.docs.set('statuses', {
    draft: {
        label: 'WIP Draft',
        description: 'Work in progress.',
        color: '#FF3333'
    },
    ready: {
        label: 'Ready',
        description: 'Ready for referencing.',
        color: '#29CC29'
    }
});

// fractal.components.set('statuses.prototype.color', 'pink');
// fractal.docs.set('statuses.ready.label', 'Good to go!');

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
