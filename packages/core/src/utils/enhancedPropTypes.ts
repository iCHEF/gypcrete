// -------------------------------------
//   Enhanced PropTypes Validator
// -------------------------------------

const EnhancedPropTypes = {
    /**
     * Check prop should be empty
     */
    isEmpty: (props: object, propName: string, componentName: string) => {
        if (props[propName]) {
            return new Error(`<${componentName}> must not contains ${propName}.`);
        }
        return undefined;
    }
};

export default EnhancedPropTypes;
