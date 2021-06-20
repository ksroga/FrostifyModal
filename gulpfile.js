const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify-css');
const babel = require('gulp-babel');


gulp.task('js', function() {
    return gulp.src('src/js/index.js')
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(concat('FrostModals.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js/'));
});

gulp.task('css', function() {
    return gulp.src('src/css/style.css')
        .pipe(concat('FrostModals.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('src/css/'));
});

gulp.task('watch', function() {
    gulp.watch('src/css/style.css', gulp.series('css'))
    gulp.watch('src/js/index.js', gulp.series('js'))
})

gulp.task('default', gulp.series('js','css', 'watch'), function(){

});