import React from 'react';
import { shallow } from 'enzyme';

import QuantityInput from '../../components/QuantityInput';

describe('<QuantityInput />', () => {
    it('should render the quantity', () => {
        const wrapper = shallow(<QuantityInput quantity={ 6 } />);
        expect(wrapper.find('span.quantity-value')).toExist();
        expect(wrapper.find('span.quantity-value')).toHaveText('6');
    });

    it('should render an add and a remove button', () => {
        const wrapper = shallow(<QuantityInput quantity={ 1 } />);
        expect(wrapper.find('Button').length).toBe(2);
        expect(wrapper.find('Button').find({ glyph: 'minus-sign' })).toExist();
        expect(wrapper.find('Button').find({ glyph: 'plus-sign' })).toExist();
    });

    it('should call its removeProduct prop when the remove button is clicked', () => {
        const removeSpy = jest.fn();
        const wrapper = shallow(<QuantityInput quantity={ 1 } removeProduct={ removeSpy } />);
        expect(removeSpy).not.toHaveBeenCalled();
        wrapper.find('Button').filterWhere(node => node.find({ glyph: 'minus-sign' }).length).prop('onClick')();
        expect(removeSpy).toHaveBeenCalled();
    });

    it('should call its addProduct prop when the add button is clicked', () => {
        const addSpy = jest.fn();
        const wrapper = shallow(<QuantityInput quantity={ 1 } addProduct={ addSpy } />);
        expect(addSpy).not.toHaveBeenCalled();
        wrapper.find('Button').filterWhere(node => node.find({ glyph: 'plus-sign' }).length).prop('onClick')();
        expect(addSpy).toHaveBeenCalled();
    });
});
