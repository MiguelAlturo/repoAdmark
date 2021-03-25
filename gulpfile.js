var { src, dest, watch, series } = require('gulp');
var sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    inject = require('gulp-inject'),
    rename = require('gulp-rename');    
const rollup = require('gulp-better-rollup');
const babelRollup  = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');

function initBrowserSync(cb) {
    browserSync.init({
        port: 9000,
        server: {
            baseDir: 'dist'
        },
    })
    cb();
}

function setSass(cb) {
    src(['src/scss/*.scss'])
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(rename('styles.min.css'))
        .pipe(dest('dist/css'))
        .pipe(dest('css'))
        .pipe(browserSync.stream());
    cb();
}

function setHtml(cb) {
    src('src/*.html')
        .pipe(inject(src(['src/index.html']), {
            starttag: '<!-- inject:index:{{ext}} -->',
            transform: function(filePath, file) {
                // return file contents as string
                return file.contents.toString('utf8')
            }
        }))
        .pipe(dest('dist'));
    cb();
}

// function setImages(cb) {    
//     src('src/images/logo/*')
//         .pipe(dest('dist/images/logo'));
//     cb();
// }//setImages

function setJs(cb) {
    src(['src/scripts/**/*.js'])
        .pipe(rollup({ plugins: [babelRollup(), resolve(), commonjs(), json()] }, 'umd'))
        .pipe(dest('dist/scripts'))
        .pipe(dest('../dist/scripts'))
        .pipe(browserSync.stream());;
    cb();
}

function setData(cb) {
    src('src/scripts/data/**/*.json')
        .pipe(dest('dist/scripts/data'))
    cb();
}

function reloadFiles(cb) {
    watch('src/**/*.html', setHtml);
    watch('src/*.html').on('change', browserSync.reload);
    watch('src/scss/**/*.scss', setSass);
    watch('src/scss/**/*.scss').on('change', browserSync.reload);
    watch('src/scripts/**', browserSync.reload);
    cb();
}

exports.default = series(setSass, initBrowserSync, setHtml,setData ,setJs,reloadFiles); 