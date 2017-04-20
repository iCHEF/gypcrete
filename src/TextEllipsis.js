import React from 'react';
import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import './styles/TextEllipsis.scss';

const COMPONENT_NAME = prefixClass('text-ellipsis');
const ROOT_BEM = icBEM(COMPONENT_NAME);

function TextEllipsis({ children }) {
    return (
        <div className={ROOT_BEM}>
            {children}
        </div>
    );
}

export default TextEllipsis;
