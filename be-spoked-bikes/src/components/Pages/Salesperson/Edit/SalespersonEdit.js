import React, { Component, ReactDOM } from 'react';
import axios from '../../../../axios';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../../UI/Spinner/Spinner';
import Button from '../../../UI/Button/Button';
import classes from './SalespersonEdit.module.css';

class SalespersonEdit extends Component {

    state = {
        salesperson: null,
        error: false
    }

    componentDidMount () {
        console.log('[SalespersonEdit] props = ', this.props);
        const pathname = this.props.location.pathname;
        axios.get('/api/Salespersons/' + pathname.substring(pathname.lastIndexOf('/'), pathname.length))
            .then(response => {
                this.setState({ salesperson: response.data });
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
        
        const updatedSalesperson = {
            ...this.state.salesperson
        };
        const updatedFormElement = {
            ...updatedSalesperson[id]
        };
        //updatedFormElement.value = event.target.value;
        //console.log(typeof(updatedFormElement));
        updatedSalesperson[id] = updatedFormElement;
        this.setState({ salesperson: updatedSalesperson });
    }

    submitHandler = ( event ) => {
        this.state.inputs.map( function(item, i) {
          console.log(ReactDOM.findDOMNode(this.refs['input-' + i]).value);
        }.bind(this))

        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.salespersonForm) {
            formData[formElementIdentifier] = this.state.salespersonForm[formElementIdentifier].value;
        }
        const submission = {
            formData: formData
        }
        const pathname = this.props.location.pathname;
        console.log(formData);
        axios.put(
            '/api/Salespersons/' + pathname.substring(pathname.lastIndexOf('/'), pathname.length), formData)
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
        this.props.history.push('/salespersons');
    }

    render() {
        let form = null;
        if (this.state.salesperson) {
            form = (
                <ul className={ classes.Form }>
                    <li>
                        <ul>
                            <li>First Name:</li>
                            <li><input type="text" name="FirstName" defaultValue={this.state.salesperson.FirstName} onChange={(event) => this.inputChangeHandler(event, 'FirstName')} /></li>
                        </ul>
                        <ul>
                            <li>Last Name:</li>
                            <li><input type="text" name="LastName" defaultValue={this.state.salesperson.LastName} onChange={this.inputChangeHandler} /></li>
                        </ul>
                        <ul>
                            <li>Address:</li>
                            <li><textarea name="Address" defaultValue={this.state.salesperson.Address} onChange={this.inputChangeHandler} /></li>
                        </ul>
                        <ul>
                            <li>Phone:</li>
                            <li><input type="text" name="Phone" defaultValue={this.state.salesperson.Phone} onChange={this.inputChangeHandler} /></li>
                        </ul>
                        <ul>
                            <li>Manager:</li>
                            <li><input type="text" name="Manager" defaultValue={this.state.salesperson.Manager} onChange={this.inputChangeHandler} /></li>
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
                    <h3>Edit Salesperson</h3>
                    {form}
                    <Button 
                        btnType="Danger"
                        clicked={this.editCancelled}>CANCEL</Button>
                    <Button 
                        btnType="Success"
                        clicked={this.props.editContinued}>CONTINUE</Button>
                </form>
            </Aux>
        );
    }
}

export default SalespersonEdit;