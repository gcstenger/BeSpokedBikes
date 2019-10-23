import React from 'react';
import bicycleLogo from '../../assets/images/bicycle.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={bicycleLogo} alt="BeSpokeBikesLogo" style={{height:props.height}} />
    </div>
);

export default logo;