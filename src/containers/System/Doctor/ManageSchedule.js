import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl'
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGE,dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker'
import {toast} from "react-toastify"
import moment from 'moment';
import _ from 'lodash';
import {saveBulkScheduleDoctor} from '../../../services/userService'
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0)
        this.state = {
            listDoctor: [],
            selectedOption: '',
            currentDate: currentDate,
            rangeTime: [],
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language || prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctor: dataSelect,
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data,
            })
        }
    }
    handleChange = async (selectedOption) => {
        this.setState({ selectedOption });
    }
    handleChangeDatePicker = (date) => {
        this.setState({ currentDate: date[0] })
    }
    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {

            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) { item.isSelected = !item.isSelected }
                return item;
            })
            this.setState({
                rangeTime: rangeTime,
            })
        }
    }
    handleSaveSchedule = async() => {
        let { rangeTime, currentDate, selectedOption } = this.state;
        let result= [];
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        //  = moment(currentDate).unix();
         let formatedDate = new Date(currentDate).getTime();
        if (!currentDate) {
            toast.error('Invalid data!')
            return;
        }
        if (!selectedOption && _.isEmpty(selectedOption)) {
            toast.error('Invalid selected doctor!')
            return;
        }
        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map(schedule =>{
                    let object ={};
                    object.doctorId = selectedOption.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            }
            else{
                toast.error('Invalid selected Time!')
                return; 
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule:result,
            doctorId:selectedOption.value,
            date:formatedDate,
        });
        console.log('check res',res);

    }
    buildDataInputSelect = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }
    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        return (
            <Fragment>
                <div className="manage-schedule-container">
                    <div className="m-s-title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="">
                                    <FormattedMessage id="manage-schedule.choose-doctor" />
                                </label>
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.listDoctor}
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="">
                                    <FormattedMessage id="manage-schedule.choose-date" />
                                </label>
                                <DatePicker
                                    onChange={this.handleChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="col-12 pick-hour-container">
                                {rangeTime && rangeTime.length > 0
                                    && rangeTime.map((item, index) => {
                                        return (
                                            <button className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                                key={index}
                                                onClick={() => this.handleClickBtnTime(item)}
                                            >{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</button>
                                        )
                                    })}
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary btn-save-schedule"
                                    onClick={() => this.handleSaveSchedule()}
                                >
                                    <FormattedMessage id="manage-schedule.save" />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctor: state.admin.allDoctor,
        isLoggedIn: state.user.isLoggedIn,
        allScheduleTime: state.admin.allScheduleTime,
        language: state.app.language,
    };

};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
