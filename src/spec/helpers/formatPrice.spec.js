import formatPrice from '../../helpers/formatPrice';

describe('formatPrice helper', () => {
    it('should return the price in pounds with two decimal places', () => {
        expect(formatPrice(400)).toBe('4.00');
        expect(formatPrice(423)).toBe('4.23');
        expect(formatPrice(42300)).toBe('423.00');
    });

    it('should prepend zeros if the price is less than one pound', () => {
        expect(formatPrice(55)).toBe('0.55');
        expect(formatPrice(50)).toBe('0.50');
        expect(formatPrice(5)).toBe('0.05');
    });
});
