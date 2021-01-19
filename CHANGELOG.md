# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* Add [ESLint](https://eslint.org) static code analysis based on [AirBnb's JavaScript Style Guide](https://github.com/airbnb/javascript#table-of-contents).

### Changed

* Change from a static-based architecture (e.g., `Snippet.render(1)`) to an instance-based one (e.g., `jahuty.snippets.render(1)`) to make the library easier to develop, test, and use.


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
