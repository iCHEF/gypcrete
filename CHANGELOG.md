# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Upgrade
- [Storybook] Upgrade `@storybook` packages to `v5.3.2`.

### Added
- [Storybook] Add and configure storybook docs addon.

### Changed
- [Storybook] Revamp docs for `form` and `imageeditor` packages.
- [Core] Update `<List>`, `<Section>` to support `titleSize` option. (#242)
- [Storybook] Update `getPropTables.js` to fix prop table on doc page. (#244)

## [4.0.0]

### Breaking
- [Core] [Form] [ImageEditor] Peer dependency changes:
  * Change from `@babel/runtime-corejs2` to `@babel/runtime-corejs3`.
- [Core] [Form] [ImageEditor] now exports CommonJS modules via "main" and ES modules via "module" field in `package.json`.
- [Core] `<ColumnView>`:
  * The `bottomPadding` prop is removed. Please use `bodyPadding` prop and pass an object instead.
- [Core] `<Modal>`:
  * `<Modal>` is refactored to render a `<ColumnView>` as its inner layout.
  * `<Modal>` no longer takes `size`  and `bodyClassName` props.
  * The `bodyPadding` prop now takes an object and is passed to `<ColumnView>`.
- [Form] `<SelectList>`:
    - Rename prop `values` to `value`, and it receive a single value directly when is not `multiple`, and receive an array when `multiple` is true.
    - Rename prop `defaultValues` to `defaultValue`, and it receive a single value directly when is not `multiple`, and receive an array when `multiple` is true.
    - Rename prop `allOptionLabel` to `checkAllLabel`.
- [Form] `<SelectRow>`:
    - Rename prop `values` to `value`, and it receive a single value directly when is not `multiple`, and receive an array when `multiple` is true.
    - Rename prop `defaultValues` to `defaultValue`, and it receive a single value directly when is not `multiple`, and receive an array when `multiple` is true.
    - Rename prop `asideAll` to `asideAllLabel`.
    - Rename prop `asideNone` to `asideNoneLabel`.
- [ImageEditor] The instance method `getImageCanvas()` of `<ImageEditor>` now returns a `<canvas>` in the same dimension as the editor itself by default.


### Added
- [Core] [Form] [ImageEditor] setup `warning@4.0.3`.
- [Core] Add the `inline-info` icon to the selections of `<Icon>`.
- [Core] Add `flexBody` prop for `<ColumnView>` (and also `<Modal>`) to render its body as a Flexbox.

### Changed
- [Core] Update `<Section>` title style and increase bottom margin.
- [Core] Remove the only test cases that uses `sinon`; remove `sinon` from dev dependencies.
- [Form] Update `<SelectRow>` and `<SwitchRow>` to adpat vertically-reversed appearance as `<TextInputRow>` in v3.0.
- [Form] Add `desc` prop to `<SelectOption>`
- [form] `<SelectRow>` now considers empty string `''` as unset.
- [Storybook] Update examples for refactord `<ColumnView>` and `<Modal>`.

### Upgrades
- [Build] Upgrade to Babel v7.4.4 + `core-js` v3 to provide better polyfilling.
- [Build] Upgrade to Lerna v3.16.4; changes publish steps.
- [Build] Upgrade to `node-sass@4.12.0` for Node v10+ support.
- [Build] Upgrade to `stylelint@^10.0`, `autoprefixer@^9.6` and `postcss-loader@^3` for better CSS support.
- [Build] Upgrade other dev dependencies to address security alerts.

## [3.0.0]
### Breaking
- [Core] Add `verticalOrder` prop to `<Text>` so you can swap the position of `basic` and `aside`. Also applied to `rowComp()` mixin.
- [Core] Rewrite `<TextInput>` to match latest design, offering single-line `<input>`, multi-line `<textarea>` and supports custom rendering via render prop.
- [Form] `<TextInputRow>` now renders the new `<TextInput>` and forwards almost every prop to it, **without** a ref to its inner input.
- [Core] Add `<Avatar>` to display an image.

### Changed
- [ImageEditor] Add new instance method `getImageCanvas()` to get current image canvas element.
- [ImageEditor] Add new props `scale` & `onScaleChange` to make scale value of editor can be controlled.
- [Core] Refactored `closable()` mixin to detect inside/outside clicks via React SyntheticEvent mechanism instead of listening native events from DOM.
- [Storybook] Fix mangled component name in storybook build. (#203)
- [Storybook] Update examples for core `<TextInput>` and form `<TextInputRow>`. (#203)
- [Core] Change `rowComp()` to allow the appearance of `<Avatar>` alongside the text. (#208)
- [Core] Change `<Checkbox>` to display `<Avatar>`. (#208)
- [Form] Change `<SelectRow>` and `<Checkbox>` to display `<Avatar>`. (#208)
- [Storybook] Add examples for `<Avatar>` and the list components with `<Avatar>`s. (#208)

## [2.1.0]
### Changed
- [Core] Change `<SearchInput>` behavior:
    - Can be controlled now, via props `value`, `onChange` and `onReset`.
    - No longer trigger `onSearch` when input blur by default. You can enable this behavior by setting prop `searchOnInputBlur` be `true`
    - New prop `searchOnInputChange`, when it is `true`, `onSearch` will be triggered every time after input changed. The default value is `false`.
    - New prop `blockDuplicateValueSearch`, when it is `true`, `onSearch` will not be triggerd if input value is same with last time searching.
    - New prop `blockEmptyValueSearch`, when it is `true`, `onSearch` will not be triggerd if input value is empty.
    - Rename prop `input` to be `inputProps`.
- [Core] update `<SearchInput>` styles.
- [Core] Add centered prop into Modal to make it on top of screen by default (#196)
- [Core] Shorten width for multiple modal. (#197)
- [Core] Adjust padding-bottom of modal and column view. (#198)

## [2.0.1]
### Changed
- [Core] Fix `closable()` mixin to or not to call `onClose()` correctly on inside-clicks. (#193)

## [2.0.0]
### Breaking
- [Core] [Form] [ImageEditor] Peer dependency changes:
    * Switch from `babel-runtime` to `@babel/runtime-corejs2`. (#185)
    * Upgrade to `react@^16.6.0` and `react-dom@^16.6.0`. (#187)
- [Core] `anchored()` HOC mixin no longer uses `ReactDOM.findDOMNode()` to find the actual node for you. You should now manually set ref to both *anchor* element and *wrappred* element instead. Please read #189 for more info.

### Changed
- [Core] Remove flow type annotation. (#180)
- [Core] Adapt React Portal in `renderToLayer()` HOC mixin. (#188)
- [Core] Refactor `anchored()` mixin to extrac its positioning logic, and adapt memoize approach to not rely on lifecycle methods. (#190)
- [Core] Refacto `closable()` mixin to reduce useless render calls. (#192)
- [Storybook] Upgrade to `@storybook/react@^4.0.0` to support Babel 7. (#187)
- [Build] Upgrade to `enzyme@3.7.0`; fix tests for that. (#183)
- [Build] Upgrade to Babel v7; switch to project-scope Babel config. (#185)
- [Build] Upgrade to `jest@23.6.0` to support Babel 7. (#185)
- [Build] Upgrade to `eslint@5.8.0`, `eslint-config-ichef@2.0.1` and `eslint-config-airbnb@17.1.0`. (#186)
- [Build] Upgrade to `react@16.6.1` and `prop-types@15.6.2`. (#187)

## [1.10.0]
### Added
- [Core] Add new `<SplitView>` and `<SplitViewColumn>`. (#178)
- [Storybook] Add examples for `<SplitView>` and its usage with `<ColumView>`. (#178)

### Changed
- [Core] `closable()` mixin is now triggered on `touchend` events on touch devices. (#176)
- [Core] Update `<ColumnView>` layout styles; allow overriding bottom padding. (#178)
- [Storybook] Update examples for `<Popover>` to add a row of hyperlink `<Button>`. (#176)
- [Storybook] Split stories into different package-based sections. (#177)

## [1.9.0]
### Added
- [Core] Add new `<Section>` as a general content wrapper with optional title and description text. (#166)
- [Form] Add the `showCheckAll` prop to disable `checkAll` option in `<SelectList>`. (#170)
- [Form] Let `<SelectList>` accept the `title` and `desc` props. (#171)

### Changed
- [Core] Update `<List>` to wrap its own body with `<Section>`. (#166)
- ~~[Core] Update `<ListRow>` to remove vertical margin from nested `<List>`. (#166)~~
- [Core] Remove vertical margin from `<List>` by context when placed inside `<ListRow>` or `<Popover>`. (#169)
- [Storybook] Add examples for `<Section>`. (#166)
- [Core] Removed padding in `<ColumnView>` body. (#167)
- [Core] `<HeaderRow>` can now disable an area by setting `false` to it. Styles updated.  (#167)
- [Core] Update colors for `<ListRow>`. Add v3 color plates. (#172)
- [Storybook] Upgrade `@storybook/react` and its addons to `3.4.11`. (#173)

### Fixed
- [Core] Fix `anchored()` mixin horizontal alignment when anchor is larger than component applying the mixin. (#168)
- [Storybook] Fix prop tables for each component. (#173)

## [1.8.1]
### Added
- [Form] Add new `SelectOption.typeSymbol` for element type comparison. (#157)
- [Form] Add `getElementTypeSymbol` helper for getting type symbol from React Element. (#157)

### Changed
- [Core] Update styles to match design for: `<List>`. (#159)
- [Core] `<Button>`s are now `bold` by default. (#159)
- [Core] The following components now preserve white spaces: (#160)
    * `<Text>` (which is in most row-components)
    * `<List>` (in title and desc)
    * `<ListRow>` (in desc)
    * `<Tag>`
    * `<Tooltip>`
- [Core] Input inside `<EditableBasicRow>` does not blur on component status change anymore. (#161)
- [Build] Update deploy steps. (#164)

### Fixed
- [Form] Fix Popover inside `<SelectRow>` should not auto-close under multiple selection mode. (#158)
- [Core] Fix `<ListRow>` footer should not render empty `<p>` tags. (#159)
- [Core] Fix the bug that the bottom border of the title in the normal `<List>` lacks a right margin. (#163)

## [1.8.0]
### Added
- [ImageEditor] Add new package `@ichef/gypcrete-imageeditor`. (#148, #149, #150, #151)
  This new component supports:
    * Creating a cropping rectangle from an image in given dimension
    * Adjust image scaling with a slider
    * Customizable scaling range
    * Display a placeholder when image isn't specified
    * Display a loading animation when `loading` is set
- [Storybook] Add examples for `<ImageEditor>`. (#150)
- [Form] New `multiLine` mode for `<TextInputRow>`. It renders a `<textarea>` instead,and auto-grows as user types. (#155)
- [Storybook] Add examples for multi-line usage of `<TextInputRow>`. (#155)

### Changed
- Refactor to reuse shared webpack configs between packages. (#148)
- Allow React 16.x as peer dependency. (#153)

### Fixed
- [Core] Fix some content might exceed `<Popover>` container. (#147)
- [Form] Fix `<Popover>` inside `<SelectRow>` should not be closed until user clicks on the checkbox. (#147)

## [1.7.2]
### Fixed
- [Core] Add a function to close the `<Modal>` when users click `<Overlay>` and the onClose prop exists. (#140)

### Changed
- [Core] Update styles for `<ListRow>` to match design in nested lists. (#141)
- [Core] Update `<Button>` to support rendering into custom HTML tags. (#144)
- [Storybook] Add the showcase of two overlaying `<Modal>`. (#140)
- [Storybook] Add examples for nested `<List>`. (#141)

## [1.7.1]
### Fixed
- [Core] Fix `<Modal>` not rendering its content (#139)
- [Core] Remove the `Closable` HOC from `<Modal>` to prevent unexpected closing behaviors occur when more than one modals are open. (#139)

### Changed
- [Storybook] Refine the showcase of `<Modal>` component. (#139)

## [1.7.0]
### Added
- [Core] Migrate `<Modal>` from ic-framework-react and ic-framework. (#137)

### Changed
- [Core] `<HeaderRow>` now accepts `children` and renders. (#136)
- [Form] `<SelectOption>` now accepts and passes unknown props to its inner `<Checkbox>`. (#136)

## [1.6.0]
### Added
- [Core] Add new `<PopupButton>` which renders a pre-configured `<Button>` that should be used inside a `<Popup>`. (#127)
- [Core] Add `buttonsDirection` prop to `<Popup>` to align its buttons either vertically (as default) or horizontally. (#127)

### Changed
- [Core] Update styles for `<Popup>` to better match design. (#127)
- [Core] Refactor `<Popup>` to simplify codes. (#127)
- [Storybook] Update examples for `<Popup>`. (#127)
- [Core] Remove `z-index` from components with `renderToLayer()` HOC mixin. They will now be stack based on the stacking context on the base layers. (#128)
- [Storybook] Fix the showcase of `<Tooltip>` component. (#129)
- [Core] Change aside label of `<Text>` to inherit parent color but with 70% opacity. (#131)
- [Storybook] Update examples for `<Button>` (#131)
- Fix CI not aware of failing tests with `--bail` workaround. (#132)
- Upgrade dependency packages. (#133)

### Minor Breaking
- [Core] `<Popup>` is no longer wrapped with `closable()` mixin, will not respond to ESC key now. (#127)
- [Core] Default color for `<Button>` is now black. (#131)
- [Core] Remove `primary` prop from `<Button>` in favor of cross-component `bold` prop on `rowComp()`. (#131)


## [1.5.2]
### Changed
- [Form] The popover inside a single-value `<SelectRow>` should now close automatically after click on any option. (#125)
- [Form] Update examples for `<SelectRow>`. (#125)

### Fixed
- [Core] Fix `<Popover>` should only scroll its container. (#125)

## [1.5.1]
### Changed
- [Form] Update `<SelectRow>` to use new `dropdown` icon. (#124)

### Fixed
- [Core] Fix `<Checkbox>` not displaying correct icons. (#124)

## [1.5.0]
### Added
- [Core] Added 7 new icons: (#121)
  * dropdown
  * remove-element
  * inline-question
  * first-page
  * prev-page
  * next-page
  * last-page

### Changed
- [Core] `closable()` HOC mixin now takes runtime options via props. (#118)
- [Form] `formRow()` HOC mixin now takes `withRef` option to maintain a ref to its wrapped component. (#118)
- [Form] `<TextInputRow>` and `<SwitchRow>` now accepts `children` prop, will render inside `<ListRow>`. (#118)
- [Form] `<TextInputRow>` now exposes ref to inner `<input>` via `getInputNode()` method. (#118)
- [Core] Updated 3 icons: (#121)
  * radio-empty
  * radio-half
  * radio-selected

### Fixed
- [Core] Fix classNames injected by `<IconButton>` will be overridden with custom `className`. (#117)
- [Core] Fix `<Popover>` should have `max-height` while making its content scrollable. (#120)
- [Form] Fix unset `<SelectRow>` showing 'All' when it has no option. (#120)
- [Form] Fix unset `<SelectRow>` label should be tinted. (#120)
- [Form] Fix a non-multiple `<SelectRow>` with only one `<Option>` showing **All** when the only option is checked. (#122)

## [1.4.0]
### Added
- [Form] Add transition to text in `<TextInputRow>` when being focused.
- [Core] Add `tinted` prop for `<IconButton>` for a half-transparent icon.

### Changed
- [Form] `<SelectList>` now passes sorted values via `onChange()`
- [Form] `<SelectRow>` now caches values internally, and use that to control `<SelectList>`
- [Form] Customize display labels for `<SelectRow>` with `asideAll`, `asideNone` and `asideSeparator`.
- [Form] Extract `parseSelectOptions()` helper to read from children of `<SelectOption>`s.
- [Core] `<ListRow>` stops forwarding status props to children via context. This is changed against `v1.2.0`.

### Fixed
- [Form] Fix input inside `<TextInputRow>` should take up whole space.
- [Form] Fix input inside `<TextInputRow>` should not have background.
- [Core] Fix click events are ignored if fire from components inside `closable()` HOC mixin configured to close on inside click.

## [1.3.2]
### Fixed
- Fix `@ichef/gypcrete` not publishing anything. (#110)

## [1.3.2]
### Fixed
- Fixed CSS bundle requesting font files from broken path. (#108)

## [1.3.1]
### Changed
- Upgrade webpack to v3 (#101)
- [Core] Fix aside label for `<Text>` should turn white inside a highlighted `<ListRow>`. (#104)
- [Core] Adds hover background for `<ListRow>`. (#104)
- [Core] Fix vertical padding for `<HeaderRow>`. (#104)
- [Form] Add `<SelectRow>` which lets user to pick options from a `<SelectList>` rendered inside a `<Popover>`. (#107)

## [1.3.0]
### Added
- Migrate and refactor `<Popover>`, exporting an anchored one by default.
- Add new `closable()` HOC mixin to determine when to “close” on Esc key or on any key/touch on document.
- Add new `<SelectList>` to handle single or multiple selects by rendering a check list.
- Add new `<SelectOption>` to provide options for `<SelectList>`.

### Changed
- Gypcrete is now a multi-package mono-repo built on Lerna.
  It's currently split into:
    * **core** (publishes to `@ichef/gypcrete`)
    * **storybook** (publishes to gh-pages of this repository)
  But this should not affect the existing package, as the codes are untouched with this change. Please refers to README for details.
- Upgrade storybook libraries to v3.2.12, also fix the API changes of `storybook-addon-info`.  (#93)(#95)
- Deprecate `escapable()` mixin in favor of new `closable()`.
- The `padding` option for `anchored()` is renamed to `edgePadding` for better understanding.
- Upgrade webpack of main package to v3. (#101)
- Upgrade jest to v21.2. (#103)

### Bugs Fix
- [InfiniteScroll] Attach scroll listener when the `scrollNode` is existing.
- [storybook] Fix <InfiniteScroll> stories.

### Breaking
- `<Tooltip>` now default-exports an anchored version. `<AnchoredTooltip>` is removed from bundle.

## [1.2.0]
### Breaking changes
- `<EditableBasicRow>` now passes all unknown props to its underlying input.

### Style changes
- Fix `<body>` to use `system-ui` font family.
- `<List>` title is now bold.
- `<ListRow>` now has 4px padding vertically and the same 16px horizontally.
- Minimal height for a row component is removed, while the minimal row height is maintained at 48px by:
  * 32px minimal height for visual element
  * 4px + 4px vertical padding of `<rowComp(Component)>`
  * 4px + 4px vertical padding of `<ListRow>`

### Component changes
- `<EditableTextLabel>` filters out `status` from its inner `<TextLabel>` when it's in edit mode.
- `<Text>` adds a `bold` prop to render its *basic text* in bolder font.
- `<ListRow>` now has its own `desc` and `errorMsg`. It also takes status props, but mostly pass to children via context for now.
- Refactors `prefixState` into `getStateClassnames` so the state logic can be shared.
- Deprecates the `row-padding` utility icon.

## [1.1.1]
### Changed
- `<Button>` now renders a `<div>` instead of `<button>` to address a Safari bug where applies faulty Flexbox rendering to `<button>` tags.

## [1.1.0]
### Changed
- API changes to `<EditableTextLabel>`:
  * `inEdit` prop now defaults to `undefined`, which means the component is **uncontrolled**.
  * When `inEdit` is set either `true` or `false`, the component is **controlled**
  * ~`onEditRequest`~ prop is removed in favor of new `onDblClick` callback. Users can decide when to update the edit state.
- Behavior changes to `<EditableTextLabel>`:
  * Custom element passed via `icon` now renders correctly under edit mode
  * Double touch on mobile devices also triggers `onDblClick` callback.
  * If component is **uncontrolled**, it auto enters edit mode on double clicks/touches and leaves on edit ends.

## [1.0.0]
### Added
- Add `<HeaderRow>` which is split into `left`, `center` and `right` tiers.
- Add `<List>` section that supports a title and a description block.
- Add simple `<ListRow>` with a Flexbox body for row components.
- Add `<ColumnView>` which holds a `header` above and a `footer` below its main body area.
- Add z-index `z()` sass helper. (Migrate from iC-framework)
- Add `escapable()` mixin, listening `Esc` key to trigger `onEscape` prop.
- Add page overlay component, `<Overlay>`.
- Add `<Popup>` component.
- Add 3 new icons for menu page purpose.

### Changed
- Improved tests coverage. (especially mixins & utils)
- Font weight of `<body>` is now set as 400 by default.
- `<Button>` active/hover colors are slightly darken.
- `<Button>` now takes a `primary` prop to make it bolder.
- `<EditableTextLabel>` only gets `autofocus` when it's also `inEdit`.

## [0.13.1]
### Added
- Set publish registry with `publishConfig` option.

### Fixed
- [deploy] Fix git auth while pushing new tag.
- [deploy] Commit files with `--all` option.


## [0.13.0]
### Added
- Add Apache License 2.0 for open-source.
- Add `Installation` and `Usage` contents in README.
- A new `<EditableBasicRow>` containing input logics is split from `<EditableText>`. (#63) Also supports choosing from `input` or `textarea` for its inner tag. (#64)
- Add shields on README. (#66)

### Changed
- Add `Installation` and `Usage` contents in README.
- `<EditableText>` is simplified to only hold status-related logic. (#63)
- `<TextInput>` now passes all unknown props to `<EditableText>` for convenience. (#63)
- `<EditableTextLabel>` is now the only component which manages the input value change with `onEditEnd` callback, as well as `Enter`/`Esc` key presses and input blurs. (#63)
- Flow type annotations for `<Editable-*>` components and `<TextInput>`. (#63)
- Turn CI service to TravisCI. (#66)
- Update `deloy.sh` and `ghpages.sh` scripts to fit TravisCI.
- Upgrade `node-sass` to v4.5.3 to fix error on Node 8.
- Replace `jest-junit` reporter by [Coveralls](https://coveralls.io/github/iCHEF/gypcrete), send coverage data to Coveralls after CI build.


## [0.12.1]
### Changed
- `<Text>` now displays `basic` label in multiple lines. If you want to truncate it to single line with ellipsis, pass `<TextEllipsis>` instead. (#60)


## [0.12.0]
### Added
- Add vscode workspace settings, included `search.exclude` option. (#48)
- Add Flow type configs.

### Changed
- Change jest `testRegex` pattern, run test files in any `__tests__` folder with `.test` or `.spec` suffix only. (#48)
- Rename webpack config from `webpack.prod` to `webpack.dist`. (#48)
- The following config files are moved to `configs/` folder: (#48, #55)
    * `.babelrc`
    * `.eslintrc.yml`
    * `.eslintignore`
    * `.stylelintrc.yml`
    * `fontello.config.json`
- Add `fillSpace` prop in `<InfiniteScroll>`, auto fill spaces with `onLoadMore` callback if its height is smaller than 2 times of container's height. (#57)
- Remove `disabled` prop in `<InfiniteScroll>`. (#57)
- The `basic` prop of `<BasicRow>` is no longer required. (#58)
- The following modules are now type-annotated by Flow: (#39, #58)
    * All helpers under `/utils`
    * Visual elements of `<BasicRow>`, `<Icon>`, `<StatusIcon>`, `<Tag>`, `<Text>`.


## [0.11.1]
### Changed
- Use `>=` for versioning in `engines` fields.


## [0.11.0]
### Added
- Migrate `@kadira/storybook` to `@storybook/react`. (#52)
- Add `<InfiniteScroll>` to perform an action when scrolls a specified distance from the bottom of page. (#45)

## Changed
- Support react element in `rowComp()`'s icon prop. (#45)


## [0.10.1]
### Added
- Add new `download` icon.


## [0.10.0]
### Added
- Add `<SwitchIcon>` to be used as a 64x32 icon.
- Add `<Switch>` row component.
- Add `<EditableText>` visual element which has an `<input type="text" />` inside.
- Add `<TextInput>` which contains `<EditableText>` and ignores normal text props like `basic`, `tag` and `aside`.
- Add `sinon` testing package to handling stub tests. (#38)
- Add `EnhancedPropTypes` helper. (#38)
- Add `<EditableTextLabel>` which can be turned into edit mode with `inEdit` prop.

### Changed
- `<IconLayout>` can now be tooltip-free by turning it off.
- Fix tests in `<Checkbox>`.
- `<BasicRow>` can now take `children` to render extra content.
- Lighten hover & active background color of row components. (#38)
- Filter out color and solid props in `<IconButton>`, they should be empty. (#38)
- Non-minified row components now take equal space in a flex row.
- `withStatus()` mixin now takes `withRef` option to hold ref to rendered component.


## [0.9.0]
### Added
- Add `fontello.config.json` at project root.
- Add inventory icons(`iventory-category` and `inventory-item`).
- Add [@kadira/storybook](https://github.com/storybooks/storybook/) to replace `demo/`.
- Create `examples/` folder and migrate component docs to stories.
- Create `addPropsTable()` custom addon to show component's propTypes in table, which modified from `addon-info`.
- Add `storybook` env in babelrc, which included cjs transpiler.
- Deploy built storybook to `gh-pages` branch with running `npm run ghpages`. (#35)
- Add [demo link](http://ichef.github.io/gypcrete) in README.

### Changed
- Ignore `public/` path in eslint.

### Removed
- Remove `demo/` folder, all examples migrated to `examples/`.
- Remove webpack base & demo config, only leave `config/webpack.prod`.
- Remove demo related dev dependencies and `react-hot-loader`.


## [0.8.1]
### Changed
- Vertical padding for row components are now `8px` instead of `4px`.
- Padding for `<SearchInput>` is `8px` both vertically and horizontally.

### Removed
- `<RowCompBody>` is removed due to padding change. [[ref]](https://github.com/iCHEF/gypcrete/commit/1bb5d0baf6).


## [0.8.0]
### Added
- Add `<Checkbox>` with `indeterminate` prop support.
- Add `<IconCheckbox>` for icon-only checkbox.
- Add test of `/index.js` to check if every component under `src/` is exported.

### Changed
- `<SearchInput>` now caches last-notified search value inside to prevent duplicated notifications.
- `<SearchInput>` now tries to notify search upon reset button click.
- Fix reversed flex alignment for `<RowComp>`.
- Fix `<Tooltip>` not showing its content.


## [0.7.2]
### Changed
- Fix `<SearchInput>` was not included in distribution bundle.


## [0.7.1]
### Changed
- Root `font-size` is changed to 16px to maintain compatibility with iC-framework.


## [0.7.0]
### Added
- Install `prop-types` package in `dependencies` as official recommended.
- Add new search and CRM icons.
- Add new `<SearchInput>`.
- Prefix component class names with `prefixClass()` helper.

### Changed
- Upgrade `react` & `react-dom` to v15.5.
- Migrate `PropTypes` to `prop-types` package instead of import it from main `React` object.
- Migrate `React.createClass` to `createReactClass` from `create-react-class` package.
- Upgrade `enzyme` to 2.8.2 to support React v15.5, also install `react-test-renderer`.
- `icState()` is renamed to `prefixState()` and add prefix with `prefixClass()` helper.
- ClassName and component prefixes are now `gyp-`

### Removed
- Remove deprecated `react-addons-test-utils` package.


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
