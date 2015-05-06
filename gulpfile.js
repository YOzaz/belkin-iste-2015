var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bytediff = require('gulp-bytediff');
var plumber = require('gulp-plumber');

gulp.task('js', function() {
	return gulp.src('public/src/js/*.js')
		.pipe(plumber())
			.pipe(bytediff.start())
				.pipe(uglify({mangle: true}))
			.pipe(bytediff.stop())
		.pipe(plumber.stop())
		.pipe(gulp.dest('public/dist/js/'));
});

gulp.task('css', function() {
	return gulp.src('public/src/css/*.scss')
		.pipe(plumber())
			.pipe(bytediff.start())
				.pipe(sass({errLogToConsole: true}))
				.pipe(autoprefixer('last 15 version'))
			.pipe(bytediff.stop())
		.pipe(plumber.stop())
		.pipe(gulp.dest('public/dist/css/'));
});

gulp.task('cssConcat', ['css'], function(){
    return gulp.src('public/dist/css/*.css')
        .pipe(concat('styles.min.css'))
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('public/dist/css/'))
});

gulp.task('watchjs', function () {
	return gulp.watch('public/js/*.js', ['js']);
});

gulp.task('watchcss', function () {
	return gulp.watch('public/css/*.scss', ['cssConcat']);
});

gulp.task('default', ['watchjs', 'watchcss', 'js', 'cssConcat']);

