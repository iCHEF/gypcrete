import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'memoize-one';

import ColumnView from './ColumnView';
import HeaderRow from './HeaderRow';
import Overlay from './Overlay';
import TextLabel from './TextLabel';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import wrapIfNotElement from './utils/wrapIfNotElement';
import renderToLayer from './mixins/renderToLayer';

import './styles/_animations.scss';
import './styles/Modal.scss';

export const MODAL_SIZE = ['small', 'large', 'full'];

export const COMPONENT_NAME = prefixClass('modal');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
  root: ROOT_BEM,
  container: ROOT_BEM.element('container'),
};

// -----------------
//  Helpers
// -----------------

const createHandleOverlayClick = memoize((onClose) => (event) => {
  // Prevent onClick events being propagated to outer modals
  event.stopPropagation();
  onClose();
});

// -----------------
//  Sub-component
// -----------------

export function DefaultHeader({ title }) {
  const label = (
    <TextLabel
      align="center"
      basic={title}
    />
  );

  return <HeaderRow center={label} />;
}

DefaultHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

// -----------------
//  Main Component
// -----------------

function Modal({
  header,
  centered,
  onClose,
  // <ColumnView> props
  flexBody,
  bodyPadding,
  // React props
  className,
  children,
  ...wrapperProps
}) {
  const rootBem = BEM.root.modifier('centered', centered).toString();

  const rootClassName = classNames(rootBem, className);

  const headerRow =
    header &&
    wrapIfNotElement(header, {
      with: DefaultHeader,
      via: 'title',
    });

  const handleOverlayClick = createHandleOverlayClick(onClose);

  return (
    <div
      className={rootClassName}
      {...wrapperProps}
    >
      <Overlay onClick={handleOverlayClick} />

      <ColumnView
        header={headerRow}
        className={`${BEM.container}`}
        flexBody={flexBody}
        bodyPadding={bodyPadding}
      >
        {children}
      </ColumnView>
    </div>
  );
}

Modal.propTypes = {
  header: PropTypes.node,
  centered: PropTypes.bool,
  onClose: PropTypes.func,
  /**
   *  See `<ColumnView>` props table.
   */
  flexBody: ColumnView.propTypes.flexBody,
  /**
   *  See `<ColumnView>` props table.
   */
  bodyPadding: ColumnView.propTypes.bodyPadding,
};

Modal.defaultProps = {
  header: undefined,
  centered: false,
  onClose: () => {},
  // <ColumnView> props
  flexBody: ColumnView.defaultProps.flexBody,
  bodyPadding: ColumnView.defaultProps.bodyPadding,
};

export { Modal as PureModal };
export default renderToLayer(Modal);
