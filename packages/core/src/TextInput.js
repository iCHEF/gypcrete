import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';
import rowComp from './mixins/rowComp';

import { PureText, TEXT_ALIGN, VERTICAL_ORDER } from './Text';
import './styles/TextInput.scss';

export const COMPONENT_NAME = prefixClass('text-input');
const ROOT_BEM = icBEM(COMPONENT_NAME);

export const BEM = {
    label: ROOT_BEM.element('label'),
    input: ROOT_BEM.element('input'),
};

/**
 * A `<TextInput>` is a specialized `<TextLabel>`, which holds an editable `<input>`
 * as its main part.
 * All unknown props are expected to be passed into the underlying `<input>`.
 *
 * What's different from other row component is - it does not have a _basic text_
 * not a _aside text_. Instead it holds a `label` and `value` (or `defaultValue`).
 *
 * @example
```jsx
<TextInput
    label="Welcome msg"
    value="Hello world"
    placeholder="(Unset)"
    onChange={event => console.log(event.target.value)} />
```
 */

function TextInput({
    label,
    readOnly,
    disabled,
    // React props
    className,
    children,
    ...inputProps
}, context) {
    const rootClassName = classNames(className, COMPONENT_NAME);
    const { textProps } = context;

    const isEditable = !(readOnly || disabled);

    const input = (
        <input
            className={BEM.input.toString()}
            readOnly={readOnly}
            disabled={disabled}
            placeholder="Unset"
            {...inputProps}
        />
    );

    return (
        <div className={rootClassName}>
            <PureText
                bold={isEditable}
                align={textProps.align}
                verticalOrder={textProps.verticalOrder}
                basic={input}
                aside={label}
            />
        </div>
    );
}

TextInput.propTypes = {
    label: PropTypes.node,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
};

TextInput.defaultProps = {
    label: undefined,
    readOnly: false,
    disabled: false,
};

TextInput.contextTypes = {
    textProps: PropTypes.shape({
        align: PropTypes.oneOf(Object.values(TEXT_ALIGN)),
    }),
};

export { TextInput as PureTextInput };
export default rowComp({ defaultVerticalOrder: VERTICAL_ORDER.REVERSE })(TextInput);
