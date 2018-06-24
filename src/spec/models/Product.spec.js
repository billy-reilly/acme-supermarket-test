import Product from '../../models/Product';

describe('Product class', () => {
    describe('#getScreenReaderDescription', () => {
        it('should return a string with the name of the product and the price', () => {
            const product1 = new Product({
                name: 'some product',
                price: 153
            });
            expect(product1.getScreenReaderDescription()).toBe('some product. 1 pound and 53 pence');

            const product2 = new Product({
                name: 'some other product',
                price: 253
            });
            expect(product2.getScreenReaderDescription()).toBe('some other product. 2 pounds and 53 pence');

            const product3 = new Product({
                name: 'and yet another product',
                price: 1000
            });
            expect(product3.getScreenReaderDescription()).toBe('and yet another product. 10 pounds');
        });
    });
});
