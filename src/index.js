import browserSync from './tasks/browserSync.js';
import clean from './tasks/clean.js';
import css from './tasks/css.js';
import copy from './tasks/copy.js';
import js from './tasks/js.js';
import lintCSS from './tasks/lintCSS.js';
import lintJS from './tasks/lintJS.js';
import run from './tasks/run.js';
import svg from './tasks/svg.js';
import watch from './tasks/watch.js';

import Config from './config.js';

import GulpHashPlugin from './util/GulpHashPlugin.js';
import RollupHashPlugin from './util/RollupHashPlugin.js';

const options = (options = {}) => {
	Object.assign(Config, options);
};

const tasks = {
	browserSync,
	clean,
	copy,
	css,
	js,
	lintCSS,
	lintJS,
	run,
	svg,
	watch,
};

export { tasks, options, Config, GulpHashPlugin, RollupHashPlugin };

// API

// options({
//     projectTitle: 'frontend-tasks',
//     showNotifications: true,
//     versionManifest: false,
// });

// tasks.clean({ paths: [] });
// tasks.copy({ paths: [] });
// tasks.js({ src, dest });
// tasks.css({ src, dest });
// tasks.run({ cmd: 'ls', args: ['-la'] });
// tasks.svg({ paths: [] });
// tasks.nodemon();
// tasks.browserSync();
