import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const button = (props) => (
    <button
        onClick={props.clicked}
        className={[props.btnType].join(' ')}>{props.children}</button>
);

export default button;