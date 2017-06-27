// @flow

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
import type { AnyReactElement, ReactChildren } from 'react-flow-types';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import withStatus, { withStatusPropTypes } from './mixins/withStatus';
import './styles/Text.scss';

import BasicRow from './BasicRow';
import type { Props as BasicRowProps } from './BasicRow';

export const COMPONENT_NAME = prefixClass('text');
const ROOT_BEM = icBEM(COMPONENT_NAME);

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

export type Props = {
    align: typeof LEFT | typeof CENTER | typeof RIGHT,
    aside: ReactChildren,
    basicRow: AnyReactElement,
    noGrow: boolean,
    errorMsg: string,
    statusIcon: ReactChildren, // #FIXME: use type from withStatus()
    basic: $PropertyType<BasicRowProps, 'basic'>,
    tag: $PropertyType<BasicRowProps, 'tag'>,
    className: string,
};

class Text extends PureComponent {
    props: Props;

    static propTypes = {
        align: PropTypes.oneOf(Object.values(TEXT_ALIGN)),
        aside: PropTypes.node,
        basicRow: PropTypes.element,
        noGrow: PropTypes.bool,

        ...withStatusPropTypes,
        // errorMsg: string,
        // statusIcon: node,

        ...BasicRow.propTypes,
        // basic: node,
        // tag: node,
        // statusIcon: node,
    };

    static defaultProps = {
        align: LEFT,
        aside: undefined,
        basicRow: <BasicRow />,
        noGrow: false,
        errorMsg: undefined,
        statusIcon: undefined,
        ...BasicRow.defaultProps,
        // basic,
        // tag,
        // statusIcon,
    };

    renderBasicRow() {
        const { basicRow, basic, tag, statusIcon } = this.props;
        const basicRowProps = {
            basic,
            tag,
            statusIcon,
            className: classNames(
                BEM.row.toString(),
                BEM.basic.toString()
            ),
        };

        if (basicRow && React.isValidElement(basicRow)) {
            // Inject { basic, tag, statusIcon } to default or custom row.
            return React.cloneElement(basicRow, basicRowProps);
        }

        return null;
    }

    renderAsideRow() {
        const { aside, errorMsg } = this.props;
        const displayText = errorMsg || aside;

        if (!displayText) {
            return null;
        }

        return (
            <div className={classNames(BEM.row.toString(), BEM.aside.toString())}>
                {displayText}
            </div>
        );
    }

    render() {
        const { align, noGrow, className } = this.props;

        const bemClass = BEM.root
            .modifier(align)
            .modifier('no-grow', noGrow);

        const rootClassName = classNames(bemClass.toString(), className);

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
