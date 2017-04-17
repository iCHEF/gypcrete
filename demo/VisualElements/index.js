import React from 'react';

import TextDoc from './TextDoc';
import IconDoc from './IconDoc';
import TagDoc from './TagDoc';
import TooltipDoc from './TooltipDoc';

function VisualElements() {
    return (
        <div>
            <h1>Visual Elements</h1>

            <TextDoc />
            <IconDoc />
            <TagDoc />
            <TooltipDoc />
        </div>
    );
}

export default VisualElements;
