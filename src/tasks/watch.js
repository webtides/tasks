import gulp from 'gulp';

import Config from 'src/config.js';
import log from 'fancy-log';

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
