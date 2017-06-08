// @flow
function isNonEmptyString(checkingString: any): boolean {
    return (typeof checkingString === 'string' && checkingString.length > 0);
}

export default isNonEmptyString;
