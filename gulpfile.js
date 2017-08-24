var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});

var paths = {
	sass    : ["sources/sass/**/*.scss", "!sources/sass/**/_*.scss", "!sources/sass/_**/*.scss"],
	dist    : 'dist'
};

gulp.task('sass', function () {
	gulp.src(paths.sass)
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.sass({outputStyle: 'expanded'}))
		.pipe($.pleeease({
			autoprefixer: ['last 2 versions', 'android 4.0'],
			mqpacker: false,
			minifier: false
		})) // CSS最適化
		.pipe($.csscomb())
		.pipe(gulp.dest(paths.dist + '/assets/css'))
		.pipe(browser.reload({
			stream: true
		}));
});

var browser = require("browser-sync");

gulp.task("server", function () {
	browser({
		online: true,
		open: "external",
		server: {
			baseDir: "dist/",
		}
	});
});

gulp.task('html-reload', function () {
	browser.reload();
});

gulp.task("default", ["server"], function () {
	gulp.watch([paths.sass, 'sources/sass/**/_*.scss'], ['sass']);
	gulp.watch('*html', ['html-reload']);
});