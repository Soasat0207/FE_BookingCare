import React, { Component,Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeServices} from '../../../services/userService';
import {LANGUAGE} from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr:[],
            roleArr:[],
            positionArr: [],
            previewImgUrl: '',
            isOpenLightBox:false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role:'',
            avatar:'',
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr:this.props.genderRedux,
                gender:arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''               
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr:this.props.positionRedux,
                position:arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''               

            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr:this.props.roleRedux,     
                role:arrRole && arrRole.length > 0 ? arrRole[0].key : ''               

            })
        }
    }
    handleOnchangeImage = (event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl:objectUrl,
                avatar:file,
            }) 
        }
    }
    handleOpenLightbox = ()=>{
        if(!this.state.previewImgUrl){
            return
        }
        else{
            this.setState({
                isOpenLightBox:!this.state.isOpenLightBox,
            })
        }
        
    }
    handleSaveUser = () =>{
        let isValid = this.checkValidateInput();
        if(isValid === false) return;
        else{
            this.props.createNewUser({
                email:this.state.email,
                password:this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address:this.state.address,
                gender:this.state.gender ,
                role: this.state.role,
                phoneNumber: this.state.phoneNumber,
                position:this.state.position,
            });
        }
    }
    onChangeInput = (event,id) =>{
        let copyState = {...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password','firstName','lastName','phoneNumber','address'];
        for(let i = 0 ; i < arrCheck.length ; i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert('this input is required '+ arrCheck[i]);
                break;
            }
        }
        return isValid;
    }
    render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender;
    let {email,password,firstName,lastName,phoneNumber,address,gender,position,role,avatar} = this.state
        return (
            <Fragment>
                <div className="user-redux-container">
                    <div className="title">
                        User Redux
                    </div>
                    <div>{isLoadingGender === true ?'loading':''}</div>
                    <div className="user-redux-body" >
                        <div className="container">
                            <div className="row">
                                <div className="col-12"><FormattedMessage id="manage-user.add"/> </div>
                               <div className="mt-2 col-3">
                                   <label><FormattedMessage id="manage-user.email"/> </label>
                                   <input className="form-control" type="email"
                                   value={email}
                                   onChange={(event)=>{this.onChangeInput(event,'email')}}
                                   />
                               </div>
                               <div className="mt-2 col-3">
                                   <label><FormattedMessage id="manage-user.password"/> </label>
                                   <input className="form-control" type="password" 
                                    value={password}
                                    onChange={(event)=>{this.onChangeInput(event,'password')}}
                                   />
                               </div>
                               <div className="mt-2 col-3">
                                   <label><FormattedMessage id="manage-user.first_name"/> </label>
                                   <input className="form-control" type="text"
                                    value={firstName}
                                    onChange={(event)=>{this.onChangeInput(event,'firstName')}}
                                   />
                               </div>
                               <div className="mt-2 col-3">
                                   <label> <FormattedMessage id="manage-user.last_name"/> </label>
                                   <input className="form-control" type="text"
                                    value={lastName}
                                    onChange={(event)=>{this.onChangeInput(event,'lastName')}}
                                   />
                               </div>
                               <div className="mt-2 col-3">
                                   <label><FormattedMessage id="manage-user.phone-number"/> </label>
                                   <input className="form-control" type="text"
                                    value={phoneNumber}
                                    onChange={(event)=>{this.onChangeInput(event,'phoneNumber')}}
                                   />
                               </div>
                               <div className="mt-2 col-9">
                                   <label><FormattedMessage id="manage-user.address"/> </label>
                                   <input className="form-control" type="text"
                                    value={address}
                                    onChange={(event)=>{this.onChangeInput(event,'address')}}
                                   />
                               </div>
                               <div className="mt-2 col-3">
                                   <label><FormattedMessage id="manage-user.position"/> </label>
                                   <select className="form-control"
                                   onChange={(event)=>{this.onChangeInput(event,'position')}}
                                   >
                                        {positions&& positions.length > 0 && positions.map((item,index)=>{
                                           return(
                                               <option key={index} value={item.key}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                           )
                                        })}
                                    </select>
                               </div>
                               <div className="mt-2 col-3">
                                   <label><FormattedMessage id="manage-user.role"/> </label>
                                   <select className="form-control"
                                    onChange={(event)=>{this.onChangeInput(event,'role')}}
                                   >
                                        {roles&& roles.length > 0 && roles.map((item,index)=>{
                                           return(
                                               <option key={index} value={item.key}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                           )
                                        })}
                                    </select>
                               </div>
                               <div className="mt-2 col-3">
                                   <label><FormattedMessage id="manage-user.gender"/> </label>
                                   <select className="form-control"
                                   onChange={(event)=>{this.onChangeInput(event,'gender')}}
                                   >
                                       {genders&& genders.length > 0 && genders.map((item,index)=>{
                                           return(
                                               <option key={index} value={item.key}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                           )
                                       })}
                                    </select>
                               </div>
                               <div className="mt-2 col-3">
                                    <label><FormattedMessage id="manage-user.image"/> </label>
                                    <div className="preview-image-container">
                                        <input 
                                        id="previewImg" 
                                        type="file" 
                                        hidden 
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                        />
                                        <label className="label-upload" htmlFor="previewImg">Download <i class="fas fa-download"></i></label>
                                        <div className="preview-image"
                                        style={{backgroundImage:`url(${this.state.previewImgUrl})`}}
                                        onClick={()=> this.handleOpenLightbox()}
                                        ></div>
                                    </div>
                               </div>
                               <div className="mt-3 col-12">
                                   <button 
                                   className="btn btn-primary"
                                   onClick={()=>this.handleSaveUser()}
                                   ><FormattedMessage id="manage-user.save"/> </button>
                               </div>
                            </div>
                        </div>
                    </div>

                    {this.state.isOpenLightBox === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpenLightBox: false })}   
                    />}
                </div>

                
            </Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux:state.admin.genders,
        roleRedux:state.admin.roles,
        positionRedux:state.admin.position,
        isLoadingGender:state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux:(language) => dispatch(changeLanguageApp(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
