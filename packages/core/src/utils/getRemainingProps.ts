import omit from 'lodash.omit';

export default function getRemainingProps(props: any, propTypes: object) {
    return omit(props, Object.keys(propTypes));
}
