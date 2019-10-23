import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import axios from '../../../axios';

class Product extends Component {

    state = {
        id: null,
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        startDate: null,
        terminationDate: null,
        manager: '',
        loading: false,
        error: null
    };

    componentDidMount () {
        axios.get('/api/Salespersons/' + this.props.id)
            .then(response => {
                this.setState({
                    id: response.data.Id,
                    firstName: response.data.FirstName,
                    lastName: response.data.LastName,
                    address: response.data.Address,
                    phone: response.data.Phone,
                    startDate: response.data.StartDate,
                    terminationDate: response.data.TerminationDate,
                    manager: response.data.Manager
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
                        <div>First Name: {this.state.firstName}</div>
                        <div>Last Name: {this.state.lastName}</div>
                        <div>Address: {this.state.address}</div>
                        <div>Phone: {this.state.phone}</div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Product;