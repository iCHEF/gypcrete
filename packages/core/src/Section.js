import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import './styles/Section.scss';
import { STATUS_CODE } from './StatusIcon';
import { statusPropTypes } from './mixins/withStatus';

export const COMPONENT_NAME = prefixClass('section');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
  root: ROOT_BEM,
  title: ROOT_BEM.element('title'),
  body: ROOT_BEM.element('body'),
  footer: ROOT_BEM.element('footer'),
  titleRightArea: ROOT_BEM.element('title-right-area'),
};

function Section({
  title,
  titleSize,
  titleRightArea,
  desc,
  status,
  errorMsg,
  verticalSpacing, // add margin to above and below <Section>
  bodySpacing, // add padding to body for components that are not row-based
  // React props
  className,
  children,
  ...wrapperProps
}) {
  // Class names
  const rootClassName = classNames(
    BEM.root
      .modifier('no-margin', !verticalSpacing)
      .modifier('error', status === STATUS_CODE.ERROR)
      .toString(),
    className,
  );
  const bodyClassName = BEM.body.modifier('padded', bodySpacing).toString();

  // Conditional parts
  const titleArea = title && (
    <div className={BEM.title.modifier(titleSize).toString()}>
      {title}
      {titleRightArea && <div className={BEM.titleRightArea.toString()}>{titleRightArea}</div>}
    </div>
  );

  const hasFooter = desc || errorMsg;

  const footer = hasFooter && (
    <div className={BEM.footer.toString()}>
      {desc && <div>{desc}</div>}
      {errorMsg && <div>{errorMsg}</div>}
    </div>
  );

  return (
    <div
      className={rootClassName}
      {...wrapperProps}
    >
      {titleArea}
      <div className={bodyClassName}>{children}</div>
      {footer}
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.node,
  desc: PropTypes.node,
  verticalSpacing: PropTypes.bool,
  bodySpacing: PropTypes.bool,
  titleSize: PropTypes.oneOf(['base', 'small']),
  titleRightArea: PropTypes.node,
  status: statusPropTypes.status,
  errorMsg: statusPropTypes.errorMsg,
};

Section.defaultProps = {
  title: undefined,
  desc: undefined,
  verticalSpacing: true,
  bodySpacing: true,
  titleSize: 'base',
  titleRightArea: undefined,
  status: undefined,
  errorMsg: undefined,
};

export default Section;
