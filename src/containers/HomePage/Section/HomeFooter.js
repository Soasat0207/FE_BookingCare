import React, {
    Component, Fragment
} from 'react';
import {
    connect
} from 'react-redux';
import { FormattedMessage } from 'react-intl';
class HomeFooter extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    render() {
        
        return (
            <Fragment>
                <div className="section-homeFooter section-share">
                    <p>© 2021 BookingCare</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);