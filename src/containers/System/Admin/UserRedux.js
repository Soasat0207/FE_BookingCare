import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeServices } from '../../../services/userService';
import { LANGUAGE } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableMangagerUser from './TableMangagerUser'
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImgUrl: '',
            isOpenLightBox: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            validError: {
                addressError: null,
                emailError: null,
                firstNameError: null,
                lastNameError: null,
                passwordError: null,
                phoneNumberError: null,
            }
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: this.props.positionRedux,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''

            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : ''

            })
        }
        if (prevProps.users !== this.props.users) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            })
        }
    }
    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: file,
            })
        }
    }
    handleOpenLightbox = () => {
        if (!this.state.previewImgUrl) {
            return
        }
        else {
            this.setState({
                isOpenLightBox: !this.state.isOpenLightBox,
            })
        }

    }
    handleSaveUser = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        else {
            await this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                role: this.state.role,
                phoneNumber: this.state.phoneNumber,
                position: this.state.position,
            });
            this.props.fetchAllUsersStart();
        }
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        let regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        let regexEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                this.setError(arrCheck[i], "This field cannot be empty");
            }
            else {
                this.setError(arrCheck[i], null);
            }
        }
        if (this.state.email.length > 0 && !regexEmail.test(this.state.email)) {
            this.setError('email', "Please enter a valid email address");
            isValid = false;
        }
        if (this.state.email.length > 0 && regexEmail.test(this.state.email)) {
            this.setError('email', null);
        }
        if (this.state.phoneNumber.length > 0 && !regexPhoneNumber.test(this.state.phoneNumber)) {
            isValid = false;
            this.setError('phoneNumber', "Please enter a valid Phone Number address");
        }
        if (this.state.phoneNumber.length > 0 && regexPhoneNumber.test(this.state.phoneNumber)) {
            this.setError('phoneNumber', null)
        };
        return isValid;
    }
    setError = (fieldName, error) => {
        let keyState = fieldName + "Error";
        this.setState((prevState) => ({
            validError: {
                ...prevState.validError,
                [keyState]: error
            }
        }))
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state
        return (
            <Fragment>
                <div className="user-redux-container">
                    <div className="title">
                        User Redux
                    </div>
                    <div>{isLoadingGender === true ? 'loading' : ''}</div>
                    <div className="user-redux-body" >
                        <div className="container">
                            <div className="row">
                                <div className="col-12"><FormattedMessage id="manage-user.add" /> </div>
                                <div className="mt-2 col-3">
                                    <label><FormattedMessage id="manage-user.email" /> </label>
                                    <input className="form-control" type="email"
                                        value={email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    />
                                    <span>{this.state.validError.emailError === null ? null : this.state.validError.emailError}</span>
                                </div>
                                <div className="mt-2 col-3">
                                    <label><FormattedMessage id="manage-user.password" /> </label>
                                    <input className="form-control" type="password"
                                        value={password}
                                        onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    />
                                    <span>{this.state.validError.passwordError === null ? null : this.state.validError.passwordError}</span>
                                </div>
                                <div className="mt-2 col-3">
                                    <label><FormattedMessage id="manage-user.first_name" /> </label>
                                    <input className="form-control" type="text"
                                        value={firstName}
                                        onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                    />
                                    <span>{this.state.validError.firstNameError === null ? null : this.state.validError.firstNameError}</span>
                                </div>
                                <div className="mt-2 col-3">
                                    <label> <FormattedMessage id="manage-user.last_name" /> </label>
                                    <input className="form-control" type="text"
                                        value={lastName}
                                        onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                    />
                                    <span>{this.state.validError.lastNameError === null ? null : this.state.validError.lastNameError}</span>
                                </div>
                                <div className="mt-2 col-3">
                                    <label><FormattedMessage id="manage-user.phone-number" /> </label>
                                    <input className="form-control" type="text"
                                        value={phoneNumber}
                                        onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                    />
                                    <span>{this.state.validError.phoneNumberError === null ? null : this.state.validError.phoneNumberError}</span>
                                </div>
                                <div className="mt-2 col-9">
                                    <label><FormattedMessage id="manage-user.address" /> </label>
                                    <input className="form-control" type="text"
                                        value={address}
                                        onChange={(event) => { this.onChangeInput(event, 'address') }}
                                    />
                                    <span>{this.state.validError.addressError === null ? null : this.state.validError.addressError}</span>
                                </div>
                                <div className="mt-2 col-3">
                                    <label><FormattedMessage id="manage-user.position" /> </label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'position') }}
                                    >
                                        {positions && positions.length > 0 && positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mt-2 col-3">
                                    <label><FormattedMessage id="manage-user.role" /> </label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    >
                                        {roles && roles.length > 0 && roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mt-2 col-3">
                                    <label><FormattedMessage id="manage-user.gender" /> </label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    >
                                        {genders && genders.length > 0 && genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mt-2 col-3">
                                    <label><FormattedMessage id="manage-user.image" /> </label>
                                    <div className="preview-image-container">
                                        <input
                                            id="previewImg"
                                            type="file"
                                            hidden
                                            onChange={(event) => this.handleOnchangeImage(event)}
                                        />
                                        <label className="label-upload" htmlFor="previewImg">Download <i className="fas fa-download"></i></label>
                                        <div className="preview-image"
                                            style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                            onClick={() => this.handleOpenLightbox()}
                                        ></div>
                                    </div>
                                </div>
                                <div className="mt-3 col-12">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => this.handleSaveUser()}
                                    ><FormattedMessage id="manage-user.save" /> </button>
                                </div>
                            </div>

                            <TableMangagerUser />
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
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.position,
        isLoadingGender: state.admin.isLoadingGender,
        users: state.admin.users,
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
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
