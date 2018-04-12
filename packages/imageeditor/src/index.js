import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from '@ichef/gypcrete/lib/utils/icBEM';
import prefixClass from '@ichef/gypcrete/lib/utils/prefixClass';

import AvatarEditor from 'react-avatar-editor';

import './styles/index.scss';

export const COMPONENT_NAME = prefixClass('image-editor');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    canvas: ROOT_BEM.element('canvas'),
    control: ROOT_BEM.element('control'),
    slider: ROOT_BEM.element('slider'),
};

class ImageEditor extends PureComponent {
    static propTypes = {
        // props for <AvatarEditor>
        image: AvatarEditor.propTypes.image,
        width: AvatarEditor.propTypes.width,

        // appearance configs
        control: PropTypes.bool,
        autoMargin: PropTypes.bool,
    };

    static defaultProps = {
        image: AvatarEditor.defaultProps.image,
        width: AvatarEditor.defaultProps.width,
        control: false,
        autoMargin: false,
    };

    state = {
        scale: 1,
    };

    handleSliderChange = (event) => {
        const newScale = Number(event.target.value);

        this.setState({ scale: newScale });
    }

    renderControl() {
        if (!this.props.control) {
            return null;
        }

        return (
            <div className={BEM.control.toString()}>
                <input
                    ref={(ref) => { this.sliderRef = ref; }}
                    type="range"
                    value={this.state.scale}
                    className={BEM.slider.toString()}
                    disabled={!this.props.image}
                    step="0.1"
                    min="0.5"
                    max="5"
                    onChange={this.handleSliderChange} />
            </div>
        );
    }

    render() {
        const {
            image,
            width,
            // appearancce
            control,
            autoMargin,
            // react props
            className,
            style,
            ...avatarEditorProps,
        } = this.props;

        const wraperBEM = BEM.root
            .modifier('auto-margin', autoMargin)
            .modifier('no-image', !image)
            .toString();

        const wrapperClass = classNames(className, wraperBEM);
        const wrapperStyle = { ...style, width };

        return (
            <div className={wrapperClass} style={wrapperStyle}>
                <div className={BEM.canvas.toString()}>
                    <AvatarEditor
                        image={image}
                        scale={this.state.scale}
                        border={0}
                        {...avatarEditorProps} />
                </div>

                {this.renderControl()}
            </div>
        );
    }
}

export default ImageEditor;
