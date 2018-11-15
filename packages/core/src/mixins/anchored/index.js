import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

import getComponentName from '../../utils/getComponentName';
import getPositionState, {
    PLACEMENT,
    // eslint-disable-next-line import/named, no-unused-vars
    Placement, // type alias
} from './getPositionState';

export { PLACEMENT as ANCHORED_PLACEMENT };

const ReactRefPropType = PropTypes.shape({
    current: PropTypes.any,
});

export const anchoredPropTypes = {
    placement: PropTypes.oneOf(Object.values(PLACEMENT)),
    arrowStyle: PropTypes.objectOf(PropTypes.number),
    nodeRef: ReactRefPropType,
};

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
 * For positioning logic, please refer to `getPositionState.js`.
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
 * @param {object} options
 * @param {Placement} options.defaultPlacement - the default vertical placement
 * @param {number} options.edgePadding - the number to be deducted when calculating “safe area”
 */

const anchored = ({
    defaultPlacement = PLACEMENT.BOTTOM,
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
            placement: defaultPlacement,
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

        getPositions = memoize(getPositionState(defaultPlacement, edgePadding));

        // -------------------------------------
        //   Adjust component's position
        // -------------------------------------

        adjustPosition(nextAnchor = this.props.anchor) {
            const anchorNode = this.getAnchorDOMNode(nextAnchor);
            const selfNode = this.selfNodeRef.current;

            const nextState = this.getPositions(anchorNode, selfNode);

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
