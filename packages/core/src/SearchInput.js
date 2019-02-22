import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import rowComp from './mixins/rowComp';
import './styles/SearchInput.scss';

import Icon from './Icon';

import { STATUS_CODE } from './StatusIcon';

const COMPONENT_NAME = prefixClass('search-input');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    input: ROOT_BEM.element('input'),
    inputWrapper: ROOT_BEM.element('input-wrapper'),
    resetBtn: ROOT_BEM.element('reset-button'),
    icon: ROOT_BEM.element('input-icon'),
};

// a React.Component ensures it can be re-rendered when context changes
class SearchInput extends Component {
    static propTypes = {
        /**
         * Use `inputProps` to inject props to the underlying <input>
         */
        inputProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        placeholder: PropTypes.string,
        defaultValue: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        onSearch: PropTypes.func,
        onReset: PropTypes.func,
        searchOnInputChange: PropTypes.bool,
        searchOnInputBlur: PropTypes.bool,
        blockDuplicateValueSearch: PropTypes.bool,
        blockEmptyValueSearch: PropTypes.bool,
    };

    static defaultProps = {
        inputProps: {},
        placeholder: 'Search',
        value: undefined,
        defaultValue: '',
        onChange: () => {},
        onSearch: () => {},
        onReset: () => {},
        searchOnInputChange: false,
        searchOnInputBlur: false,
        blockDuplicateValueSearch: false,
        blockEmptyValueSearch: false,
    };

    static contextTypes = {
        status: PropTypes.oneOf(Object.values(STATUS_CODE)),
    };

    state = {
        innerValue: this.props.defaultValue,
    };

    inputRef = React.createRef();

    isFoucsed = false;

    cachedValue = null;

    isControlled = () => (typeof this.props.value) !== 'undefined';

    handleInputChange = (event) => {
        const { searchOnInputChange, blockEmptyValueSearch, onChange, onSearch } = this.props;
        const newValue = event.target.value;

        if (this.isControlled()) {
            onChange(event);
        } else {
            this.setState({ innerValue: newValue });
        }

        if (searchOnInputChange) {
            if (blockEmptyValueSearch && newValue === '') {
                return;
            }

            this.cachedValue = newValue;
            onSearch(newValue);
        }
    }

    handleResetButtonClick = () => {
        this.inputRef.current.focus();

        const { onReset, value } = this.props;
        const { innerValue } = this.state;

        if (this.isControlled()) {
            onReset(value);
        } else {
            onReset(innerValue);
            this.setState({ innerValue: '' });
        }
    }

    handleSearch = () => {
        const { onSearch, value, blockDuplicateValueSearch, blockEmptyValueSearch } = this.props;
        const { innerValue } = this.state;
        const newValue = this.isControlled() ? value : innerValue;

        if (blockDuplicateValueSearch && (newValue === this.cachedValue)) {
            return;
        }

        this.cachedValue = newValue;


        if (blockEmptyValueSearch && newValue === '') {
            return;
        }

        onSearch(newValue);
    }

    handleInputFocus = () => {
        this.isFoucsed = true;
    }

    handleInputBlur = () => {
        this.isFoucsed = false;
        const { searchOnInputBlur } = this.props;
        if (searchOnInputBlur) {
            // Prevent triggering `onSearch` when reset button clicked.
            setTimeout(() => {
                if (!this.isFoucsed) {
                    this.handleSearch();
                }
            }, 30);
        }
    }

    handleInputKeyup = (event) => {
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    }

    render() {
        const { inputProps, value, placeholder, className } = this.props;
        const { innerValue } = this.state;

        const inputValue = this.isControlled() ? value : innerValue;
        const isLoading = this.context.status === STATUS_CODE.LOADING;
        const rootClassName = classNames(className, `${BEM.root}`);

        return (
            <div className={rootClassName}>
                <div className={BEM.inputWrapper}>
                    <Icon type="search" />

                    <input
                        {...inputProps}
                        type="text"
                        className={`${BEM.input}`}
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputBlur}
                        onKeyUp={this.handleInputKeyup}
                        ref={this.inputRef}
                    />

                    {isLoading && <Icon type="loading" spinning color="gray" />}

                    {(inputValue && !isLoading) && (
                        <button
                            type="button"
                            className={`${BEM.resetBtn}`}
                            aria-label="Reset"
                            tabIndex="-1"
                            onClick={this.handleResetButtonClick}
                        >
                            <Icon type="delete" color="gray" className={`${BEM.icon}`} />
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

export default rowComp()(SearchInput);
export { SearchInput as PureSearchInput };
