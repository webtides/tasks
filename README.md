# tasks

> IMPORTANT: The tasks are work in progress and subject to major (& breaking) changes until the 1.0 release. Until then, we would encourage everyone to use a pinned version and not rely on semantic versioning.

`@webtides/tasks` is a wrapper around gulp for most of the use cases for simple and modern (frontend) web development

## Introduction

`@webtides/tasks` provides a simple and clean API for common tasks and build steps in modern frontend development. `@webtides/tasks` includes bundling and minifying JavaScript and CSS, Copying files, Linting JavaScript and CSS, etc. Under the hood it uses gulp and several gulp plugins to run the tasks.

If configuring any build tools (gulp, grunt, webpack, etc.) was ever to complicated - `@webtides/tasks` will cover most of the cases.

## How to use

#### Installation

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
    versionManifest: true
});

tasks.clean({ paths: [] });
tasks.copy({ paths: [] });
tasks.js({ src, destination });
tasks.css({ src, destination });
tasks.run({ cmd: 'ls', args: ['-la'] });
tasks.svg({ paths: [] });
tasks.browserSync({ files: [] });
```

The CSS task uses the original filename by default. Set the task option `filenamePattern: '[name]-[hash].css'` to write a hashed copy. `[name]` is the original basename without `.css`. Use a `.css` filename with `[hash]` and no directory. Both files share a source map when source maps are enabled.

If the version manifest is enabled, its entry points to the hashed copy.

Set the JS task option `versionPattern: '[name]'` to use Rollup's generated path directly in the manifest. Use it with `outputOptions.entryFileNames: '[name]-[hash].js'` to keep only Rollup's filename hash. The task option overrides the shared `versionManifest.versionPattern`.

Gulp tasks that write assets can set `file.manifestAsset` on each Vinyl file before piping it to `GulpHashPlugin`. Pass `{ key, path, hashed }` with the logical path, written path, and whether the name contains a content hash. Paths are resolved against the Vinyl working directory for the manifest. Use `hashed: false` to apply the configured query fallback to the file contents, or set `file.manifestAsset` to `null` to omit the file.

## Documentation

For detailed documentation see the [Docs](docs/README.md).

## Contributing & Development

For contributions and development see [contributing docs](.github/CONTRIBUTING.md)

## License

`@webtides/tasks` is open-sourced software licensed under the MIT [license](LICENSE).
