import React, { Component } from 'react';
import PropTypes from 'prop-types';
import documentOffset from 'document-offset';

import getComponentName from '../utils/getComponentName';

const TOP = 'top';
const BOTTOM = 'bottom';
export const ANCHORED_PLACEMENT = { TOP, BOTTOM };

const ReactRefPropType = PropTypes.shape({
    current: PropTypes.any,
});

export const anchoredPropTypes = {
    placement: PropTypes.oneOf(Object.values(ANCHORED_PLACEMENT)),
    arrowStyle: PropTypes.objectOf(PropTypes.number),
    nodeRef: ReactRefPropType,
};

/**
 * Determine if `defaultPlacement` can be achieved, based on boundery spacing.
 *
 * @param {Sting} defaultPlacement - TOP || BOTTOM
 * @param {Bool} hasSpaceAbove
 * @param {Bool} hasSpaceBelow
 */
function getVerticalPlacement(defaultPlacement, hasSpaceAbove, hasSpaceBelow) {
    if (defaultPlacement === TOP) {
        return hasSpaceAbove ? TOP : BOTTOM;
    }

    return hasSpaceBelow ? BOTTOM : TOP;
}

/**
 * anchored() HOC mixin
 * ====================
 * Calculate the absolute position on <body> for the wrapped component,
 * based on specified **anchor** node.
 *
 * You should manually set ref to:
 *   1. The DOM node of *anchor element* by assigning ref via `anchor` prop, and
 *   2. The DOM node of *wrapped component* via `nodeRef` prop passed onto it,
 *
 * so this mixin can determine which DOM node to use for positioning.
 *
 * Usually used along with `renderToLayer()` mixin.
 *
 * Concept
 * -------
 * The mixin will determine the position related to the given anchor,
 * and tries to place an arrow pointing to the anchor node.
 *
 * The arrow should stay in the Component's width, deducting the
 * “edge padding”.
 *
 ```
                    edge padding
╭╌┊╌╌╌╌╌╌╌/\╌╌╌╌╌╌╌╌┊╌╮
╎ ┊                 ┊ ╎
╎ ┊                 ┊ ╎
╰╌┊╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┊╌╯
    arrow safe area
 ```
 *
 * @param {object} options
 * @param {TOP|BOTTOM} options.defaultPlacement - the default vertical placement
 * @param {number} options.edgePadding - the number to be deducted when calculating “safe area”
 *
 * @example
 ```jsx
// configuring wrapped component
function Component({ placement, arrowStyle, style, nodeRef }) {
    return (
        <div ref={nodeRef} className={placement} style={style}>
            <div className="arrow" style={arrowStyle} />
            content body
        </div>
    );
}
const AnchoredComponent = anchored(options)(Component);

// setting anchor
class Example extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
    };

    anchorRef = React.createRef();

    render() {
        return (
            <div>
                <div className="anchor" ref={this.anchorRef} />
                {this.props.show && (
                    <AnchoredComponent anchor={this.anchorRef.current} />
                )}
            </div>
        );
    }
}
 ```
 */

