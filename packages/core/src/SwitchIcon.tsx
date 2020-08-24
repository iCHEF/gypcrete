import React from 'react';
import classNames from 'classnames';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';
import './styles/SwitchIcon.scss';

export const COMPONENT_NAME = prefixClass('switch-icon');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    inner: ROOT_BEM.element('inner'),
};

const ON = 'on';
const OFF = 'off';
export const SWITCH_STATE = { ON, OFF };

type OwnProps = {
    state?: any; // TODO: PropTypes.oneOf([ON, OFF])
};

type Props = OwnProps & typeof SwitchIcon.defaultProps;

/**
 * <SwitchIcon>
 * ===
 *
 * A `<SwitchIcon>` is a visual element that is supposed to be like a 64x32 icon.
 */
// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Props... Remove this comment to see the full error message
function SwitchIcon({ state, className, ...otherProps }: Props) {
    const bemClass = BEM.root.modifier(state);
    const rootClassName = classNames(className, `${bemClass}`);

    return (
        <span className={rootClassName} {...otherProps}>
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'BEMFactory' is not assignable to type 'strin... Remove this comment to see the full error message */}
            <span className={BEM.inner} />
        </span>
    );
}

SwitchIcon.defaultProps = {
    state: OFF,
};

export default SwitchIcon;
