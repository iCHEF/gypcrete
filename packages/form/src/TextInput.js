import * as React from 'react';
import classNames from 'classnames';

import {
    ListRow,
    TextLabel,
} from '@ichef/gypcrete';

import prefixClass from '@ichef/gypcrete/lib/utils/prefixClass';
import icBEM from '@ichef/gypcrete/lib/utils/icBEM';

import './styles/TextInput.scss';

export const COMPONENT_NAME = prefixClass('form-text-input');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    label: ROOT_BEM.element('label'),
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
                defaultValue="foo"
                placeholder="Unset"
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

        const keyLabel = (
            <span className={BEM.label.toString()}>
                Key label
            </span>
        );

        return (
            <ListRow className={rootClassName}>
                <TextLabel
                    basic={keyLabel}
                    aside={this.renderInput()} />
            </ListRow>
        );
    }
}

export default TextInput;
