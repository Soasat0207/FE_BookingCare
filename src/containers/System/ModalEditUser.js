import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:'',
            email:'',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }
    componentDidMount() {
        let { currentUser } = this.props;
        if(currentUser && !_.isEmpty(currentUser)){
            this.setState({
                id:currentUser.id,
                email:currentUser.email,
                password: '1',
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                address: currentUser.address,
            })
        }
    }
    handleOnchangeInput=(event,id) => {
       let copyState = {...this.state};
       copyState[id] = event.target.value;
       this.setState({
           ...copyState,
       });
    }
    handleSaveUser = () => {
        let isValid = this.checkValidInput();
        if( isValid === true) {
            this.props.editUser(this.state);
        }
        
    }
    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['email','password','firstName','lastName','address'];
        for (let i = 0 ; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
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
                    <ModalHeader toggle={() => { this.toggle() }}>edit a new user</ModalHeader>
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
                                disabled
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
                                disabled
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
                         onClick={() => { this.handleSaveUser() }}>Save Changes</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



