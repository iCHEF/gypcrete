import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import getRemainingProps from './utils/getRemainingProps';
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

type OwnProps = {
    inputProps?: any;
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    onChange?: (...args: any[]) => any;
    onSearch?: (...args: any[]) => any;
    onReset?: (...args: any[]) => any;
    searchOnInputChange?: boolean;
    searchOnInputBlur?: boolean;
    blockDuplicateValueSearch?: boolean;
    blockEmptyValueSearch?: boolean;
};

type State = any;

type Props = OwnProps & typeof SearchInput.defaultProps;

// a React.Component ensures it can be re-rendered when context changes
class SearchInput extends Component<Props, State> {
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'focus' does not exist on type 'unknown'.
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

    handleInputBlur = () => {
        const { searchOnInputBlur } = this.props;
        if (searchOnInputBlur) {
            // Prevent triggering `onSearch` when reset button clicked.
            setTimeout(() => {
                if (document.activeElement !== this.inputRef.current) {
                    this.handleSearch();
                }
            }, 100);
        }
    }

    handleInputKeyup = (event) => {
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    }

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
        const { inputProps, value, placeholder, className } = this.props;
        const { innerValue } = this.state;

        const inputValue = this.isControlled() ? value : innerValue;
        const isLoading = this.context.status === STATUS_CODE.LOADING;
        const rootClassName = classNames(className, `${BEM.root}`);

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        const wrapperProps = getRemainingProps(this.props, SearchInput.propTypes);

        return (
            <div className={rootClassName} {...wrapperProps}>
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'BEMFactory' is not assignable to type 'strin... Remove this comment to see the full error message */}
                <div className={BEM.inputWrapper}>
                    <Icon type="search" />

                    <input
                        {...inputProps}
                        type="text"
                        className={`${BEM.input}`}
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur}
                        onKeyUp={this.handleInputKeyup}
                        ref={this.inputRef} />

                    {isLoading && <Icon type="loading" spinning color="gray" />}

                    {(inputValue && !isLoading) && (
                        <button
                            type="button"
                            className={`${BEM.resetBtn}`}
                            aria-label="Reset"
                            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
                            tabIndex="-1"
                            onClick={this.handleResetButtonClick}>
                            {/* @ts-expect-error ts-migrate(2322) FIXME: Property 'className' does not exist on type 'Intri... Remove this comment to see the full error message */}
                            <Icon type="delete" color="gray" className={`${BEM.icon}`} />
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

// @ts-expect-error ts-migrate(4082) FIXME: Default export of the module has or is using priva... Remove this comment to see the full error message
export default rowComp()(SearchInput);
export { SearchInput as PureSearchInput };
