import React from 'react';
import 'src/styles/index.scss';

import VisualElements from './VisualElements';
import RowComponents from './RowComponents';

function DemoApp() {
    return (
        <div>
            <VisualElements />
            <RowComponents />
        </div>
    );
}

export default DemoApp;
