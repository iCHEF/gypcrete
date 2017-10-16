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

import formRow, { rowPropTypes } from './mixins/formRow';
import './styles/SelectRow.scss';

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

    render() {
        const {
            label,
            disabled,
            // from formRow()
            ineditable,
            rowProps,
            // React props
            className,
        } = this.props;

        const Content = ineditable ? TextLabel : Button;
        const wrapperClassName = classNames(
            'gyp-form-select',
            className,
        );

        return (
            <ListRow className={wrapperClassName} {...rowProps}>
                <Content minified={false} disabled={disabled}>
                    <Text
                        bold={!ineditable}
                        basic={label} />
                    <Icon type="unfold" />
                </Content>
            </ListRow>
        );
    }
}

export { SelectRow as PureSelectRow };
export default formRow()(SelectRow);
