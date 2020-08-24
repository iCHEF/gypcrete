import React from 'react';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import rowComp from './mixins/rowComp';
import './styles/Button.scss';

export const COMPONENT_NAME = prefixClass('button');
const ROOT_BEM = icBEM(COMPONENT_NAME);

const BLUE = 'blue';
const RED = 'red';
const WHITE = 'white';
const BLACK = 'black';

const colors = [BLUE, RED, WHITE, BLACK] as const;

type OwnProps = {
    color?: typeof colors[number],
    solid?: boolean;
    tagName?: 'button' | 'a' | 'div';
};

type Props = OwnProps & typeof Button.defaultProps;

function Button({
    color, solid, tagName: ButtonTag,
    // React props
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Props... Remove this comment to see the full error message
    className, children, ...otherProps
}: Props) {
    const bemClass = ROOT_BEM
        .modifier(color)
        .modifier('solid', solid);

    const rootClassName = classNames(className, `${bemClass}`);

    // #TODO: Restore wrapper to <button> after Safari 11 goes mainstream
    return (
        <ButtonTag className={rootClassName} {...otherProps}>
            {children}
        </ButtonTag>
    );
}

Button.defaultProps = {
    color: BLACK,
    solid: false,
    tagName: 'div',
};

// export for tests
export { Button as PureButton };

// @ts-expect-error ts-migrate(4023) FIXME: Exported variable 'RowCompButton' has or is using ... Remove this comment to see the full error message
const RowCompButton = rowComp({ defaultMinified: true })(Button);
RowCompButton.defaultProps.bold = true;

export default RowCompButton;
