import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { LANGUAGE } from '../../../utils';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
       
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
       

        return (
            <Fragment>
                <div>doctor Schedule</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
