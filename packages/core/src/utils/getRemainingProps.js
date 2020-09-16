import omit from 'lodash.omit';

export default function getRemainingProps(props, propTypes) {
  return omit(props, Object.keys(propTypes));
}
