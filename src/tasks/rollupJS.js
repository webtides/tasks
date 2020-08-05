import environments from 'gulp-environments';
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import postcss from 'rollup-plugin-postcss';
import svg from 'rollup-plugin-svg';
import gzipPlugin from 'rollup-plugin-gzip';
import hash from 'src/util/RollupHashPlugin';

const isDev = environments.development;
const isProd = environments.production;

import Config from 'src/config.js';

export default async (
	options = {
		inputOptions: {},
		outputOptions: {},
		babelOptions: {},
		resolveOptions: {},
		postcssOptions: {},
		commonjsOptions: {},
		cleanupOptions: {},
	},
) => {
	const inputOptions = {
		input: '',
		plugins: [
			babel({ ...options.babelOptions }),
			resolve({ ...options.resolveOptions }),
			postcss({ ...options.postcssOptions }),
			svg(),
			commonjs({ ...options.commonjsOptions }),
			Config.versionManifest !== false && hash(Config.versionManifest),
			isProd() && cleanup({ ...options.cleanupOptions }),
			isProd() && terser(),
			isProd() && gzipPlugin(),
		],
		...options.inputOptions,
	};
	const outputOptions = {
		dir: 'public',
		entryFileNames: '[name].js',
		format: 'es',
		sourcemap: true,
		...options.outputOptions,
	};

	const bundle = await rollup(inputOptions);
	return await bundle.write(outputOptions);
};
