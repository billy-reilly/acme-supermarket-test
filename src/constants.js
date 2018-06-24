import Product from './models/Product';
import Discount from './models/Discount';

export const products = [
    new Product({
        code: 'FR1',
        name: 'Fruit tea',
        price: 311
    }),
    new Product({
        code: 'SR1',
        name: 'Strawberries',
        price: 500
    }),
    new Product({
        code: 'CF1',
        name: 'Coffee',
        price: 1123
    })
];

export const discounts = [
    new Discount({
        productCode: 'FR1',
        percentageDiscount: 100,
        calculateDiscountsPermitted: quantity => Math.floor(quantity / 2),
        enabled: true,
        description: 'Buy one get one free'
    }),
    new Discount({
        productCode: 'SR1',
        percentageDiscount: 10,
        calculateDiscountsPermitted: quantity => quantity >= 3 ? quantity : 0,
        enabled: true,
        description: '10% off when you buy three or more'
    })
];
