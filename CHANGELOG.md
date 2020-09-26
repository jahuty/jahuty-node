# Changelog
All notable changes to this project will be documented in this file.

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
