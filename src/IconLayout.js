import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import withStatus, { withStatusPropTypes } from './mixins/withStatus';
import wrapIfNotElement from './utils/wrapIfNotElement';
import './styles/IconLayout.scss';

import AnchoredTooltip from './AnchoredTooltip';
import Icon from './Icon';

import { STATUS_POSITION } from './StatusIcon';

export const COMPONENT_NAME = 'ic-iconlayout'; // Prevent from affected by 'ic-icon-*' styles

/**
 * <IconLayout> needs to be a valid React Component to maintain a ref
 * to its container node, so <AnchoredTooltip> can find its position.
 */
class IconLayout extends PureComponent {
    static propTypes = {
        icon: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]).isRequired,

        ...withStatusPropTypes,
        // statusIcon,
        // errorMsg,
    };

    state = {
        showTooltip: false,
    };

    handleMouseEnter = () => {
        this.setState({ showTooltip: true });
    }

    handleMouseLeave = () => {
        this.setState({ showTooltip: false });
    }

    renderTooltip() {
        const { errorMsg } = this.props;

        if (!errorMsg) {
            return null;
        }

        /**
         * Deprive <Tooltip> of mouse events,
         * so it won't trigger `mouseleave` event on <IconLayout> and close itself.
         */
        return (
            <AnchoredTooltip
                anchor={this.nodeRef}
                style={{ pointerEvents: 'none' }}>
                {this.props.errorMsg}
            </AnchoredTooltip>
        );
    }

    render() {
        const { icon, statusIcon } = this.props;
        const { showTooltip } = this.state;
        const iconElement = wrapIfNotElement(icon, { with: Icon, via: 'type' });

        return (
            <span
                ref={(ref) => { this.nodeRef = ref; }}
                className={COMPONENT_NAME}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>
                {iconElement}
                {showTooltip && this.renderTooltip()}
                {statusIcon}
            </span>
        );
    }
}

export default withStatus({ position: STATUS_POSITION.CORNER })(IconLayout);
export { IconLayout as PureIconLayout };
