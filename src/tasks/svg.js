import { glob } from 'glob';
import SVGSprite from 'svg-sprite';
import File from 'vinyl';
import path from 'path';
import fs from 'fs';

import Config from '../config.js';
import { addManifestEntry, defaultOptions, md5 } from '../util/HashHelpers.js';

const defaultConfig = { mode: { symbol: true }, dest: '.' };

const normalizePath = (filePath) => filePath.split(path.sep).join('/');

const addSpriteToManifest = (resource) => {
	const manifestOptions = { ...defaultOptions, ...Config.versionManifest };
	const versionedPath = normalizePath(path.relative(process.cwd(), resource.path));
	const extension = path.extname(versionedPath);
	const hashSuffix = `-${md5(resource.contents).slice(0, 8)}${extension}`;

	if (!versionedPath.endsWith(hashSuffix)) {
		throw new Error('SVG sprite version manifest requires "mode.*.bust" to be enabled');
	}

	const unversionedPath = `${versionedPath.slice(0, -hashSuffix.length)}${extension}`;
	addManifestEntry(
		manifestOptions.formatter(unversionedPath),
		manifestOptions.formatter(versionedPath),
		manifestOptions,
	);
};

const compileSvgSprite = (src, config = defaultConfig, cwdPath, versionManifest = false) => {
	return new Promise((resolve, reject) => {
		const spriter = new SVGSprite(config);

		const cwd = cwdPath ? path.resolve(cwdPath) : process.cwd();

		// Find SVG files recursively via `glob`
		const files = glob.sync(src, { cwd });
		files.forEach((file) => {
			try {
				spriter.add(
					new File({
						path: path.join(cwd, file), // Absolute path to the SVG file
						base: cwd, // Base path (see `name` argument)
						contents: fs.readFileSync(path.join(cwd, file)), // SVG file contents
					}),
				);
			} catch (e) {
				console.error(e);
			}
		});

		// Compile the sprite
		spriter.compile((error, result) => {
			if (error) {
				reject(error);
				return;
			}

			try {
				/* Write `result` files to disk (or do whatever with them ...) */
				for (const mode of Object.values(result)) {
					for (const [resourceName, resource] of Object.entries(mode)) {
						fs.mkdirSync(path.dirname(resource.path), { recursive: true });
						fs.writeFileSync(resource.path, resource.contents);
						if (versionManifest && resourceName === 'sprite') {
							addSpriteToManifest(resource);
						}
					}
				}
				resolve(result);
			} catch (writeError) {
				reject(writeError);
			}
		});
	});
};

export const svg = (options) => {
	return (done) => {
		const compilations = options.paths.map((path) => {
			const { src, config, cwd } = path;
			if (!src) {
				return Promise.reject(new Error(`${JSON.stringify(path)} path must have "src" property`));
			}
			return compileSvgSprite(src, config, cwd, options.versionManifest && Config.versionManifest !== false);
		});

		Promise.all(compilations).then(() => done(), done);
	};
};

export default svg;
