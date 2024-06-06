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

import { PureComponent, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../styles/RowComp.scss';

import getComponentName from '../utils/getComponentName';
import icBEM from '../utils/icBEM';
import prefixClass from '../utils/prefixClass';
import getStateClassnames from '../utils/getStateClassnames';
import { statusPropTypes } from './withStatus';

import Icon from '../Icon';
import Text, { VERTICAL_ORDER } from '../Text';

import { STATUS_CODE } from '../StatusIcon';

export const COMPONENT_NAME = prefixClass('row-comp');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const ROW_COMP_BODY = ROOT_BEM.element('body');

// Alignments
const LEFT = 'left';
const CENTER = 'center';
const RIGHT = 'right';
const REVERSE = 'reverse';
export const ROW_COMP_ALIGN = { LEFT, CENTER, RIGHT, REVERSE };

export const textPropTypes = {
  align: PropTypes.string,
  noGrow: PropTypes.bool,
  verticalOrder: PropTypes.string,
  basic: PropTypes.node,
  aside: PropTypes.node,
  tag: PropTypes.node,
  bold: PropTypes.bool,
};

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
 * @param  {string} compAlign
 * @param  {boolean}   hasIcon
 */
export function getTextLayoutProps(compAlign, hasIcon) {
  return {
    align: determineTextAlign(compAlign, hasIcon),
    noGrow: compAlign === CENTER,
  };
}

const rowComp =
  ({
    defaultMinified = false,
    defaultAlign = LEFT,
    defaultVerticalOrder = VERTICAL_ORDER.NORMAL,
  } = {}) =>
  (WrappedComponent) => {
    const componentName = getComponentName(WrappedComponent);

    class RowComp extends PureComponent {
      static displayName = `rowComp(${componentName})`;

      static propTypes = {
        minified: PropTypes.bool,

        // Text label props
        align: PropTypes.oneOf([
          ROW_COMP_ALIGN.LEFT,
          ROW_COMP_ALIGN.CENTER,
          ROW_COMP_ALIGN.RIGHT,
          ROW_COMP_ALIGN.REVERSE,
        ]),
        verticalOrder: PropTypes.oneOf([VERTICAL_ORDER.NORMAL, VERTICAL_ORDER.REVERSE]),
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        basic: PropTypes.node,
        avatar: PropTypes.node,
        aside: PropTypes.node,
        tag: PropTypes.node,
        bold: PropTypes.bool,
        asideControlClickableOnDisabled: PropTypes.bool,

        // State props
        active: PropTypes.bool,
        highlight: PropTypes.bool,
        disabled: PropTypes.bool,
        muted: PropTypes.bool,

        // status props
        status: statusPropTypes.status,
        statusOptions: statusPropTypes.statusOptions,
        errorMsg: statusPropTypes.errorMsg,
      };

      static defaultProps = {
        minified: defaultMinified,

        align: defaultAlign,
        verticalOrder: defaultVerticalOrder,
        icon: null,
        basic: null,
        avatar: null,
        aside: null,
        tag: null,
        bold: false,
        asideControlClickableOnDisabled: false,

        active: false,
        highlight: false,
        disabled: false,
        muted: false,

        status: undefined,
        statusOptions: undefined,
        errorMsg: undefined,
      };

      static childContextTypes = {
        textProps: PropTypes.shape(textPropTypes),
        ...statusPropTypes,
        // status,
        // statusOptions,
        // errorMsg,
      };

      getChildContext() {
        const { status, statusOptions, errorMsg } = this.props;
        const textProps = this.getTextProps();

        return {
          status,
          statusOptions,
          errorMsg,
          // for <TextInput>
          textProps,
        };
      }

      getTextProps() {
        const {
          align,
          verticalOrder,
          icon,
          basic,
          aside,
          tag,
          bold,
          asideControlClickableOnDisabled,
          disabled,
        } = this.props;

        const textLayoutProps = getTextLayoutProps(align, !!icon);
        const asideControlClickableProps =
          asideControlClickableOnDisabled && disabled
            ? {
                onClick: (event) => {
                  event.stopPropagation();
                },
              }
            : undefined;

        return {
          verticalOrder,
          basic,
          aside,
          tag,
          bold,
          ...asideControlClickableProps,
          ...textLayoutProps,
        };
      }

      renderIconElement() {
        const { icon } = this.props;

        if (!icon) {
          return null;
        }

        return isValidElement(icon) ? (
          cloneElement(icon, { key: 'comp-icon' })
        ) : (
          <Icon
            key="comp-icon"
            type={icon}
          />
        );
      }

      renderContent() {
        const iconElement = this.renderIconElement();
        const textProps = this.getTextProps();

        return [
          iconElement,
          <Text
            key="comp-text"
            {...textProps}
          />,
        ];
      }

      render() {
        const {
          minified,
          avatar,
          align,
          verticalOrder,
          icon,
          basic,
          aside,
          tag,
          bold,
          asideControlClickableOnDisabled,

          active,
          highlight,
          disabled,
          muted,

          status,
          statusOptions,
          errorMsg,

          // React props
          className,
          children,

          ...otherProps
        } = this.props;

        const bemClass = ROOT_BEM.modifier('minified', minified)
          .modifier(align)
          .modifier('aside-control-clickable', asideControlClickableOnDisabled);

        const stateClassNames = getStateClassnames({
          active,
          highlight,
          disabled,
          muted,
          error: status === STATUS_CODE.ERROR,
          untouchable: status === STATUS_CODE.LOADING,
        });
        const wrapperClassName = classNames(className, stateClassNames, `${bemClass}`);

        return (
          <WrappedComponent
            className={wrapperClassName}
            {...otherProps}
            disabled={disabled}
          >
            {avatar}
            {children || this.renderContent()}
          </WrappedComponent>
        );
      }
    }

    return RowComp;
  };

export default rowComp;
