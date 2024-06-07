import gulp from 'gulp';
import gulpIf from 'gulp-if';
import flatten from 'gulp-flatten';
import merge from 'merge-stream';
import log from 'fancy-log';

const copyTask = (src, dest, flat = true) => {
	return gulp.src(src).on('error', function(err) {
		if (err.code === 'ENOENT') {
			log.info('Directory' + src +  'does not exists, skipping task');
			this.emit('end');
		} else {
			throw err;
		}}).pipe(gulpIf(flat, flatten())).pipe(gulp.dest(dest));
}

export default (options) => {
	return () => {
		const streams = [];

		options.paths.forEach((path) => {
			streams.push(copyTask(path.src, path.dest, path.flat ?? true));
		});

		return merge(streams);
	};
};
