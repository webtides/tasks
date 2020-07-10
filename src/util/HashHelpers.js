import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const defaultOptions = {
	name: 'hash-manifest.json',
	replace: false,
	versionPattern: '[name]?version=[hash]',
	formatter: (name) => name,
};

function md5(string) {
	return crypto.createHash('md5').update(string).digest('hex');
}

function tryRequire(file) {
	try {
		return JSON.parse(fs.readFileSync(file, 'utf-8'));
	} catch (err) {
		if (err.code === 'ENOENT') return null;
		throw err;
	}
}

function mkdirPath(dest) {
	const dir = path.dirname(dest);
	try {
		fs.readdirSync(dir);
	} catch (err) {
		mkdirPath(dir);
		fs.mkdirSync(dir);
	}
}

function generateVersionString(versionPattern, name, hash) {
	return versionPattern.replace('[name]', name).replace('[hash]', hash);
}

function addToManifest(keyFilePath, valueFilePath, code, options) {
	const manifest = tryRequire(options.name) || {};

	manifest[`${keyFilePath}`] = generateVersionString(options.versionPattern, valueFilePath, md5(code));

	mkdirPath(options.name);
	fs.writeFileSync(options.name, JSON.stringify(manifest, null, 4), 'utf8');
}

export { defaultOptions, tryRequire, mkdirPath, generateVersionString, md5, addToManifest };
