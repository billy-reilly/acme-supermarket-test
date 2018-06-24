import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export default function QuantityInput ({ quantity, addProduct, removeProduct }) {
    return (
        <React.Fragment>
            <Button onClick={ removeProduct }>
                <Glyphicon glyph='minus-sign' />
            </Button>
            <span className='quantity-value'>{ quantity }</span>
            <Button bsStyle='primary' onClick={ addProduct }>
                <Glyphicon glyph='plus-sign' />
            </Button>
        </React.Fragment>
    );
}

QuantityInput.propTypes = {
    quantity: PropTypes.number.isRequired,
    addProduct: PropTypes.func,
    removeProduct: PropTypes.func
};

QuantityInput.defaultProps = {
    addProduct: _.noop,
    removeProduct: _.noop
};
