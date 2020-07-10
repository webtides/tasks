import glob from 'glob-all';
import rollupJS from './rollupJS.js';

import environments from 'gulp-environments';

const isDev = environments.development;
const isProd = environments.production;

export default (options = { outputOptions: {}, babelOptions: {} }) => {
	return () => {
		return rollupJS(
			{
				input: glob.sync(options.src),
			},
			{
				dir: options.dest,
				entryFileNames: '[name].js',
				format: 'es',
				sourcemap: true,
				...options.outputOptions,
			},
			{
				babelrc: true,
				...options.babelOptions,
			},
		);
	};
};
