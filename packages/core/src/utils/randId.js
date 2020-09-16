/**
 * Generates a random String at specific length to be used as IDs.
 *
 * @param {Number} length - the length of generated String.
 * @param {String} prefix
 * @return {String} result
 */
function randId({ length = 10, prefix = 'node' } = {}) {
  const randHash = Math.random().toString(16).substr(2, length);
  return `${prefix}-${randHash}`;
}

export default randId;
