import del from 'del';

export default (options) => {
	return () => {
		return del(options.paths);
	};
};
