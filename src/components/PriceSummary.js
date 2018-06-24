import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import formatPrice from '../helpers/formatPrice';
import Basket from '../models/Basket';

export default function PriceSummary ({ basket }) {
    const totalPreDiscount = formatPrice(basket.getTotalPricePreDiscount());
    const totalPostDiscount = formatPrice(basket.total());
    return (
        <Grid fluid>
            <Row>
                <Col sm={ 5 } smOffset={ 7 }>
                    <table className='basket-total-summary'>
                        <tbody>
                            <tr className='basket-subtotal-row'>
                                <td>Subtotal: </td>
                                <td>£{ totalPreDiscount }</td>
                            </tr>
                            <tr className='basket-total-row'>
                                <td>Total: </td>
                                <td>£{ totalPostDiscount }</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Grid>
    );
}

PriceSummary.propTypes = {
    basket: PropTypes.instanceOf(Basket).isRequired
};
