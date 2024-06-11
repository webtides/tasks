import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
import log from 'fancy-log';

const copyFiles = async (pattern, dest) => {
	// TODO pass globConfig?
	const files = await glob(pattern, { nodir: true });
	files.forEach((file) => {
		const destPath = path.join(dest, path.basename(file));
		fs.copy(file, destPath, (err) => {
			if (err) {
				log.error(`Error copying ${file}:`, err);
			} else {
				log(`Copied ${file} to ${destPath}`);
			}
		});
	});
};

export const batchCopy = (options) => {
	return (done) => {
		options.paths.forEach(async (path) => {
			const { src, dest } = path;
			if (!src || !dest) {
				throw new Error(`${JSON.stringify(path)} path must have "src" and "dest" properties`);
			}
			await copyFiles(src, dest);
		});
		done();
		return true;
	};
};

export default batchCopy;
