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

## LICENSE
This project is licensed under the terms of the [Apache License 2.0](https://github.com/ichef/gypcrete/blob/master/LICENSE)
