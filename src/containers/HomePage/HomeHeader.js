import React, {
    Component, Fragment
} from 'react';
import {
    connect
} from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/bookingcare-2020.svg';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';
import { LANGUAGE } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions'
import {withRouter} from 'react-router'

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    returnToHome = () => {
        if(this.props.history){
            this.props.history.push(`/home`)
        }
    }
    render() {
        let language = this.props.language;
        return (
            <Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <img className="header-logo" src={logo} alt=""
                            onClick={this.returnToHome} />
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b> <FormattedMessage id="home-header.specialty" /> </b></div>
                                <div className="subs-title"> <FormattedMessage id="home-header.search-doctor" /></div>
                            </div>
                            <div className="child-content">
                                <div><b> <FormattedMessage id="home-header.health-facility" /></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.select-room" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.select-doctor" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.fee" /></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.check-health" /></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="home-header.support" />
                            </div>
                            <div className={language === LANGUAGE.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGE.VI)}>VN</span></div>
                            <div className={language === LANGUAGE.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGE.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1">
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className="title2">
                                <FormattedMessage id="banner.title2" />

                            </div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder={this.props.intl.formatMessage({ id: "banner.placeholderSearch" })} />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="icon-child">
                                        <img src={require('../../assets/images/icon-hospital.png').default} alt="" />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.specialist-examination" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <img src={require('../../assets/images/icon-phone.png').default} alt="" />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.Remote-examination" />

                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <img src={require('../../assets/images/icon-pen.png').default} alt="" />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.General-Examination" />

                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <img src={require('../../assets/images/icon-2.png').default} alt="" />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.Medical-test" />

                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <img src={require('../../assets/images/icon-brand.png').default} alt="" />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.Mental-health" />

                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <img src={require('../../assets/images/icon-teech.png').default} alt="" />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.Dental-examination" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter( injectIntl(connect(mapStateToProps, mapDispatchToProps)(HomeHeader)));