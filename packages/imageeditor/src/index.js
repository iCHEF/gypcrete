import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from '@ichef/gypcrete/lib/utils/icBEM';
import prefixClass from '@ichef/gypcrete/lib/utils/prefixClass';

import AvatarEditor from 'react-avatar-editor';
import EditorPlaceholder from './EditorPlaceholder';

import getInitScale from './utils/getInitScale';
import getInitPosition from './utils/getInitPosition';

import './styles/index.scss';

const DEFAULT_SCALE = 1;

export const COMPONENT_NAME = prefixClass('image-editor');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    canvas: ROOT_BEM.element('canvas'),
    control: ROOT_BEM.element('control'),
    slider: ROOT_BEM.element('slider'),
    placeholder: ROOT_BEM.element('placeholder'),
};

class ImageEditor extends PureComponent {
    static propTypes = {
        initCropRect: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
            width: PropTypes.number,
            height: PropTypes.number,
        }),
        onCropChange: PropTypes.func,
        // appearance configs
        control: PropTypes.bool,
        autoMargin: PropTypes.bool,
        readOnly: PropTypes.bool,
        loading: PropTypes.bool,
        // props for <AvatarEditor>
        image: AvatarEditor.propTypes.image,
        width: AvatarEditor.propTypes.width,
        height: AvatarEditor.propTypes.height,
        onImageChange: AvatarEditor.propTypes.onImageChange,
    };

    static defaultProps = {
        initCropRect: undefined,
        onCropChange: () => {},
        control: false,
        autoMargin: false,
        readOnly: false,
        loading: false,
        // props for <AvatarEditor>
        image: AvatarEditor.defaultProps.image,
        width: AvatarEditor.defaultProps.width,
        height: AvatarEditor.defaultProps.height,
        onImageChange: AvatarEditor.defaultProps.onImageChange,
    };

    state = {
        scale: getInitScale(this.props.initCropRect) || DEFAULT_SCALE,
        position: getInitPosition(this.props.initCropRect),
    };

    componentWillReceiveProps(nextProps) {
        // Consider current `scale`, `position` and `initCropRect` outdated when image changes
        if (nextProps.image !== this.props.image) {
            this.setState({
                scale: DEFAULT_SCALE,
                position: undefined,
            });
        }
    }

    /**
     * When maintaining ref with inline arrow function, it sometimes receives
     * mystery `null` during canvas drag. This blocks accessing cropping rect
     * via `onImageChange()` callback.
     *
     * Setting ref with instance method doesn't break. It's just MAGIC.
     */
    setCanvasRef = (ref) => {
        this.canvasRef = ref;
    }

    handleSliderChange = (event) => {
        const newScale = Number(event.target.value);

        this.setState({ scale: newScale });
    }

    handleCanvasPosChange = (newPos) => {
        if (!this.props.readOnly) {
            this.setState({ position: newPos });
        }
    }

    handleCanvasImageChange = () => {
        const newCropRect = this.canvasRef.getCroppingRect();
        this.props.onCropChange(newCropRect);

        // Proxies original `onImageChange()` prop for `<AvatarEditor>`
        this.props.onImageChange();
    }

    renderControl() {
        if (!this.props.control) {
            return null;
        }

        const { image, readOnly, loading } = this.props;
        const shouldDisable = readOnly || !image || loading;

        return (
            <div className={BEM.control.toString()}>
                <input
                    ref={(ref) => { this.sliderRef = ref; }}
                    type="range"
                    value={this.state.scale}
                    className={BEM.slider.toString()}
                    disabled={shouldDisable}
                    step="0.1"
                    min="0.5"
                    max="5"
                    onChange={this.handleSliderChange} />
            </div>
        );
    }

    render() {
        const {
            initCropRect,
            control,
            autoMargin,
            readOnly,
            loading,
            // props for <AvatarEditor>
            image,
            width,
            height,
            onImageChange,
            // react props
            className,
            style,
            ...avatarEditorProps,
        } = this.props;

        const wraperBEM = BEM.root
            .modifier('auto-margin', autoMargin)
            .modifier('readonly', readOnly)
            .toString();

        const wrapperClass = classNames(className, wraperBEM);
        const wrapperStyle = { ...style, width };

        const shouldShowPlaceholder = (!image || loading);

        const placeholder = (
            <EditorPlaceholder
                loading={loading}
                className={BEM.placeholder.toString()}
                canvasHeight={height} />
        );
        const canvas = (
            <AvatarEditor
                ref={this.setCanvasRef}
                image={image}
                width={width}
                height={height}
                scale={this.state.scale}
                position={this.state.position}
                onImageChange={this.handleCanvasImageChange}
                onPositionChange={this.handleCanvasPosChange}
                border={0}
                {...avatarEditorProps} />
        );

        return (
            <div className={wrapperClass} style={wrapperStyle}>
                <div className={BEM.canvas.toString()}>
                    {shouldShowPlaceholder ? placeholder : canvas}
                </div>

                {this.renderControl()}
            </div>
        );
    }
}

export default ImageEditor;
