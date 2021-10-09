import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableMangagerUser.scss';
import * as actions from '../../../store/actions';


class TableMangagerUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux:[],
        }
    }
    async componentDidMount() {
        this.props.fetchAllUsersStart();
    }
    render() {
        return (
            <div className="text-container">
                <table className="mt-3 mx-1">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>address</th>
                            <th>Actions</th>
                        </tr>


                        <tr>
                            <td>{'item.email'}</td>
                            <td>{'item.firstName'}</td>
                            <td>{'item.lastName'}</td>
                            <td>{'item.address'}</td>
                            <td>
                                <button className="btn-edit"><i className="fas fa-pen"></i></button>
                                <button className="btn-delete"><i className="fas fa-trash-alt"></i></button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableMangagerUser);
