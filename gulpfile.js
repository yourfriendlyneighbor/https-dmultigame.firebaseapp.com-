var gulp = require('gulp');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var imageMin = require('gulp-imagemin')

var path = {
  scripts: ['js/config.js', 'js/lib/*.js', 'js/player.js', 'js/**/*.js', 'js/skybox.js'],
  html: ['html/*.html'],
  css: ['sass/*.scss', 'sass/*.css'],
  img: ['img/**/*.png']
};

gulp.task('scripts', () => {
  return gulp.src(path.scripts)
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('html', () => {
  return gulp.src(path.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('css', () => {
  return gulp.src(path.css)
    .pipe(sass())
    .pipe(concatCss('master.css'))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('image', () => {
  return gulp.src(path.img)
    .pipe(imageMin())
    .pipe(gulp.dest('dist/images'))
})



gulp.task('watch', () => {
  gulp.watch(path.scripts, ['scripts']);
  gulp.watch(path.html, ['html'])
  gulp.watch(path.css, ['css'])
  gulp.watch(path.img, ['image'])
});
