import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
function getValueLabelMap(fromChildren = []) {
    const resultMap = new Map();
    const options = parseSelectOptions(fromChildren);

    options.forEach(
        option => resultMap.set(option.value, option.label)
    );
    return resultMap;
}

/**
 * Generate a value-avatar map from all `<SelectOption>`s.
 *
 * @param {array} fromOptions
 * @return {Map}
 */
function getValueAvatarMap(fromChildren = []) {
    const resultMap = new Map();
    const options = parseSelectOptions(fromChildren);

    options.forEach(
        option => resultMap.set(option.value, option.avatar)
    );
    return resultMap;
}

class SelectRow extends PureComponent {
    static propTypes = {
        label: PropTypes.node.isRequired,
        asideAll: PropTypes.string,
        asideNone: PropTypes.string,
        asideSeparator: PropTypes.string,
        disabled: PropTypes.bool,
        // <SelectList> props
        multiple: SelectList.propTypes.multiple,
        values: SelectList.propTypes.values,
        defaultValues: SelectList.propTypes.defaultValues,
        onChange: PropTypes.func,
        // from formRow()
        ineditable: PropTypes.bool,
        rowProps: rowPropTypes,
    };

    static defaultProps = {
        asideAll: 'All',
        asideNone: '(Unset)',
        asideSeparator: ', ',
        disabled: false,
        // <SelectList> props
        multiple: SelectList.defaultProps.multiple,
        values: SelectList.defaultProps.values,
        defaultValues: SelectList.defaultProps.defaultValues,
        onChange: () => {},
        // from formRow()
        ineditable: false,
        rowProps: {},
    };

    state = {
        popoverOpen: false,
        valueLabelMap: getValueLabelMap(this.props.children),
        avatarLabelMap: getValueAvatarMap(this.props.children),
        cachedValues: this.props.values || this.props.defaultValues,
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            valueLabelMap: getValueLabelMap(nextProps.children),
            avatarLabelMap: getValueAvatarMap(nextProps.children),
        });

        if (this.getIsControlled(nextProps)) {
            this.setState({ cachedValues: nextProps.values });
        }
    }

    getIsControlled(fromProps = this.props) {
        return Array.isArray(fromProps.values);
    }

    handleButtonClick = () => {
        this.setState({ popoverOpen: true });
    }

    handlePopoverClose = () => {
        this.setState({ popoverOpen: false });
    }

    handleSelectChange = (newValues) => {
        if (!this.getIsControlled()) {
            this.setState({ cachedValues: newValues });
        }
        this.props.onChange(newValues);

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
                    values={this.state.cachedValues}
                    onChange={this.handleSelectChange}
                    {...selectListProps} />
            </Popover>
        );
    }

    renderRowValuesAside() {
        const { multiple, asideAll, asideNone, asideSeparator } = this.props;
        const { cachedValues, valueLabelMap } = this.state;

        if (cachedValues.length === 0) {
            return <span className={BEM.placeholder.toString()}>{asideNone}</span>;
        }

        if (multiple) {
            // Can turn off 'All' display by passing `null`.
            if (asideAll && cachedValues.length === valueLabelMap.size) {
                return asideAll;
            }
        }

        return cachedValues
            .map(value => valueLabelMap.get(value))
            .join(asideSeparator);
    }

    renderAvatar() {
        const { cachedValues, avatarLabelMap } = this.state;

        if (cachedValues.length === 0) {
            return null;
        }

        return cachedValues
            .map(value => avatarLabelMap.get(value));
    }

    render() {
        const {
            label,
            asideAll,
            asideNone,
            asideSeparator,
            disabled,
            // <ListRow> props (intercepted from it)
            // multiple,
            values,
            defaultValues,
            onChange,
            // from formRow()
            ineditable,
            rowProps,
            // React props
            className,
            ...selectListProps
        } = this.props;
        const { popoverOpen } = this.state;

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

                    {popoverOpen && this.renderPopover(selectListProps)}
                </Content>
            </ListRow>
        );
    }
}

export { SelectRow as PureSelectRow };
export default formRow()(SelectRow);
