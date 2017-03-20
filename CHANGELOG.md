# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- Migrate the following components:
  * `<Icon>`
  * `<Tag>`
  * `<TextEllipsis>` 
  * `<FlexCell>` (with modifications)
  * `<StatusIcon>` (with modifications)

- Migrate `icBEM()` helper, but now it doesn't take an `BEMFactory` instance.

- Add `babel-plugin-module-resolver` and `eslint-import-resolver-babel-module` to config module alias.
  
## [0.3.0]
### Added
- Add deploy script to work with Jenkins. It'll deploy to:
  * New commits in `develop` --> `dist` branch
  * New commits in `master` --> npm
- Add Jest for running tests.
- Add first test file for `src/index.js`

### Changed
- Update `.babelrc` to ignore test files on build and transform modules on test.
- Switch Babel preset to `babel-preset-env` from `babel-preset-latest`, since Babel recommends the former.

## [0.2.0]
### Added
- Add `eslint` and `eslint-config-ichef` rules for linting JS codes.
- Setup `.eslintrc.yml` to sepecify ESLint env and source type.
- Add `eslint-loader` to show linter results ASAP during development.
- Add `.sublimelinterrc` to exclude folders from being linted in SublimeText.

## [0.1.0]
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

- Add `webpack-dev-server` hosting documents from `doc/` folder, manually sepecify `doc/index.html` as dev server root.

- Add `react-hot-loader` to enable HOT on React components.
