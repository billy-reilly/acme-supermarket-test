import React from 'react';
import { shallow } from 'enzyme';

import Basket from '../../models/Basket';

import PriceSummary from '../../components/PriceSummary';

jest.mock('../../helpers/formatPrice');

describe('<PriceSummary />', () => {
    const basket = new Basket();
    it('should render the subtotal', () => {
        const wrapper = shallow(<PriceSummary basket={ basket } />);
        expect(wrapper.find('table tr.basket-subtotal-row')).toExist();
        expect(wrapper.find('table tr.basket-subtotal-row td').first()).toExist();
        expect(wrapper.find('table tr.basket-subtotal-row td').first()).toHaveText('Subtotal: ');
        expect(wrapper.find('table tr.basket-subtotal-row td').last()).toHaveText('£[price]');
    });

    it('should render the total', () => {
        const wrapper = shallow(<PriceSummary basket={ basket } />);
        expect(wrapper.find('table tr.basket-total-row')).toExist();
        expect(wrapper.find('table tr.basket-total-row td').first()).toExist();
        expect(wrapper.find('table tr.basket-total-row td').first()).toHaveText('Total: ');
        expect(wrapper.find('table tr.basket-total-row td').last()).toHaveText('£[price]');
    });
});
