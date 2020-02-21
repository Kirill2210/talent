let gulp = require('gulp');
var minifyCSS = require('gulp-cssmin');
let rename = require('gulp-rename');
let browserSync = require('browser-sync');
let autoprefixer = require ('gulp-autoprefixer');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let cssmin = require('gulp-cssmin');

gulp.task('css', function(){
	return gulp.src('app/css/style.css')
			.pipe(minifyCSS({outputStyle: 'compressed'}))
			.pipe(rename({suffix:'.min'}))
			.pipe(autoprefixer({
				overrideBrowserslist: ['last 8 version']
			}))
			.pipe(gulp.dest('app/css'))
			.pipe(browserSync.reload({stream: true}))
});

gulp.task('style', function(){
	return gulp.src([
		'node_modules/normalize.css/normalize.css',
		
		'node_modules/slick-carousel/slick/slick.css'
	])
		.pipe(concat('libs.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('app/css'))
});

gulp.task('script', function(){
	return gulp.src([
		'node_modules/slick-carousel/slick/slick.js'
	])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
});

gulp.task('html', function(){
	return gulp.src('app/*.html')
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
	return gulp.src('app/js/*.js')
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
	browserSync.init({
		server: {
			baseDir: "app/"
		}
	});
});

gulp.task('watch', function(){
	gulp.watch('app/css/style.css', gulp.parallel('css'))
	gulp.watch('app/*.html', gulp.parallel('html'))
	gulp.watch('app/js/*.js', gulp.parallel('js'))
});

gulp.task('default', gulp.parallel('style', 'script', 'css', 'watch', 'browser-sync'))