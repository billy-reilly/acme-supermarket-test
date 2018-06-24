import React from 'react';
import { shallow } from 'enzyme';

import BasketRecord from '../models/Basket';
import ProductModel from '../models/Product';

import App from '../App';

describe('<App />', () => {
    let wrapper;
    const fakeProduct = new ProductModel({ code: 'FAKE1', name: 'Fake product', price: 100 });
    beforeEach(() => {
        wrapper = shallow(<App />);
    });

    it('should have a basket record in its initial state', () => {
        expect(wrapper.state('basket')).toBeInstanceOf(BasketRecord);
    });

    it('should render a header', () => {
        const header = wrapper.find('h1');
        expect(header).toExist();
        expect(header).toHaveText('ACME Supermarket');
    });

    it('should render an instance of Product for each product available', () => {
        const numberOfProducts = wrapper.state('basket').get('productsAvailable').length;
        expect(wrapper.find('Product').length).toBe(numberOfProducts);
    });

    it('should render an instance of the Basket component', () => {
        expect(wrapper.find('Basket')).toExist();
    });

    it('should update the state when Product\'s `addToBasket` prop is called', () => {
        expect(wrapper.state('basket').isEmpty()).toBe(true);
        wrapper.find('Product').first().prop('addToBasket')();
        expect(wrapper.state('basket').isEmpty()).toBe(false);
    });

    it('should update the state when Basket\'s `addProduct` prop is called', () => {
        expect(wrapper.state('basket').isEmpty()).toBe(true);
        wrapper.find('Basket').prop('addProduct')(fakeProduct)();
        expect(wrapper.state('basket').isEmpty()).toBe(false);
        expect(wrapper.state('basket').getQuantity('FAKE1')).toBe(1);
    });

    it('should update the state when Basket\s `removeProduct` prop is called', () => {
        wrapper.find('Basket').prop('addProduct')(fakeProduct)();
        expect(wrapper.state('basket').isEmpty()).toBe(false);
        expect(wrapper.state('basket').getQuantity('FAKE1')).toBe(1)
        wrapper.find('Basket').prop('removeProduct')(fakeProduct)();
        expect(wrapper.state('basket').getQuantity('FAKE1')).toBe(0);
    });
});
