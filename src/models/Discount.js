import _ from 'lodash';

export default class Discount {
    productCode = '';
    percentageDiscount = 0;
    calculateDiscountsPermitted = () => 0;
    enabled = true;
    description = '';

    constructor(params = {}) {
        _.forOwn(this, (__, key) => {
            if (params[key]) {
                this[key] = params[key];
            }
        });
    }
}
