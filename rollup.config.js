import babel from 'rollup-plugin-babel';

const externals = [
	'@rollup/plugin-babel',
	'@rollup/plugin-node-resolve',
	'@rollup/plugin-commonjs',
	'rollup-plugin-postcss',
	'rollup-plugin-svg',
	'gulp',
	'stylelint',
	'gulp-nodemon',
	'gulp-postcss',
	'gulp-flatten',
	'merge-stream',
	'gulp-plumber',
	'gulp-sourcemaps',
	'gulp-notify',
	'gulp-if',
	'gulp-environments',
	'gulp-eslint',
	'gulp-svg-sprite',
	'path',
	'fs',
	'del',
	'crypto',
	'browser-sync',
	'fancy-log',
	'glob-all',
	'through2',
	'child_process',
	'rollup',
	'rollup-plugin-terser',
	'rollup-plugin-cleanup',
	'zlib',
	'util',
];

module.exports = [
	{
		input: 'src/index.js',
		external: externals,
		plugins: [babel()],
		output: {
			interop: false,
			file: 'dist/cjs/index.js',
			format: 'cjs',
		},
		onwarn(warning, warn) {
			if (warning.code === 'UNRESOLVED_IMPORT') throw new Error(warning.message);

			// Use default for everything else
			warn(warning);
		},
	},
];
