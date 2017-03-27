import React from 'react';
import classNames from 'classnames';
import rowComp from './mixins/rowComp';
import './styles/TextLabel.scss';

import RowCompBody from './RowCompBody';

export const COMPONENT_NAME = 'ic-text-label';

function TextLabel({ className, children }) {
    const rootClassName = classNames(className, COMPONENT_NAME);

    return (
        <div className={rootClassName}>
            <RowCompBody>
                {children}
            </RowCompBody>
        </div>
    );
}

// export for tests
export { TextLabel as PureTextLabel };

export default rowComp()(TextLabel);
