import path from 'path';
import through from 'through2';

import { defaultOptions, addToManifest } from './HashHelpers';

export default function (options = {}) {
	options = { ...defaultOptions, ...options };

	return through.obj((chunk, enc, cb) => {
		const chunkPath = chunk.path.replace(chunk.cwd + path.sep, '');
		if (!chunkPath.includes('.map')) {
			const fileName = options.formatter(chunkPath.split(path.sep).join('/'));
			const code = chunk.contents;

			addToManifest(fileName, fileName, code, options);
		}

		cb(null, chunk);
	});
}
