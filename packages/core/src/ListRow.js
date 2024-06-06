import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ListSpacingContext from './contexts/listSpacing';

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
  nestedListWrapper: ROOT_BEM.element('nested-list-wrapper'),
};

class ListRow extends PureComponent {
  static propTypes = {
    highlight: PropTypes.bool,
    nestedList: PropTypes.node,
    desc: PropTypes.node,

    ...statusPropTypes,
    // status,
    // statusOptions,
    // errorMsg,
  };

  static defaultProps = {
    highlight: false,
    nestedList: undefined,
    desc: undefined,
  };

  renderFooter() {
    const { desc, errorMsg } = this.props;
    const hasFooter = desc || errorMsg;

    if (!hasFooter) {
      return null;
    }

    return (
      <div className={BEM.footer.toString()}>
        {errorMsg && wrapIfNotElement(errorMsg, { with: 'div' })}
        {desc && wrapIfNotElement(desc, { with: 'div' })}
      </div>
    );
  }

  render() {
    const {
      highlight,
      nestedList,
      desc,
      // status props
      status,
      statusOptions,
      errorMsg,
      // React props
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
          <div
            className={rootClassName}
            {...wrapperProps}
          >
            <div className={BEM.body.toString()}>{children}</div>
            {this.renderFooter()}
          </div>
          {nestedList && <div className={BEM.nestedListWrapper.toString()}>{nestedList}</div>}
        </li>
      </ListSpacingContext.Provider>
    );
  }
}

export default ListRow;
