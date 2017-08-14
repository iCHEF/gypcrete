// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';

import type { ReactChildren } from 'react-flow-types';

import { getTextLayoutProps } from './mixins/rowComp';
import wrapIfNotElement from './utils/wrapIfNotElement';

import EditableText from './EditableText';
import Icon from './Icon';
import TextLabel from './TextLabel';

import { STATUS_CODE as STATUS } from './StatusIcon';

const TOUCH_TIMEOUT_MS = 250;

export type Props = {
    inEdit?: boolean,
    onEditRequest: () => void,
    onEditEnd: (payload?: { value: string | null, event: Event }) => void,
    // #FIXME: use exported Flow types
    icon?: string,
    basic?: ReactChildren,
    align?: string,
    status?: string | null,
};

class EditableTextLabel extends PureComponent<Props, Props, any> {
    static propTypes = {
        inEdit: PropTypes.bool,
        onEditRequest: PropTypes.func,
        onEditEnd: PropTypes.func,
        // <TextLabel> props
        icon: TextLabel.propTypes.icon,
        basic: TextLabel.propTypes.basic,
        align: TextLabel.propTypes.align,
        status: TextLabel.propTypes.status,
    };

    static defaultProps = {
        inEdit: undefined,
        onEditRequest: () => {},
        onEditEnd: () => {},
        // <TextLabel> props
        icon: TextLabel.defaultProps.icon,
        basic: TextLabel.defaultProps.basic,
        align: TextLabel.defaultProps.align,
        status: TextLabel.defaultProps.status,
    };

    state = {
        inEdit: this.props.inEdit || false,
        // For simulating double-touch
        touchCount: 0,
        dblTouchTimeout: null,
    };

    componentWillReceiveProps(nextProps: Props) {
        /**
         * If the edit-state of <EditableTextLabel> is *controlled* by `inEdit` prop.
         * If the prop is `undefined`, this component became *uncontrolled*
         * and should run itself.
         */
        if (this.getEditabilityControlled(nextProps)) {
            this.setState({ inEdit: nextProps.inEdit });
        }
    }

    getEditabilityControlled(fromProps: Props = this.props) {
        return fromProps.inEdit !== undefined;
    }

    resetDblTouchSimulation = () => {
        this.setState({
            touchCount: 0,
            dblTouchTimeout: null,
        });
    }

    handleDoubleClick = () => {
        /**
         * Request edit via double-click is not favored,
         * because users can hardly find out this interaction.
         *
         * This is kept for compatibility reasons.
         *
         * Currently I have no plan for supporting the simulated double-click detection
         * on mobile devices. It's even harder for users to figure out,
         * and it's not a common UI pattern.
         *
         * We should rely on visible buttons or menus to trigger edit.
         */

        if (!this.getEditabilityControlled()) {
            this.setState({ inEdit: true });
        }

        this.props.onEditRequest();
    }

    handleTouchStart = () => {
        const currentCount = this.state.touchCount + 1;

        if (currentCount === 2) {
            // Simulates “double touch”
            this.handleDoubleClick();
            this.resetDblTouchSimulation();
            return;
        }

        /**
         * Clears prev timeout to keep touch counts, and then
         * create new timeout to reset touch counts.
         */
        global.clearTimeout(this.state.dblTouchTimeout);
        const resetTimeout = global.setTimeout(
            this.resetDblTouchSimulation,
            TOUCH_TIMEOUT_MS
        );

        this.setState({
            touchCount: currentCount,
            dblTouchTimeout: resetTimeout,
        });
    }

    handleInputBlur = (event: Event & { currentTarget: HTMLInputElement }) => {
        if (!this.getEditabilityControlled()) {
            this.setState({ inEdit: false });
        }

        this.props.onEditEnd({
            value: event.currentTarget.value,
            event,
        });
    }

    handleInputKeyDown = (event: KeyboardEvent & { currentTarget: HTMLInputElement }) => {
        switch (event.keyCode) {
            case keycode('Enter'):
                // Blur the input, and trigger `onEditEnd` in blur handler
                event.currentTarget.blur();
                break;
            case keycode('Escape'):
                this.props.onEditEnd({
                    value: null,
                    event,
                });
                break;
            default:
                break;
        }
    }

    render() {
        const {
            inEdit, // not used here
            onEditRequest,
            onEditEnd,
            ...labelProps,
        } = this.props;
        const { icon, basic, align, status } = labelProps;

        if (!this.state.inEdit && status !== STATUS.LOADING) {
            return (
                <TextLabel
                    onDoubleClick={this.handleDoubleClick}
                    onTouchStart={this.handleTouchStart}
                    {...labelProps} />
            );
        }

        const layoutProps = getTextLayoutProps(align, !!icon);
        const labelIcon = icon && wrapIfNotElement(icon, { with: Icon, via: 'type' });

        return (
            <TextLabel {...labelProps}>
                {labelIcon}

                <EditableText
                    defaultValue={basic}
                    onBlur={this.handleInputBlur}
                    input={{
                        autoFocus: this.state.inEdit,
                        onKeyDown: this.handleInputKeyDown,
                    }}
                    {...layoutProps} />
            </TextLabel>
        );
    }
}

export default EditableTextLabel;
