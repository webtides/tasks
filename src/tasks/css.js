import fs from 'fs';
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

function writeHashedCss(filenamePattern) {
	const isCssFilename = path.extname(filenamePattern) === '.css' && !/[\\/?#]/.test(filenamePattern);
	if (!isCssFilename || !filenamePattern.includes('[hash]')) {
		throw new Error('filenamePattern must be a .css filename pattern containing [hash]');
	}

	return through.obj((file, encoding, callback) => {
		if (file.extname !== '.css') {
			file.manifestAsset = null;
			return callback(null, file);
		}

		const versionedName = generateVersionString(filenamePattern, file.stem, md5(file.contents));
		const versionedPath = path.join(file.dirname, versionedName);
		try {
			fs.writeFileSync(versionedPath, file.contents);
		} catch (error) {
			return callback(error);
		}

		file.manifestAsset = { key: file.path, path: versionedPath, hashed: true };

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
		const hashedCss = filenamePattern && writeHashedCss(filenamePattern);

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
			.pipe(postcss())
			.pipe(gulpIf(options.sourceMap, sourcemaps.write('.')))
			.pipe(gulpIf(options.flatten, flatten()))
			.pipe(gulp.dest(options.dest));

		if (!hashedCss) {
			return css.pipe(gulpIf(versionManifest !== false, hash(versionManifest)));
		}

		const streams = [css.pipe(plumber.stop()), hashedCss];
		if (versionManifest !== false) {
			streams.push(hash(versionManifest));
		}

		return pipeline(streams, () => {});
	};
};
