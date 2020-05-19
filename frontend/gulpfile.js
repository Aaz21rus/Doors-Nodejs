const { src, dest, parallel, watch, task, series } = require('gulp')
const scss = require('gulp-sass')
const gulplog = require('gulplog')
const notifier = require('node-notifier')
const bs = require('browser-sync')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')



//
// CSS
//

function css() {
  return src('scss/style.scss')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'SCSS Error',
          message: err.message
        }
      })
    }))
    .pipe(scss())
    // .pipe(minifyCSS())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(dest('../public/css'))
}



//
// JS
//

task('webpack', function(callback) {
  webpack(webpackConfig, function(err, stats) {
    if (!err) { // no hard error
      // try to get a soft error from stats
      err = stats.toJson().errors[0];
    }

    if (err) {
      notifier.notify({
        title: 'Webpack',
        message: err
      })

      gulplog.error(err)
    } else {
      gulplog.info(stats.toString({ colors: true }))
    }

    callback()
  })
})



//
// Copy images, fonts
//

// function copyImg() {
//   return src('img/**/*.{jpg,jpeg,gif,png,svg}').pipe(dest('build/img'))
// }

// function copyFonts() {
//   return src('fonts/*.*').pipe(dest('build/fonts'))
// }



//
// Gulp Watcher
//

task('watcher', _=> {
  watch('scss/**/*.scss', series(css))
  // watch('img/**/*.{jpg,jpeg,gif,png,svg}', series(copyImg))
  // watch('fonts/*.*', series(copyFonts))
})



//
// BrowserSync
//

// task('serve', _ => {
//   bs({
//       server: {
//           baseDir: 'build'
//       },
//       port: 1234,
//       notify: true,
//       open: false
//   })

//   bs.watch('build/**/*.*').on('change', bs.reload)
// })



//
// TASKS
//

exports.default = series(css, 'webpack', 'watcher')
