import path from 'path';

import { defaultOptions, addToManifest } from './HashHelpers.js';

export default function hash(options = {}) {
	options = { ...defaultOptions, ...options };

	return {
		name: 'hash-version-manifest',
		generateBundle: function (outputOptions, bundle) {
			const filePath = options.formatter(outputOptions.dir.split(path.sep).join('/'));
			Object.entries(bundle).forEach(([key, chunk]) => {
				const fileExtension = chunk.fileName.split('.').pop();
				const keyFileName = `${filePath}/${chunk.name}.${fileExtension}`;
				const valueFileName = `${filePath}/${chunk.fileName}`;

				if (chunk.isEntry && !valueFileName.includes('.map')) {
					addToManifest(keyFileName, valueFileName, chunk.code, options);
				}
			});
		},
	};
}
