import glob from 'glob';
import SVGSprite from 'svg-sprite';
import File from 'vinyl';
import path from 'path';
import fs from 'fs';

const defaultConfig = { mode: { symbol: true }, dest: '.' };

const compileSvgSprite = (src, config = defaultConfig) => {
	const spriter = new SVGSprite(config);
	const cwd = process.cwd();
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
		/* Write `result` files to disk (or do whatever with them ...) */
		for (const mode of Object.values(result)) {
			for (const resource of Object.values(mode)) {
				fs.mkdirSync(path.dirname(resource.path), { recursive: true });
				fs.writeFileSync(resource.path, resource.contents);
			}
		}
	});
};

export const svg = (options) => {
	return (done) => {
		options.paths.forEach(async (path) => {
			const { src, config } = path;
			if (!src) {
				throw new Error(`${JSON.stringify(path)} path must have "src" property`);
			}
			await compileSvgSprite(src, config);
		});
		done();
		return true;
	};
};

export default svg;
