import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import axios from '../../../axios';
import Spinner from '../../UI/Spinner/Spinner';
import SalespersonEdit from './Edit/SalespersonEdit';
import { Route, NavLink, Switch } from 'react-router-dom';
import classes from './Salespersons.module.css';

class Salespersons extends Component {

    state = {
        salespersons: null,
        selectedSalesperson: null,
        loading: true,
        error: null,
        editing: false
    };

    componentDidMount () {
        axios.get('/api/Salespersons')
            .then(response => {
                this.setState({ salespersons: response.data });
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
        if (this.state.salespersons) {
            list = (
                <Aux>
                    <ul className={ classes.List }>
                        <li>
                            <ul>
                                <li>First Name</li>
                                <li>Last Name</li>
                                <li>Address</li>
                                <li>Phone</li>
                                <li>Action</li>
                            </ul>
                            {this.state.salespersons.map(salesperson => {
                                //console.log("salesperson: ", salesperson);
                                return (
                                    <ul key={salesperson.Id}>
                                        <li>{salesperson.FirstName}</li>
                                        <li>{salesperson.LastName}</li>
                                        <li>{salesperson.Address}</li>
                                        <li>{salesperson.Phone}</li>
                                        <li>
                                            <NavLink to={'/salesperson/' + salesperson.Id }>Edit</NavLink>
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
                    <Route path={'/salesperson/:id'} exact component={SalespersonEdit} />
                </Switch>
            </Aux>
        );
    }
}

export default Salespersons;