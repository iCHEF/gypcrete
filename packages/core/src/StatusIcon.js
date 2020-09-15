import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import getRemainingProps from './utils/getRemainingProps';
import './styles/StatusIcon.scss';

import Icon from './Icon';

const LOADING = 'loading';
const SUCCESS = 'success';
const ERROR = 'error';
export const STATUS_CODE = { LOADING, SUCCESS, ERROR };

const INLINE = 'inline';
const CORNER = 'corner';
export const STATUS_POSITION = { INLINE, CORNER };

const COMPONENT_NAME = prefixClass('status-icon');
const ROOT_BEM = icBEM(COMPONENT_NAME);

const ICON_HIDE_TIMEOUT = 2 * 1000;

class StatusIcon extends PureComponent {
    static propTypes = {
        status: PropTypes.oneOf([LOADING, SUCCESS, ERROR]),
        position: PropTypes.oneOf([INLINE, CORNER]),
        /**
         * if `true`, Auto hides status icon after being success for 2 secs,
         * or shows icon when component leaves success state.
         * */
        autohide: PropTypes.bool,
    };

    static defaultProps = {
        status: undefined,
        position: INLINE,
        autohide: true,
    };

    constructor(props) {
        super(props);
        this.hideIconTimeout = null;
    }

    state = {
        hideIcon: false,
    };

    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
        this.autoToggleStatusIcon();
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
        if (nextProps.status !== this.props.status) {
            this.autoToggleStatusIcon(nextProps.status);
        }

        // If 'autohide' is turned off, make icon visible immediately
        if (!nextProps.autohide && this.state.hideIcon) {
            this.setState({ hideIcon: false });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.hideIconTimeout);
    }

    /**
     * Auto hides status icon after being SUCCESS for 2 secs,
     * or shows icon when component leaves SUCCESS state.
     *
     * Scenario:
     *   - LOADING -> SUCCESS -> (2s) ==> hide
     *   - LOADING -> SUCCESS -> (1s) -> LOADING|ERROR|null ==> clear timeout
     *   - LOADING -> SUCCESS -> (1s) -> (render) -> SUCCESS ==> keep timeout
     *   - SUCCESS -> LOADING|ERROR|null ==> clear timeout & show icon
     *
     * @param {String} status - current or next 'status'
     */
    autoToggleStatusIcon(status = this.props.status) {
        // Ignore if autohide === false
        if (!this.props.autohide) {
            return;
        }

        // LOADING|ERROR|null -> SUCCESS
        if (status === SUCCESS) {
            this.hideIconTimeout = setTimeout(() => {
                this.setState({ hideIcon: true });
                this.hideIconTimeout = null;
            }, ICON_HIDE_TIMEOUT);

            return;
        }

        // SUCCESS -> LOADING|ERROR|null
        clearTimeout(this.hideIconTimeout);
        this.setState({ hideIcon: false });
    }

    render() {
        const { status, position } = this.props;
        const rootClassName = ROOT_BEM.modifier(position);
        let icon = null;

        switch (status) {
            case LOADING:
                icon = <Icon type="inline-loading" color="gray" spinning />;
                break;
            case SUCCESS:
                if (!this.state.hideIcon) {
                    icon = <Icon type="inline-success" color="blue" />;
                }
                break;
            case ERROR:
                icon = <Icon type="inline-error" color="red" />;
                break;
            default:
                break;
        }

        const wrapperProps = getRemainingProps(this.props, StatusIcon.propTypes);

        return (icon && (
            <span className={rootClassName} {...wrapperProps}>
                {icon}
            </span>
        ));
    }
}

export default StatusIcon;
