import glob from 'glob-all';
import rollupJS from './rollupJS.js';

export default (options = { src: [], dest: '', inputOptions: {}, outputOptions: {} }) => {
	return () => {
		return rollupJS(
			{
				input: glob.sync(options.src),
				...options.inputOptions,
			},
			{
				dir: options.dest,
				...options.outputOptions,
			},
		);
	};
};
