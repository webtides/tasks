import path from 'path';
import through from 'through2';

import { defaultOptions, addAssetToManifest } from './HashHelpers.js';

export default function (options = {}) {
	options = { ...defaultOptions, ...options };

	return through.obj((chunk, enc, cb) => {
		const cwdPrefix = chunk.cwd + path.sep;
		const normalizePath = (filePath) => filePath.replace(cwdPrefix, '').split(path.sep).join('/');
		let asset = chunk.manifestAsset;

		// Omitted metadata uses the legacy fallback, which skips sourcemaps.
		if (asset === undefined) {
			const chunkPath = normalizePath(chunk.path);
			asset = chunkPath.includes('.map') ? null : { key: chunk.path, path: chunk.path, hashed: false };
		}

		try {
			// A producer can also set null to skip registration.
			if (asset !== null) {
				addAssetToManifest(
					{
						key: normalizePath(asset.key),
						path: normalizePath(asset.path),
						hashed: asset.hashed,
						contents: chunk.contents,
					},
					options,
				);
			}
		} catch (error) {
			// Fail the stream if the asset cannot be registered in the manifest.
			return cb(error);
		}

		cb(null, chunk);
	});
}
