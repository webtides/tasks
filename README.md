# tasks

> IMPORTANT: The tasks are work in progress and subject to major (& breaking) changes until the 1.0 release. Until then, we would encourage everyone to use a pinned version and not rely on semantic versioning.

`@webtides/tasks` is a wrapper around gulp for most of the use cases for simple and modern (frontend) web development 

## Introduction

`@webtides/tasks` provides a simple and clean API for common tasks and build steps in modern frontend development. `@webtides/tasks` includes bundling and minifying JavaScript and CSS, Copying files, Linting JavaScript and CSS, etc. Under the hood it uses gulp and several gulp plugins to run the tasks.

If configuring any build tools (gulp, grunt, webpack, etc.) was ever to complicated - `@webtides/tasks` will cover most of the cases.

## How to use

#### Installation

create a `.npmrc` file in your project root and add the following line to set the registry for packages in the `@webtides` scope. 
```sh
@webtides:registry=https://npm.pkg.github.com/
```                                                                  

install `@webtides/tasks`

```sh
npm install --save @webtides/tasks
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

## Contributing & Development

For contributions and development see [contributing docs](.github/CONTRIBUTING.md)

## License

`@webtides/tasks` is open-sourced software licensed under the MIT [license](LICENSE).
