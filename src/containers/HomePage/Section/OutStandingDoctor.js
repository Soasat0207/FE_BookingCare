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

class OutStandingDoctor extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    render() {

        return (
            <Fragment>
                <div className="section-outStandingDoctor section-share">
                    <div className="section-container">
                        <div className="section-header">
                            <h2>Chuyên khoa phổ biến</h2>
                            <button>Xem thêm </button>
                        </div>
                        <div className="section-body">
                            <Slider {...this.props.settings} >
                                <div className="img-custom">
                                    <div className="custom-border">
                                        <div className="outer-bg">
                                            <div className="bg-img"></div>
                                        </div>
                                        <div className="text-center">
                                            <h6>Thạc sĩ , Bác sĩ Phạm Đăng bẳng </h6>
                                            <h6>Da liễu</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="img-custom">
                                    <div className="custom-border">
                                        <div className="outer-bg">
                                            <div className="bg-img"></div>
                                        </div>
                                        <div className="text-center">
                                            <h6>Thạc sĩ , Bác sĩ Phạm Đăng bẳng </h6>
                                            <h6>Da liễu</h6>
                                        </div>
                                    </div>

                                </div>
                                <div className="img-custom">
                                    <div className="custom-border">
                                        <div className="outer-bg">
                                            <div className="bg-img"></div>
                                        </div>
                                        <div className="text-center">
                                            <h6>Thạc sĩ , Bác sĩ Phạm Đăng bẳng </h6>
                                            <h6>Da liễu</h6>
                                        </div>
                                    </div>

                                </div>
                                <div className="img-custom">
                                    <div className="custom-border">
                                        <div className="outer-bg">
                                            <div className="bg-img"></div>
                                        </div>
                                        <div className="text-center">
                                            <h6>Thạc sĩ , Bác sĩ Phạm Đăng bẳng </h6>
                                            <h6>Da liễu</h6>
                                        </div>
                                    </div>

                                </div>
                                <div className="img-custom">
                                    <div className="custom-border">
                                        <div className="outer-bg">
                                            <div className="bg-img"></div>
                                        </div>
                                        <div className="text-center">
                                            <h6>Thạc sĩ , Bác sĩ Phạm Đăng bẳng </h6>
                                            <h6>Da liễu</h6>
                                        </div>
                                    </div>

                                </div>
                                <div className="img-custom">
                                    <div className="custom-border">
                                        <div className="outer-bg">
                                            <div className="bg-img"></div>
                                        </div>
                                        <div className="text-center">
                                            <h6>Thạc sĩ , Bác sĩ Phạm Đăng bẳng </h6>
                                            <h6>Da liễu</h6>
                                        </div>
                                    </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);