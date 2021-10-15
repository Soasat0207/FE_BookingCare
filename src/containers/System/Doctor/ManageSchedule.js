import React, { Component , Fragment} from 'react';
import { connect } from "react-redux";

class ManageSchedule extends Component {
    render() {
        const { isLoggedIn} = this.props;
        return (
            <Fragment>
                <div>Manage schedule</div>
            </Fragment>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
