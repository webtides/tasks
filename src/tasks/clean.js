import { deleteSync } from 'del';

export default (options) => {
	return (done) => {
		deleteSync(options.paths);
		done();
	};
};
