/**
 * rowComp() HOC mixin
 * ===================
 * A Component that goes into a row container is a **Row Component**,
 * and normally should be wrapped with the `rowComp()` mixin to share
 * common appearance and behaviors.
 *
 * By default, `rowComp()` renders a set of label contents into the wrapped
 * Component, including an <Icon> and a <Text>.
 *
 * Usage
 * -----
 * A **Row Component** can be used in 2 ways:
 *
 * ### Use pre-configured layout by passing everything via props
 * <TextLabel
 *     basic="Basic Text"
 *     tag="Tag"
 *     aside="Aside Text"
 *     align="center"
 *     status"loading" />
 *
 * ### Customize layout via children
 * <TextLabel status="error">
 *     <Icon type="star" />
 *     <Text basic="Announcements" />
 *     <Icon type="star" />
 * </TextLabel>
 *
 */

import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import '../styles/RowComp.scss';

import getComponentName from '../utils/getComponentName';
import icBEM from '../utils/icBEM';
import icState from '../utils/icState';
import { statusPropTypes } from './withStatus';

import Icon from '../Icon';
import Text from '../Text';

import { STATUS_CODE } from '../StatusIcon';

export const COMPONENT_NAME = 'ic-row-comp';
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const ROW_COMP_BODY = ROOT_BEM.element('body');

// State class names
const CLASS_ACTIVE = icState('active');
const CLASS_HIGHLIGHT = icState('highlight');
const CLASS_ERROR = icState('error');
const CLASS_DISABLED = icState('disabled');
const CLASS_UNTOUCHABLE = icState('untouchable');

// Alignments
const LEFT = 'left';
const CENTER = 'center';
const RIGHT = 'right';
const REVERSE = 'reverse';
export const ROW_COMP_ALIGN = { LEFT, CENTER, RIGHT, REVERSE };

/**
 * Determine alignment for pre-configured <Text> based on
 * <RowComp> align and icon existence.
 *
 * @param  {String} compAlign
 * @param  {Bool}   hasIcon
 * @return {String} textAlign
 */
function determineTextAlign(compAlign, hasIcon) {
    switch (compAlign) {
        case RIGHT:
        case REVERSE:
            return RIGHT;
        case CENTER:
            if (!hasIcon) return CENTER;
        default: // eslint-disable-line no-fallthrough
            return LEFT;
    }
}

const rowComp = ({
    defaultMinified = false,
    defaultAlign = 'left'
} = {}) => (WrappedComponent) => {
    const componentName = getComponentName(WrappedComponent);

    class RowComp extends PureComponent {
        static displayName = `rowComp(${componentName})`;

        static propTypes = {
            minified: PropTypes.bool,

            // Text label props
            align: PropTypes.oneOf(Object.values(ROW_COMP_ALIGN)),
            icon: PropTypes.string,
            basic: PropTypes.node,
            aside: PropTypes.node,
            tag: PropTypes.node,

            // State props
            active: PropTypes.bool,
            highlight: PropTypes.bool,
            disabled: PropTypes.bool,

            ...statusPropTypes,
            // status,
            // statusOptions,
            // errorMsg,
        };

        static defaultProps = {
            minified: defaultMinified,

            align: defaultAlign,
            icon: null,
            basic: null,
            aside: null,
            tag: null,

            active: false,
            highlight: false,
            disabled: false,

            status: null,
            statusOptions: {},
            errorMsg: null,
        };

        static childContextTypes = {
            ...statusPropTypes,
            // status,
            // statusOptions,
            // errorMsg,
        };

        getChildContext() {
            const { status, statusOptions, errorMsg } = this.props;

            return { status, statusOptions, errorMsg };
        }

        renderContent() {
            const {
                align,
                icon,
                basic,
                aside,
                tag,
            } = this.props;

            const textProps = { basic, aside, tag };
            const textAlign = determineTextAlign(align, !!icon);

            return [
                icon && <Icon key="comp-icon" type={icon} />,
                <Text
                    key="comp-text"
                    align={textAlign}
                    noGrow={align === CENTER}
                    {...textProps} />
            ];
        }

        render() {
            const {
                minified,

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

            const bemClass = ROOT_BEM
                .modifier('minified', minified)
                .modifier(align);

            const wrapperClassName = classNames(className, `${bemClass}`, {
                [CLASS_ACTIVE]: active,
                [CLASS_HIGHLIGHT]: highlight,
                [CLASS_ERROR]: status === STATUS_CODE.ERROR,
                [CLASS_DISABLED]: disabled,
                [CLASS_UNTOUCHABLE]: status === STATUS_CODE.LOADING,
            });

            return (
                <WrappedComponent className={wrapperClassName} {...otherProps}>
                    {children || this.renderContent()}
                </WrappedComponent>
            );
        }
    }

    return RowComp;
};

export default rowComp;
