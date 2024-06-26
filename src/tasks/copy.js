import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
import log from 'fancy-log';

const copyFiles = async (pattern, dest, flat = true) => {
	const files = await glob(pattern, { nodir: flat });
	files.forEach((file) => {
		const destPath = path.join(dest, path.basename(file));
		fs.copy(file, destPath, (err) => {
			if (err) {
				log.error(`Error copying ${file}:`, err);
			}
		});
	});
};

export default (options) => {
	return (done) => {
		options.paths.forEach(async (path) => {
			const { src, dest, flat } = path;
			if (!src || !dest) {
				throw new Error(`${JSON.stringify(path)} path must have "src" and "dest" properties`);
			}
			await copyFiles(src, dest, flat);
		});
		done();
		return true;
	};
};
