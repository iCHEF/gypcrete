import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import rowComp from './mixins/rowComp';
import './styles/TextLabel.scss';

import RowCompBody from './RowCompBody';

export const COMPONENT_NAME = 'ic-text-label';

class TextLabel extends PureComponent {
    render() {
        const rootClassName = classNames(this.props.className, COMPONENT_NAME);

        return (
            <div className={rootClassName}>
                <RowCompBody>
                    {this.props.children}
                </RowCompBody>
            </div>
        );
    }
}

export default rowComp()(TextLabel);
