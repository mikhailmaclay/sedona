'use strict';

// Общие
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const del = require('del');
const server = require('browser-sync').create();

// CSS
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const csscomb = require('gulp-csscomb');

// JS
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// Изображения
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgsprite = require('gulp-svg-sprite');

gulp.task('html', () => {
  return gulp.src('source/*.html',)
    .pipe(gulp.dest('build'));
});

gulp.task('css', () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(csscomb())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('js', () => {
  return gulp.src('source/js/**/*.js')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/js'))
});

gulp.task('images', () => {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 7}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('webp', () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({quality: 50}))
    .pipe(gulp.dest('build/img'));
});

gulp.task('svgsprite', () => {
  return gulp.src(['source/img/icon*.svg', '!source/img/icon-sprite.svg'])
    .pipe(svgsprite({
          mode: {
            stack: {
              sprite: "../icon-sprite.svg"
            }
          },
        }
      ))
    .pipe(gulp.dest('build/img/'));
});

gulp.task('server', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/js/**/*.js', gulp.series('js', 'refresh'));
});

gulp.task('refresh', (done) => {
  server.reload();
  done();
});

gulp.task('clean', () => {
  return del('build');
});

gulp.task('copy', () => {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/css/**/*.css',
    'source/*.ico',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('build', gulp.series('clean', 'copy', 'html', 'css', 'js', 'images', 'webp', 'svgsprite'));

gulp.task('start', gulp.series('build', 'server'));
