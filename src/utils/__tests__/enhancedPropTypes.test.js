import EnhancedPropTypes from '../enhancedPropTypes';

function validatePropTypes(propTypes, props) {
    Object.keys(propTypes).forEach((propName) => {
        const validator = propTypes[propName];
        if (validator(props, propName) instanceof Error) {
            throw new Error(`PropTypes should be satisfied by ${JSON.stringify(props)}`);
        }
    });

    return true;
}

describe('EnhancedPropTypes: empty', () => {
    const propTypes = { foo: EnhancedPropTypes.empty };

    it('invalid if foo prop is non-empty', () => {
        const props = { foo: 'hello world' };

        expect(() => validatePropTypes(propTypes, props)).toThrow();
    });

    it('valid if foo prop is null or non-exist', () => {
        const props1 = { foo: null };
        const props2 = { };

        expect(validatePropTypes(propTypes, props1)).toBeTruthy();
        expect(validatePropTypes(propTypes, props2)).toBeTruthy();
    });
});
