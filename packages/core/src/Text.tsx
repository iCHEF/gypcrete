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
import getRemainingProps from './utils/getRemainingProps';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import withStatus, { withStatusPropTypes } from './mixins/withStatus';
import './styles/Text.scss';

import BasicRow from './BasicRow';

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

export const VERTICAL_ORDER = {
    NORMAL: 'normal',
    REVERSE: 'reverse',
};

/*
(ts-migrate) TODO: Migrate the remaining prop types
...withStatusPropTypes
...BasicRow.propTypes
*/
type OwnProps = {
    align?: any; // TODO: PropTypes.oneOf([LEFT, CENTER, RIGHT])
    verticalOrder?: any; // TODO: PropTypes.oneOf([ VERTICAL_ORDER.NORMAL, VERTICAL_ORDER.REVERSE, ])
    aside?: React.ReactNode;
    basicRow?: React.ReactElement;
    noGrow?: boolean;
    bold?: boolean;
};

type Props = OwnProps & typeof Text.defaultProps;

class Text extends PureComponent<Props> {
    static propTypes = {
        align: PropTypes.oneOf([LEFT, CENTER, RIGHT]),
        verticalOrder: PropTypes.oneOf([
            VERTICAL_ORDER.NORMAL,
            VERTICAL_ORDER.REVERSE,
        ]),
        aside: PropTypes.node,
        basicRow: PropTypes.element,
        noGrow: PropTypes.bool,
        bold: PropTypes.bool,

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
        verticalOrder: VERTICAL_ORDER.NORMAL,
        aside: undefined,
        basicRow: <BasicRow />,
        noGrow: false,
        bold: false,
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
        const {
            align,
            verticalOrder,
            noGrow,
            bold,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
            className,
        } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        const wrapperProps = getRemainingProps(this.props, Text.propTypes);

        const bemClass = BEM.root
            .modifier(align)
            .modifier(`v-${verticalOrder}`)
            .modifier('no-grow', noGrow)
            .modifier('bold', bold);

        const rootClassName = classNames(bemClass.toString(), className);

        return (
            <div className={rootClassName} {...wrapperProps}>
                {this.renderBasicRow()}
                {this.renderAsideRow()}
            </div>
        );
    }
}

// @ts-expect-error ts-migrate(4082) FIXME: Default export of the module has or is using priva... Remove this comment to see the full error message
export default withStatus()(Text);
export { Text as PureText };
