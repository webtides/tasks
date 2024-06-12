import babel from '@rollup/plugin-babel';

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
const externals = [
	'@rollup/plugin-babel',
	'@rollup/plugin-node-resolve',
	'@rollup/plugin-commonjs',
	'@rollup/plugin-terser',
	'rollup-plugin-postcss',
	'rollup-plugin-svg',
	'gulp',
	'stylelint',
	'gulp-postcss',
	'gulp-flatten',
	'gulp-plumber',
	'gulp-sourcemaps',
	'gulp-if',
	'gulp-environments',
	'gulp-eslint',
	'gulp-svg-sprite',
	'path',
	'fs',
	'crypto',
	'browser-sync',
	'fancy-log',
	'glob-all',
	'through2',
	'child_process',
	'rollup',
	'rollup-plugin-cleanup',
	'svg-sprite',
	'zlib',
	'util',
	'vinyl',
	'glob',
	'fs-extra',
	'path',
];

export default [
	{
		input: 'src/index.js',
		plugins: [nodeResolve(), commonjs(), json(), babel({ babelHelpers: 'bundled' })],
		external: externals,
		output: {
			file: 'dist/cjs/index.cjs',
			format: 'cjs',
		},
		onwarn(warning, warn) {
			if (warning.code === 'UNRESOLVED_IMPORT') throw new Error(warning.message);

			// Use default for everything else
			warn(warning);
		},
	},
];
