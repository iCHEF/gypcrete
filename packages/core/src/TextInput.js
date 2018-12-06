import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import prefixClass from './utils/prefixClass';
import rowComp, { getTextLayoutProps, ROW_COMP_ALIGN } from './mixins/rowComp';

import EditableText from './EditableText';

export const COMPONENT_NAME = prefixClass('text-input');

/**
 * <TextInput>
 * ===========
 * The row component holding an editable `<input>` as its main part.
 * All unknown props are expected to be passed into the underlying `<input>`.
 *
 * What's different from other row component is: _basic text_ is not allowed
 * on a `<TextInput>`, since that place is occupied by an `<input>`.
 *
 * @example
 * ```jsx
 * <TextInput
 *     value="Hello world"
 *     placeholder="(Unset)"
 *     onChange={event => console.log(event.target.value)} />
 * ```
 */

function TextInput(props, { align }) {
    const {
        wrapperProps,
        // React props
        className,
        children, // strip out from component
        ...editableTextProps
    } = props;

    const rootClassName = classNames(className, COMPONENT_NAME);
    const textLayoutProps = getTextLayoutProps(align, false);

    return (
        <div className={rootClassName} {...wrapperProps}>
            <EditableText
                {...textLayoutProps}
                {...editableTextProps} />
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
