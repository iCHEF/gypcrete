# gypcrete
iCHEF web components library, built with React.

[Demo](http://ichef.github.io/gypcrete)

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
