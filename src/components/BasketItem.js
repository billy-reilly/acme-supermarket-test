import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import formatPrice from '../helpers/formatPrice';
import Product from '../models/Product';
import Basket from '../models/Basket';

import QuantityInput from './QuantityInput';

export default function BasketItem ({ product, basket, addProduct, removeProduct }) {
    const quantity = basket.productsAdded.get(product.code);
    if (quantity < 1) { return null; }
    const discount = basket.getProductDiscount(product);
    return (
        <tr>
            <td>
                <Grid fluid>
                    <Row>
                        <Col xs={ 5 } sm={ 3 } className='text-left'>
                            <p className='basket-item-name'>{ product.name }</p>
                        </Col>
                        <Col xs={ 7 } sm={ 3 } className='text-right'>
                            <QuantityInput quantity={ quantity }
                                addProduct={ addProduct(product) }
                                removeProduct={ removeProduct(product) } />
                        </Col>
                        <Col sm={1} className='hidden-xs' />
                        <Col xs={ 6 } sm={ 3 } className='text-left'>
                            { discount > 0 &&
                                <p className='basket-item-discount'>
                                    Saving £{ formatPrice(discount) }
                                </p>
                            }
                        </Col>
                        <Col xs={ 6 } sm={ 2 } className='text-right'>
                            <p className='basket-item-price'>
                                £{ formatPrice(basket.getProductPricePostDiscount(product)) }
                            </p>
                        </Col>
                    </Row>
                </Grid>
            </td>
        </tr>
    );
}

BasketItem.propTypes = {
    product: PropTypes.instanceOf(Product).isRequired,
    basket: PropTypes.instanceOf(Basket).isRequired,
    addProduct: PropTypes.func,
    removeProduct: PropTypes.func
};

BasketItem.defaultProps = {
    addProduct: _.noop,
    removeProduct: _.noop
};
