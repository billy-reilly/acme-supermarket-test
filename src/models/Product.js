import _ from 'lodash';

export default class Product {
    code = '';
    name = '';
    price = 0;

    getScreenReaderDescription () {
        const pounds = Math.floor(this.price / 100);
        const pence = this.price % 100;
        return (pounds > 0 ? `${this.name}. ${pounds} ${pounds === 1 ? 'pound': 'pounds'}` : '')
            + (pounds > 0 && pence > 0 ? ' and ' : '')
            + (pence > 0 ? `${pence} pence` : '');
    }
    
    constructor(params = {}) {
        _.forOwn(this, (__, key) => {
            if (params[key]) {
                this[key] = params[key];
            }
        });
    }
}
