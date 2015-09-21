var gulp = require('gulp');
var sass = require('gulp-sass');

//sass tasks
gulp.task('styles', function() {
    gulp.src('css/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css/'));
});

//gulp tasks
gulp.task('default', function() {
  gulp.watch('css/*.sass',['styles']);
});