import gulpNodemon from 'gulp-nodemon';

const nodemon = (options) => {
	return (cb) => {
		let started = false;
		gulpNodemon({
			script: '',
			watch: [],
			nodeArgs: [`--inspect=${parseInt(process.env.NODE_INSPECT_PORT, 10) || 3003}`],
			...options,
			//...add nodeArgs: ['--debug=5858'] to debug
			//..or nodeArgs: ['--debug-brk=5858'] to debug at server start
		}).on('start', function () {
			if (!started) {
				cb();
				started = true;
			}
		});
	};
};

export default nodemon;
