import gulp from 'gulp';
import eslint from 'gulp-eslint';

export default (options) => {
	return () => {
		return gulp
			.src(options.src)
			.pipe(
				eslint({
					configFile: options.configFile || '.eslintrc',
					useEslintrc: true,
				}),
			)
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	};
};
