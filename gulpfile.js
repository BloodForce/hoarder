const gulp = require('gulp');
const tsc = require('gulp-typescript');
const rename = require('gulp-rename');
const del = require('del');



/* ---------- SERVER ---------- */
const serverProject = tsc.createProject('tsconfig.json', {
	typescript: require('typescript')
});

gulp.task('server-typescript', () => {
	return gulp.src('src/server/**/*.ts')
		.pipe(serverProject())
		.on('error', function () {
			process.exit(1);
		})
		.pipe(gulp.dest('build/server'));
});

gulp.task('server-copy-package-json', () => {
	return gulp.src('src/server/package.json')
		.pipe(gulp.dest('build/server'));
});



/* ---------- PLUGINS ---------- */
const pluginsProject = tsc.createProject('tsconfig.json', {
	typescript: require('typescript')
});

gulp.task('plugins-copy-package-json', () => {
	return gulp.src('src/plugins/**/package.json').pipe(gulp.dest('build/plugins'));
});

gulp.task('plugins-typescript', () => {
	return gulp.src(['src/plugins/**/index.ts'])
		.pipe(pluginsProject())
		.pipe(gulp.dest('build/plugins'));
});



/* ---------- TYPES ---------- */
const typesProject = tsc.createProject('tsconfig.json', {
	declaration: true,
	typescript: require('typescript')
});

gulp.task('type-definitions', () => {
	return gulp.src('types/index.ts')
		.pipe(typesProject())
		.on('error', function () {
			process.exit(1);
		})
		.pipe(rename('hoarder.d.ts'))
		.pipe(gulp.dest('build/server/types'));
});



gulp.task('build', [
	'server-typescript',
	'server-copy-package-json',
	'plugins-typescript',
	'plugins-copy-package-json',
	'type-definitions'
]);

gulp.task('watch', ['build'], () => {
	gulp.watch(['src/**/*.**', 'plugin-development/index.ts'], ['build']);
});

gulp.task('default', ['build']);
