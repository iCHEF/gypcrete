import icBEM from '../icBEM';

describe('icBEM() helper', () => {
    it('can be initialized by a base block string', () => {
        const bem = icBEM('ic-comp');

        expect(bem.toString()).toBe('ic-comp');
    });

    it('takes one element string', () => {
        const bem = icBEM('ic-comp').element('body');

        expect(bem.toString()).toBe('ic-comp__body');
    });

    it('only takes the latest element string', () => {
        const bem = icBEM('ic-comp')
            .element('body')
            .element('header');

        expect(bem.toString()).toBe('ic-comp__header');
    });

    it('takes multiple modifier strings for block-only BEM', () => {
        const bem = icBEM('ic-comp')
            .modifier('large')
            .modifier('black');

        expect(bem.toString()).toBe('ic-comp ic-comp--large ic-comp--black');
    });

    it('takes multiple modifier strings for block+element BEM', () => {
        const bem = icBEM('ic-comp')
            .element('body')
            .modifier('large')
            .modifier('black');

        expect(bem.toString())
            .toBe('ic-comp__body ic-comp__body--large ic-comp__body--black');
    });

    it('can toggle certain modifier on or off', () => {
        const bem = icBEM('ic-comp')
            .modifier('large', true)
            .modifier('black', false);

        expect(bem.toString()).toBe('ic-comp ic-comp--large');
    });

    it('can append non-BEM class names', () => {
        let bem = icBEM('ic-comp').add('foo-bar');
        expect(bem.toString()).toBe('ic-comp foo-bar');

        bem = icBEM('ic-comp')
            .element('body')
            .add('foo-bar');
        expect(bem.toString()).toBe('ic-comp__body foo-bar');

        bem = icBEM('ic-comp')
            .element('body')
            .modifier('large')
            .add('foo-bar');
        expect(bem.toString()).toBe('ic-comp__body ic-comp__body--large foo-bar');
    });

    it('ignores empty mutation calls', () => {
        const bem = icBEM('ic-comp')
            .element()
            .modifier()
            .add();

        expect(bem.toString()).toBe('ic-comp');
    });

    it('throws when init without a non-empty String', () => {
        expect(() => icBEM()).toThrow();
        expect(() => icBEM('')).toThrow();
        expect(() => icBEM(1)).toThrow();
        expect(() => icBEM(['a'])).toThrow();
        expect(() => icBEM({ foo: 'bar' })).toThrow();
    });
});
