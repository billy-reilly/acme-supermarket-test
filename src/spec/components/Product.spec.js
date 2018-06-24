import React from 'react';
import { shallow } from 'enzyme';

import ProductModel from '../../models/Product';
import Discount from '../../models/Discount';

import Product from '../../components/Product';

jest.mock('../../helpers/formatPrice');

describe('<Product />', () => {
    const product = new ProductModel({
        name: 'Product!',
        price: 100,
        code: 'CODE'
    });
    it('should render the product name and price', () => {
        const wrapper = shallow(<Product product={ product } discounts={ []} />);
        expect(wrapper.find('.product-content__wrapper .product-title')).toExist();
        expect(wrapper.find('.product-content__wrapper .product-title')).toHaveText('Product!');
        expect(wrapper.find('.product-content__wrapper .product-price')).toExist();
        expect(wrapper.find('.product-content__wrapper .product-price')).toHaveText('£[price]');
    });

    it('should render an add to basket button', () => {
        const wrapper = shallow(<Product product={ product } discounts={ []} />);
        expect(wrapper.find('.add-product-button')).toExist();
    });

    it('should render a screen reader description inside of the button', () => {
        jest.spyOn(product, 'getScreenReaderDescription').mockReturnValue('sr description');
        const wrapper = shallow(<Product product={ product } discounts={ []} />);
        expect(wrapper.find('.add-product-button span.sr-only')).toHaveText('sr description. Click to ');
    });

    it('should call its addToBasket prop when the button is clicked', () => {
        const addSpy = jest.fn();
        const wrapper = shallow(<Product product={ product } discounts={ [] } addToBasket={ addSpy } />);
        expect(addSpy).not.toHaveBeenCalled();
        wrapper.find('.add-product-button').prop('onClick')();
        expect(addSpy).toHaveBeenCalled();
    });

    it('should not render a discount description if a discount does not exist for the product', () => {
        const discount = new Discount({ productCode: 'CODE', description: 'discount description' });
        const wrapper = shallow(<Product product={ product } discounts={ [] } />);
        expect(wrapper.find('.discount-description')).not.toExist();
    });

    it('should render a discount description if a discount exists for that product', () => {
        const discount = new Discount({ productCode: 'CODE', description: 'discount description' });
        const wrapper = shallow(<Product product={ product } discounts={ [discount] } />);
        expect(wrapper.find('.discount-description')).toExist();
        expect(wrapper.find('.discount-description')).toHaveText('discount description');
    });
});
