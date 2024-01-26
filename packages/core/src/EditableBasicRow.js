import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles/EditableBasicRow.scss';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';

import BasicRow from './BasicRow';

export const COMPONENT_NAME = prefixClass('editable-basic-row');
const ROOT_BEM = icBEM(COMPONENT_NAME);

export const BEM = {
  root: ROOT_BEM,
  input: ROOT_BEM.element('input'),
  basicLabel: ROOT_BEM.element('basic-label'),
};

const TAG_INPUT = 'input';
const TAG_TEXTAREA = 'textarea';
export const ROW_INPUT_TAGS = {
  INPUT: TAG_INPUT,
  TEXTAREA: TAG_TEXTAREA,
};

/**
 * <EditableBasicRow>
 * ==================
 * The core control of input in an editable component.
 *
 * It renders an `<input>` by default, and can be switched to a `<textarea>`
 * for multi-lines support.
 *
 * The “basic text” is updated with the current value of the underlying input,
 * and is hidden when the input is focused. That way the label can be properly
 * truncated and appended with ellipsis (in single-line mode), and can maintain
 * reasonable width in a CSS Flexbox.
 *
 * Since the input is the core concern of this component,
 * all unknown props should be passed to the input.
 *
 * @example
 * Single-line mode (default)
 * ```jsx
 * <EditableBasicRow
 *     value="Text to be edited"
 *     onChange={(event) => console.log(event.target.value)} />
 * ```
 *
 * Multi-lines mode
 * ```jsx
 * <EditableBasicRow
 *     inputTag="textarea"
 *     value="Text to be edited"
 *     onChange={(event) => console.log(event.target.value)} />
 * ```
 */

const EditableBasicRow = React.memo(({
  inputTag: InputTag,
  // <input> props
  placeholder,
  readOnly,
  disabled,
  // event handlers, should not go into <input> directly
  onChange,
  onFocus,
  onBlur,
  // status props
  status, // digested by this component and should not go into <input>
  statusIcon,
  // React props
  className,
  // <BasicRow> props from <Text>, should ignore
  basic, // eslint-disable-line react/prop-types
  tag, // eslint-disable-line react/prop-types
  ...inputProps
}) => {
  const [currentValue, setCurrentValue] = useState(inputProps.value || inputProps.defaultValue || '');
  const [focused, setFocused] = useState(false);
  const inputNodeRef = useRef();

  useEffect(
    () => {
      setCurrentValue(inputProps.value);
    },
    [inputProps.value]
  );

  const handleInputFocus = (event) => {
    setFocused(true);
    onFocus(event);
  };

  const handleInputBlur = (event) => {
    setFocused(false);
    onBlur(event);
  };

  const handleInputChange = (event) => {
    // Only update if <input> isn't controlled
    if (!inputProps.value) {
      setCurrentValue(event.currentTarget.value);
    }

    onChange(event);
  };

  const bemClass = BEM.root
    .modifier('empty', !currentValue)
    .modifier('focused', focused)
    .modifier('disabled', disabled);
  const rootClassName = classNames(bemClass.toString(), className);

  const inputType = (InputTag === TAG_INPUT) ? 'text' : undefined;
  const inputTabIndex = (readOnly || disabled) ? -1 : undefined;

  /**
     * Append an extra line-break,
     * or the last empty line in <textarea> will be invisible on browser
     */
  const basicLabel = (
    <span className={BEM.basicLabel}>
      {currentValue || placeholder}
      {InputTag === TAG_TEXTAREA && '\n'}
    </span>
  );

  return (
    <BasicRow
      className={rootClassName}
      basic={basicLabel}
      statusIcon={statusIcon}
    >
      <InputTag
        ref={inputNodeRef}
        type={inputType}
        value={currentValue}
        placeholder={placeholder}
        className={BEM.input.toString()}
        readOnly={readOnly}
        disabled={disabled}
        tabIndex={inputTabIndex}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...inputProps}
      />
    </BasicRow>
  );
});

EditableBasicRow.propTypes = {
  inputTag: PropTypes.oneOf(Object.values(ROW_INPUT_TAGS)),
  // <input> props
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  // status props
  status: PropTypes.string,
  statusIcon: PropTypes.element,
};


EditableBasicRow.defaultProps = {
  inputTag: TAG_INPUT,
  value: undefined,
  defaultValue: undefined,
  placeholder: 'Unset',
  readOnly: false,
  disabled: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  status: undefined,
  statusIcon: undefined,
};


export default EditableBasicRow;
