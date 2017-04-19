import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
    static propTypes = {
        /**
         * Use `input` to inject props to the underlying <input>
         */
        input: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        placeholder: PropTypes.string,
        defaultValue: PropTypes.string,
        onSearch: PropTypes.func,
    };

    static defaultProps = {
        input: {},
        placeholder: 'Search',
        defaultValue: '',
        onSearch: () => {},
    };

    state = {
        inputValue: this.props.defaultValue,
    };

    notifySearch() {
        this.props.onSearch(this.state.inputValue);
    }

    handleInputChange = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    handleResetButtonClick = () => {
        this.setState({ inputValue: '' });
    }

    handleInputBlur = () => {
        this.notifySearch();
    }

    handleInputKeyup = (event) => {
        if (event.key === 'Enter') {
            this.notifySearch();
        }
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
        const { input: inputProps, placeholder, className } = this.props;
        const { inputValue } = this.state;

        const rootClassName = classNames(className, `${BEM.root}`);

        return (
            <div className={rootClassName}>
                <RowCompBody>
                    <Icon type="search" />

                    <input
                        type="text"
                        className={`${BEM.input}`}
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur}
                        onKeyUp={this.handleInputKeyup}
                        {...inputProps} />

                    {inputValue && this.renderResetButton()}
                </RowCompBody>
            </div>
        );
    }
}

export default rowComp()(SearchInput);
export { SearchInput as PureSearchInput };
