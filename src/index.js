import browserSync from 'src/tasks/browserSync.js';
import clean from 'src/tasks/clean.js';
import css from 'src/tasks/css.js';
import copy from 'src/tasks/copy.js';
import js from 'src/tasks/js.js';
import lintCSS from 'src/tasks/lintCSS.js';
import lintJS from 'src/tasks/lintJS.js';
import run from 'src/tasks/run.js';
import svg from 'src/tasks/svg.js';
import watch from 'src/tasks/watch.js';

import Config from 'src/config.js';

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
