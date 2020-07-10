import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import merge from 'merge-stream';

const svgTask = (src, dest) => {
	return gulp
		.src(src)
		.pipe(svgSprite({ mode: { symbol: true } }))
		.pipe(gulp.dest(dest));
};

export default (options) => {
	return () => {
		const streams = options.paths.map((path) => {
			return svgTask(path.src, path.dest);
		});

		return merge(streams);
	};
};
