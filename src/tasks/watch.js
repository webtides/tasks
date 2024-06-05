import gulp from 'gulp';

import Config from 'src/config.js';

export default (options) => {
	return () => {
		// notify({ title: Config.projectTitle, message: 'Watching for changes...' }).write('');

		options.paths.forEach((path) => {
			gulp.watch(path.src, path.tasks)
				.on('change', function () {
					console.log(Config.projectTitle, path.changeMessage || 'Change');
				})
				.on('error', function (error) {
					console.log(Config.projectTitle, path.errorMessage || 'Error:' + error.message);
				});
		});
	};
};
