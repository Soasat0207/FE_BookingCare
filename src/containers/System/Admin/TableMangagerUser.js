import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableMangagerUser.scss';
import * as actions from '../../../store/actions';
// import react, react-markdown-editor-lite, and a markdown parser you like
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}
class TableMangagerUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        }
    }
    async componentDidMount() {
        this.props.fetchAllUsersStart();
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                usersRedux: this.props.users
            })
        }
    }

    // Finish!
    
    handleDeleteUser = async (user) => {
        await this.props.deleteUser(user.id);
        this.props.fetchAllUsersStart();
    }
    handleEditUser = async (user) => {
        this.props.handleEditUserFromParent(user)
    }
    render() {
        let arrUsers = this.state.usersRedux;
        return (   
            <Fragment>
                <div className="text-container">
                    <table className="mt-3 mx-1 mb-5">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>address</th>
                                <th>Actions</th>
                            </tr>

                            {arrUsers && arrUsers.length > 0 &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit"
                                                    onClick={() => this.handleEditUser(item)}
                                                ><i className="fas fa-pen"></i></button>
                                                <button className="btn-delete"
                                                    onClick={() => this.handleDeleteUser(item)}
                                                ><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableMangagerUser);
