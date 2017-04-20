/**
 * <Text>
 * ======
 * Visual element to be used inside a Component.
 * Usually contains 2 lines, with **Basic text**, **Tag**, **State** at the first line
 * and **Aside text** at the second line.
 *
 * <Text> is wrapped with a HOC mixin `withStatus()`, which automatically
 * handles `statusIcon` and `errorMsg` from context.
 *
 * ┌╌╌╌╌╌╌╌╌╌╌╌┬╌╌╌┬╌╌╌╌╌┐
 * ╎Basic text ╎Tag╎State╎
 * ├╌╌╌╌╌╌╌╌╌╌╌┴╌╌╌┴╌╌╌╌╌┴╌╌╌┐
 * ╎Aside text               ╎
 * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import withStatus from './mixins/withStatus';
import './styles/Text.scss';

import BasicRow from './BasicRow';

export const COMPONENT_NAME = prefixClass('text');
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
        noGrow: PropTypes.bool,

        // from withStatus()
        errorMsg: PropTypes.string,
        // statusIcon: PropTypes.node,

        ...BasicRow.propTypes,
        basic: PropTypes.node,
        // tag,
        // statusIcon,
    };

    static defaultProps = {
        align: LEFT,
        aside: null,
        basicRow: null,
        noGrow: false,
        errorMsg: null,
        basic: null,
    };

    renderBasicRow() {
        const { basicRow, basic, tag, statusIcon } = this.props;
        const basicRowProps = { basic, tag, statusIcon };

        if (!(basic || basicRow)) {
            return null;
        }

        if (React.isValidElement(basicRow)) {
            // Inject { basic, tag, statusIcon } to passed-in custom row.
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
        const { aside, errorMsg } = this.props;
        const displayText = errorMsg || aside;

        if (!displayText) {
            return null;
        }

        return (
            <div className={classNames(`${BEM.row}`, `${BEM.aside}`)}>
                {displayText}
            </div>
        );
    }

    render() {
        const { align, noGrow } = this.props;

        const rootClassName = BEM.root
            .modifier(align)
            .modifier('no-grow', noGrow);

        return (
            <div className={rootClassName}>
                {this.renderBasicRow()}
                {this.renderAsideRow()}
            </div>
        );
    }
}

export default withStatus()(Text);
export { Text as PureText };
