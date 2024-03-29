# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.1] - 2021-07-30

### Added

- Added a `location` configuration option to the `render` method, which allows you to report the absolute URL where a snippet is being rendered.

### Fixed

- Fixed [#30](https://github.com/jahuty/jahuty-node/issues/30), where caching renders did not consider the content's version.

## 0.4.0 - 2021-04-30

### Added

- Added `preferLatest` flag to client and render methods. This option allows you to render a snippet's _latest_ content instead of the default _published_ content.

## 0.3.2 - 2021-04-23

### Fixed

- Fixed issue [#26](https://github.com/jahuty/jahuty-node/issues/26), where `render()` cached the `Promise`, not the `Render`.

## 0.3.1 - 2021-03-14

### Added

- Added support for zero and negative `ttl` values to disable cache.
- Added system tests for cached, parameterized, and tagged snippets.

### Fixed

- Fixed bad build in NPM because Jack forgot to build before release :(
- Fixed issue with the `allRenders()` method not sending query string parameters.

## 0.3.0 - 2021-03-13

- Fixed issue where the `render` method's `params` were not being json-encoded properly.
- Added support for caching. Supported cache implementations should implement a `get(key)` method, which returns a `Promise`, as well as a `set(key, value, ttl)` method. If no cache implementation argument is given, an in-memory cache will be used.
- Added collections via the `allRenders` method which retrieves a group of renders and caches them individually.

## 0.2.1 - 2021-02-27

- Change resources to accept and silently ignore unknown attributes returned by the API to permit API evolution.

## 0.2.0 - 2021-01-28

* Change from a static-based architecture (e.g., `Snippet.render(1)`) to an instance-based one (e.g., `jahuty.snippets.render(1)`) to make the library easier to develop, test, and use.
* Move web-based functionality to a separate repository to separate concerns.
* Change `.npmignore` to be a whitelist and reduce the files in the NPM package.
* Add [ESLint](https://eslint.org) static code analysis based on [AirBnb's JavaScript Style Guide](https://github.com/airbnb/javascript#table-of-contents).
* Add [Codecov](https://codecov.io/gh/jahuty/jahuty-node) code coverage analysis.

## 0.1.6 - 2020-11-02

* Update README with requirements, installation, usage, errors, and more.

## 0.1.5 - 2020-11-02

* Fix [#15](https://github.com/jahuty/jahuty-node/issues/15), fix `TypeError: (e.adapter || u.adapter) is not a function` error by targeting a node build.

## 0.1.4 - 2020-11-02

* Fix [#13](https://github.com/jahuty/jahuty-node/issues/13), stop swallowing exceptions during Axios request setup.

## 0.1.3 - 2020-09-26

* Fix [#11](https://github.com/jahuty/jahuty-node/issues/11), other classes than `Jahuty` not available.

## 0.1.2 - 2020-09-26

* Fix [#9](https://github.com/jahuty/jahuty-node/issues/9), `ReferenceError: window is not defined`.

## 0.1.1 - 2020-09-25

* Change webpack to output Jahuty as UMD, as advised by [authoring libraries](https://webpack.js.org/guides/author-libraries/#expose-the-library).
* Remove `dist` directory from git repository, as advised by [unpkg.com](https://unpkg.com).
* Add `pkg.modules` to enable Jahuty to be used as a ES2015 module.

## 0.1.0 - 2020-09-19

* Initial release.
