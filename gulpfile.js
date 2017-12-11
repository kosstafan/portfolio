const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов


const del = require('del');

const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const eslint = require('gulp-eslint');
const notify = require('gulp-notify');


const imagemin = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями
const cache = require('gulp-cache'); // Подключаем библиотеку кеширования
const pngquant = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png



const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/assets/styles/'
    },    
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/assets/images/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/assets/scripts/'
    }
}

// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
    return gulp.src('./src/styles/app.scss')
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы    
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest))
}

// очистка
function clean() {
    return del(paths.root);
}

// webpack
function scripts() {
    return gulp.src('src/scripts/app.js')
        .pipe(gulpWebpack(webpackConfig, webpack)) 

        .pipe(gulp.dest(paths.scripts.dest));
}

// галповский вотчер
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.scripts.src, lint);
}

// локальный сервер + livereload (встроенный)
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// переносим и минифицируем картинки
function images() {
    return gulp.src(paths.images.src)
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(paths.images.dest));
}

function lint() {
    return gulp.src('src/scripts/app.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', notify.onError({
        message: 'There is a JS error, please look the console for details'
    }));
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.lint = lint;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, images, scripts),
    gulp.parallel(watch, server)
));

