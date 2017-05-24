import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import prefixClass from './utils/prefixClass';
import rowComp, { getTextLayoutProps, ROW_COMP_ALIGN } from './mixins/rowComp';
import './styles/TextLabel.scss';

import EditableText, { PureEditableText } from './EditableText';

export const COMPONENT_NAME = prefixClass('text-input');

const filterOutStatusProps = (props) => {
    const {
        statusIcon,
        errorMsg,
        ...filteredProps
    } = props;

    return filteredProps;
};

function TextInput(props, { align }) {
    const {
        // <EditableText> props
        onEditEnd,
        value,
        defaultValue,
        placeholder,
        disabled,
        onFocus,
        onBlur,
        onChange,
        onKeyDown,
        input,
        // React props
        className,
        ...otherProps
    } = props;

    const editableTextProps = {
        value,
        defaultValue,
        placeholder,
        disabled,
        onFocus,
        onBlur,
        onChange,
        input,
    };

    const rootClassName = classNames(className, COMPONENT_NAME);
    const textLayoutProps = getTextLayoutProps(align, false);

    return (
        <div className={rootClassName} {...otherProps}>
            <EditableText
                {...editableTextProps}
                {...textLayoutProps} />
        </div>
    );
}

TextInput.propTypes =
    filterOutStatusProps(PureEditableText.propTypes);

TextInput.defaultProps =
    filterOutStatusProps(PureEditableText.defaultProps);

TextInput.contextTypes = {
    align: PropTypes.oneOf(Object.values(ROW_COMP_ALIGN)),
};

// export for tests
export { TextInput as PureTextInput };

export default rowComp({ defaultAlign: ROW_COMP_ALIGN.REVERSE })(TextInput);
