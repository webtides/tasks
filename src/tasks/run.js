import childProcess from 'child_process';
const spawn = childProcess.spawn;
import log from 'fancy-log';

export default (options) => {
	return (cb) => {
		const cmd = spawn(options.cmd, options.args, { stdio: 'inherit' });
		cmd.on('close', function (code) {
			log(options.cmd + ' exited with code ' + code);
			cb(code);
		});
		cmd.on('error', function (error) {
			log.error(options.cmd + ' errored with msg: ' + error);
			cb(error);
		});
	};
};
