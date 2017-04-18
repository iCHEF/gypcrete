# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added

## [0.6.1]
### Changed
- Fix deploy script that affects `npm publish`
- Deprecates `0.6.0` on npm, since that was published with wrong contents by accident.

## [0.6.0]
### Added
- Migrate row components:
  * `<Button>`
- Migrate visual elements:
  * `<Tooltip>` (now limits to top and bottom placements only)
  * `<AnchoredToolip>` (simplified to be more passive)
- Migrate HOC mixins:
  * `anchored()`: place Component near a given anchor. DOM offset calculated by `document-offset` package.
  * `renderToLayer()`: renders Component to another DOM node outside of React root.

- `<IconLayout>` for displaying status on an `<Icon>`.
- `<IconButton>` as an icon-only variant of `<Button>`.
- `randId()` helper for generating a random String to used on DOM nodes.
- Add stylelint to enforce consistent conventions and avoid errors in our stylesheets.

### Changed
- Improve interaction on Jenkins:
  * Generate jUnit test report.
  * Generate Cobertura coverage report.
  * Run `npm publish` with `NPM_TOKEN` env variables in `deploy.sh`.
- `<Tag>` now adapts to the color of its parent more actively.
- Fix `<Button>` should turn red on error state
- `wrapIfNotElement()` helper now takes an extra `via` param to change how `content` is passed to the `Wrapper` component.
- You can now strip the BEM block from output by calling `bem.toString({ stripBlock: true })`.

## [0.5.0]
### Added
- Add [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) to serve demo bundles.
- Add webpack `ProgressPlugin` to show build progress.

### Changed
- `src/Text/*` is moved out to just `src/` to maintain a simple, flat directory structure and prevent import confusion. (See 542c7b9)
- Babel-transformed files in `lib/` and `es5/` no longer contain comments.
- `<BasicRow>` no longer handles the null-basic-prop situation, as `basic` prop was marked as required.
- Fixes Jest running on environments under a dot-directory.
- Renaming
  * `doc/` folder -> `demo/`.
  * `config/webpack.doc.js` -> `config/webpack.demo.js`.
  *  BABEL-ENV, `server` -> `demo`.
  * bundled assets in dist, `bundle.(js|css)` -> `gypcrete.(js|css)`.
- Start the demo server with `npm run demo`, now the `start` script is an alias of `demo`.


## [0.4.0]
### Added
- Migrate the following components:
  * `<Icon>`
  * `<Tag>`
  * `<TextEllipsis>` 
  * `<FlexCell>` (with modifications)
  * `<StatusIcon>` (with modifications)

- Add new components:
  * `<Text>`: the text part of a row component, pre-wrapped with `withStatus()` mixin.
  * `<TextLabel>`: the very basic row component containing an `<Icon>` and a `<Text>`.
  * `<RowCompBody>`: a layout wrapper.

- Add Helpers:
  * `icState()` for prefixing state class names.
  * `getComponentName()` for reading name of a React Component.
  * `wrapIfNotElement()` to ensure output will always be an HTML tag.

- Add HOC mixins:
  * `rowComp()`: handle shared appearance and behaviors for row components.
  * `withStatus()`: render `<StatusIcon>` and error msgs from context.

- Migrate `icBEM()` helper, but now it doesn't take an `BEMFactory` instance.
- Add `babel-plugin-module-resolver` and `eslint-import-resolver-babel-module` to config module alias.

### Change
- Move `babel-runtime` (required by `babel-plugin-tranform-runtime`) to `peerDependencies` instead of `devDependencies`. Because our Babel-transformed ES2015 modules **does** require it.

  
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
