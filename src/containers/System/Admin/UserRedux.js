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
            isOpenLightBox:false
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux){
            this.setState({
                genderArr:this.props.genderRedux                
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            this.setState({
                positionArr:this.props.positionRedux                
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            this.setState({
                roleArr:this.props.roleRedux                
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
    render() {
    let genders = this.state.genderArr;
    let role = this.state.roleArr;
    let position = this.state.positionArr;
    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender;
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
                                   <label htmlFor=""><FormattedMessage id="manage-user.email"/> </label>
                                   <input className="form-control" type="text" />
                               </div>
                               <div className="mt-2 col-3">
                                   <label htmlFor=""><FormattedMessage id="manage-user.password"/> </label>
                                   <input className="form-control" type="password" />
                               </div>
                               <div className="mt-2 col-3">
                                   <label htmlFor=""><FormattedMessage id="manage-user.first_name"/> </label>
                                   <input className="form-control" type="text" />
                               </div>
                               <div className="mt-2 col-3">
                                   <label htmlFor=""> <FormattedMessage id="manage-user.last_name"/> </label>
                                   <input className="form-control" type="text" />
                               </div>
                               <div className="mt-2 col-3">
                                   <label htmlFor=""><FormattedMessage id="manage-user.phone-number"/> </label>
                                   <input className="form-control" type="text" />
                               </div>
                               <div className="mt-2 col-9">
                                   <label htmlFor=""><FormattedMessage id="manage-user.address"/> </label>
                                   <input className="form-control" type="text" />
                               </div>
                               <div className="mt-2 col-3">
                                   <label htmlFor=""><FormattedMessage id="manage-user.position"/> </label>
                                   <select className="form-control">
                                        {position&& position.length > 0 && position.map((item,index)=>{
                                           return(
                                               <option key={index} value={index}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                           )
                                        })}
                                    </select>
                               </div>
                               <div className="mt-2 col-3">
                                   <label htmlFor=""><FormattedMessage id="manage-user.role"/> </label>
                                   <select className="form-control">
                                        {role&& role.length > 0 && role.map((item,index)=>{
                                           return(
                                               <option key={index} value={index}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                           )
                                        })}
                                    </select>
                               </div>
                               <div className="mt-2 col-3">
                                   <label htmlFor=""><FormattedMessage id="manage-user.gender"/> </label>
                                   <select className="form-control">
                                       {genders&& genders.length > 0 && genders.map((item,index)=>{
                                           return(
                                               <option key={index} value={index}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                           )
                                       })}
                                    </select>
                               </div>
                               <div className="mt-2 col-3">
                                    <label htmlFor=""><FormattedMessage id="manage-user.image"/> </label>
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
                                   <button className="btn btn-primary"><FormattedMessage id="manage-user.save"/> </button>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);