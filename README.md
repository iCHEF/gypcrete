# gypcrete
iCHEF web components library, built with React.

[![npm package](https://img.shields.io/npm/v/@ichef/gypcrete.svg)](https://www.npmjs.com/package/@ichef/gypcrete)
[![build status](https://img.shields.io/travis/iCHEF/gypcrete/master.svg)](https://travis-ci.org/iCHEF/gypcrete)
[![Coverage Status](https://img.shields.io/coveralls/iCHEF/gypcrete/master.svg)](https://coveralls.io/github/iCHEF/gypcrete?branch=master)

[![PeerDependencies](https://img.shields.io/david/peer/iCHEF/gypcrete.svg)](https://david-dm.org/iCHEF/gypcrete?type=peer)
[![Dependencies](https://img.shields.io/david/iCHEF/gypcrete.svg)](https://david-dm.org/iCHEF/gypcrete)
[![DevDependencies](https://img.shields.io/david/dev/iCHEF/gypcrete.svg)](https://david-dm.org/iCHEF/gypcrete?type=dev)

## Demo
[ichef.github.io/gypcrete](https://ichef.github.io/gypcrete)

## Installation
```sh
yarn add @ichef/gypcrete
```

## Usage
Here is a quick example to get you started:

**./App.js**
```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';

import CustomComponent from './CustomComponent';

import '@ichef/gypcrete/dist/gypcrete.css';

const App = () => (
  <div>
    <CustomComponent />
  </div>
);

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
```

**./CustomComponent.js**
```jsx
import React from 'react';
import { Button } from '@ichef/gypcrete';

const CustomComponent = () => (
  <Button basic="Hello World!" />
);

export default CustomComponent;
```

## Develop
Gypcrete is a multi-package mono-repo built on [Lerna](https://github.com/lerna/lerna). All sub-pacakges are placed inside `packages/` folder. It uses [Yarn Workspaces](https://yarnpkg.com/en/docs/workspaces) to hoist all dependencies to root level.

To install dependencies and link packages, simply run `yarn install`.
To run the Storybook locally, use the `yarn start` script.

Linters and test runners are configured at repository level.
They should check all source files across every package in the `packages/` folder.

Gypcrete does not publish develop builds to the `dist` branch anymore. It now publishes to NPM instead:
  * When pushed to `develop` branch --> publish a canary build
  * When pushed to `master` branch --> publish a relase build

## Release

1. 從 develop 開出新的 release branch，release branch 的格式必須符合 `release/x.y.z`，例如 `release/1.2.3`。`x.y.z` 的部分為欲發佈的版號，必須符合 semantic versioning。
2. 以這支新的 release branch 開出新的 PR，base branch 設為 `master`。
3. 當 PR 被 merge 時，會觸發 github action 的 [Release workflow](https://github.com/iCHEF/fe-modules/blob/master/.github/workflows/release.yml)，此 workflow 會在 master branch 做下列動作：
    - 更新 package.json 的 version 並 commit
    - 執行 `yarn changelog` 更新 CHANGELOG.md
    - 打 git tag 並將 tag push 上 github
    - 發佈新版本到 npm
    - 開出 backport 到 develop branch 的 PR
4. merge backport PR。至此完成 release 流程。

## LICENSE
This project is licensed under the terms of the [Apache License 2.0](https://github.com/ichef/gypcrete/blob/master/LICENSE)
