import { Map, List } from 'immutable';

import Basket from '../../models/Basket';
import Product from '../../models/Product';
import Discount from '../../models/Discount';

describe('Basket record', () => {
    describe('#getQuantity', () => {
        it('should return zero if the productCode supplied is not a key on the productsAdded map', () => {
            const basket = new Basket();
            expect(basket.getQuantity('FAKECODE')).toBe(0);
        });

        it('should return the associated value if the productCode supplied is a key on the productsAdded map', () => {
            const basket = new Basket({
                productsAdded: new Map({ 'REALCODE': 7 })
            });
            expect(basket.getQuantity('REALCODE')).toBe(7);
        });
    });
    
    describe('#add', () => {
        it('should add the productCode as a key on the productsAdded map and set the value to 1 if previous quantity was 0', () => {
            const originalBasket = new Basket();
            expect(originalBasket.productsAdded.has('CODE')).toBe(false);
            const product = new Product({ code: 'CODE' });
            const updatedBasket = originalBasket.add(product);
            expect(updatedBasket.productsAdded.has('CODE')).toBe(true);
        });

        it('should increment the value associated with the productCode if the previous quantity was greater than zero', () => {
            const originalBasket = new Basket({
                productsAdded: new Map({ 'CODE': 2 })
            });
            expect(originalBasket.productsAdded.get('CODE')).toBe(2);
            const product = new Product({ code: 'CODE' });
            const updatedBasket = originalBasket.add(product);
            expect(updatedBasket.productsAdded.get('CODE')).toBe(3);
        });
    });

    describe('#remove', () => {
        it('should decrement the value associated with the productCode if previous quantity was greater than 1', () => {
            const originalBasket = new Basket({
                productsAdded: new Map({ 'CODE': 5 })
            });
            expect(originalBasket.productsAdded.get('CODE')).toBe(5);
            const product = new Product({ code: 'CODE' });
            const updatedBasket = originalBasket.remove(product);
            expect(updatedBasket.productsAdded.get('CODE')).toBe(4);
        });
        
        it('should remove the key from the map if the value is 1', () => {
            const originalBasket = new Basket({
                productsAdded: new Map({ 'CODE': 1 })
            });
            expect(originalBasket.productsAdded.has('CODE')).toBe(true);
            const product = new Product({ code: 'CODE' });
            const updatedBasket = originalBasket.remove(product);
            expect(updatedBasket.productsAdded.has('CODE')).toBe(false);
        });

        it('should not update the record if the previous value was less than 1', () => {
            const originalBasket = new Basket();
            expect(originalBasket.productsAdded.has('CODE')).toBe(false);
            const product = new Product({ code: 'CODE' });
            const updatedBasket = originalBasket.remove(product);
            expect(updatedBasket).toBe(originalBasket);
        });
    });

    describe('#getAddedProductCodes', () => {
        it('should return a list of the keys on the productsAdded map', () => {
            const basket = new Basket({
                productsAdded: new Map({
                    'CODE1': 6,
                    'CODE2': 3,
                    'CODE3': 100
                })
            });
            expect(basket.getAddedProductCodes()).toEqual(new List(['CODE1', 'CODE2', 'CODE3']));
        });
    });

    describe('#getProductPricePreDiscount', () => {
        it('should return the product of the price and the quantity', () => {
            const product = new Product({ code: 'CODE', price: 200 });
            const basket = new Basket({
                productsAdded: new Map({ 'CODE': 3 })
            });
            expect(basket.getProductPricePreDiscount(product)).toBe(600);
        });
    });

    const fakeDiscount = new Discount({
        productCode: 'CODE',
        percentageDiscount: 10,
        calculateDiscountsPermitted: q => q,
        enabled: true
    });
    const discountedProduct = new Product({
        code: 'CODE',
        price: 100
    });

    describe('#getProductDiscount', () => {
        it('should return the discount value that should applied to that product', () => {
            const basketWithOneProduct = new Basket({
                discounts: [fakeDiscount],
                productsAdded: new Map({ 'CODE': 1 })
            });
            expect(basketWithOneProduct.getProductDiscount(discountedProduct)).toBe(10);

            const basketWithSevenProducts = new Basket({
                discounts: [fakeDiscount],
                productsAdded: new Map({ 'CODE': 7 })
            });
            expect(basketWithSevenProducts.getProductDiscount(discountedProduct)).toBe(70);
        });

        it('should return zero if the discount does not exist', () => {
            const basket = new Basket({
                discounts: [],
                productsAdded: new Map({ 'CODE': 1 })
            });
            expect(basket.getProductDiscount(discountedProduct)).toBe(0);
        });
    });

    describe('#getProductPricePostDiscount', () => {
        it('should return the price of the given product minus the discount', () => {
            const basketWithOneProduct = new Basket({
                discounts: [fakeDiscount],
                productsAdded: new Map({ 'CODE': 1 })
            });
            expect(basketWithOneProduct.getProductPricePostDiscount(discountedProduct)).toBe(90);

            const basketWithSevenProducts = new Basket({
                discounts: [fakeDiscount],
                productsAdded: new Map({ 'CODE': 7 })
            });
            expect(basketWithSevenProducts.getProductPricePostDiscount(discountedProduct)).toBe(630);
        });
    });

    const fakeDiscount2 = new Discount({
        productCode: 'CODE2',
        percentageDiscount: 50,
        calculateDiscountsPermitted: q => q,
        enabled: true
    });
    const discountedProduct2 = new Product({
        code: 'CODE2',
        price: 20
    });
    const discountTestBasket = new Basket({
        discounts: [fakeDiscount, fakeDiscount2],
        productsAvailable: [discountedProduct, discountedProduct2],
        productsAdded: new Map({ 'CODE': 1, 'CODE2': 5 })
    });

    describe('#getTotalPricePreDiscount', () => {
        it('should add up the subtotals for all products', () => {
            expect(discountTestBasket.getTotalPricePreDiscount()).toBe(200);
        });
    });

    describe('#getTotalDiscount', () => {
        it('should add up the discounts applied to all products', () => {
            expect(discountTestBasket.getTotalDiscount()).toBe(60);
        });
    });

    describe('#getTotalPricePostDiscount', () => {
        it('should return the total price minus the discounts applied to all products', () => {
            expect(discountTestBasket.getTotalPricePostDiscount()).toBe(140);
        });
    });

    describe('#isEmpty', () => {
        it('should return true if no products have been added to the basket', () => {
            const basket = new Basket();
            expect(basket.isEmpty()).toBe(true);
        });

        it('should return false if some products have been added to the basket', () => {
            const basket = new Basket({
                productsAdded: new Map({
                    'CODE1': 1,
                    'CODE2': 2
                })
            });
            expect(basket.isEmpty()).toBe(false);
        });
    });
});
