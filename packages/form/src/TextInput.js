import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    ListRow,
    TextLabel,
} from '@ichef/gypcrete';

import prefixClass from '@ichef/gypcrete/lib/utils/prefixClass';
import icBEM from '@ichef/gypcrete/lib/utils/icBEM';
import { statusPropTypes } from '@ichef/gypcrete/lib/mixins/withStatus';

import './styles/TextInput.scss';

export const COMPONENT_NAME = prefixClass('form-text-input');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    label: ROOT_BEM.element('label'),
    input: ROOT_BEM.element('input'),
};

class TextInput extends React.PureComponent {
    static propTypes = {
        label: PropTypes.node.isRequired,
        placeholder: PropTypes.string,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        // row props
        rowDesc: PropTypes.node,
        ...statusPropTypes,
        // status
        // statusOptions
        // errorMsg
    };

    static defaultProps = {
        placeholder: 'Unset',
        onFocus: () => {},
        onBlur: () => {},
        rowDesc: undefined,
    };

    state = {
        focused: false,
    };

    handleInputFocus = (event) => {
        this.setState({ focused: true });
        this.props.onFocus(event);
    }

    handleInputBlur = (event) => {
        this.setState({ focused: false });
        this.props.onBlur(event);
    }

    renderInput(inputProps = {}) {
        return (
            <input
                type="text"
                className={BEM.input.toString()}
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}
                {...inputProps} />
        );
    }

    render() {
        const {
            label,
            onFocus,
            onBlur,
            // row props
            rowDesc,
            status,
            statusOptions,
            errorMsg,
            // React props
            className,
            ...inputProps,
        } = this.props;

        const bemClass = BEM.root
            .modifier('focused', this.state.focused);
        const rootClassName = classNames(bemClass.toString(), className);

        const keyLabel = (
            <span className={BEM.label.toString()}>
                {label}
            </span>
        );

        const rowProps = {
            desc: rowDesc,
            status,
            statusOptions,
            errorMsg,
        };

        return (
            <ListRow className={rootClassName} {...rowProps}>
                <TextLabel
                    basic={keyLabel}
                    aside={this.renderInput(inputProps)} />
            </ListRow>
        );
    }
}

export default TextInput;
