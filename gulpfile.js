const del = require('del');
const gulp = require('gulp');
const tsc = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const tsProject = tsc.createProject('tsconfig.json');

gulp.task('compile-ts', () => {
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest('build'));
});

gulp.task('clean-ts', (done) => {
	return del(['build/**/*'], done);
});

gulp.task('watch', ['compile-ts'], () => {
	nodemon({
		script: './build/src/main.js',
		ext: 'ts',
		watch: './src',
		tasks: ['compile-ts']
	});
});

gulp.task('build', ['ts-lint', 'compile-ts']);
gulp.task('default', ['watch']);
