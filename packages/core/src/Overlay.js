import React, { PureComponent } from 'react';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';

import './styles/_animations.scss';
import './styles/Overlay.scss';

export const COMPONENT_NAME = prefixClass('overlay');
export const HAS_OVERLAY_CLASS = prefixClass('has-overlay');
const ROOT_BEM = icBEM(COMPONENT_NAME);

class Overlay extends PureComponent {
  componentDidMount() {
    document.body.classList.add(HAS_OVERLAY_CLASS);
  }

  componentWillUnmount() {
    document.body.classList.remove(HAS_OVERLAY_CLASS);
  }

  render() {
    const { className, ...overlayProps } = this.props;
    const rootClassName = classNames(className, `${ROOT_BEM}`);

    return (
      <div
        className={rootClassName}
        {...overlayProps} />
    );
  }
}

export default Overlay;
