import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';

import {
  ListRow,
  Button,
  Icon,
  Text,
  TextLabel,
} from '@ichef/gypcrete';

import Popover from '@ichef/gypcrete/lib/Popover';
import prefixClass from '@ichef/gypcrete/lib/utils/prefixClass';
import icBEM from '@ichef/gypcrete/lib/utils/icBEM';

import SelectList from './SelectList';

import parseSelectOptions from './utils/parseSelectOptions';
import formRow, { rowPropTypes } from './mixins/formRow';
import './styles/SelectRow.scss';

export const COMPONENT_NAME = prefixClass('form-select');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
  root: ROOT_BEM,
  popover: ROOT_BEM.element('popover'),
  placeholder: ROOT_BEM.element('placeholder'),
};

const CLOSABLE_CONFIG = {
  onEscape: true,
  onClickOutside: true,
  onClickInside: false,
};

/**
 * Generate a value-label map from all `<SelectOption>`s.
 *
 * @param {array} fromOptions
 * @return {Map}
 */
function getValueToLabelAvatarMap(fromChildren = []) {
  const resultMap = new Map();
  const options = parseSelectOptions(fromChildren);

  options.forEach(
    (option) => {
      const { label, avatar } = option;
      resultMap.set(option.value, {
        label,
        avatar,
      });
    }
  );
  return resultMap;
}

class SelectRow extends PureComponent {
    static propTypes = {
      label: PropTypes.node.isRequired,
      asideAllLabel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool, // can pass false to disable 'All' label
      ]),
      asideNoneLabel: PropTypes.string,
      asideSeparator: PropTypes.string,
      disabled: PropTypes.bool,
      renderRowValueLabel: PropTypes.func,
      // <SelectList> props
      multiple: SelectList.propTypes.multiple,
      value: SelectList.propTypes.value,
      defaultValue: SelectList.propTypes.defaultValue,
      onChange: PropTypes.func,
      // from formRow()
      ineditable: PropTypes.bool,
      rowProps: rowPropTypes,
    };

    static defaultProps = {
      asideAllLabel: 'All',
      asideNoneLabel: '(Unset)',
      asideSeparator: ', ',
      disabled: false,
      renderRowValueLabel: undefined,
      // <SelectList> props
      multiple: SelectList.defaultProps.multiple,
      value: SelectList.defaultProps.value,
      defaultValue: SelectList.defaultProps.defaultValue,
      onChange: () => {},
      // from formRow()
      ineditable: false,
      rowProps: {},
    };

    state = {
      isPopoverOpen: false,
      valueLabelMap: getValueToLabelAvatarMap(this.props.children),
      cachedValue: this.getInitialValue(),
    };

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
      this.setState({
        valueLabelMap: getValueToLabelAvatarMap(nextProps.children),
      });

      warning(
        this.getIsControlled(this.props) === this.getIsControlled(nextProps),
        '<SelectRow> should not switch from controlled to uncontrolled (or vice versa).'
      );

      if (this.getIsControlled(nextProps)) {
        this.setState({ cachedValue: nextProps.value });
      } else if (this.props.multiple !== nextProps.multiple) {
        warning(false, '<SelectRow>: you should not change `multiple` prop while it is uncontrolled. Its value will be reset now.');
        this.setState({ cachedValue: (nextProps.multiple) ? [] : null });
      }
    }

    getInitialValue() {
      const { value, defaultValue, multiple } = this.props;

      if (value !== undefined) {
        return value;
      }

      if (multiple && defaultValue === undefined) {
        return [];
      }

      return defaultValue;
    }

    getIsControlled(fromProps = this.props) {
      return fromProps.value !== undefined;
    }

    getCacheValueArray = () => {
      const { multiple } = this.props;
      const { cachedValue } = this.state;
      return (multiple) ? cachedValue : [cachedValue].filter(val => val !== undefined);
    }

    handleButtonClick = () => {
      this.setState({ isPopoverOpen: true });
    }

    handlePopoverClose = () => {
      this.setState({ isPopoverOpen: false });
    }

    handleSelectChange = (nextValue) => {
      if (!this.getIsControlled()) {
        this.setState({ cachedValue: nextValue });
      }
      this.props.onChange(nextValue);

      if (!this.props.multiple) {
        this.handlePopoverClose();
      }
    }

    renderPopover(selectListProps) {
      return (
        <Popover
          anchor={this.anchorNode}
          className={BEM.popover.toString()}
          closable={CLOSABLE_CONFIG}
          onClose={this.handlePopoverClose}
        >
          <SelectList
            value={this.state.cachedValue}
            onChange={this.handleSelectChange}
            {...selectListProps}
          />
        </Popover>
      );
    }

    renderRowValueLabel() {
      const {
        multiple,
        asideAllLabel,
        asideNoneLabel,
        asideSeparator,
        renderRowValueLabel,
      } = this.props;
      const { cachedValue, valueLabelMap } = this.state;

      if (typeof renderRowValueLabel === 'function') {
        return renderRowValueLabel({ values: cachedValue, valueLabelMap });
      }

      const isSingleEmptyValue = cachedValue === undefined || cachedValue === '';
      const isMultipleEmptyValue = multiple && cachedValue.length === 0;

      if (isSingleEmptyValue || isMultipleEmptyValue) {
        return <span className={BEM.placeholder.toString()}>{asideNoneLabel}</span>;
      }

      if (multiple) {
        // Can turn off 'All' display by passing `false`.
        if (asideAllLabel && cachedValue.length === valueLabelMap.size) {
          return asideAllLabel;
        }
      }

      return this.getCacheValueArray()
        .map((value) => {
          const valueMap = valueLabelMap.get(value) || {};
          return valueMap.label;
        })
        .filter(label => Boolean(label))
        .join(asideSeparator);
    }

    renderAvatar() {
      const { valueLabelMap } = this.state;
      return this.getCacheValueArray()
        .map((value) => {
          const valueMap = valueLabelMap.get(value) || {};
          return (
            <React.Fragment key={value}>
              {valueMap.avatar}
            </React.Fragment>
          );
        });
    }

    render() {
      const {
        label,
        asideAllLabel,
        asideNoneLabel,
        asideSeparator,
        disabled,
        // <ListRow> props (intercepted from it)
        // multiple,
        value,
        defaultValue,
        onChange,
        // from formRow()
        ineditable,
        rowProps,
        // React props
        className,
        ...selectListProps
      } = this.props;
      const { isPopoverOpen } = this.state;

      const wrapperClassName = classNames(
        COMPONENT_NAME,
        className,
      );

      const Content = ineditable ? TextLabel : Button;
      const contentProps = ineditable ? {} : {
        onClick: this.handleButtonClick,
      };

      return (
        <ListRow className={wrapperClassName} {...rowProps}>
          {this.renderAvatar()}
          <Content minified={false} disabled={disabled} {...contentProps}>
            <Text
              verticalOrder="reverse"
              bold={!ineditable}
              basic={this.renderRowValueLabel()}
              aside={label}
            />

            <span ref={(ref) => { this.anchorNode = ref; }}>
              <Icon type="dropdown" />
            </span>

            {isPopoverOpen && this.renderPopover(selectListProps)}
          </Content>
        </ListRow>
      );
    }
}

export { SelectRow as PureSelectRow };
export default formRow()(SelectRow);
