import gulp from 'gulp';
import stylelint from 'stylelint';
import postcss from 'gulp-postcss';

export default (options) => {
	return () => {
		return gulp.src(options.src).pipe(postcss([stylelint]));
	};
};
