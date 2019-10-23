import React, { Component, ReactDOM } from 'react';
import axios from '../../../../axios';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../../UI/Spinner/Spinner';
import Button from '../../../UI/Button/Button';
import classes from './SalesNew.module.css';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class SalesEdit extends Component {

    state = {
        products: null,
        customers: null,
        salespersons: null,
        sales: {
            product: null,
            salesperson: null,
            customer: null,
            date: null
        },
        error: false
    }

    componentDidMount () {
        axios.get('/api/Products')
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            });
            
        axios.get('/api/Customers')
        .then(response => {
            this.setState({ customers: response.data });
        })
        .catch(error => {
            this.setState({ error: true })
        });
        
        axios.get('/api/Salespersons')
            .then(response => {
                this.setState({ salespersons: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            });
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
        console.log(id);
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
        this.setState({ sales: updatedSale });
    }

    submitHandler = ( event ) => {
        this.state.inputs.map( function(item, i) {
          console.log(ReactDOM.findDOMNode(this.refs['input-' + i]).value);
        }.bind(this))

        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.salesForm) {
            formData[formElementIdentifier] = this.state.salesForm[formElementIdentifier].value;
        }
        // const submission = {
        //     formData: formData
        // }
        const pathname = this.props.location.pathname;
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
        this.props.history.push('/sales');
    }

    saleDateChangeHandler = date => {
        this.setState({
            startDate: date
        });
    }

    render() {
        let products = [{ value: '', label: '--- Please Select a Product---'}];
        if (this.state.products) {
            for (let product in this.state.products) {
                products.push({ value: this.state.products[product].Id, label: this.state.products[product].Name })
            }
        };
        let customers = [{ value: '', label: '--- Please Select a Customer---'}];
        if (this.state.customers) {
            for (let customer in this.state.customers) {
                customers.push({ value: this.state.customers[customer].Id, label: this.state.customers[customer].FirstName + ' ' + this.state.customers[customer].LastName })
            }
        };
        let salespersons = [{ value: '', label: '--- Please Select a Salesperson---'}];
        if (this.state.salespersons) {
            for (let salesperson in this.state.salespersons) {
                salespersons.push({ value: this.state.salespersons[salesperson].Id, label: this.state.salespersons[salesperson].FirstName + ' ' + this.state.salespersons[salesperson].LastName })
            }
        };
        let form = (
            <ul className={ classes.Form }>
                <li>
                    <ul>
                        <li>Product:</li>
                        <li>
                            <select name="Product"
                                defaultValue=""
                                onChange={(event) => this.inputChangeHandler(event, 'Product')}>
                                { products.map(p => {
                                        return (
                                            <option key={'product'+p.value} value={p.value}>{p.label}</option>
                                        )
                                    }
                                )}}
                            </select>
                        </li>
                    </ul>
                    <ul>
                        <li>Customer:</li>
                        <li>
                            <select name="Customer"
                                defaultValue=""
                                onChange={(event) => this.inputChangeHandler(event, 'Customer')}>
                                { customers.map(p => {
                                        return (
                                            <option key={'customer'+p.value} value={p.value}>{p.label}</option>
                                        )
                                    }
                                )}}
                            </select>
                        </li>
                    </ul>
                    <ul>
                        <li>Salesperson:</li>
                        <li>
                            <select name="Salesperson"
                                defaultValue=""
                                onChange={(event) => this.inputChangeHandler(event, 'Salesperson')}>
                                { salespersons.map(p => {
                                        return (
                                            <option key={'salesperson'+p.value} value={p.value}>{p.label}</option>
                                        )
                                    }
                                )}}
                            </select>
                        </li>
                    </ul>
                    <ul>
                        <li>Sale Date:</li>
                        <li>
                            <DatePicker
                                name="SalesDate" 
                                defaultValue="" 
                                selected={this.state.sales.date}
                                onChange={(event) => this.inputChangeHandler(event, 'SalesDate')} />
                        </li>
                    </ul>
                </li>
            </ul>
        );
        return (
            <Aux>
                <form onSubmit={this.submitHandler}>
                    <h3>New Sale</h3>
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

export default SalesEdit;