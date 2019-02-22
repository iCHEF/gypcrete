import React from 'react';

import SearchInput from '@ichef/gypcrete/src/SearchInput';
import { action } from '@storybook/addon-actions';
import DebugBox from 'utils/DebugBox';


export default class BasicSearchInputExample extends React.Component {
    state = {
        controlledInputValue: '',
    }

    handleControlledInputChange = (e) => {
        action('onChange')(e.target.value);
        this.setState({
            controlledInputValue: e.target.value,
        });
    }

    handleControlledInputReset = () => {
        action('onReset')();
        this.setState({
            controlledInputValue: '',
        });
    }

    render() {
        const { controlledInputValue } = this.state;
        return (
            <div>
                <DebugBox>
                    <SearchInput
                        value={controlledInputValue}
                        onChange={this.handleControlledInputChange}
                        onSearch={action('onSearch')}
                        onReset={this.handleControlledInputReset}
                        searchOnInputChange
                        searchOnInputBlur
                        blockDuplicateValueSearch
                        blockEmptyValueSearch
                    />
                </DebugBox>

                <DebugBox>
                    <SearchInput defaultValue="Monkey King" />
                </DebugBox>

                <DebugBox>
                    <SearchInput defaultValue="Monkey King" status="loading" />
                </DebugBox>
            </div>
        );
    }
}
