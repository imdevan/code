'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    sourcemaps = require('gulp-sourcemaps'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    importOnce = require('node-sass-import-once'),
    autoprefixer = require('gulp-autoprefixer'),
    sasslint = require('gulp-sass-lint'),
    imagemin = require('gulp-imagemin'),
    cfenv = require('cfenv'),
    gulpif = require('gulp-if'),
    browserSync = require('browser-sync');

//////////////////////////////
// Variables
//////////////////////////////
var dirs = {
  'js': {
    'lint': [
      'index.js',
      'src/**/*.js',
      '!src/**/*.min.js'
    ],
    'uglify': [
      'src/js/**/*.js',
      '!src/js/**/*.min.js'
    ]
  },
  'server': {
    'main': 'index.js',
    'watch': [
      'index.js'
    ]
  },
  'sass': 'src/sass/**/*.scss',
  'images': 'src/images/**/*.*',
  'public': 'public/',
  'html': 'src/**/*.html'
};

var isCI = (typeof process.env.CI === 'undefined') ? process.env.CI : false;

//////////////////////////////
// Update BrowserSync
//////////////////////////////
browserSync = browserSync.create();

//////////////////////////////
// JavaScript Lint Tasks
//////////////////////////////
gulp.task('eslint', function () {
  gulp.src(dirs.js.lint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpif(isCI, eslint.failOnError()));
});

gulp.task('uglify', function () {
  gulp.src(dirs.js.uglify)
    .pipe(gulpif(!isCI, sourcemaps.init()))
      .pipe(uglify({
        'mangle': isCI ? true : false
      }))
    .pipe(gulpif(!isCI, sourcemaps.write('maps')))
    .pipe(gulp.dest(dirs.public + 'js'))
    .pipe(browserSync.stream());
});

gulp.task('eslint:watch', function () {
  gulp.watch(dirs.js.lint, ['eslint']);
});

gulp.task('uglify:watch', function () {
  gulp.watch(dirs.js.uglify, ['uglify']);
});

//////////////////////////////
// HTML Tasks
//////////////////////////////
gulp.task('html', function() {
  gulp.src(dirs.html)
    .pipe(gulp.dest(dirs.public))
    .pipe(browserSync.stream());
})

gulp.task('html:watch', function () {
  gulp.watch(dirs.html, ['html']);
});

//////////////////////////////
// Sass Tasks
//////////////////////////////
gulp.task('sass', function () {
  gulp.src(dirs.sass)
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(gulpif(isCI, sasslint.failOnError()))
    .pipe(gulpif(!isCI, sourcemaps.init()))
      .pipe(sass({
        'outputStyle': isCI ? 'expanded' : 'compressed',
        'importer': importOnce,
        'importOnce': {
          'index': true,
          'css': true,
          'bower': true
        }
      }))
      .pipe(autoprefixer())
    .pipe(gulpif(!isCI, sourcemaps.write('maps')))
    .pipe(gulp.dest(dirs.public + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
  gulp.watch(dirs.sass, ['sass']);
});

//////////////////////////////
// Image Tasks
//////////////////////////////
gulp.task('images', function () {
  gulp.src(dirs.images)
    .pipe(imagemin({
      'progressive': true,
      'svgoPlugins': [
        { 'removeViewBox': false }
      ]
    }))
    .pipe(gulp.dest(dirs.public + '/images'));
});

gulp.task('images:watch', function () {
  gulp.watch(dirs.images, ['images']);
});

//////////////////////////////
// Nodemon Task
//////////////////////////////
gulp.task('nodemon', function (cb) {
  nodemon({
    'script': dirs.server.main,
    'watch': dirs.server.watch,
    'env': {
      'NODE_ENV': 'development'
    }
  })
  .once('start', function () {
    cb();
  })
  .on('restart', function () {
    // console.log('Restarted');
  });
});

//////////////////////////////
// Browser Sync Task
//////////////////////////////
gulp.task('browser-sync', ['nodemon'], function () {
  var appEnv = cfenv.getAppEnv();

  browserSync.init({
    'proxy': appEnv.url
  });
});

//////////////////////////////
// Running Tasks
//////////////////////////////
gulp.task('build', ['uglify', 'html', 'sass', 'images']);

gulp.task('test', ['build']);

gulp.task('watch', ['uglify:watch', 'html:watch', 'sass:watch', 'images:watch']);

gulp.task('default', ['browser-sync', 'build', 'watch']);
