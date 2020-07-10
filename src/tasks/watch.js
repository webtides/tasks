import gulp from 'gulp';
import notify from 'gulp-notify';

import Config from 'src/config.js';

export default (options) => {
	return () => {
		notify({ title: Config.projectTitle, message: 'Watching for changes...' }).write('');

		options.paths.forEach((path) => {
			gulp.watch(path.src, path.tasks)
				.on('change', function () {
					if (Config.showNotifications) {
						notify({ title: Config.projectTitle, message: path.changeMessage || 'Change' }).write('');
					}
				})
				.on('error', function (error) {
					if (Config.showNotifications) {
						notify.onError({
							title: Config.projectTitle,
							message: path.errorMessage || 'Error: ' + error.message,
						});
					}
				});
		});
	};
};
