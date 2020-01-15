'use strict'

const gulp = require('gulp')
const fractal = require('./fractal.js')
const logger = fractal.cli.console
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const sassGlob = require('gulp-sass-glob')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const merge = require('merge-stream')
const path = require('path')
const image = require('gulp-image')

gulp.task('browserSync', function () {
  browserSync.init({
    files: ['src/**/*.*'],
    proxy: 'localhost:7000', // fractal uses localhost:7000
    injectChanges: true
  })
})

gulp.task('images', function () {
  return gulp
    .src(['src/assets/img/**/*'])
    .pipe(image())
    .pipe(gulp.dest('public/img'))
})

gulp.task('scripts', function () {
  return (
    gulp
      .src(['src/assets/js/*.js', 'src/components/**/*.js'])
      .pipe(babel({ presets: ['es2015'] }))
      // .pipe(concat("main.js"))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/js'))
      .pipe(reload({ stream: true }))
  )
})

gulp.task('sass', function () {
  return gulp
    .src(['src/assets/scss/**/*.scss', 'src/components/**/*.scss'])
    .pipe(sassGlob())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(reload({ stream: true }))
})

gulp.task('watch', function () {
  browserSync.init({
    files: ['src/**/*.*'],
    proxy: 'localhost:7000', // fractal uses localhost:7000
    injectChanges: true
  })

  gulp.watch(
    ['src/assets/scss/**/*.scss', 'src/components/**/*.scss'],
    gulp.series('sass')
  )
  gulp.watch(
    ['src/assets/js/**/*.js', 'src/components/**/*.js'],
    gulp.series('scripts')
  )

  gulp.watch(['src/assets/img/**/*'], gulp.series('images'))

  // Reloads the browser whenever HTML or JS files change
  gulp.watch('src/*.hbs').on('change', browserSync.reload)
})

gulp.task('fractal:start', function () {
  const server = fractal.web.server({
    sync: true
  })
  server.on('error', err => logger.error(err.message))
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`)
  })
})

gulp.task('build', async function () {
  const builder = fractal.web.builder()
  builder.on('progress', (completed, total) =>
    logger.update(`Exported ${completed} of ${total} items`, 'info')
  )
  builder.on('error', err => logger.error(err.message))
  await builder.build()
  logger.success('Fractal build completed!')
})

gulp.task('default', gulp.series('fractal:start', 'watch'))
