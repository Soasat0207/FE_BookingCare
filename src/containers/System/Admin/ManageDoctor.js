import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import { LANGUAGE } from '../../../utils';
// import react, react-markdown-editor-lite, and a markdown parser you like
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctor: [],
        }
    }
    async componentDidMount() {
        this.props.fetchAllDoctors();
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language || prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctor:dataSelect,
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handleSaveContentMarkdown = () => {
        this.props.saveDetailDoctor({
            contentHTML:this.state.contentHTML,
            contentMarkdown:this.state.contentMarkdown,
            description:this.state.description,
            doctorId:this.state.selectedOption.value,
        })
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    };
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        })
    }
    buildDataInputSelect = (data) => {
        let result = [];
        let {language} = this.props;
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
        let arrUsers = this.state.usersRedux;
        return (
            <Fragment>
                <div className="manage-doctor-container">
                    <div className="manage-doctor-title">Manage Doctor </div>
                    <div className="more-info">
                        <div className="content-left">
                            <label htmlFor="">Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className="content-right form-group">
                            <label htmlFor="">Thông tin giới thiệu </label>
                            <textarea className="form-control" cols="30" rows="4"
                                onChange={(event) => this.handleOnChangeDesc(event)}
                                value={this.state.description}
                            ></textarea>
                        </div>

                    </div>
                    <div className="manage-doctor-editor">
                        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                    </div>
                    <button className="save-content-doctor"
                        onClick={() => this.handleSaveContentMarkdown()}
                    >Lưu Thông Tin</button>
                </div>
            </Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctor: state.admin.allDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
