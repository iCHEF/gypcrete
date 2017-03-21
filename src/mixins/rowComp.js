import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';

import getComponentName from '../utils/getComponentName';
import icState from '../utils/icState';
import wrapIfNotElement from '../utils/wrapIfNotElement';
import '../styles/RowComp.scss';

import Icon from '../Icon';
import Text from '../Text';

import { STATUS_CODE } from '../StatusIcon';

export const COMPONENT_NAME = 'ic-row-comp';

// State class names
const CLASS_ACTIVE = icState('active');
const CLASS_HIGHLIGHT = icState('highlight');
const CLASS_ERROR = icState('error');
const CLASS_DISABLED = icState('disabled');
const CLASS_UNTOUCHABLE = icState('untouchable');

function rowComp(WrappedComponent) {
    const componentName = getComponentName(WrappedComponent);

    class RowComp extends PureComponent {
        static displayName = `rowComp(${componentName})`;

        static propTypes = {
            // Text label props
            align: PropTypes.oneOf(['left', 'center', 'right', 'reverse']),
            icon: PropTypes.node,
            basic: PropTypes.node,
            aside: PropTypes.node,
            tag: PropTypes.node,

            // State props
            active: PropTypes.bool,
            highlight: PropTypes.bool,
            disabled: PropTypes.bool,

            // Status props
            status: PropTypes.oneOf(Object.values(STATUS_CODE)),
            statusOptions: PropTypes.object,
            errorMsg: PropTypes.string,
        };

        renderContent() {
            const {
                align,
                icon,
                basic,
                aside,
                tag,
            } = this.props;

            const textProps = { basic, aside, tag };

            return [
                icon && <Icon key="comp-icon" type={icon} />,
                <Text key="comp-text" {...textProps} />
            ];
        }

        render() {
            const {
                align,
                icon,
                basic,
                aside,
                tag,

                active,
                highlight,
                disabled,

                status,
                statusOptions,
                errorMsg,

                // React props
                className,
                children,

                ...otherProps
            } = this.props;

            const wrapperClassName = classNames(className, `${COMPONENT_NAME}`, {
                [CLASS_ACTIVE]: active,
                [CLASS_HIGHLIGHT]: highlight,
                [CLASS_ERROR]: status === STATUS_CODE.ERROR,
                [CLASS_DISABLED]: disabled,
                [CLASS_UNTOUCHABLE]: status === STATUS_CODE.LOADING,
            });

            return (
                <div className={wrapperClassName}>
                    <WrappedComponent {...otherProps}>
                        {children || this.renderContent()}
                    </WrappedComponent>
                </div>
            );
        }
    }

    return RowComp;
}

export default rowComp;
