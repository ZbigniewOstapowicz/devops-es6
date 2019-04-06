var gulp = require('gulp');
var sass = require('gulp-sass');
const browsersync = require("browser-sync").create();
const webpack = require('webpack-stream');

function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./build/"
        },
        port: 3000
    });
    done();
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}

function copyHtml() {
    return gulp.src('index.html')
        .pipe(gulp.dest('build'))
};

function copyImg() {
    return gulp.src('src/img/**/*.{gif,jpg,png,svg}')
        .pipe(gulp.dest('build'))
};

function styles() {
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build'))
};

function scripts() {
    return gulp.src('src/js/index.js')
        .pipe(webpack({
            output: {
                filename: 'index.js',
            },
        }))
        .pipe(gulp.dest('build'));
}

function watchFiles() {
    copyImg();
    copyHtml();
    styles();
    scripts();

    gulp.watch('index.html', copyHtml);
    gulp.watch('src/img/**/*.{gif,jpg,png,svg}', copyImg);
    gulp.watch('src/scss/**/*.scss', styles);
    gulp.watch('src/js/**/*.js', scripts);

    gulp.watch(
        [
            "./build/**/*",
        ],
        gulp.series(browserSyncReload)
    );
}

const watch = gulp.parallel(watchFiles, browserSync);

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.default = watch;