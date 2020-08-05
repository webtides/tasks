import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import merge from 'merge-stream';

const defaultConfig = { mode: { symbol: true } };

const svgTask = (src, dest, config) => {
	return gulp
		.src(src)
		.pipe(svgSprite(config || defaultConfig))
		.pipe(gulp.dest(dest));
};

export default (options) => {
	return () => {
		const streams = options.paths.map((path) => {
			return svgTask(path.src, path.dest, path.config || defaultConfig);
		});

		return merge(streams);
	};
};
