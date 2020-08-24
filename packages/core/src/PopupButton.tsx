import React from 'react';
import classNames from 'classnames';

import prefixClass from './utils/prefixClass';
import Button from './Button';
import './styles/PopupButton.scss';

export const COMPONENT_NAME = prefixClass('popup-button');

function PopupButton({
    className,
    ...props
}) {
    const buttonClass = classNames(COMPONENT_NAME, className);

    return (
        <Button
            {...props}
            // @ts-expect-error ts-migrate(2769) FIXME: Property 'className' does not exist on type 'Intri... Remove this comment to see the full error message
            className={buttonClass}
            minified={false}
            align="center" />
    );
}

export default PopupButton;
