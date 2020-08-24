import React from 'react';
import classNames from 'classnames';
import './styles/List.scss';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';

import Section from './Section';
import ListSpacingContext from './contexts/listSpacing';

export const COMPONENT_NAME = prefixClass('list');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    body: ROOT_BEM.element('body'),
};

const NORMAL = 'normal';
const SETTING = 'setting'; // #TODO: design deprecated
const BUTTON = 'button';
const LIST_VARIANTS = [NORMAL, SETTING, BUTTON];

export const TYPE_SYMBOL = Symbol('List');

type OwnProps = {
    variant?: any; // TODO: PropTypes.oneOf(LIST_VARIANTS)
    title?: React.ReactNode;
    desc?: React.ReactNode;
    titleSize?: string;
};

type Props = OwnProps & typeof List.defaultProps;

function List({
    variant,
    // <Section> props
    title, desc, titleSize,
    // React props
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Props... Remove this comment to see the full error message
    className, children, ...otherProps
}: Props) {
    return (
        <ListSpacingContext.Consumer>
            {(spacing) => {
                const bemClass = BEM.root
                    .modifier(variant)
                    .modifier('sm-margin-bottom', !spacing && !!title);

                const rootClassName = classNames(bemClass.toString(), className);
                return (
                    // @ts-expect-error ts-migrate(2322) FIXME: Property 'children' does not exist on type 'Intrin... Remove this comment to see the full error message
                    <Section
                        className={rootClassName}
                        title={title}
                        titleSize={titleSize}
                        desc={desc}
                        bodySpacing={false}
                        verticalSpacing={spacing || !!title}
                        {...otherProps}>
                        <ul className={BEM.body.toString()}>
                            {children}
                        </ul>
                    </Section>
                );
            }}
        </ListSpacingContext.Consumer>
    );
}

List.defaultProps = {
    variant: NORMAL,
    title: undefined,
    desc: undefined,
    titleSize: undefined,
};

// For `<ListRow>` to check if `nestedList` is a `<List>.
// Ref for this symbol approach: https://github.com/iCHEF/gypcrete/pull/157
List.typeSymbol = TYPE_SYMBOL;

export default List;
