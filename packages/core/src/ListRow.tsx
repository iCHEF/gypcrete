import React, { PureComponent } from 'react';
import classNames from 'classnames';

import ListSpacingContext from './contexts/listSpacing';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { statusPropTypes } from './mixins/withStatus';

import prefixClass from './utils/prefixClass';
import getStateClassnames from './utils/getStateClassnames';
import icBEM from './utils/icBEM';
import wrapIfNotElement from './utils/wrapIfNotElement';

import { STATUS_CODE } from './StatusIcon';

import './styles/ListRow.scss';

export const COMPONENT_NAME = prefixClass('list-row');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    body: ROOT_BEM.element('body'),
    footer: ROOT_BEM.element('footer'),
    nestedListWrapper: ROOT_BEM.element('nested-list-wrapper')
};

/*
(ts-migrate) TODO: Migrate the remaining prop types
...statusPropTypes
*/
type OwnProps = {
    highlight?: boolean;
    nestedList?: React.ReactNode;
    desc?: React.ReactNode;
};

type Props = OwnProps & typeof ListRow.defaultProps;

class ListRow extends PureComponent<Props> {
    static defaultProps = {
        highlight: false,
        nestedList: undefined,
        desc: undefined,
    };

    renderFooter() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'errorMsg' does not exist on type 'Readon... Remove this comment to see the full error message
        const { desc, errorMsg } = this.props;
        const hasFooter = desc || errorMsg;

        if (!hasFooter) {
            return null;
        }

        return (
            <div className={BEM.footer.toString()}>
                {errorMsg && wrapIfNotElement(errorMsg, { with: 'p' })}
                {desc && wrapIfNotElement(desc, { with: 'p' })}
            </div>
        );
    }

    render() {
        const {
            highlight,
            nestedList,
            desc,
            // status props
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'status' does not exist on type 'Readonly... Remove this comment to see the full error message
            status,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'statusOptions' does not exist on type 'R... Remove this comment to see the full error message
            statusOptions,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'errorMsg' does not exist on type 'Readon... Remove this comment to see the full error message
            errorMsg,
            // React props
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
            className,
            children,
            ...wrapperProps
        } = this.props;

        const bemClass = BEM.root.modifier('highlight', highlight);

        const stateClass = getStateClassnames({
            error: status === STATUS_CODE.ERROR,
        });
        const rootClassName = classNames(bemClass.toString(), stateClass, className);

        return (
            <ListSpacingContext.Provider value={false}>
                <li>
                    <div className={rootClassName} {...wrapperProps}>
                        <div className={BEM.body.toString()}>
                            {children}
                        </div>
                        {this.renderFooter()}
                    </div>
                    {nestedList && (
                        <div className={BEM.nestedListWrapper.toString()}>
                            {nestedList}
                        </div>
                    )}
                </li>
            </ListSpacingContext.Provider>
        );
    }
}

export default ListRow;
