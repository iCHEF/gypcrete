// @flow
import classNames from 'classnames';
import prefixClass from './prefixClass';

const PREFIX = 'state';

const CLASS_ACTIVE = prefixClass(`${PREFIX}-active`);
const CLASS_HIGHLIGHT = prefixClass(`${PREFIX}-highlight`);
const CLASS_ERROR = prefixClass(`${PREFIX}-error`);
const CLASS_DISABLED = prefixClass(`${PREFIX}-disabled`);
const CLASS_UNTOUCHABLE = prefixClass(`${PREFIX}-untouchable`);

type StateProps = {
    active?: boolean,
    highlight?: boolean,
    error?: boolean,
    disabled?: boolean,
    untouchable?: boolean,
};

function getStateClassnames(stateProps: StateProps) {
    const results = classNames({
        [CLASS_ACTIVE]: stateProps.active,
        [CLASS_HIGHLIGHT]: stateProps.highlight,
        [CLASS_ERROR]: stateProps.error,
        [CLASS_DISABLED]: stateProps.disabled,
        [CLASS_UNTOUCHABLE]: stateProps.untouchable,
    });

    return results;
}

export default getStateClassnames;
