import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BEM } from './SplitView';
import './styles/SplitView.scss';

function SplitViewColumn({
    wide,
    // React props
    className,
    children,
    ...otherProps
}) {
    const columnBEM = BEM.column.modifier('wide', wide);
    const columnClassName = classNames(columnBEM.toString(), className);

    return (
        <div className={columnClassName} {...otherProps}>
            {children}
        </div>
    );
}

SplitViewColumn.propTypes = {
    wide: PropTypes.bool,
};

SplitViewColumn.defaultProps = {
    wide: false,
};

export default SplitViewColumn;
