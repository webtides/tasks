import path from 'path';
import { pipeline } from 'stream';
import gulp from 'gulp';
import flatten from 'gulp-flatten';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import gulpIf from 'gulp-if';
import log from 'fancy-log';
import through from 'through2';

import hash from '../util/GulpHashPlugin.js';
import { generateVersionString, md5 } from '../util/HashHelpers.js';
import Config from '../config.js';

function hashCssFilenames(filenamePattern, originalNames) {
	const isCssFilename = path.extname(filenamePattern) === '.css' && !/[\\/?#]/.test(filenamePattern);
	if (!isCssFilename || !filenamePattern.includes('[hash]')) {
		throw new Error('filenamePattern must be a .css filename pattern containing [hash]');
	}

	return through.obj((file, encoding, callback) => {
		if (file.extname === '.css') {
			originalNames.set(file, file.basename);
			// Hash before the source map URL adds a reference to the hashed filename.
			file.basename = generateVersionString(filenamePattern, file.stem, md5(file.contents));
		}

		callback(null, file);
	});
}

function describeHashedCss(originalNames) {
	return through.obj((file, encoding, callback) => {
		// Only the tracked stylesheet objects are registered, so the generated maps pass through.
		const originalName = originalNames.get(file);
		file.manifestAsset = originalName
			? { key: path.join(file.dirname, originalName), path: file.path, hashed: true }
			: null;
		callback(null, file);
	});
}

export default (options = {}) => {
	options = {
		flatten: true,
		sourceMap: true,
		filenamePattern: false,
		...options,
	};

	return () => {
		const { filenamePattern } = options;
		const versionManifest = Config.versionManifest;
		const originalNames = new WeakMap();
		const hashedCss = filenamePattern && hashCssFilenames(filenamePattern, originalNames);

		// Compile using the source filenames so the maps point back to the input files.
		const css = gulp
			.src(options.src)
			.pipe(
				plumber({
					errorHandler: function (error) {
						log.error(Config.projectTitle + ' - CSS Error', error.toString());
						this.emit('end');
					},
				}),
			)
			.pipe(gulpIf(options.sourceMap, sourcemaps.init()))
			.pipe(postcss());

		const writeMaps = gulpIf(options.sourceMap, sourcemaps.write('.'));
		const flattenPaths = gulpIf(options.flatten, flatten());
		const destination = gulp.dest(options.dest);

		// Keep the existing watch error handling and query fallback for stable filenames.
		if (!hashedCss) {
			return css
				.pipe(writeMaps)
				.pipe(flattenPaths)
				.pipe(destination)
				.pipe(gulpIf(versionManifest !== false, hash(versionManifest)));
		}

		// Rename before writing maps so both filenames share the hash.
		// Stop plumber here so pipeline forwards output errors to Gulp.
		const streams = [css.pipe(plumber.stop()), hashedCss, writeMaps, flattenPaths, destination];
		if (versionManifest !== false) {
			// Register the destination path after gulp.dest() writes the stylesheet.
			streams.push(describeHashedCss(originalNames), hash(versionManifest));
		}

		return pipeline(streams, () => {});
	};
};
