# Tasks
`tasks` is a wrapper around gulp for most of the use cases for simple and modern (frontend) web development 

## Introduction

`tasks` provides a simple and clean API for common tasks and build steps in modern frontend development. `tasks` includes bundling and minifying JavaScript and CSS, Copying files, Linting JavaScript and CSS, etc. Under the hood it uses gulp and several gulp plugins to run the tasks.

If configuring any build tools (gulp, grunt, webpack, etc.) was ever to complicated - `tasks` will cover most of the cases.

## How to use

#### Install

```sh
npm install @webtides/tasks
```

#### Use

```javascript
import { tasks, options } from '@webtides/tasks';
import { task, parallel, series } from 'gulp';

options({
    projectTitle: 'tasks',
    showNotifications: true,
    versionManifest: true,
});

tasks.clean({ paths: [] });
tasks.copy({ paths: [] });
tasks.js({ src, destination });
tasks.css({ src, destination });
tasks.run({ cmd: 'ls', args: ['-la'] });
tasks.svg({ paths: [] });
tasks.browserSync({ files: [] });
```

## Documentation

For detailed documentation see the [Docs](docs/README.md).

## License

`tasks` is open-sourced software licensed under the MIT [license](LICENSE).
