import React, { Component, ReactDOM } from 'react';
import axios from '../../../../axios';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../../UI/Spinner/Spinner';
import Button from '../../../UI/Button/Button';
import classes from './ProductsEdit.module.css';

class ProductsEdit extends Component {

    state = {
        id: null,
        name: null,
        manufacturer: null,
        style: null,
        purchasePrice: null,
        salePrice: null,
        qtyOnHand: null,
        commissionPercentage: 0,
        product: null,
        error: false
    }

    componentDidMount () {
        console.log('[ProductsEdit] props = ', this.props);
        const pathname = this.props.location.pathname;
        axios.get('/api/Products/' + pathname.substring(pathname.lastIndexOf('/'), pathname.length))
            .then(response => {
                console.log(response.data);
                this.setState({ product: response.data });
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: true })
            });
    }

    productNameChangeHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    productManufacturerChangeHandler = (event) => {
        this.setState({ manufacturer: event.target.value });
    }

    productStyleChangeHandler = (event) => {
        this.setState({ style: event.target.value });
    }

    productPurchasePriceChangeHandler = (event) => {
        this.setState({ purchasePrice: event.target.value });
    }

    productSalePriceChangeHandler = (event) => {
        this.setState({ salePrice: event.target.value });
    }

    productQtyOnHandChangeHandler = (event) => {
        this.setState({ qtyOnHand: event.target.value });
    }

    productCommissionPercentageChangeHandler = (event) => {
        this.setState({ commissionPercentage: event.target.value });
    }

    inputChangeHandler = (event, id) => {
        // var stateObject = function() {
        //     let returnObj = {
        //         ...this.state
        //     };
        //     returnObj[this.target.name] = this.target.value;
        //        return returnObj;
        //   }.bind(event)();
        // console.log(this.state);
        // this.setState({ stateObject })
        console.log(this.state);
        //this.setState({ [event.target.name]: event.target.value});
        
        const updatedSale = {
            ...this.state.sales
        };
        const updatedFormElement = {
            ...updatedSale[id]
        };
        //updatedFormElement.value = event.target.value;
        //console.log(typeof(updatedFormElement));
        updatedSale[id] = updatedFormElement;
        this.setState({ sale: updatedSale });
    }

    submitHandler = ( event ) => {
        const formData = {
            Id: this.state.id,
            ProductId: this.state.product,
            CustomerId: this.state.customer,
            SalespersonId: this.state.salesperson,
            SalesDate: this.state.salesDate

        };
        const pathname = this.props.location.pathname;
        console.log(formData);
        console.log(formData);
        axios.put(
            '/api/Sales/' + pathname.substring(pathname.lastIndexOf('/'), pathname.length), formData)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false, error: true })
            });
    }

    editCancelled = () => {
        this.props.history.push('/products');
    }

    render() {
        let form = null;
        if (this.state.product) {
            form = (
                <ul className={ classes.Form }>
                    <li>
                        <ul>
                            <li>Name:</li>
                            <li><input type="text" name="Name" defaultValue={this.state.product.Name} onChange={(event) => this.productNameChangeHandler(event)} /></li>
                        </ul>
                        <ul>
                            <li>Manufacturer:</li>
                            <li><input type="text" name="Manufacturer" defaultValue={this.state.product.Manufacturer} onChange={(event) => this.productManufacturerChangeHandler(event)} /></li>
                        </ul>
                        <ul>
                            <li>Style:</li>
                            <li><input type="text" name="Style" defaultValue={this.state.product.Style} onChange={(event) => this.productStyleChangeHandler(event)} /></li>
                        </ul>
                        <ul>
                            <li>Purchase Price:</li>
                            <li><input type="text" name="PurchasePrice" defaultValue={this.state.product.PurchasePrice} onChange={(event) => this.productPurchasePriceChangeHandler(event)} /></li>
                        </ul>
                        <ul>
                            <li>Sale Price:</li>
                            <li><input type="text" name="SalePrice" defaultValue={this.state.product.SalePrice} onChange={(event) => this.productSalePriceChangeHandler(event)} /></li>
                        </ul>
                        <ul>
                            <li>Qty on Hand:</li>
                            <li><input type="number" name="QtyOnHand" defaultValue={this.state.product.QtyOnHand} onChange={(event) => this.productQtyOnHandChangeHandler(event)} /></li>
                        </ul>
                        <ul>
                            <li>Commission %:</li>
                            <li><input type="number" name="CommissionPercentage" defaultValue={this.state.product.CommissionPercentage} onChange={(event) => this.productCommissionPercentageChangeHandler(event)} /></li>
                        </ul>
                    </li>
                </ul>
            );
        } else if (this.state.error) {
            form = (
                <div>An error has occurred.</div>
            );
        } else {
            form = <Spinner />;
        }
        return (
            <Aux>
                <form onSubmit={this.submitHandler}>
                    <h3>Edit Product</h3>
                    {form}
                    <Button 
                        btnType="btn-warning"
                        clicked={this.editCancelled}>CANCEL</Button>&nbsp;
                    <Button 
                        btnType="btn-primary"
                        clicked={this.props.editContinued}>CONTINUE</Button>
                </form>
            </Aux>
        );
    }
}

export default ProductsEdit;