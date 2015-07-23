var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    lib    = require('bower-files')(),
    sourcemaps    = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

var sassSrc     = './client/app/scss/**/*.scss',
    sassDest    = './build/css/',
    jsSrc       = './client/app/scripts/**/*.js',
    jsDest      = './build/js/';

gulp.task('browser-sync', function() {
	browserSync.init({
    files: './build/',
		server: {
            baseDir: "./build"
        }
	});
});

gulp.task('bower', function () {
  gulp.src(lib.ext('js').files)
      .pipe(uglify())
      .pipe(gulp.dest(jsDest + "lib"));
});

gulp.task('js', function() {
  gulp.src(jsSrc)
      .pipe(uglify())
      .pipe(gulp.dest(jsDest));
});

gulp.task('sass', function() {
    gulp.src(sassSrc)
        .pipe(sourcemaps.init())
        .pipe(sass({
          style: 'compressed' // compact
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(sassDest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('index-html', function () {
 gulp.src('./client/index.html')
      .pipe(gulp.dest("./build"));
});

gulp.task('default', ['sass', 'js', 'index-html', 'bower', 'browser-sync'], function () {
  gulp.watch(sassSrc, ['sass'])
  gulp.watch(jsSrc, ['js'])

  gulp.watch('./client/index.html', ['index-html', 'bs-reload']);
});
