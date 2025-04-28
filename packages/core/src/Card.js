import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import './styles/Card.scss';

import Icon from './Icon';

export const COMPONENT_NAME = prefixClass('card');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
  root: ROOT_BEM,
  icon: ROOT_BEM.element('icon'),
  textContainer: ROOT_BEM.element('text-container'),
  title: ROOT_BEM.element('title'),
  descriptionBox: ROOT_BEM.element('description-box'),
  description: ROOT_BEM.element('description'),
};

function Card({
  iconType,
  title,
  desc = undefined,
  onClick = undefined,
  cardProps = undefined,
  // React props
  className,
}) {
  const rootClassName = classNames(className, COMPONENT_NAME);
  const iconClassName = `${BEM.icon}`;
  const textContainerClassName = `${BEM.textContainer}`;
  const titleClassName = `${BEM.title}`;
  const descriptionBoxClassName = `${BEM.descriptionBox}`;
  const descriptionClassName = `${BEM.description}`;

  return (
    <div
      className={rootClassName}
      onClick={onClick}
      {...cardProps}
    >
      {iconType && (
        <Icon
          type={iconType}
          className={iconClassName}
        />
      )}
      <div className={textContainerClassName}>
        <p className={titleClassName}>{title}</p>
        {desc && (
          <div className={descriptionBoxClassName}>
            <p className={descriptionClassName}>{desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}

Card.propTypes = {
  iconType: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  desc: PropTypes.node,
  onClick: PropTypes.func,
  cardProps: PropTypes.objectOf(PropTypes.any),
};

Card.defaultProps = {
  desc: undefined,
  onClick: undefined,
  cardProps: undefined,
};

export default Card;
