import environments from 'gulp-environments';
import { rollup, watch } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import postcss from 'rollup-plugin-postcss';
import svg from 'rollup-plugin-svg';
import commonjs from 'rollup-plugin-commonjs';
import gzipPlugin from 'rollup-plugin-gzip';
import hash from 'src/util/RollupHashPlugin';
import notify from 'gulp-notify';

const isDev = environments.development;
const isProd = environments.production;

import Config from 'config.js';

export default async (inputOptions = {}, outputOptions = {}, babelOptions = {}) => {
	inputOptions = Object.assign(
		{
			input: 'src/main.js',
			plugins: [
				babel(babelOptions),
				resolve(),
				postcss(),
				svg(),
				commonjs(),
				Config.versionManifest !== false && hash(Config.versionManifest),
				isProd() && cleanup({}),
				isProd() && terser(),
				isProd() && gzipPlugin(),
			],
		},
		inputOptions,
	);
	outputOptions = Object.assign(
		{
			dir: 'public',
			entryFileNames: '[name].js',
			format: 'es',
			sourcemap: true,
		},
		outputOptions,
	);

	if (isDev() && outputOptions['format'] === 'es') {
		return new Promise((resolve) => {
			const watcher = watch({
				...inputOptions,
				output: [outputOptions],
				watch: {
					clearScreen: true,
				},
			});
			watcher.on('event', (event) => {
				if (!Config.showNotifications) return;
				if (event.code === 'START') {
					notify({ title: Config.projectTitle, message: 'Starting "es6"...' }).write('');
				}
				if (event.code === 'BUNDLE_END') {
					notify({
						title: Config.projectTitle,
						message: 'Finished "es6" after ' + (event.duration / 1000).toFixed(2) + ' s',
					}).write('');
				}
				if (event.code === 'END') {
					resolve();
				}
				if (event.code === 'ERROR' || event.code === 'FATAL') {
					console.log('rollup watch ERROR', event);
					notify.onError({
						title: Config.projectTitle,
						message: 'JS ERROR|FATAL',
					});
				}
			});
		});
	} else {
		const bundle = await rollup(inputOptions);
		return await bundle.write(outputOptions);
	}
};
