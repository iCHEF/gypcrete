import omit from 'lodash.omit';

export default function getRemainingProps(props, Component) {
    return omit(props, Object.keys(Component.propTypes));
}
