# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

<!--
   PRs should document their user-visible changes (if any) in the
   Unreleased section, uncommenting the header as necessary.
-->

<!-- ## Unreleased -->
<!-- ### Added -->
<!-- ### Changed -->
<!-- ### Removed -->
<!-- ### Fixed -->

## [0.5.0] - 2021-04-14

### Changed

-   updates several rollup plugins (no breaking changes)

## [0.4.0] - 2021-03-12

### Added

-   **breaking change:** Support for PostCSS ^8.0.0. `@webtides/tasks` now ships with PostCSS v8. If you use postcss plugins that are not compatible with PostCSS v8, your build will probably crash.

## [0.3.0] - 2021-01-05

### Added

-   `nodemon` task for starting (and watching/restarting) node servers

### Changed

-   **breaking change:** The rollup js task will now throw an error instead of just a warning in the console when you have unresolved dependecies. We think this should be the default behaviour.

## [0.2.5] - 2020-08-07

### Fixed

-   copy task with falt: false values

## [0.2.4] - 2020-08-06

### Added

-   `flat` option for copy task per paths definition

## [0.2.3] - 2020-08-06

### Removed

-   rollup-gzip plugin

## [0.2.2] - 2020-08-05

### Changed

-   uses old rollup plugins again. Gulp seems to not work with the new plugins… when using from outside.

## [0.2.1] - 2020-08-05

### Added

-   config option to svg task

## [0.2.0] - 2020-08-04

### Changed

-   uses rollup plugins from new monorepo

### Added

-   more options for js/rollup task

## [0.1.2] - 2020-08-04

### Added

-   postcss options to js/rollup task

## [0.1.1] - 2020-07-17

### Fixed

-   missing “/“ in filepath for js files from rollup-hash-plugin

## [0.1.0] - 2020-07-17

-   initial release
