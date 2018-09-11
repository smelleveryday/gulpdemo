var gulp = require('gulp')

var uglify = require('gulp-uglify')

var concat = require('gulp-concat')

var gutil = require('gulp-util')

var minify = require('gulp-minify-css')

var htmlmin = require('gulp-htmlmin')

var babel = require('gulp-babel')

var imagemin = require('gulp-imagemin')

gulp.task('default', function () {
	gulp.src('js/*.js')
	.pipe(babel())
	.pipe(uglify())
	.on('error', function (err) {
                gutil.log(gutil.colors.red('[Error]'), err.toString());
            })
	.pipe(gulp.dest('dist/js'))
})
gulp.task('csst', function () {
	gulp.src('css/*.css')
	.pipe(minify())
	.pipe(gulp.dest('dist/css'))
})
gulp.task('htmlst', function () {
	gulp.src('*.html')
	.pipe(htmlmin({collapseWhitespace: true,minifyJS: true,minifyCSS: true}))
	.pipe(gulp.dest('dist'))
})
gulp.task('static', function () {
	gulp.src('js/**')
	.pipe(gulp.dest('dist/js'))
})
gulp.task('imagest', function() {
	gulp.src('img/*.{png,jpg,gif,ico}')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
})
gulp.task('all',['htmlst', 'csst', 'static', 'default', 'imagest'])
