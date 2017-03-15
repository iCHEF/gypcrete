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
};

const LEFT = 'left';
const CENTER = 'center';
const RIGHT = 'right';
export const TEXT_ALIGN = { LEFT, CENTER, RIGHT };

class Text extends PureComponent {
    static propTypes = {
        align: PropTypes.oneOf(Object.values(TEXT_ALIGN)),
        aside: PropTypes.node,
        basicRow: PropTypes.element,

        ...BasicRow.propTypes,
        // basic,
        // tag,
        // stateIcon,
    };

    static defaultProps = {
        align: LEFT,
        aside: null,
        basicRow: null,
    };

    renderBasicRow() {
        const { basicRow, basic, tag, stateIcon } = this.props;
        const basicRowProps = { basic, tag, stateIcon };

        if (React.isValidElement(basicRow)) {
            // Inject { basic, tag, stateIcon } to passed-in custom row.
            return React.cloneElement(basicRow, basicRowProps);
        }

        // else return pre-configured row
        return (
            <BasicRow
                className={classNames(`${BEM.row}`, `${BEM.basic}`)}
                {...basicRowProps} />
        );
    }

    renderAsideRow() {
        if (!this.props.aside) return null;

        return (
            <div className={classNames(`${BEM.row}`, `${BEM.aside}`)}>
                {this.props.aside}
            </div>
        );
    }

    render() {
        const rootClassName = BEM.root.modifier(this.props.align);

        return (
            <div className={rootClassName}>
                {this.renderBasicRow()}
                {this.renderAsideRow()}
            </div>
        );
    }
}

export default Text;
