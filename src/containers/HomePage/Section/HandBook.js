import React, {
    Component, Fragment
} from 'react';
import {
    connect
} from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

class HandBook extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    render() {
        
        return (
            <Fragment>
                <div className="section-handBook section-share">
                    <div className="section-container">
                        <div className="section-header">
                            <h2>Chuyên khoa phổ biến</h2>
                            <button>Xem thêm </button>
                        </div>
                        <div className="section-body">
                            <Slider {...this.props.settings} >
                                <div className="img-custom">
                                    <div className="bg-img"></div>
                                    <h6>Cơ xương khớp</h6>
                                </div>
                                <div className="img-custom">
                                    <div className="bg-img"></div>
                                    <h6>Cơ xương khớp</h6>

                                </div>
                                <div className="img-custom">
                                    <div className="bg-img"></div>
                                    <h6>Cơ xương khớp</h6>

                                </div>
                                <div className="img-custom">
                                    <div className="bg-img"></div>
                                    <h6>Cơ xương khớp</h6>

                                </div>
                                <div className="img-custom">
                                    <div className="bg-img"></div>
                                    <h6>Cơ xương khớp</h6>

                                </div>
                                <div className="img-custom">
                                    <div className="bg-img"></div>
                                    <h6>Cơ xương khớp</h6>

                                </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);