import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
};

class ImageEditor extends PureComponent {
    static propTypes = {
        // Appearance configs
        control: PropTypes.bool,
    };

    static defaultProps = {
        control: false,
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
            <input
                ref={(ref) => { this.sliderRef = ref; }}
                type="range"
                value={this.state.scale}
                step="0.1"
                min="0.5"
                max="5"
                onChange={this.handleSliderChange} />
        );
    }

    render() {
        return (
            <div className={BEM.root.toString()}>
                <div className={BEM.canvas.toString()}>
                    <AvatarEditor
                        scale={this.state.scale}
                        {...this.props} />
                </div>

                {this.renderControl()}
            </div>
        );
    }
}

export default ImageEditor;
