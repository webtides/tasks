import gulp from 'gulp';
import log from 'fancy-log';

import Config from '../config.js';

export default (options) => {
	return () => {
		// notify({ title: Config.projectTitle, message: 'Watching for changes...' }).write('');

		options.paths.forEach((path) => {
			gulp.watch(path.src, path.tasks)
				.on('change', function () {
					log.info(Config.projectTitle, path.changeMessage || 'Change');
				})
				.on('error', function (error) {
					log.info(Config.projectTitle, path.errorMessage || 'Error:' + error.message);
				});
		});
	};
};
