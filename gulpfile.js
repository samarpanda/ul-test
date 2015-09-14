var gulp = require("gulp");
var concat = require("gulp-concat");
var browserSync = require("browser-sync");
var clean = require('gulp-clean');
var sass = require('gulp-sass');

var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var Kserver = require('karma').Server;

gulp.task('saucelab', function(){
	new Kserver({
		configFile: __dirname + '/karma.conf-ci.js',
		singleRun: true
	}).start();
});

gulp.task('travis-test', function(){
	new Kserver({
		configFile: __dirname + '/karma.conf.js',
		browsers: ['Firefox'],
		singleRun: true
	}).start();
});

gulp.task('default', ['serve'], function(){});

gulp.task('serve', ['watch'], function(){
	browserSync.init({
		server: './dist'
	});
});

gulp.task('watch', ['build'], function(){
	gulp.watch('./app/*.html', ['copyhtmls']);
	gulp.watch('./app/**/*.js', ['modulejs']);
	gulp.watch('./app/**/*.scss', ['sass']);

	gulp.watch('dist/**/*.js').on('change', browserSync.reload);
	gulp.watch('dist/**/*.css').on('change', browserSync.reload);
	gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('build', ['copyfiles', 'modulejs', 'sass'], function(){});

gulp.task('modulejs', function(){
	browserify({
		entries: './app/js/main.js',
		debug: true
	})
	.transform(babelify)
	.bundle()
	.pipe(source('all.js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function(){
	return gulp.src('./app/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('copyfiles', ['copyimages', 'copyhtmls'], function(){});

gulp.task('copyimages', function(){
	return gulp.src('./app/images/*')
		.pipe(gulp.dest('./dist/images'));
});

gulp.task('copyhtmls', function(){
	return gulp.src('./app/*.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('clean', function(){
	return gulp.src(['dist/css', 'dist/js', 'dist/images', 'dist/*.html'], { read: false }).pipe(clean());
});

gulp.task('local-test', function(){
	new Kserver({
		configFile: __dirname + '/karma.conf-single.js',
		browsers: ['PhantomJS'],
		singleRun: true
	}).start();
});
