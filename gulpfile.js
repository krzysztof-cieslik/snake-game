const { watch, src, dest, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const config = {
    app: {
        scss: './src/styles/**/*.scss',
        assets: './src/assets/*.*',
        scripts: './src/scripts/*.js',
        html: './src/**/*.html'
    },
    dist: {
        base: './dist/',
        scss: './dist/styles',
        assets: './dist/assets',
        scripts: './dist/scripts'
    }
}

function cssTask(done) {
    src(config.app.scss)
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest(config.dist.scss))
    done();
}

function assetsTask(done) {
    src(config.app.assets)
        .pipe(dest(config.dist.assets))
    done();
}

function scriptsTask(done) {
    src(config.app.scripts)
        .pipe(dest(config.dist.scripts))
    done();
}

function templateTask(done) {
    src(config.app.html)
        .pipe(dest(config.dist.base))
    done();
}

function watchFiles() {
    watch(config.app.scss, series(cssTask, reloadBrowser));
    watch(config.app.assets, series(assetsTask, reloadBrowser));
    watch(config.app.scripts, series(scriptsTask, reloadBrowser));
    watch(config.app.html, series(templateTask, reloadBrowser));
}

function browserServer(done) {
    browserSync.init({
        server: {
            baseDir: config.dist.base
        },
    });
    done();
}

function reloadBrowser (done) {
    browserSync.reload();
    done();
}

function cleanUp() {
    return del([config.dist.base]);
}

exports.dev = parallel(cssTask, assetsTask, scriptsTask, templateTask, watchFiles, browserServer);
exports.build = series(cleanUp, parallel(cssTask, assetsTask, scriptsTask, templateTask));
