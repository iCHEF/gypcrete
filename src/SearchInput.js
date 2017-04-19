import React, { PureComponent } from 'react';
import classNames from 'classnames';
import icBEM from './utils/icBEM';
import rowComp from './mixins/rowComp';
import './styles/SearchInput.scss';

import Icon from './Icon';
import RowCompBody from './RowCompBody';

const COMPONENT_NAME = 'ic-search-input';
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    input: ROOT_BEM.element('input'),
    resetBtn: ROOT_BEM.element('reset-button'),
};

class SearchInput extends PureComponent {
    state = {
        inputValue: ''
    };

    handleInputChange = (event) => {
        const newValue = event.target.value;
        this.setState({ inputValue: newValue });
    }

    handleResetButtonClick = () => {
        this.setState({ inputValue: '' });
    }

    renderResetButton() {
        return (
            <button
                type="button"
                className={`${BEM.resetBtn}`}
                aria-label="Reset"
                tabIndex="-1"
                onClick={this.handleResetButtonClick}>
                <Icon type="delete" color="gray" />
            </button>
        );
    }

    render() {
        const { className } = this.props;
        const { inputValue } = this.state;

        const rootClassName = classNames(className, `${BEM.root}`);

        return (
            <div className={rootClassName}>
                <RowCompBody>
                    <Icon type="search" />

                    <input
                        type="text"
                        className={`${BEM.input}`}
                        placeholder="搜尋"
                        value={inputValue}
                        onChange={this.handleInputChange} />

                    {inputValue && this.renderResetButton()}
                </RowCompBody>
            </div>
        );
    }
}

export default rowComp()(SearchInput);
export { SearchInput as PureSearchInput };
