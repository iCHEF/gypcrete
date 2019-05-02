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

export const DEFAULT_SCALE = 1;
export const DEFAULT_POSITION = { x: 0.5, y: 0.5 };

export const COMPONENT_NAME = prefixClass('image-editor');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    canvas: ROOT_BEM.element('canvas'),
    control: ROOT_BEM.element('control'),
    slider: ROOT_BEM.element('slider'),
    placeholder: ROOT_BEM.element('placeholder'),
};

/**
 * <ImageEditor>
 * =============
 * This component is built upon `mosch/react-avatar-editor`, offering pre-configured
 * scale slider, no-image placeholder and a loading indicator mode. It also supports
 * setting an initial cropping rectangle via `initCropRect` prop.
 *
 * This component passes unknown props to the inner `<AvatarEditor>`.
 * Plase refer to: https://git.io/vxhT8, for a full list of supported props.
 *
 * ### Appearance configs
 * - `control`: toggles the scale slider
 * - `autoMargin`: adds `auto` to both left and right CSS margin.
 * - `readOnly`: prevent the editor from modifing the crop.
 * - `loading`: put the editor into a loading indicator mode.
 *
 * ### Event callbacks
 * - `onCropChange`: called with cropping rect when not read-only and `onImageChange` fires.
 * - `onLoadSuccess`: called with `imgInfo` and `cropRect` when image finishes loading
 *
 */
class ImageEditor extends PureComponent {
    static propTypes = {
        scale: PropTypes.number,
        minScale: PropTypes.number,
        maxScale: PropTypes.number,
        initCropRect: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
            width: PropTypes.number,
            height: PropTypes.number,
        }),
        onScaleChange: PropTypes.func,
        onCropChange: PropTypes.func,
        onLoadSuccess: PropTypes.func,
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
        onPositionChange: AvatarEditor.propTypes.onPositionChange,
    };

    static defaultProps = {
        scale: undefined,
        minScale: 0.5,
        maxScale: 5,
        initCropRect: undefined,
        onScaleChange: () => {},
        onCropChange: () => {},
        onLoadSuccess: () => {},
        // appearance configs
        control: false,
        autoMargin: false,
        readOnly: false,
        loading: false,
        // props for <AvatarEditor>
        image: AvatarEditor.defaultProps.image,
        width: AvatarEditor.defaultProps.width,
        height: AvatarEditor.defaultProps.height,
        onImageChange: AvatarEditor.defaultProps.onImageChange,
        onPositionChange: AvatarEditor.defaultProps.onPositionChange,
    };

    state = {
        scale: getInitScale(this.props.initCropRect) || DEFAULT_SCALE,
        position: getInitPosition(this.props.initCropRect) || DEFAULT_POSITION,
    };

    editorRef = React.createRef();

    componentWillReceiveProps(nextProps) {
        // Consider current `scale`, `position` and `initCropRect` outdated when image changes
        if (nextProps.image !== this.props.image) {
            this.setState({
                scale: DEFAULT_SCALE,
                position: DEFAULT_POSITION,
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
    getImageCanvas = () => this.editorRef.current.getImage();

    handleSliderChange = (event) => {
        const newScale = Number(event.target.value);

        this.setState({ scale: newScale });
        this.props.onScaleChange(newScale);
    }

    handleCanvasPosChange = (newPos) => {
        if (!this.props.readOnly) {
            this.setState({ position: newPos });
        }

        // Proxies original `onPositionChange()` prop for `<AvatarEditor>`
        this.props.onPositionChange(newPos);
    }

    handleCanvasImageChange = () => {
        if (!this.props.readOnly) {
            const newCropRect = this.editorRef.current && this.editorRef.current.getCroppingRect();
            this.props.onCropChange(newCropRect);
        }

        // Proxies original `onImageChange()` prop for `<AvatarEditor>`
        this.props.onImageChange();
    }

    handleCanvasLoadSuccess = (imgInfo) => {
        const cropRect = this.editorRef.current && this.editorRef.current.getCroppingRect();

        this.props.onLoadSuccess(imgInfo, cropRect);
    }

    renderControl() {
        if (!this.props.control) {
            return null;
        }

        const {
            scale,
            minScale,
            maxScale,
            image,
            readOnly,
            loading,
        } = this.props;
        const shouldDisable = readOnly || !image || loading;

        return (
            <div className={BEM.control.toString()}>
                <input
                    type="range"
                    value={scale || this.state.scale}
                    className={BEM.slider.toString()}
                    disabled={shouldDisable}
                    step="0.1"
                    min={minScale}
                    max={maxScale}
                    onChange={this.handleSliderChange} />
            </div>
        );
    }

    render() {
        const {
            minScale,
            maxScale,
            initCropRect,
            onCropChange,
            onLoadSuccess,
            // appearance configs
            control,
            autoMargin,
            readOnly,
            loading,
            // props for <AvatarEditor>
            scale,
            image,
            width,
            height,
            onImageChange,
            onPositionChange,
            // react props
            className,
            style,
            ...avatarEditorProps
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
                ref={this.editorRef}
                image={image}
                width={width}
                height={height}
                scale={scale || this.state.scale}
                position={this.state.position}
                onImageChange={this.handleCanvasImageChange}
                onPositionChange={this.handleCanvasPosChange}
                onLoadSuccess={this.handleCanvasLoadSuccess}
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
