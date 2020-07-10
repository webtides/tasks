import environments from 'gulp-environments';
import { rollup } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import postcss from 'rollup-plugin-postcss';
import svg from 'rollup-plugin-svg';
import commonjs from 'rollup-plugin-commonjs';
import gzipPlugin from 'rollup-plugin-gzip';
import hash from 'src/util/RollupHashPlugin';

const isDev = environments.development;
const isProd = environments.production;

import Config from 'src/config.js';

export default async (inputOptions = {}, outputOptions = {}) => {
	inputOptions = {
		input: '',
		plugins: [
			babel(),
			resolve(),
			postcss(),
			svg(),
			commonjs(),
			Config.versionManifest !== false && hash(Config.versionManifest),
			isProd() && cleanup({}),
			isProd() && terser(),
			isProd() && gzipPlugin(),
		],
		...inputOptions,
	};
	outputOptions = {
		dir: 'public',
		entryFileNames: '[name].js',
		format: 'es',
		sourcemap: true,
		...outputOptions,
	};

	const bundle = await rollup(inputOptions);
	return await bundle.write(outputOptions);
};
