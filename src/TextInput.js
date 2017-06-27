import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import prefixClass from './utils/prefixClass';
import rowComp, { getTextLayoutProps, ROW_COMP_ALIGN } from './mixins/rowComp';

import EditableText from './EditableText';

export const COMPONENT_NAME = prefixClass('text-input');

function TextInput(props, { align }) {
    const {
        wrapperProps,
        // React props
        className,
        ...editableRowProps,
    } = props;

    const rootClassName = classNames(className, COMPONENT_NAME);
    const textLayoutProps = getTextLayoutProps(align, false);

    return (
        <div className={rootClassName} {...wrapperProps}>
            <EditableText
                {...textLayoutProps}
                {...editableRowProps} />
        </div>
    );
}

TextInput.propTypes = {
    wrapperProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

TextInput.defaultProps = {
    wrapperProps: {},
};

TextInput.contextTypes = {
    align: PropTypes.oneOf(Object.values(ROW_COMP_ALIGN)),
};

export { TextInput as PureTextInput };
export default rowComp({ defaultAlign: ROW_COMP_ALIGN.REVERSE })(TextInput);
