import React, { PureComponent } from 'react';

import withStatus, { withStatusPropTypes } from './mixins/withStatus';
import wrapIfNotElement from './utils/wrapIfNotElement';
import prefixClass from './utils/prefixClass';
import './styles/IconLayout.scss';

import Tooltip from './Tooltip';
import Icon from './Icon';

import { STATUS_POSITION } from './StatusIcon';

export const COMPONENT_NAME = prefixClass('iconlayout');

/*
(ts-migrate) TODO: Migrate the remaining prop types
...withStatusPropTypes
*/
type OwnProps = {
    icon: string | React.ReactElement;
    tooltip?: boolean;
};

type State = any;

type Props = OwnProps & typeof IconLayout.defaultProps; // Prevent from affected by 'gyp-icon-*' styles

/**
 * <IconLayout> needs to be a valid React Component to maintain a ref
 * to its container node, so an anchored <Tooltip> can find its position.
 */
class IconLayout extends PureComponent<Props, State> {
    static defaultProps = {
        tooltip: true,
    };

    nodeRef: any;

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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'errorMsg' does not exist on type 'Readon... Remove this comment to see the full error message
        const { tooltip, errorMsg } = this.props;

        if (!errorMsg || !tooltip) {
            return null;
        }

        /**
         * Deprive <Tooltip> of mouse events,
         * so it won't trigger `mouseleave` event on <IconLayout> and close itself.
         */
        return (
            <Tooltip
                // @ts-expect-error ts-migrate(2322) FIXME: Property 'anchor' does not exist on type 'Intrinsi... Remove this comment to see the full error message
                anchor={this.nodeRef}
                style={{ pointerEvents: 'none' }}>
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'errorMsg' does not exist on type 'Readon... Remove this comment to see the full error message */}
                {this.props.errorMsg}
            </Tooltip>
        );
    }

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'statusIcon' does not exist on type 'Read... Remove this comment to see the full error message
        const { icon, statusIcon } = this.props;
        const { showTooltip } = this.state;
        const iconElement = wrapIfNotElement(icon, { with: Icon, via: 'type' });

        return (
            <div
                ref={(ref) => { this.nodeRef = ref; }}
                className={COMPONENT_NAME}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>
                {iconElement}
                {showTooltip && this.renderTooltip()}
                {statusIcon}
            </div>
        );
    }
}

// @ts-expect-error ts-migrate(2345) FIXME: Object literal may only specify known properties, ... Remove this comment to see the full error message
export default withStatus({ position: STATUS_POSITION.CORNER })(IconLayout);
export { IconLayout as PureIconLayout };
