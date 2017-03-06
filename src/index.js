import React from 'react';

import './css/index.scss';
import { increment } from './test';

function App() {
    return <div>Hello World {increment()}!</div>;
}

export default App;
