import React, {
    Component
} from 'react';
import {
    Redirect
} from 'react-router-dom';
import {
    connect
} from 'react-redux';

class Home extends Component {

    render() {
        const {
            isLoggedIn ,userInfo
        } = this.props;
        let linkToRedirect = isLoggedIn ?  userInfo.roleId ==='R1' ?'/system/user-redux' :userInfo.roleId ==='R2' ?'/doctor/manage-schedule':'/home' : '/home';
        return ( <
            Redirect to = {
                linkToRedirect
            }
            />
        );
    }

}

const mapStateToProps = state => {
    return {
        userInfo:state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);