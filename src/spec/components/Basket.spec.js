import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import BasketRecord from '../../models/Basket';
import Product from '../../models/Product';

import Basket from '../../components/Basket';

describe('<Basket />', () => {
    const product1 = new Product({ code: 'CODE1' });
    const product2 = new Product({ code: 'CODE2' });
    const basket = new BasketRecord({
        productsAvailable: [product1, product2],
        productsAdded: new Map({
            'CODE1': 1,
            'CODE2': 2
        })
    });
    const emptyBasket = new BasketRecord();

    it('should render a panel heading', () => {
        const wrapper = shallow(<Basket basket={ basket } />);
        expect(wrapper.find('PanelHeading h2')).toExist();
        expect(wrapper.find('PanelHeading h2')).toHaveText('Your basket');
    });

    it('should render a BasketItem instance for each product in the basket', () => {
        const wrapper = shallow(<Basket basket={ basket } />);
        expect(wrapper.find('BasketItem').length).toBe(2);
        const product1BasketItem = wrapper.find({ product: product1 });
        expect(product1BasketItem.length).toBe(1);
        expect(product1BasketItem).toHaveTagName('BasketItem');
        const product2BasketItem = wrapper.find({ product: product2 });
        expect(product2BasketItem.length).toBe(1);
        expect(product2BasketItem).toHaveTagName('BasketItem');
    });

    it('should render an instance of PriceSummary', () => {
        const wrapper = shallow(<Basket basket={ basket } />);
        expect(wrapper.find('PriceSummary')).toExist();
    });

    it('should render a message instead of the BasketItems & PriceSummary if the basket is empty', () => {
        const wrapper = shallow(<Basket basket={ emptyBasket } />);
        expect(wrapper.find('BasketItem')).not.toExist();
        expect(wrapper.find('PriceSummary')).not.toExist();
        expect(wrapper.find('em')).toHaveText('Your basket is currently empty');
    });

    it('should call its addProduct prop when BasketItem does', () => {
        const addSpy = jest.fn();
        const wrapper = shallow(<Basket basket={ basket } addProduct={ addSpy } />);
        expect(addSpy).not.toHaveBeenCalled();
        wrapper.find({ product: product1 }).prop('addProduct')();
        expect(addSpy).toHaveBeenCalled();
    });

    it('should call its removeProduct prop when BasketItem does', () => {
        const removeSpy = jest.fn();
        const wrapper = shallow(<Basket basket={ basket } removeProduct={ removeSpy } />);
        expect(removeSpy).not.toHaveBeenCalled();
        wrapper.find({ product: product1 }).prop('removeProduct')();
        expect(removeSpy).toHaveBeenCalled();
    });
});
