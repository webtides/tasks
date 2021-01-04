import browserSync from 'src/tasks/browserSync';
import clean from 'src/tasks/clean';
import copy from 'src/tasks/copy';
import css from 'src/tasks/css';
import js from 'src/tasks/js';
import lintCSS from 'src/tasks/lintCSS';
import lintJS from 'src/tasks/lintJS';
import nodemon from 'src/tasks/nodemon';
import run from 'src/tasks/run';
import svg from 'src/tasks/svg';
import watch from 'src/tasks/watch';

import Config from 'src/config';

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
	nodemon,
	run,
	svg,
	watch,
};

export { tasks, options };

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
