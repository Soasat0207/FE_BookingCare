import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInfoDoctors } from '../../../services/userService';
import { LANGUAGE } from '../../../utils';
import DoctorSchedule from './DoctorSchedule'
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInfoDoctors(id);
            console.log('check res', res);
            if (res && res.errCode == 0) {
                this.setState({
                    detailDoctor: res.data,

                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        console.log('check state', this.state);
        let { detailDoctor } = this.state;
        let nameVi = '';
        let nameEn = "";
        let { language } = this.props;
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi},${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueEn},${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }

        return (
            <Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left"
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`, backgroundPosition: `center`, backgroundRepeat: `no-repeat`, backgroundSize: `cover` }}

                        ></div>
                        <div className="content-right">
                            <div className="up">{language === LANGUAGE.VI ? nameVi : nameEn}</div>
                            <div className="down">
                                {detailDoctor.Markdown && detailDoctor.Markdown.description
                                    &&
                                    <span>
                                        {/* {detailDoctor.Markdown.description} */}
                                        <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.descriptionHTML }}></div>

                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule/>
                        </div>
                        <div className="content-right"></div>
                    </div>
                    <div className="detail-info-doctor">
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                            &&
                            <span>
                                <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                            </span>
                        }
                    </div>
                    <div className="comment-doctor"></div>

                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
