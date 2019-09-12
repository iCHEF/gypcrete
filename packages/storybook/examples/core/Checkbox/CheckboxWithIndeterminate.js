import React, { PureComponent } from 'react';

import Checkbox from '@ichef/gypcrete/src/Checkbox';

class CheckboxWithIndeterminateExample extends PureComponent {
    state = {
        item1Checked: true,
        item2Checked: false,
    };

    handleCheckAll = () => {
        const { item1Checked, item2Checked } = this.state;
        let checkAllValue = true;

        if (item1Checked && item2Checked) {
            checkAllValue = false;
        }

        this.setState({
            item1Checked: checkAllValue,
            item2Checked: checkAllValue,
        });
    }

    handleItemCheck = item => (event) => {
        this.setState({
            [item]: event.target.checked,
        });
    }

    render() {
        const { item1Checked, item2Checked } = this.state;

        return (
            <div>
                <Checkbox
                    basic="Check all"
                    indeterminate={
                        (item1Checked || item2Checked)
                        && !(item1Checked && item2Checked)
                    }
                    checked={item1Checked && item2Checked}
                    onChange={this.handleCheckAll}
                />

                <Checkbox
                    basic="Item 1"
                    checked={item1Checked}
                    onChange={this.handleItemCheck('item1Checked')}
                />

                <Checkbox
                    basic="Item 2"
                    checked={item2Checked}
                    onChange={this.handleItemCheck('item2Checked')}
                />
            </div>
        );
    }
}

export default CheckboxWithIndeterminateExample;
