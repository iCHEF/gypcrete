function isNonEmptyString(checkingString) {
  return (typeof checkingString === 'string' && checkingString.length > 0);
}

export default isNonEmptyString;
