// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import type { ReactChildren } from 'react-flow-types';
import './styles/ListRow.scss';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';

export const COMPONENT_NAME = prefixClass('list-row');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    body: ROOT_BEM.element('body'),
};

export type Props = {
    nestedList?: ReactChildren,
    /* eslint-disable react/require-default-props */
    className?: string,
    children?: ReactChildren,
    /* eslint-enable react/require-default-props */
};

class ListRow extends PureComponent<Props, Props, any> {
    static propTypes = {
        nestedList: PropTypes.node,
    };

    static defaultProps = {
        nestedList: undefined,
    };

    render() {
        const {
            nestedList,
            // React props
            className,
            children,
            ...wrapperProps,
        } = this.props;

        const bemClass = BEM.root;
        const rootClassName = classNames(bemClass.toString(), className);

        return (
            <li className={rootClassName} {...wrapperProps}>
                <div className={BEM.body.toString()}>
                    {children}
                </div>
                {nestedList}
            </li>
        );
    }
}

export default ListRow;
