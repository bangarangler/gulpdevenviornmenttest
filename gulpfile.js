var gulp = require('gulp');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
//var htmlclean = require('gulp-htmlclean');
//var cleanCSS = require('gulp-clean-css');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');


var paths = {
		src: 'src/**/*.html',
		srcHTML: 'src/**/*.html',
		srcCSS: 'src/**/*.css',
		srcJS: 'src/**/*.js',

		tmp: 'tmp',
		tmpIndex: 'tmp/index.html',
		tmpCSS: 'tmp/**/*.css',
		tmpJS: 'tmp/**/*.js',

		dist: 'dist',
		distIndex: 'dist/index.html',
		distCSS: 'dist/**/*.css',
		distJS: 'dist/**/*.js'
};

gulp.task('html', function (){
		return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmp));
});

gulp.task('css', function(){
		return gulp.src(paths.srcCSS).pipe(gulp.dest(paths.tmp));
});

gulp.task('js', function(){
		return gulp.src(paths.srcJS).pipe(gulp.dest(paths.tmp));
});


gulp.task('copy', ['html', 'css', 'js']);

gulp.task('inject', ['copy'], function(){
		var css = gulp.src(paths.tmpCSS);
		var js = gulp.src(paths.tmpJS);
		return gulp.src(paths.tmpIndex)
		.pipe(inject( css, { relative:true } ))
		.pipe(inject( js, { relative:true } ))
		.pipe(gulp.dest(paths.tmp));
});

gulp.task('serve', ['inject'], function (){
		return gulp.src(paths.tmp)
		.pipe(webserver({
				fallback: 'index.html',
				port: 3000,
				livereload: true
		}));
});

gulp.task('watch', ['serve'], function () {
		gulp.watch(paths.src, ['inject']);
});

gulp.task('default', ['watch']);

