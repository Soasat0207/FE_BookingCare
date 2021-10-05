import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from "../../services/userService"
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            isShowpassword:false,
            errorMessage:'',
        }
    }
    handleOnchangeInputUserName= (event) => {
        this.setState({
            username: event.target.value,
        })

    }
    handleOnchangeInputPassword= (event) =>{
        this.setState({
            password: event.target.value,
        })
    }
    handleOnKeyEnter = (event) => {
        if(event.key === 'Enter'){
            this.handLogin();
        }
    }
    handLogin = async() =>{
        this.setState({
            errorMessage:'',
        })
        try {
            let data =  await handleLoginApi(this.state.username,this.state.password);
            if(data && data.errCode !==0){
                this.setState({
                    errorMessage:data.message,
                })
            }
            if(data && data.errCode === 0 ){
                this.props.userLoginSuccess(data.user);
                // userLoginSuccess
                console.log('login success')
            }
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errorMessage:error.response.data.message,
                    })
                }
            }       
        }
    }
    handleShoweyePassword =() =>{
        this.setState({
            isShowpassword:!this.state.isShowpassword,
        })
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input 
                            type="text" 
                            className="form-control " 
                            placeholder="Username" 
                            defaultValue={this.state.username}
                            onChange={(event)=>{this.handleOnchangeInputUserName(event)}}
                            onKeyPress={(event)=>{this.handleOnKeyEnter(event)}}
                            />

                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input 
                                type={this.state.isShowpassword ?'text':'password'} 
                                className="form-control " 
                                placeholder="Password" 
                                defaultValue={this.state.password} 
                                onChange={(event)=>{this.handleOnchangeInputPassword(event)}}
                                onKeyPress={(event)=>{this.handleOnKeyEnter(event)}}
                                />
                                <span onClick={()=>{this.handleShoweyePassword()}}>
                                    <i className={this.state.isShowpassword ? "far fa-eye-slash"  : "far fa-eye"}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12"style={{color:'red'}}>{this.state.errorMessage}</div>
                        <div className="col-12">
                            <button 
                            className=" btn-login"
                            onClick={()=>{this.handLogin()}}
                            >Login</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password</span>
                        </div>
                        <div className="col-12 text-center">
                            <span className="text-other-login">Or Login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
            
        )

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess:(userInfo)=> dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
