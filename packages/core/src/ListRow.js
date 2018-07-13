// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import type { ReactChildren } from 'react-flow-types';
import type { Props as StatusIconProps } from './StatusIcon';
import { statusPropTypes } from './mixins/withStatus';

import prefixClass from './utils/prefixClass';
import getStateClassnames from './utils/getStateClassnames';
import icBEM from './utils/icBEM';
import wrapIfNotElement from './utils/wrapIfNotElement';

import { STATUS_CODE } from './StatusIcon';

import './styles/ListRow.scss';

export const COMPONENT_NAME = prefixClass('list-row');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    body: ROOT_BEM.element('body'),
    footer: ROOT_BEM.element('footer'),
};

export type Props = {
    highlight?: boolean,
    nestedList?: ReactChildren,
    desc?: ReactChildren,
    status?: $PropertyType<StatusIconProps, 'status'>,
    // #FIXME: Use type import
    statusOptions?: { [string]: any },
    errorMsg?: string,

    /* eslint-disable react/require-default-props */
    className?: string,
    children?: ReactChildren,
    /* eslint-enable react/require-default-props */
};

class ListRow extends PureComponent<Props, Props, any> {
    static propTypes = {
        highlight: PropTypes.bool,
        nestedList: PropTypes.node,
        desc: PropTypes.node,

        ...statusPropTypes,
        // status,
        // statusOptions,
        // errorMsg,
    };

    static defaultProps = {
        highlight: false,
        nestedList: undefined,
        desc: undefined,
    };

    renderFooter() {
        const { desc, errorMsg } = this.props;
        const hasFooter = desc || errorMsg;

        if (!hasFooter) {
            return null;
        }

        return (
            <div className={BEM.footer.toString()}>
                {errorMsg && wrapIfNotElement(errorMsg, { with: 'p' })}
                {desc && wrapIfNotElement(desc, { with: 'p' })}
            </div>
        );
    }

    render() {
        const {
            highlight,
            nestedList,
            desc,
            // status props
            status,
            statusOptions,
            errorMsg,
            // React props
            className,
            children,
            ...wrapperProps,
        } = this.props;

        const bemClass = BEM.root.modifier('highlight', highlight);

        const stateClass = getStateClassnames({
            error: status === STATUS_CODE.ERROR,
        });
        const rootClassName = classNames(bemClass.toString(), stateClass, className);

        return (
            <li className={rootClassName} {...wrapperProps}>
                <div className={BEM.body.toString()}>
                    {children}
                </div>

                {this.renderFooter()}
                {nestedList}
            </li>
        );
    }
}

export default ListRow;
