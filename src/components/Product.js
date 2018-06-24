import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';

import formatPrice from '../helpers/formatPrice';
import ProductModel from '../models/Product';
import Discount from '../models/Discount';

export default function Product ({ product, discounts, addToBasket }) {
    const discount = discounts.find(discount => discount.productCode === product.code);
    return (
        <Col xs={ 12 } sm={ 4 }>
            <Panel className={ classnames('product-panel', { discounted: !!discount }) }>
                <div className='product-content__wrapper'>
                    <h2 className='product-title'>{ product.name }</h2>
                    <h3 className='product-price'>£{ formatPrice(product.price) }</h3>
                </div>
                <Button bsStyle='primary'
                    className='add-product-button'
                    onClick={ addToBasket }>
                    <span className='sr-only'>{ product.getScreenReaderDescription() }. Click to </span>
                    Add to basket
                </Button>
            </Panel>
            { discount &&
                <div className='discount-description'>
                    { discount.description }
                </div>
            }
        </Col>
    );
}

Product.propTypes = {
    product: PropTypes.instanceOf(ProductModel).isRequired,
    discounts: PropTypes.arrayOf(PropTypes.instanceOf(Discount)).isRequired,
    addToBasket: PropTypes.func
};

Product.defaultProps = {
    addToBasket: _.noop
};
