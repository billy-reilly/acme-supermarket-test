import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

import './App.css';
import Basket from './models/Basket';
import { products, discounts } from './constants';

import Product from './components/Product';
import BasketComponent from './components/Basket';

class App extends Component {
    state = {
        basket: new Basket({ productsAvailable: products, discounts })
    };

    addProduct = product => () => {
        this.setState({ basket: this.state.basket.add(product) });
    }

    removeProduct = product => () => {
        this.setState({ basket: this.state.basket.remove(product) })
    }

    render() {
        const { basket } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">ACME Supermarket</h1>
                </header>
                <section className="App-content">
                    <Grid className='content-container'>
                        <Row>
                            { products.map(product =>
                                <Product key={ product.code }
                                    product={ product }
                                    discounts={ discounts }
                                    addToBasket={ this.addProduct(product) } />)
                            }
                        </Row>
                        <Row>
                            <BasketComponent basket={ basket }
                                addProduct={ this.addProduct }
                                removeProduct={ this.removeProduct } />
                        </Row>
                    </Grid>
                </section>
            </div>
        );
    }
}

export default App;
