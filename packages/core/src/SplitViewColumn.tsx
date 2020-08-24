import React from 'react';
import classNames from 'classnames';

import { BEM } from './SplitView';
import './styles/SplitView.scss';

type OwnProps = {
    wide?: boolean;
};

type Props = OwnProps & typeof SplitViewColumn.defaultProps;

function SplitViewColumn({
    wide,
    // React props
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Props... Remove this comment to see the full error message
    className, children, ...otherProps
}: Props) {
    const columnBEM = BEM.column.modifier('wide', wide);
    const columnClassName = classNames(columnBEM.toString(), className);

    return (
        <div className={columnClassName} {...otherProps}>
            {children}
        </div>
    );
}

SplitViewColumn.defaultProps = {
    wide: false,
};

export default SplitViewColumn;
