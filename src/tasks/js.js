// TODO refactor to glob
import glob from 'glob-all';
import rollupJS from './rollupJS.js';

export default (options = { src: [], dest: '' }) => {
	return () => {
		return rollupJS({
			inputOptions: {
				input: glob.sync(options.src),
				...(options.inputOptions || {}),
			},
			outputOptions: {
				dir: options.dest,
				...(options.outputOptions || {}),
			},
			babelOptions: options.babelOptions || {},
			resolveOptions: options.resolveOptions || {},
			postcssOptions: options.postcssOptions || {},
			commonjsOptions: options.commonjsOptions || {},
			cleanupOptions: options.cleanupOptions || {},
		});
	};
};
