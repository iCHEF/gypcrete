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

import React, {
    PureComponent,
    isValidElement,
    cloneElement
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../styles/RowComp.scss';

import getComponentName from '../utils/getComponentName';
import icBEM from '../utils/icBEM';
import prefixClass from '../utils/prefixClass';
import prefixState from '../utils/prefixState';
import { statusPropTypes } from './withStatus';

import Icon from '../Icon';
import Text from '../Text';

import { STATUS_CODE } from '../StatusIcon';

export const COMPONENT_NAME = prefixClass('row-comp');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const ROW_COMP_BODY = ROOT_BEM.element('body');

// State class names
const CLASS_ACTIVE = prefixState('active');
const CLASS_HIGHLIGHT = prefixState('highlight');
const CLASS_ERROR = prefixState('error');
const CLASS_DISABLED = prefixState('disabled');
const CLASS_UNTOUCHABLE = prefixState('untouchable');

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

/**
 * Get 'align' and 'noGrow' layout props for <Text>
 * as it would receive if rendered by rowComp().
 *
 * @param  {String} compAlign
 * @param  {Bool}   hasIcon
 * @return {Object} layoutProps
 */
export function getTextLayoutProps(compAlign, hasIcon) {
    return {
        align: determineTextAlign(compAlign, hasIcon),
        noGrow: compAlign === CENTER,
    };
}

const rowComp = ({
    defaultMinified = false,
    defaultAlign = LEFT,
} = {}) => (WrappedComponent) => {
    const componentName = getComponentName(WrappedComponent);

    class RowComp extends PureComponent {
        static displayName = `rowComp(${componentName})`;

        static propTypes = {
            minified: PropTypes.bool,

            // Text label props
            align: PropTypes.oneOf(Object.values(ROW_COMP_ALIGN)),
            icon: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element
            ]),
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
            align: PropTypes.oneOf(Object.values(ROW_COMP_ALIGN)),
            ...statusPropTypes,
            // status,
            // statusOptions,
            // errorMsg,
        };

        getChildContext() {
            const { align, status, statusOptions, errorMsg } = this.props;

            return { align, status, statusOptions, errorMsg };
        }

        renderIconElement() {
            const { icon } = this.props;

            if (!icon) {
                return null;
            }

            return isValidElement(icon)
                ? cloneElement(icon, { key: 'comp-icon' })
                : <Icon key="comp-icon" type={icon} />;
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
            const textLayoutProps = getTextLayoutProps(align, !!icon);

            // Render icon element
            const iconElement = this.renderIconElement();

            return [
                iconElement,
                <Text
                    key="comp-text"
                    {...textProps}
                    {...textLayoutProps} />
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
