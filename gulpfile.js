const gulp = require('gulp');
const sequence = require('run-sequence');
const tsc = require('gulp-typescript');
const rename = require('gulp-rename');
const del = require('del');



gulp.task('clean', () => del('build'));



/* ---------- SERVER ---------- */
const serverProject = tsc.createProject('tsconfig.json', {
	typescript: require('typescript')
});

gulp.task('server-typescript', () => {
	// gulp.src(['app/**', '!app/_tmp{,/**/*}'])

	return gulp.src(['types/**/*.d.ts', 'src/server/**/*.ts', '!src/server/node_modules{,/**/*}'])
		.pipe(serverProject())
		.pipe(gulp.dest('build/server'));
});

gulp.task('server-copy-package-json', () => {
	return gulp.src('src/server/package.json')
		.pipe(gulp.dest('build/server'));
});



/* ---------- PLUGIN DEV HELPER ---------- */
const pluginDevHelperProject = tsc.createProject('tsconfig.json', {
	typescript: require('typescript')
});

gulp.task('plugin-dev-helper-copy-package-json', () => {
	return gulp.src('src/plugin-dev-helper/**/package.json').pipe(gulp.dest('build/plugin-dev-helper'));
});

gulp.task('plugin-dev-helper-typescript', () => {
	return gulp.src(['src/plugin-dev-helper/index.ts'])
		.pipe(pluginDevHelperProject())
		.pipe(gulp.dest('build/plugin-dev-helper'));
});



/* ---------- PLUGINS ---------- */
const pluginsProject = tsc.createProject('tsconfig.json', {
	typescript: require('typescript')
});

gulp.task('plugins-copy-package-json', () => {
	return gulp.src(['src/plugins/**/package.json', '!src/plugins/**/node_modules{,/**/*}'])
		.pipe(gulp.dest('build/plugins'));
});

gulp.task('plugins-typescript', () => {
	return gulp.src(['types/**/*.d.ts', 'src/plugins/**/index.ts'])
		.pipe(pluginsProject())
		.pipe(gulp.dest('build/plugins'));
});



/* ---------- TYPES ---------- */
gulp.task('type-definitions', () => {
	return gulp.src('types/index.ts')
		.pipe(rename(function (path) {
			path.dirname = '';
			path.basename = 'hoarder.d';
		}))
		.pipe(gulp.dest('build/server'));
});


gulp.task('build', () => {
	return sequence(
		[
			'server-typescript',
			'server-copy-package-json',
			'type-definitions'
		],
		[
			'plugins-typescript',
			'plugins-copy-package-json'
		],
		[
			'plugin-dev-helper-typescript',
			'plugin-dev-helper-copy-package-json'
		]
	);
});

gulp.task('watch', () => {
	gulp.watch(['src/**/*.**', 'plugin-development/index.ts', '!src/**/node_modules{,/**/*}'], ['build']);
});

gulp.task('default', ['build']);
