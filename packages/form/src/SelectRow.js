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

class SelectRow extends PureComponent {
    static propTypes = {
        label: PropTypes.node.isRequired,
        disabled: PropTypes.bool,
        // from formRow()
        ineditable: PropTypes.bool,
        rowProps: rowPropTypes,
    };

    static defaultProps = {
        disabled: false,
        ineditable: false,
        rowProps: {},
    };

    state = {
        popoverOpen: false,
    };

    handleButtonClick = () => {
        this.setState({ popoverOpen: true });
    }

    handlePopoverClose = () => {
        this.setState({ popoverOpen: false });
    }

    renderPopover(selectListProps) {
        return (
            <Popover
                anchor={this.anchorNode}
                className={BEM.popover.toString()}
                onClose={this.handlePopoverClose}>
                <SelectList
                    onChange={this.handleSelectChange}
                    {...selectListProps} />
            </Popover>
        );
    }

    render() {
        const {
            label,
            disabled,
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
                        basic={label} />

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
