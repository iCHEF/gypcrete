import React from 'react';
import './styles/RowComp.scss';

import { ROW_COMP_BODY } from './mixins/rowComp';

function RowCompBody({ children }) {
    return (
        <div className={ROW_COMP_BODY}>
            {children}
        </div>
    );
}

export default RowCompBody;
