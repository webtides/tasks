import environments from 'gulp-environments';
import { rollup } from 'rollup';
import { babel }from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import postcss from 'rollup-plugin-postcss';
import svg from 'rollup-plugin-svg';
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
			nodeResolve({ ...options.resolveOptions }),
			postcss({ ...options.postcssOptions }),
			svg(),
			commonjs({ ...options.commonjsOptions }),
			babel({ ...options.babelOptions }),
			Config.versionManifest !== false && hash(Config.versionManifest),
			isProd() && cleanup({ ...options.cleanupOptions }),
			isProd() && terser(),
		],
		onwarn(warning, warn) {
			if (warning.code === 'UNRESOLVED_IMPORT') {
				const message = `'${warning.source}' is imported by ${warning.importer}, but could not be resolved. If this is an external dependency (https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency) - please add it to inputOptions.external (https://rollupjs.org/guide/en/#external)`;
				throw new Error(message);
			}

			// Use default for everything else
			warn(warning);
		},
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
