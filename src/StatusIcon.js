import React, { PureComponent, PropTypes } from 'react';
import icBEM from './utils/icBEM';
import './css/StatusIcon.scss';

import Icon from './Icon';

const LOADING = 'loading';
const SUCCESS = 'success';
const ERROR = 'error';
export const STATUS_CODE = { LOADING, SUCCESS, ERROR };

const INLINE = 'inline';
const CORNER = 'corner';
export const STATUS_POSITION = { INLINE, CORNER };

const COMPONENT_NAME = 'ic-status-icon';
const ROOT_BEM = icBEM(COMPONENT_NAME);

class StatusIcon extends PureComponent {
    static propTypes = {
        status: PropTypes.oneOf(Object.values(STATUS_CODE)),
        position: PropTypes.oneOf(Object.values(STATUS_POSITION)),
        autohide: PropTypes.bool,
    };

    static defaultProps = {
        status: null,
        position: INLINE,
        autohide: true,
    };

    constructor(...args) {
        super(...args);

        // Ref to `setTimout` for hiding status icon
        this.autoHideTimeout = null;

        this.state = {
            hideIcon: false
        };
    }

    render() {
        const rootClassName = ROOT_BEM.modifier(this.props.position);
        let icon = null;

        switch (this.props.status) {
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

        return (icon && <span className={rootClassName}>{icon}</span>);
    }
}

export default StatusIcon;
