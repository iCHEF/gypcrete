import React from 'react';
import 'src/styles/index.scss';

import VisualElements from './VisualElements';
import RowComponents from './RowComponents';

function DocApp() {
    return (
        <div>
            <VisualElements />
            <RowComponents />
        </div>
    );
}

export default DocApp;
