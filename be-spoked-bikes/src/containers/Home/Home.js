import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Route, Switch } from 'react-router-dom';
import Customers from '../../components/Pages/Customer/Customers';
import Products from '../../components/Pages/Product/Products';
import ProductsEdit from '../../components/Pages/Product/Edit/ProductsEdit';
import Salespersons from '../../components/Pages/Salesperson/Salespersons';
import SalespersonEdit from '../../components/Pages/Salesperson/Edit/SalespersonEdit';
import Sales from '../../components/Pages/Sales/Sales';
import SalesEdit from '../../components/Pages/Sales/Edit/SalesEdit';
import SalesNew from '../../components/Pages/Sales/New/SalesNew';

class Home extends Component {
    render() {
        
        return (
            <Aux>
                <Switch>
                    <Route path="/products" component={Products} />
                    <Route path="/product" component={ProductsEdit} />
                    <Route path="/salespersons" component={Salespersons} />
                    <Route path="/salesperson" component={SalespersonEdit} />
                    <Route path="/customers" component={Customers} />
                    <Route path="/sales" component={Sales} />
                    <Route path="/sale" component={SalesEdit} />
                    <Route path="/salesnew" component={SalesNew} />
                </Switch>
            </Aux>
        )
    }
};

export default Home;