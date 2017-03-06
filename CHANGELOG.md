# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- Basic Webpack 2 configs, working with the following loaders:
  * Babel (ES2015, 2016, 2017 & Stage-2)
  * Sass
  * Postcss + Autoprefixer

- `npm run build` should compile `src/` to 3 different targets:
  * `dist/`: bundled & minified production JS library + CSS file.
  * `lib/`: Babel-transformed **ES2015** JS modules (excluding CSS).
  * `es5/`: Babel-transformed **CommonJS** JS modules (excluding CSS).

- Add Babel plugin to strip CSS import lines from `lib/` and `es5/` modules.