const anchored = ({
    defaultPlacement = BOTTOM,
    edgePadding = 16,
} = {}) => (WrappedComponent) => {
    const componentName = getComponentName(WrappedComponent);

    class Anchored extends Component {
        static displayName = `anchored(${componentName})`;

        static propTypes = {
            anchor: PropTypes.instanceOf(window.Node),
        };

        static defaultProps = {
            anchor: null,
        };

        // instance variables

        state = {
            placement: BOTTOM,
            position: {},
            arrowPosition: {}
        };

        selfNodeRef = React.createRef();

        // lifecycle methods

        componentDidMount() {
            this.adjustPosition();
        }

        componentWillReceiveProps(nextProps) {
            const { anchor: currentAnchor } = this.props;

            if (nextProps.anchor !== currentAnchor) {
                this.adjustPosition(nextProps.anchor);
            }
        }

        getAnchorDOMNode(fromAnchor = this.props.anchor) {
            if (fromAnchor instanceof window.HTMLElement) {
                return fromAnchor;
            }

            // Ignore non-HTMLElement anchors
            return null;
        }

        // -------------------------------------
        //   Adjust component's position
        // -------------------------------------

        /**
         * Adjust popover position based on spacing around anchor element,
         * then set new position to state.
         *
         * ClientRect: element's positions related to browser window viewport.
         * Offset: element's position related to document.
         */

        /**
         * @typedef {Object} DOMRect
         * @property {number} top
         * @property {number} bottom
         * @property {number} left
         * @property {number} right
         * @property {number} width
         * @property {number} height
         *
         * @typedef {Object} DocumentOffset
         * @property {number} top
         * @property {number} left
         */

        adjustPosition(nextAnchor = this.props.anchor) {
            const anchorNode = this.getAnchorDOMNode(nextAnchor);
            const selfNode = this.selfNodeRef.current;

            if (!anchorNode || !selfNode) {
                return;
            }

            /** @type {DOMRect} */
            const anchorRect = anchorNode.getBoundingClientRect();

            /** @type {DocumentOffset} */
            const anchorOffset = documentOffset(anchorNode);
            const anchorHalfWidth = anchorRect.width / 2;

            /** @type {DOMRect} */
            const selfRect = selfNode.getBoundingClientRect();
            const selfHalfWidth = selfRect.width / 2;

            const nextState = {
                placement: undefined,
                position: {},
                arrowPosition: {}
            };

            // -------------------------------------
            //   Determine vertical position
            // -------------------------------------
            const hasSpaceToPlaceSelfAbove = anchorRect.top >= selfRect.height;
            const hasSpaceToPlaceSelfBelow = (
                (window.innerHeight - anchorRect.bottom) >= selfRect.height
            );

            nextState.placement = getVerticalPlacement(
                defaultPlacement,
                hasSpaceToPlaceSelfAbove,
                hasSpaceToPlaceSelfBelow,
            );

            if (nextState.placement === TOP) {
                nextState.position.top = anchorOffset.top - selfRect.height;
            } else {
                nextState.position.top = anchorOffset.top + anchorRect.height;
            }

            /**
             * Determine horizontal position.
             *
             * 1. Try to align self to the center of anchor.
             * 2. If not possible, try to align self to the right edge of anchor.
             * 3. If still not possible, align self to the left edge of anchor.
             */
            // Relative to browser window viewport
            const anchorCenterCoordX = anchorRect.left + anchorHalfWidth;

            const hasSpaceOnLeftOfAnchorCenter = anchorCenterCoordX >= selfHalfWidth;
            const hasSpaceOnRightOfAnchorCenter = (
                (window.innerWidth - anchorCenterCoordX) >= selfHalfWidth
            );

            const arrowSafeAreaLeft = edgePadding;
            const arrowSafeAreaRight = selfRect.width - edgePadding;

            switch (true) {
                // Center-aligned
                case (hasSpaceOnLeftOfAnchorCenter && hasSpaceOnRightOfAnchorCenter):
                    nextState.position.left = (anchorOffset.left + anchorHalfWidth) - selfHalfWidth;
                    break;

                // Right-align to the anchor
                case (hasSpaceOnLeftOfAnchorCenter && !hasSpaceOnRightOfAnchorCenter):
                    nextState.position.left = (
                        anchorOffset.left + anchorRect.width - selfRect.width
                    );

                    nextState.arrowPosition.left = selfRect.width - anchorHalfWidth;
                    break;

                // Left-align to the anchor
                default:
                    nextState.position.left = anchorOffset.left;
                    nextState.arrowPosition.left = anchorHalfWidth;
                    break;
            }

            // Calibrate arrow position so it stays in safe area
            if (nextState.arrowPosition.left < arrowSafeAreaLeft) {
                nextState.arrowPosition.left = arrowSafeAreaLeft;
            }

            if (nextState.arrowPosition.left > arrowSafeAreaRight) {
                nextState.arrowPosition.left = arrowSafeAreaRight;
            }

            this.setState(nextState);
        }

        // -------------------------------------
        //   Renders
        // -------------------------------------

        render() {
            const {
                anchor,
                style,
                ...otherProps
            } = this.props;

            const {
                placement,
                position,
                arrowPosition,
            } = this.state;

            const mergedStyle = {
                position: 'absolute',
                ...position,
                ...style,
            };

            if (!anchor) {
                return null;
            }

            return (
                <WrappedComponent
                    {...otherProps}
                    placement={placement}
                    arrowStyle={arrowPosition}
                    style={mergedStyle}
                    nodeRef={this.selfNodeRef} />
            );
        }
    }

    return Anchored;
};

export default anchored;
