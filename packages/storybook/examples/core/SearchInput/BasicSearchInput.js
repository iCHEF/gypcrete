import React from 'react';

import SearchInput from '@ichef/gypcrete/src/SearchInput';
import DebugBox from 'utils/DebugBox';

export default class BasicSearchInputExample extends React.Component {
    state = {
        controlledInputValue: '',
    }

    handleSearch = (keyword) => {
        console.log('handleSearch', keyword);
    }

    handleControlledInputChange = (e) => {
        this.setState({
            controlledInputValue: e.target.value,
        });
    }

    handleControlledInputReset = () => {
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
                        onSearch={this.handleSearch}
                        onReset={this.handleControlledInputReset}
                        searchWhenInputChange
                        searchWhenInputBlur
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
