import path from 'path';

import { defaultOptions, addToManifest } from './HashHelpers';

export default function hash(options = {}) {
	options = { ...defaultOptions, ...options };

	return {
		name: 'hash-version-manifest',
		renderChunk: function (code, chunk, outputOptions) {
			const filePath = options.formatter(outputOptions.dir.split(path.sep).join('/'));

			// if outputOptions.entryFileNames contains [hash] we need to extract it from the path for the key in the manifest
			const fileExtension = chunk.fileName.split('.').pop();
			const keyFileName = `${filePath}${chunk.name}.${fileExtension}`;
			const valueFileName = `${filePath}${chunk.fileName}`;

			if (chunk.isEntry && !valueFileName.includes('.map')) {
				addToManifest(keyFileName, valueFileName, code, options);
			}
		},
	};
}
