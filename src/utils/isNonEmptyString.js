// @flow
function isNonEmptyString(checkingString: string): boolean {
    return (typeof checkingString === 'string' && checkingString.length > 0);
}

export default isNonEmptyString;
