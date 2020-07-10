# JavaScript

```js
tasks.js(src | [src], output);
```

With a single line of code, Frontend Tasks allows you to trigger a number of vital actions.

-   ES2018 + modules compilation
-   Code splitting
-   Tree-shaking (removes unused library code)
-   Automatic versioning (query string hash)

### Usage

```js
const tasks = require('frontend-tasks');

// 1. A single src and output path.
const js = () => tasks.js('src/js/*.js', 'public/js/');

// 2. For multiple src files
const js = () => tasks.js(['src/js/*.js', 'src/vendor/*.js'], 'public/js/');

// 3. For multiple entry/output points:
const js1 = () => tasks.js('src/js/*.js', 'public/js/');
const js2 = () => tasks.js('src/vendor/*.js', 'public/vendor/');
```

#### ES2018 +

```js
tasks.es6(src | [src], output);
```

#### ES5

```js
tasks.es5(src | [src], output);
```
