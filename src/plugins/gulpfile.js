const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

gulp.task('copy', () => {
    return gulp.src('packages/**/package.json').pipe(gulp.dest('build'));
});

gulp.task('build', () => {
    return gulp.src(['src/**/index.ts'])
        .pipe(tsProject())
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['build', 'copy']);

gulp.task('watch', ['default'], () => {
	gulp.watch('src/**/*.**', ['build', 'copy']);
});
