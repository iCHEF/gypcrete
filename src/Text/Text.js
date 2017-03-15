/**
 * <Text>
 * ======
 * Visual element to be used inside a Component.
 * Usually contains 2 lines, with **Basic text**, **Tag**, **State** at the first line
 * and **Aside text** at the second line.
 *
 * ┌╌╌╌╌╌╌╌╌╌╌╌┬╌╌╌┬╌╌╌╌╌┐
 * ╎Basic text ╎Tag╎State╎
 * ├╌╌╌╌╌╌╌╌╌╌╌┴╌╌╌┴╌╌╌╌╌┴╌╌╌┐
 * ╎Aside text               ╎
 * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
 */

import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import icBEM from '../utils/icBEM';
import '../styles/Text.scss';

import BasicRow from './BasicRow';

export const COMPONENT_NAME = 'ic-text';
export const ROOT_BEM = icBEM(COMPONENT_NAME);

export const BEM = {
    root: ROOT_BEM,
    row: ROOT_BEM.element('row'),
    basic: ROOT_BEM.element('basic'),
    aside: ROOT_BEM.element('aside'),
    tag: ROOT_BEM.element('tag'),
    state: ROOT_BEM.element('state')
};

class Text extends PureComponent {
    static propTypes = {
        aside: PropTypes.node,
        // <BasicRow> props
        basic: PropTypes.node,
        tag: PropTypes.node,
        stateIcon: PropTypes.node,
    };

    static defaultProps = {
        basic: null,
        aside: null,
        tag: null,
        stateIcon: null
    };

    renderAsideRow() {
        if (!this.props.aside) return null;

        return (
            <div className={classNames(`${BEM.row}`, `${BEM.aside}`)}>
                {this.props.aside}
            </div>
        );
    }

    render() {
        const { basic, tag, stateIcon } = this.props;
        const basicRowProps = { basic, tag, stateIcon };

        return (
            <div className={BEM.root}>
                <BasicRow
                    className={classNames(`${BEM.row}`, `${BEM.basic}`)}
                    {...basicRowProps} />
                {this.renderAsideRow()}
            </div>
        );
    }
}

export default Text;
