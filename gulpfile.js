    'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;


function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('concatScripts', function() {
  return gulp.src([
      'front-end/main.js'])
  .pipe(concat('app.js'))
  .pipe(babel({
          presets: ['es2017']
      }))
  .pipe(gulp.dest('front-end'));
});


gulp.task('minifyScripts', ['concatScripts'], function() {
  return gulp.src('front-end/app.js')
      .pipe(maps.init())
      .pipe(uglify())
      .on('error', swallowError)
      .pipe(rename('app.min.js'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('public/scripts'));
});

gulp.task('compileSass', function() {
  return gulp.src('front-end/scss/app.scss')
      .pipe(maps.init())
      .pipe(sass())
      .on('error', swallowError)
      .pipe(maps.write('./'))
      .pipe(gulp.dest('front-end/scss'));
});

gulp.task('minifyCSS', ['compileSass'], function() {
    return gulp.src([
            'front-end/scss/app.css'
            ])
        .pipe(cleanCSS())
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('public/stylesheets'));
});


gulp.task('watchFiles', function() {
    browserSync.init(null, {
        proxy: "http://localhost:5000", // port of node server
    });
    gulp.watch('front-end/scss/**/*.scss', ['compileSass', 'minifyCSS']).on('change', reload);
    gulp.watch('views/*.pug').on('change', reload);
    gulp.watch('front-end/main.js', ['concatScripts', 'minifyScripts']).on('change', reload);
  
});

gulp.task('serve', ['watchFiles']);