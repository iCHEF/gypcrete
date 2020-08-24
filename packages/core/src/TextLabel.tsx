import React from 'react';
import classNames from 'classnames';
import prefixClass from './utils/prefixClass';
import rowComp from './mixins/rowComp';
import './styles/TextLabel.scss';

export const COMPONENT_NAME = prefixClass('text-label');

function TextLabel({ className, children, ...otherProps }) {
    const rootClassName = classNames(className, COMPONENT_NAME);

    return (
        <div className={rootClassName} {...otherProps}>
            {children}
        </div>
    );
}

// export for tests
export { TextLabel as PureTextLabel };

// @ts-expect-error ts-migrate(4082) FIXME: Default export of the module has or is using priva... Remove this comment to see the full error message
export default rowComp()(TextLabel);
