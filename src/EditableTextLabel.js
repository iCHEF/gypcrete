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
    onEditEnd: (payload?: { value: string | null, event: Event }) => void,
    onDblClick: (event?: Event) => void,
    // #FIXME: use exported Flow types
    icon?: string,
    basic?: ReactChildren,
    align?: string,
    status?: string | null,
};

/**
 * <EditableTextLabel>
 * ===================
 * The row component which can either in **edit mode** or **display mode**.
 *
 * While it's in **display mode**, it's simply a `<TextLabel>`.
 * Once it goes **edit mode**, it renders an `<EditableText>` inside
 * and behaves like an `<TextInput>`.
 *
 * The “editibility” can be either controlled or uncontrolled, depending on
 * the existance of the `inEdit` prop. An uncontrolled `<EditableTextLabel>` can
 * go into edit mode automatically when you double-click on it.
 *
 * Unlike `<TextInput>`, you should treat `<EditableTextLabel>` like a `<TextLabel>`.
 * It does not offer direct control to the `<input>` inside.
 *
 * @example
 * (Uncontrolled)
 * ```jsx
 * <EditableTextLabel
 *     basic="Text to be edited"
 *     onEditEnd={(value, event) => console.log(value, event)} />
 * ```
 *
 * (Controlled)
 * ```jsx
 * <EditableTextLabel
 *     basic="Text to be edited"
 *     inEdit={this.state.inEdit}
 *     onDblClick={() => this.setState({ inEdit: true })}
 *     onEditEnd={(value, event) => console.log(value, event)} />
 * ```
 */

class EditableTextLabel extends PureComponent<Props, Props, any> {
    static propTypes = {
        inEdit: PropTypes.bool,
        onEditEnd: PropTypes.func,
        onDblClick: PropTypes.func,
        // <TextLabel> props
        icon: TextLabel.propTypes.icon,
        basic: TextLabel.propTypes.basic,
        align: TextLabel.propTypes.align,
        status: TextLabel.propTypes.status,
    };

    static defaultProps = {
        inEdit: undefined,
        onEditEnd: () => {},
        onDblClick: () => {},
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

    leaveEditModeIfNotControlled() {
        if (!this.getEditabilityControlled(this.props)) {
            this.setState({ inEdit: false });
        }
    }

    resetDblTouchSimulation = () => {
        this.setState({
            touchCount: 0,
            dblTouchTimeout: null,
        });
    }

    handleDoubleClick = (event: Event) => {
        /**
         * If `inEdit` isn't controlled, this component by default
         * goes into edit mode on double click/touch.
         */
        if (!this.getEditabilityControlled()) {
            this.setState({ inEdit: true });
        }

        this.props.onDblClick(event);
    }

    handleTouchStart = (event: Event) => {
        const currentCount = this.state.touchCount + 1;

        if (currentCount === 2) {
            // Simulates “double touch”
            this.handleDoubleClick(event);
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
        this.leaveEditModeIfNotControlled();
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
                this.leaveEditModeIfNotControlled();
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
            onDblClick, // also not used here
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
