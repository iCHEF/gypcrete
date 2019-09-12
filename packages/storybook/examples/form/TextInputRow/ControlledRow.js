import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextInputRow from '@ichef/gypcrete-form/src/TextInputRow';

class ControlledRow extends PureComponent {
    static propTypes = {
        initValue: PropTypes.string.isRequired,
    };

    state = {
        value: this.props.initValue,
    };

    handleInputChange = (event) => {
        this.setState({ value: event.target.value });
    }

    render() {
        const {
            initValue,
            ...otherProps
        } = this.props;

        return (
            <TextInputRow
                label="Controlled row"
                value={this.state.value}
                onChange={this.handleInputChange}
                {...otherProps}
            />
        );
    }
}

export default ControlledRow;
