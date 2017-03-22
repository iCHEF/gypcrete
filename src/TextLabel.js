import React, { PureComponent, PropTypes } from 'react';
import rowComp from './mixins/rowComp';

export const COMPONENT_NAME = 'ic-text-label';

class TextLabel extends PureComponent {
    render() {
        return (
            <div className={COMPONENT_NAME}>
                {this.props.children}
            </div>
        );
    }
}

export default rowComp()(TextLabel);
