import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/products">Products</NavigationItem>
        <NavigationItem link="/salespersons">Salespersons</NavigationItem>
        <NavigationItem link="/sales">Sales</NavigationItem>
        <NavigationItem link="/customers">Customers</NavigationItem>
    </ul>
);

export default navigationItems;