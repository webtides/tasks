import gulp from 'gulp';
import flatten from 'gulp-flatten';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import notify from 'gulp-notify';
import gulpIf from 'gulp-if';
import hash from 'src/util/GulpHashPlugin';

import Config from 'src/config.js';

export default (options = {}) => {
	options = {
		flatten: true,
		sourceMap: true,
		...options,
	};
	return () => {
		return gulp
			.src(options.src)
			.pipe(
				plumber({
					errorHandler: function (error) {
						if (Config.showNotifications) {
							notify.onError({
								title: Config.projectTitle + ' - CSS Error',
								message: error.toString(),
							})(error);
						}
						this.emit('end');
					},
				}),
			)
			.pipe(gulpIf(options.sourceMap, sourcemaps.init()))
			.pipe(postcss())
			.pipe(gulpIf(options.sourceMap, sourcemaps.write('.')))
			.pipe(gulpIf(options.flatten, flatten()))
			.pipe(gulp.dest(options.dest))
			.pipe(gulpIf(Config.versionManifest !== false, hash(Config.versionManifest)));
	};
};
