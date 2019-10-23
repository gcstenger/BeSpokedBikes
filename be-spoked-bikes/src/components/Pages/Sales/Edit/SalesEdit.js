import React, { Component, ReactDOM } from 'react';
import axios from '../../../../axios';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../../UI/Spinner/Spinner';
import Button from '../../../UI/Button/Button';
import classes from './SalesEdit.module.css';

class SalesEdit extends Component {

    state = {
        sales: null,
        error: false
    }

    componentDidMount () {
        console.log('[SalesEdit] props = ', this.props);
        const pathname = this.props.location.pathname;
        axios.get('/api/Sales/' + pathname.substring(pathname.lastIndexOf('/'), pathname.length))
            .then(response => {
                this.setState({ sales: response.data });
            })
            .catch(error => {
                console.log(error);
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

    render() {
        let form = null;
        if (this.state.sale) {
            form = (
                <ul className={ classes.Form }>
                    <li>
                        <ul>
                            <li>Product:</li>
                            <li><input type="text" name="Product" defaultValue={this.state.sales.Product} onChange={(event) => this.inputChangeHandler(event, 'Product')} /></li>
                        </ul>
                        <ul>
                            <li>Customer:</li>
                            <li><input type="text" name="Customer" defaultValue={this.state.sales.Customer} onChange={this.inputChangeHandler} /></li>
                        </ul>
                        <ul>
                            <li>Salesperson:</li>
                            <li><input type="text" name="Salesperson" defaultValue={this.state.salesperson.Salesperson} onChange={this.inputChangeHandler} /></li>
                        </ul>
                        <ul>
                            <li>Sale Date:</li>
                            <li><input type="text" name="SalesDate" defaultValue={this.state.salesperson.SalesDate} onChange={this.inputChangeHandler} /></li>
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
                    <h3>Edit Sale</h3>
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