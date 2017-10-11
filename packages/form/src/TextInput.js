import * as React from 'react';
import classNames from 'classnames';

import {
    ListRow,
    TextLabel,
} from '@ichef/gypcrete';

import prefixClass from '@ichef/gypcrete/lib/utils/prefixClass';
import icBEM from '@ichef/gypcrete/lib/utils/icBEM';

export const COMPONENT_NAME = prefixClass('form-text-input');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    input: ROOT_BEM.element('input'),
};

class TextInput extends React.PureComponent {
    state = {
        focused: false,
    };

    handleInputFocus = () => {
        this.setState({ focused: true });
    }

    handleInputBlur = () => {
        this.setState({ focused: false });
    }

    renderInput() {
        return (
            <input
                type="text"
                value="foo"
                className={BEM.input.toString()}
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur} />
        );
    }

    render() {
        const {
            className,
        } = this.props;

        const bemClass = BEM.root
            .modifier('focused', this.state.focused);
        const rootClassName = classNames(bemClass.toString(), className);

        return (
            <ListRow className={rootClassName}>
                <TextLabel
                    bold
                    basic={`${this.state.focused}`}
                    aside={this.renderInput()} />
            </ListRow>
        );
    }
}

export default TextInput;
