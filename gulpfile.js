const gulp = require('gulp');
const sass = require('gulp-sass');
const shell = require('gulp-shell');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const syntax = require('postcss-scss');


gulp.task('sass', function() {
  const processors = [
      autoprefixer({browsers: ['last 2 version', '> 1%']}),
  ];
  return gulp.src('./sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(postcss(processors, {syntax: syntax}))
    .pipe(gulp.dest('./css'));
});

gulp.task('hbs', function() {
  return gulp.src('./*.hbs', {read: false})
    .pipe(shell(['node tools/compile.js']))
});

gulp.task('hbs:js', function() {
  return gulp.src('./content/*.js')
    .pipe(shell(['node tools/compile.js']))
});

gulp.task('watch', function() {
  gulp.watch('./sass/*.scss', ['sass']);
  gulp.watch('./index.hbs', ['hbs']);
  gulp.watch('./content/*.js', ['hbs:js'])
});

gulp.task('default', ['sass', 'watch']);
