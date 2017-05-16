// -------------------------------------
//   Enhanced PropTypes Validator
// -------------------------------------

const enhancedPropTypes = {
    /**
     * Check prop should be empty
     *
     * @param  {Object} props
     * @param  {String} propName
     * @param  {String} componentName
     * @return {NULL}
     */
    empty: (props, propName, componentName) => {
        if (props[propName]) {
            return new Error(`<${componentName}> must not contains ${propName}.`);
        }
        return null;
    }
};

export default enhancedPropTypes;
