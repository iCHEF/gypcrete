import React from 'react';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import './styles/FlexCell.scss';

const COMPONENT_NAME = prefixClass('flex-cell');
const ROOT_BEM = icBEM(COMPONENT_NAME);

type OwnProps = {
    shrink?: boolean | number;
    grow?: boolean | number;
    basis?: string;
};

type Props = OwnProps & typeof FlexCell.defaultProps;

// @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type 'Props'... Remove this comment to see the full error message
function FlexCell({ shrink, grow, basis, children }: Props) {
    const flexStyles = {
        flexShrink: Number(shrink),
        flexGrow: Number(grow),
        flexBasis: basis,
    };

    return (
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'BEMFactory' is not assignable to type 'strin... Remove this comment to see the full error message
        <div className={ROOT_BEM} style={flexStyles}>
            {children}
        </div>
    );
}

FlexCell.defaultProps = {
    shrink: false,
    grow: false,
    basis: 'auto',
};

export default FlexCell;
