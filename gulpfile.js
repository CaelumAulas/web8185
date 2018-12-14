const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
//o pumbler serve para tratar os erros de pipe
const plumber = require('gulp-plumber');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const watch = require('gulp-watch');

gulp.task('prod', function(cb){
    gulp.src('src/*.html')
        .pipe(plumber())
        .pipe(
            htmlmin({ collapseWhitespace: true })
        )
        .pipe(
            gulp.dest('dist/')
        )

    gulp.src('src/css/**')
        .pipe(
            concat('ceep.css')
        )
        .pipe(
            cleanCSS()
        )
        .pipe(
            gulp.dest('dist/assets/css')
        )

    gulp.src('src/assets/img/**')
        .pipe(
            gulp.dest('dist/assets/img')
        )

    gulp.src('src/js/**/*.js')
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
        .pipe(gulp.dest('dist/assets/js'))

    cb();
})

gulp.task('dev', function (cb) {

    gulp.src('src/css/**')
        .pipe(
            concat('ceep.css')
        )
        .pipe(
            gulp.dest('src/assets/css')
        )


    gulp.src('src/js/**/*.js')
        .pipe(
            concat('ceep.js')
        )
        .pipe(
            gulp.dest('src/assets/js')
        )

    cb();
})

gulp.task('watch', function(cb){
    watch(
        'src/**', ['dev']
    )

    watch(
        'src/**', ['prod']
    )
})

function defaultTask(cb) {
    
    cb();
}

exports.default = defaultTask;
