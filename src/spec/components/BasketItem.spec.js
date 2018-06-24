import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import Product from '../../models/Product';
import Basket from '../../models/Basket';

import BasketItem from '../../components/BasketItem';

jest.mock('../../helpers/formatPrice');

describe('<BasketItem />', () => {
    const product = new Product({ code: 'CODE', name: 'generic product' })
    it('should not render anything if the product prop provided has not been added to the basket', () => {
        const emptyBasket = new Basket();
        const wrapper = shallow(<BasketItem basket={ emptyBasket } product={ product } />);
        expect(wrapper.getElement()).toBe(null);
    });

    const basket = new Basket({
        productsAdded: new Map({
            'CODE': 1
        })
    })
    it('should render the product name', () => {
        const wrapper = shallow(<BasketItem basket={ basket } product={ product } />);
        expect(wrapper.find('.basket-item-name')).toExist();
        expect(wrapper.find('.basket-item-name')).toHaveText('generic product');
    });

    it('should render an instance of QuantityInput', () => {
        const wrapper = shallow(<BasketItem basket={ basket } product={ product } />);
        expect(wrapper.find('QuantityInput')).toExist();
        expect(wrapper.find('QuantityInput')).toHaveProp({ quantity: 1 });
    });

    it('should not render the discount if the discount is zero', () => {
        jest.spyOn(basket, 'getProductDiscount').mockReturnValue(0);
        const wrapper = shallow(<BasketItem basket={ basket } product={ product } />);
        expect(wrapper.find('.basket-item-discount')).not.toExist();
    });

    it('should render the discount if the discount is greater than zero', () => {
        jest.spyOn(basket, 'getProductDiscount').mockReturnValue(100);
        const wrapper = shallow(<BasketItem basket={ basket } product={ product } />);
        expect(wrapper.find('.basket-item-discount')).toExist();
        expect(wrapper.find('.basket-item-discount')).toHaveText('Saving £[price]');
    });

    it('should render the price', () => {
        const wrapper = shallow(<BasketItem basket={ basket } product={ product } />);
        expect(wrapper.find('.basket-item-price')).toExist();
        expect(wrapper.find('.basket-item-price')).toHaveText('£[price]');
    });

    it('should call its addProduct prop when QuantityInput does', () => {
        const addInnerSpy = jest.fn();
        const addOuterSpy = jest.fn().mockReturnValue(addInnerSpy);
        const wrapper = shallow(<BasketItem basket={ basket } product={ product } addProduct={ addOuterSpy } />);
        expect(addInnerSpy).not.toHaveBeenCalled();
        wrapper.find('QuantityInput').prop('addProduct')();
        expect(addInnerSpy).toHaveBeenCalled();
        expect(addOuterSpy).toHaveBeenCalledWith(product);
    });

    it('should call its removeProduct prop when QuantityInput does', () => {
        const removeInnerSpy = jest.fn();
        const removeOuterSpy = jest.fn().mockReturnValue(removeInnerSpy);
        const wrapper = shallow(<BasketItem basket={ basket } product={ product } removeProduct={ removeOuterSpy } />);
        expect(removeInnerSpy).not.toHaveBeenCalled();
        wrapper.find('QuantityInput').prop('removeProduct')();
        expect(removeInnerSpy).toHaveBeenCalled();
        expect(removeOuterSpy).toHaveBeenCalledWith(product);
    });
});
