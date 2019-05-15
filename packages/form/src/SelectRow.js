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
        cachedValue: this.props.value || this.props.defaultValue,
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            valueLabelMap: getValueToLabelAvatarMap(nextProps.children),
        });

        warning(
            this.getIsControlled(this.props) === this.getIsControlled(nextProps),
            '<SelectRow> warning: do not change between controlled and uncontrolld, it may cause some dataflow problem.'
        );

        if (this.getIsControlled(nextProps)) {
            this.setState({ cachedValue: nextProps.value });
        } else if (this.props.multiple !== nextProps.multiple) {
            warning(false, '<SelectRow> Warning: do not change `multiple` prop when uncontrolld, it will auto reset value to prevent dataflow problem.');
            this.setState({ cachedValue: (nextProps.multiple) ? [] : null });
        }
    }

    getIsControlled(fromProps = this.props) {
        return fromProps.value !== undefined;
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
                onClose={this.handlePopoverClose}>
                <SelectList
                    value={this.state.cachedValue}
                    onChange={this.handleSelectChange}
                    {...selectListProps} />
            </Popover>
        );
    }

    renderRowValuesAside() {
        const { multiple, asideAllLabel, asideNoneLabel, asideSeparator } = this.props;
        const { cachedValue, valueLabelMap } = this.state;

        if (multiple && cachedValue.length === 0) {
            return <span className={BEM.placeholder.toString()}>{asideNoneLabel}</span>;
        }

        if (multiple) {
            // Can turn off 'All' display by passing `false`.
            if (asideAllLabel && cachedValue.length === valueLabelMap.size) {
                return asideAllLabel;
            }
        }

        const cachedValueArray = multiple ? cachedValue : [cachedValue];
        return cachedValueArray
            .map((value) => {
                const valueMap = valueLabelMap.get(value) || {};
                return valueMap.label;
            })
            .join(asideSeparator);
    }

    renderAvatar() {
        const { cachedValue, valueLabelMap } = this.state;

        const cachedValueArray = Array.isArray(cachedValue) ? cachedValue : [cachedValue];
        return cachedValueArray
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
                        bold={!ineditable}
                        basic={label}
                        aside={this.renderRowValuesAside()} />

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
