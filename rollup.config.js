const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

const externals = [
	'gulp',
	'stylelint',
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
	'rollup-plugin-node-resolve',
	'rollup-plugin-babel',
	'rollup-plugin-terser',
	'rollup-plugin-cleanup',
	'rollup-plugin-postcss',
	'rollup-plugin-commonjs',
	'zlib',
	'util',
];

module.exports = [
	{
		input: 'src/index.js',
		external: externals,
		plugins: [babel(), resolve(), commonjs()],
		output: {
			interop: false,
			file: 'dist/cjs/index.js',
			format: 'cjs',
		},
	},
	{
		input: 'src/index.js',
		external: externals,
		plugins: [babel(), resolve(), commonjs()],
		output: {
			interop: false,
			file: 'dist/es/index.js',
			format: 'es',
		},
	},
];
