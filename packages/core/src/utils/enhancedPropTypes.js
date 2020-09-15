// -------------------------------------
//   Enhanced PropTypes Validator
// -------------------------------------

const EnhancedPropTypes = {
    /**
     * Check prop should be empty
     *
     * @param  {Object} props
     * @param  {String} propName
     * @param  {String} componentName
     * @return {NULL}
     */
    isEmpty: (props, propName, componentName) => {
        if (props[propName]) {
            return new Error(`<${componentName}> must not contains ${propName}.`);
        }
        return undefined;
    },
};

export default EnhancedPropTypes;
