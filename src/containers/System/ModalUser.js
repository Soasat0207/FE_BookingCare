import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter'
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listenToEmitter();
    }
    listenToEmitter(){
                emitter.on('EVENT_CLEAR_MODAL_DATA',() => {
                    this.setState({
                        email:'',
                        password: '',
                        firstName: '',
                        lastName: '',
                        address: '',
                    });
                }) 
    }
    componentDidMount() {
    }
    handleOnchangeInput=(event,id) => {
       let copyState = {...this.state};
       copyState[id] = event.target.value;
       this.setState({
           ...copyState,
       });
    }
    handleAddNewUser = () => {
        let isValid = this.checkValidInput();
        if( isValid === true) {
            this.props.createNewUser(this.state);
        }
        
    }
    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['email','password','firstName','lastName','address'];
        for (let i = 0 ; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid =false;
                alert('missing parmater: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    toggle = () => {
        this.props.toggle();
    }

    render() {
     
        return (
            <>
                <Modal
                    isOpen={this.props.idOpen}
                    toggle={() => { this.toggle() }}
                    className="modal-user-container"
                    size="lg"
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                    <ModalBody>
                        <div className="modal-user-body">
                            <div className="input-container">
                                <label >Email</label>
                                <input 
                                type="email" 
                                className="form-control" 
                                name="email"
                                placeholder="Email" 
                                onChange={(event) => {this.handleOnchangeInput(event,'email')}}
                                value={this.state.email}
                                />
                            </div>
                            <div className="input-container">
                                <label >Password</label>
                                <input 
                                type="password" 
                                className="form-control" 
                                name="password" 
                                placeholder="Password"  
                                onChange={(event) => {this.handleOnchangeInput(event,'password')}}
                                value={this.state.password}
                                />
                            </div>
                            <div className="input-container">
                                <label >first name</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="firstName" 
                                placeholder="first name" 
                                onChange={(event) => {this.handleOnchangeInput(event,'firstName')}}
                                value={this.state.firstName}
                                />
                            </div>
                            <div className="input-container">
                                <label >Last name</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="lastName" 
                                placeholder="Last name"  
                                onChange={(event) => {this.handleOnchangeInput(event,'lastName')}}
                                value={this.state.lastName}
                                
                                />
                            </div>
                            <div className="input-container max-width-input">
                                <label >address</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="address" 
                                placeholder="address"  
                                onChange={(event) => {this.handleOnchangeInput(event,'address')}}
                                value={this.state.address}
                                />
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button 
                        color="primary" 
                        className="px-3"
                         onClick={() => { this.handleAddNewUser() }}>Add new</Button>{' '}
                        <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Close</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



