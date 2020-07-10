# Installation

Quick starting guide for installing and configuring Frontend Tasks

### Install Frontend Tasks via npm

Begin by installing Frontend Tasks through NPM or Yarn

```bash
# Using npm
npm install frontend-tasks

# Using Yarn
yarn add frontend-tasks
```

### Create gulpfile.js

Next up create a `gulpfile.js` inside your project root and add the following:

```js
const gulp = require('gulp');
const tasks = require('frontend-tasks');

const css = () => tasks.css('src/css/*.css', 'public/css/');
const js = () => tasks.js('src/js/*.js', 'public/js/');

gulp.task('default', gulp.parallel(css, js));
gulp.task('dev', gulp.series('default'));
gulp.task('prod', gulp.series('default'));
```

Take note of the paths. Change the paths to match your preferred structure.

#### NPM Scripts

Consider adding the following NPM scripts to your `package.json` file, to speed up your workflow.

```json
  "scripts": {
    "dev": "cross-env NODE_ENV=development gulp dev",
    "prod": "cross-env NODE_ENV=production gulp prod"
  }
```

> Note: `cross-env` will make sure that the `NODE_ENV` variable will get passed correctly for all different operating systems.

Nice! That's all you need - now you can start working on your project.

```bash
# Using npm
npm run dev

# Using Yarn
yarn dev
```

The `dev` task will automatically watch any files for changes an re-run the task.

The `prod` task will automatically minify all generated and bundled files.
