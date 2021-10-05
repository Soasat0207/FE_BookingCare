import React, {
    Component, Fragment
} from 'react';
import {
    connect
} from 'react-redux';
import { FormattedMessage } from 'react-intl';
class About extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    render() {

        return (
            <Fragment>
                <div className="section-about section-share">
                    <div className="section-container">
                        <div className="section-about-header">
                            Truyền thông nói về BookingCare
                        </div>
                        <div className="section-about-content">
                            <div className="content-left">
                                <iframe width="100%" height="300" src="https://www.youtube.com/embed/FBpGSd5oEiA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className="content-right">
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, ullam nulla, modi dignissimos dolorum libero asperiores perferendis harum veniam, animi eius corporis laborum! Voluptatibus, ipsa soluta a error tempore magni?</p>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);