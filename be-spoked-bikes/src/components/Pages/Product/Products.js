import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import axios from '../../../axios';
import Spinner from '../../UI/Spinner/Spinner';
import ProductsEdit from './Edit/ProductsEdit';
import { Route, NavLink, Switch } from 'react-router-dom';
import classes from './Products.module.css';

class Products extends Component {

    state = {
        products: null,
        selectedProduct: null,
        loading: true,
        error: null,
        editing: false
    };

    componentDidMount () {
        axios.get('/api/Products')
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            });
    }

    editCancelHandler = () => {
        //this.setState({editing: false});
    }

    editContinueHandler = () => {
        //this.setState({editing: true});
    }

    salesPersonEditHandler = (product) => {
        //this.setState({selectedSalesperson: salesperson, editing: true})
    }

    render() {
        //let salesPersonEdit = null;
        let list = this.state.error ? <p>Data can't be loaded</p> : <Spinner />;
        if (this.state.products) {
            list = (
                <Aux>
                    <ul className={ classes.List }>
                        <li>
                            <ul>
                                <li>Name</li>
                                <li>Manufacturer</li>
                                <li>Style</li>
                                <li>Purchase Price</li>
                                <li>Sale Price</li>
                                <li>Qty on Hand</li>
                                <li>Commission %</li>
                                <li>Action</li>
                            </ul>
                            {this.state.products.map(product => {
                                //console.log("salesperson: ", salesperson);
                                return (
                                    <ul key={product.Id}>
                                        <li>{product.Name}</li>
                                        <li>{product.Manufacturer}</li>
                                        <li>{product.Style}</li>
                                        <li>{product.PurchasePrice.toFixed(2)}</li>
                                        <li>{product.SalePrice.toFixed(2)}</li>
                                        <li>{product.QtyOnHand}</li>
                                        <li>{product.CommissionPercentage}</li>
                                        <li>
                                            <NavLink to={'/product/' + product.Id }>Edit</NavLink>
                                        </li>
                                    </ul>
                                )
                            })}
                        </li>
                    </ul>
                </Aux>
            );

        }
        return (
            <Aux>
                {list}
                <Switch>
                    <Route path={'/product/:id'} exact component={ProductsEdit} />
                </Switch>
            </Aux>
        );
    }
}

export default Products;