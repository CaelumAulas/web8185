const { src, dest, watch, series } = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber'); //o pumbler serve para tratar os erros de pipe
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');

function htmlProd () {

    return src('src/*.html')
        .pipe(
            plumber()
        )
        .pipe(
            htmlmin({ collapseWhitespace: true })
        )
        .pipe(
            dest('dist/')
        );

}

function cssProd() {

    return src('src/css/**')
        .pipe(
            concat('ceep.css')
        )
        .pipe(
            cleanCSS()
        )
        .pipe(
            dest('dist/assets/css')
        );

}

function imgProd() {

    return src('src/assets/img/**')
        .pipe(
            dest('dist/assets/img')
        );

}

function jsProd(){

    return src('src/js/**/*.js')
        .pipe(
            babel({
                presets: ['@babel/env']
            })
        )
        .pipe(
            concat('ceep.js')
        )
        .pipe(
            uglify()
        )
        .pipe(
            dest('dist/assets/js')
        );

}

function cssDev() {

    return src('src/css/**')
        .pipe(
            concat('ceep.css')
        )
        .pipe(
            dest('src/assets/css')
        );

}

function jsDev(){

    return src('src/js/**/*.js')
        .pipe(
            concat('ceep.js')
        )
        .pipe(
        dest('src/assets/js')
        );

}

watch('src/js', series(jsDev, jsProd));
watch('src/css', series(cssDev, cssProd));
watch('src/*.html', series(htmlProd));
watch('src/assets/img', series(imgProd));

exports.default = series(cssDev, jsDev, htmlProd, cssProd, jsProd, imgProd);
