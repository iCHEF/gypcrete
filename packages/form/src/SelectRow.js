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

import { PurePopover } from '@ichef/gypcrete/lib/Popover';
import anchored from '@ichef/gypcrete/lib/mixins/anchored';
import closable from '@ichef/gypcrete/lib/mixins/closable';
import renderToLayer from '@ichef/gypcrete/lib/mixins/renderToLayer';
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
};

export const Popover = renderToLayer(
    closable({
        onEscape: true,
        onClickOutside: true,
        onClickInside: false,
    })(
        anchored()(PurePopover)
    )
);

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

class SelectRow extends PureComponent {
    static propTypes = {
        label: PropTypes.node.isRequired,
        asideAll: PropTypes.string,
        asideNone: PropTypes.string,
        asideSeparator: PropTypes.string,
        disabled: PropTypes.bool,
        // <SelectList> props
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
        cachedValues: this.props.values || this.props.defaultValues,
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            valueLabelMap: getValueLabelMap(nextProps.children),
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
    }

    renderPopover(selectListProps) {
        return (
            <Popover
                anchor={this.anchorNode}
                className={BEM.popover.toString()}
                onClose={this.handlePopoverClose}>
                <SelectList
                    values={this.state.cachedValues}
                    onChange={this.handleSelectChange}
                    {...selectListProps} />
            </Popover>
        );
    }

    renderRowValuesAside() {
        const { asideAll, asideNone, asideSeparator } = this.props;
        const { cachedValues, valueLabelMap } = this.state;

        // Can turn off 'All' display by passing `null`.
        if (asideAll && cachedValues.length === valueLabelMap.size) {
            return asideAll;
        }

        if (cachedValues.length === 0) {
            return asideNone;
        }

        return cachedValues
            .map(value => valueLabelMap.get(value))
            .join(asideSeparator);
    }

    render() {
        const {
            label,
            disabled,
            // <ListRow> props (intercepted from it)
            values,
            defaultValues,
            onChange,
            // from formRow()
            ineditable,
            rowProps,
            // React props
            className,
            ...selectListProps,
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
                <Content minified={false} disabled={disabled} {...contentProps}>
                    <Text
                        bold={!ineditable}
                        basic={label}
                        aside={this.renderRowValuesAside()} />

                    <span ref={(ref) => { this.anchorNode = ref; }}>
                        <Icon type="unfold" />
                    </span>

                    {popoverOpen && this.renderPopover(selectListProps)}
                </Content>
            </ListRow>
        );
    }
}

export { SelectRow as PureSelectRow };
export default formRow()(SelectRow);
