const
    autoprefixer = require('gulp-autoprefixer'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    express = require('express'),
    gulp = require('gulp'),
    livereload = require('connect-livereload'),
    lrserver = require('tiny-lr')(),
    refresh = require('gulp-livereload'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),

    livereloadport = 35729,
    serverport = 1000;

let server = express();
server.use(livereload({
    port: livereloadport
}));
server.use(express.static('./dist'));
server.all('/*', function (req, res) {
    res.sendfile('index.html', {
        root: 'dist'
    });
});

gulp.task('lint', function () {
    gulp.src(['./app/**/*.js', '!node_modules/**', '!./app/**/*.spec.js', '!./app/tests/*'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build', function () {
    let b = browserify({
        entries: [
            './app/app.helpers.js',
            './app/app.main.js'
        ],
        transform: [babelify]
    });
    return b.bundle()
        .pipe(source('app.bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['lint'], function () {
    gulp.watch(
        ['app/*.js', 'app/**/*.js'], ['lint', 'build']);
    gulp.watch(
        ['app/index.html', 'app/views/**/*.html'], ['views']
    );
    gulp.watch(
        ['app/styles/**/*.scss'], ['styles']
    );
});

gulp.task('views', function () {
    gulp.src('app/index.html')
        .pipe(gulp.dest('dist/'));
    gulp.src('./app/views/**/*')
        .pipe(gulp.dest('dist/views/'))
        .pipe(refresh(lrserver));
});

gulp.task(
    'dev', ['views', 'styles', 'lint', 'build'],
    function () {
        server.listen(serverport);
        lrserver.listen(livereloadport);
        gulp.watch();
    });

gulp.task('styles', function () {
    gulp.src([
            'node_modules/loading-circle/loading-circle.css',
            'app/styles/*.scss'
        ])
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 10'))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(refresh(lrserver));
});

gulp.task('default', ['dev', 'watch']);