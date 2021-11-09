import React, {
    Component, Fragment
} from 'react';
import {
    connect
} from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { LANGUAGE} from '../../../utils';
import {withRouter} from 'react-router'

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }
    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
        let {language} = this.props
        return (
            <Fragment>
                <div className="section-outStandingDoctor section-share">
                    <div className="section-container">
                        <div className="section-header">
                            <h2><FormattedMessage id="homepage.out-standing-doctor"/></h2>
                            <button><FormattedMessage id="homepage.more-info"/></button>
                        </div>
                        <div className="section-body">
                            <Slider {...this.props.settings} >
                                {arrDoctors && arrDoctors.length > 0
                                    && arrDoctors.map((item, index) => {
                                        let imageBase64 = '';
                                        if(item.image ){
                                            imageBase64 = new Buffer(item.image,'base64').toString('binary');
                                        }
                                        let nameVi = `${item.positionData.valueVi},${item.firstName} ${item.lastName}`;
                                        let nameEn = `${item.positionData.valueEn},${item.firstName} ${item.lastName}`;
                                        return (
                                            <div className="img-custom" key={index} onClick={()=>this.handleViewDetailDoctor(item)}>
                                                <div className="custom-border">
                                                    <div className="outer-bg">
                                                        <div className="bg-img"
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                        ></div>
                                                    </div>
                                                    <div className="text-center">
                                                        <h6>{language === LANGUAGE.VI ? nameVi : nameEn}</h6>
                                                        <h6>Da liễu</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        )
                                    })}
                            </Slider>
                        </div>

                    </div>
                </div>
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctors: state.admin.topDoctor,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)) ;