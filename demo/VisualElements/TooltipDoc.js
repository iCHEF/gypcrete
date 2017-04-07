import React from 'react';
import Tooltip from 'src/Tooltip';

function TooltipBox({ children }) {
    return (
        <div style={{ display: 'inline-block', padding: '0 1em' }}>
            {children}
        </div>
    );
}

function TooltipDoc() {
    return (
        <div>
            <h2>&lt;Tooltip&gt;</h2>

            <TooltipBox>
                <Tooltip>Tooltip</Tooltip>
            </TooltipBox>

            <TooltipBox>
                <Tooltip placement="bottom">Tooltip</Tooltip>
            </TooltipBox>
        </div>
    );
}

export default TooltipDoc;
