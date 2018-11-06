// -------------------------------------
//   icBEM Helper
//   @ref https://github.com/14islands/bem-helper-js
//
//   Usage:
//   const bem = icBEM('ic-list');
//   const bem2 = bem.element('item');
//   const bem3 = bem2.modifier('highlight');
//
//   bem.toString();   // => 'ic-list'
//   bem2.toString();  // => 'ic-list__item'
//   bem3.toString();  // => 'ic-list__item ic-list__item--highlight'
// -------------------------------------

/* eslint-disable no-underscore-dangle */
import isNonEmptyString from './isNonEmptyString';

const ELEMENT_SEPARATOR = '__';
const MODIFIER_SEPARATOR = '--';

export class BEMFactory {
    constructor({ block, element, modifiers = [], nonBemClasses = [] }) {
        if (!block) {
            throw new Error('block is required.');
        }

        this._block = block;
        this._element = element;
        this._modifiers = modifiers;
        this._nonBemClasses = nonBemClasses;

        return this;
    }

    /**
     * Set element scope

     * @param {String}
     * @return {BEMFactory}
     */
    element(elementIdentifier) {
        if (isNonEmptyString(elementIdentifier)) {
            return new BEMFactory({
                ...this.toHash(),
                element: elementIdentifier
            });
        }
        return this;
    }

    /**
     * Add BEM modifier

     * @param {String}
     * @return {BEMFactory}
     */
    modifier(modifierIdentifier, isOn = true) {
        if (isOn && isNonEmptyString(modifierIdentifier)) {
            return new BEMFactory({
                ...this.toHash(),
                modifiers: [...this._modifiers, modifierIdentifier]
            });
        }
        return this;
    }

    /**
     * Add other non-BEM classname to the mix

     * @param {String}
     * @return {BEMFactory}
     */
    add(className) {
        if (isNonEmptyString(className)) {
            return new BEMFactory({
                ...this.toHash(),
                nonBemClasses: [...this._nonBemClasses, className]
            });
        }
        return this;
    }

    /**
     * Render BEM chain as full class name string
     *
     * @param {Bool} stripBlock - Should remove Block from output.
     * @return {String}
     */
    toString({ stripBlock = false } = {}) {
        const { _block, _element, _modifiers, _nonBemClasses } = this;

        const baseClass = (typeof _element !== 'undefined')
            ? `${_block}${ELEMENT_SEPARATOR}${_element}`
            : _block;

        const classes = [
            baseClass,
            ..._modifiers.map(modifier => `${baseClass}${MODIFIER_SEPARATOR}${modifier}`),
            ..._nonBemClasses
        ];

        if (stripBlock) classes.shift();

        return classes.join(' ');
    }

    /**
     * Export internal properties to a new Hash
     *
     * @return {Hash}
     */
    toHash() {
        return {
            block: this._block,
            element: this._element,
            modifiers: this._modifiers.slice(0),
            nonBemClasses: this._nonBemClasses.slice(0)
        };
    }

    valueOf() {
        return this.toString();
    }
}

// Creates BEM chain based on context type
function icBEM(blockName) {
    if (typeof blockName === 'string') {
        return new BEMFactory({ block: blockName });
    }
    throw new Error('blockName should be a non-empty String.');
}

export default icBEM;
