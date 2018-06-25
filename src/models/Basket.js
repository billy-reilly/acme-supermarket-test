import { Record as record, Map } from 'immutable';

const defaults = {
    productsAdded: new Map(),
    productsAvailable: [],
    discounts: []
}

export default class Basket extends record(defaults) {
    getQuantity (productCode) {
        return this.productsAdded.get(productCode) || 0;
    }

    add (product) {
        const newQuantity = this.getQuantity(product.code) + 1;
        return this.set('productsAdded', this.productsAdded.set(product.code, newQuantity));
    }

    remove (product) {
        const currentQuantity = this.getQuantity(product.code);
        if (currentQuantity && currentQuantity > 1) {
            return this.set('productsAdded', this.productsAdded.set(product.code, currentQuantity - 1));
        } else if (currentQuantity && currentQuantity === 1) {
            return this.set('productsAdded', this.productsAdded.delete(product.code));
        }
        return this;
    }

    getAddedProductCodes () {
        return this.productsAdded.keySeq().toList();
    }

    getProductPricePreDiscount (product) {
        return product.price * this.getQuantity(product.code);
    }

    getProductDiscount (product) {
        const discount = this.discounts.find(d => d.productCode === product.code && d.enabled);
        if (discount) {
            const numberOfDiscounts = discount.calculateDiscountsPermitted(this.getQuantity(product.code));
            return numberOfDiscounts * product.price * discount.percentageDiscount / 100; 
        }
        return 0;
    }

    getProductPricePostDiscount (product) {
        return this.getProductPricePreDiscount(product) - this.getProductDiscount(product, this.discounts);
    }

    getTotalPricePreDiscount () {
        return this.productsAvailable.reduce((total, product) => {
            return total + this.getProductPricePreDiscount(product);
        }, 0);
    }

    getTotalDiscount () {
        return this.productsAvailable.reduce((total, product) => {
            return total + this.getProductDiscount(product, this.discounts);
        }, 0);
    }

    getTotalPricePostDiscount () {
        const totalPreDiscount = this.getTotalPricePreDiscount(this.productsAvailable);
        const totalDiscount = this.getTotalDiscount(this.productsAvailable, this.discounts);
        return totalPreDiscount - totalDiscount;
    }

    total () {
        return this.getTotalPricePostDiscount();
    }

    isEmpty () {
        const totalItems = this.productsAdded.reduce((total, quantity) => {
            return total + quantity;
        }, 0);
        return totalItems < 1;
    }
}
