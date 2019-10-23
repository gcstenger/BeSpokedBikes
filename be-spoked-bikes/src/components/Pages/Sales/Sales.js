import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import axios from '../../../axios';
import Spinner from '../../UI/Spinner/Spinner';
import SalesEdit from './Edit/SalesEdit';
import SalesNew from './New/SalesNew';
import { Route, NavLink, Switch } from 'react-router-dom';
import classes from './Sales.module.css';
import Button from '../../UI/Button/Button';

class Salespersons extends Component {

    state = {
        sales: null,
        selectedSale: null,
        loading: true,
        error: null,
        editing: false
    };

    componentDidMount () {
        axios.get('/api/Sales')
            .then(response => {
                this.setState({ sales: response.data });
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

    salesPersonEditHandler = (salesperson) => {
        //this.setState({selectedSalesperson: salesperson, editing: true})
    }

    render() {
        //let salesPersonEdit = null;
        let list = this.state.error ? <p>Data can't be loaded</p> : <Spinner />;
        if (this.state.sales) {
            list = (
                <Aux>
                    <ul className={ classes.List }>
                        <li>
                            <ul>
                                <li>Product</li>
                                <li>Customer</li>
                                <li>Salesperson</li>
                                <li>Sale Date</li>
                                <li>Action</li>
                            </ul>
                            {this.state.sales.map(sale => {
                                //console.log("salesperson: ", salesperson);
                                return (
                                    <ul key={sale.Id}>
                                        <li>{sale.FirstName}</li>
                                        <li>{sale.LastName}</li>
                                        <li>{sale.Address}</li>
                                        <li>{sale.Phone}</li>
                                        <li>
                                            <NavLink to={'/sale/' + sale.Id }>Edit</NavLink>
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
                <NavLink 
                    to="/salesnew"
                    >
                    <Button 
                        btnType="btn-primary">New Sale</Button>
                </NavLink>
                <Switch>
                    <Route path={'/sale/:id'} exact component={SalesEdit} />
                    <Route path={'/salesnew'} exact component={SalesNew} />
                </Switch>
            </Aux>
        );
    }
}

export default Salespersons;