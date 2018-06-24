import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Table from 'react-bootstrap/lib/Table';

import BasketModel from '../models/Basket';

import BasketItem from './BasketItem';
import PriceSummary from './PriceSummary';

export default function Basket ({ basket, addProduct, removeProduct }) {
    return (
        <Col xs={ 12 }>
            <Panel className='basket-panel'>
                <Panel.Heading className='text-left'>
                    <h2 className='basket-title'>Your basket</h2>
                </Panel.Heading>
                <Table>
                    <tbody>
                        { basket.getAddedProductCodes().map((productCode) =>
                            <BasketItem key={ productCode }
                                product={ basket.productsAvailable.find(product => product.code === productCode) }
                                basket={ basket }
                                addProduct={ addProduct }
                                removeProduct={ removeProduct } />)
                        }
                        <tr>
                            <td>
                                { basket.isEmpty() ?
                                    <em>Your basket is currently empty</em>
                                    : <PriceSummary basket={ basket } />
                                }
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Panel>
        </Col>
    );
}

Basket.propTypes = {
    basket: PropTypes.instanceOf(BasketModel).isRequired,
    addProduct: PropTypes.func,
    removeProduct: PropTypes.func
};

Basket.defaultProps = {
    addProduct: _.noop,
    removeProduct: _.noop
};
