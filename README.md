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
import ReactDOM from 'react-dom';

import CustomComponent from './CustomComponent';

import '@ichef/gypcrete/dist/gypcrete.css';

const App = () => (
    <div>
        <CustomComponent />
    </div>
);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
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

### Releasing

We're relying on Lerna for versioning and publishing. When you create a Release on Github, it will trigger task on Travis CI to publish with Lerna. It also converts the lightweight tag created by Github Release to an annotated tag for Lerna to calculate versions.

When releasing a new version for Gypcrete, follow the steps:

1. Create a release branch `release/x.y.z`
2. *(Optional)* Release beta builds with `yarn release:pre` locally to specify version.
3. Bump version for `package.json` and `CHANGELOG`.
4. Bump children packages version with script:
   ```sh
   yarn bumpversion
   ```
   This will run `lerna version`, which updates all `package.json` files in `packages/`.

5. Commit above changes, then create a pull request for this release branch.
6. *[Important]* Create a new Release on Github in format of `v3.4.5` once it's merged into `master`.
   Please be sure to prefix the tag name with `v` as Lerna uses them to calculate changes.

7. Backport changes from `master` back to `develop` by creating a `backport/x.y.y` branch and create a pull request for that.

At the time Github Release is created, it should trigger `yarn release` on Travis CI and publishes packages to npm.

## LICENSE
This project is licensed under the terms of the [Apache License 2.0](https://github.com/ichef/gypcrete/blob/master/LICENSE)
