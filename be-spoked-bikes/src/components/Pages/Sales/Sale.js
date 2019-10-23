import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import axios from '../../../axios';

class Sale extends Component {

    state = {
        id: null,
        productId: null,
        salesPersonId: null,
        customerId: null,
        salesDate: null,
        customer: null,
        product: null,
        salesperson: null,
        loading: false,
        error: null
    };

    componentDidMount () {
        axios.get('/api/Sale/' + this.props.id)
            .then(response => {
                this.setState({
                    id: response.data.Id,
                    productId: response.data.ProductId,
                    salesPersonId: response.data.SalesPersonId,
                    customerId: response.data.CustomerId,
                    product: response.data.Product,
                    salesperson: response.data.Salesperson
                })
                //this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            });
    }

    updatePersonHandler = ( id ) => {
        this.setState({ loading: true });
    }

    render() {

        return (
            <Aux>
                <div>
                    <div>
                        <div>Product: {this.state.product}</div>
                        <div>Customer: {this.state.customer}</div>
                        <div>Sale Date: {this.state.salesDate}</div>
                        <div>Salesperson: {this.state.salesPerson}</div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Sale;