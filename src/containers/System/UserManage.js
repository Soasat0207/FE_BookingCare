import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers,createNewUserService,deleteUserService,editUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import {emitter} from '../../utils/emitter'
import ModalEditUser from './ModalEditUser'
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers:[],
            isOpenModalUser: false,
            isOpenEditUser:false,
            userEdit:{}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFormReact();
    }
    handleAddNewUser= () => { 
        this.setState({
            isOpenModalUser:!this.state.isOpenModalUser,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser:!this.state.isOpenModalUser,
        })
    };
    toggleUserEditModal = () => {
        this.setState({
            isOpenEditUser:!this.state.isOpenEditUser,
        })
    }
    createNewUser = async (data) => {
        try {
            
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0 ){
                alert(response.errMessage);
            }
            else{
                await this.getAllUsersFormReact();
                this.toggleUserModal();
                emitter.emit(`EVENT_CLEAR_MODAL_DATA`)
            }
        } catch (error) {
            console.error(error);
        }
    }
    getAllUsersFormReact = async () =>{
        let response = await getAllUsers('ALL');
        if(response && response.errCode ===0){
            this.setState({
                arrUsers:response.users
            })
        }
    }
    handleDeleteUser = async (user) => {
        try {
            if(window.confirm("Do you really want to delete?")){
                let response = await deleteUserService(user.id);
                if(response && response.errCode === 0){
                    await this.getAllUsersFormReact();  
                }
                else{
                    alert(response.errMessage);
                }
            }
            
        } catch (error) {
            console.error(error);
        }
    }
    handleEditUser = (user)=>{
        this.setState({
            isOpenEditUser:!this.state.isOpenEditUser,
            userEdit:user
        })
    }
    doEditUser = async (user)=>{
        try {
            let response = await editUserService(user);
            if(response && response.errCode === 0){
                await this.getAllUsersFormReact();  
                this.toggleUserEditModal();
            }
            else{
                alert(response.errMessage);
            }
        } catch (error) {
            console.error(error);
        }
    }
    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="text-container">
                <ModalUser 
                idOpen={this.state.isOpenModalUser} 
                toggle={ this.toggleUserModal}
                createNewUser={this.createNewUser}
                />
                {this.state.isOpenEditUser && 
                <ModalEditUser
                idOpen={this.state.isOpenEditUser} 
                toggle={ this.toggleUserEditModal}
                currentUser = {this.state.userEdit}
                editUser = { this.doEditUser}
                />
                }
                
                <div className="title text-center">Manage users</div>
                <div className="mx-1">
                    <button 
                    className="btn btn-primary px-4"
                    onClick={ () => this.handleAddNewUser()}
                    ><i className="fas fa-plus"></i>Add new user</button>
                </div>
                <table className="mt-3 mx-1">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>address</th>
                            <th>Actions</th>
                        </tr>
                        
                            { arrUsers && arrUsers.map((item,index)=>{
                                return(
                                    <tr key={index}>  
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button 
                                            className="btn-edit"
                                            onClick={() => { this.handleEditUser(item);}}
                                            ><i className="fas fa-pen"></i></button>
                                            <button 
                                            className="btn-delete" 
                                            onClick={()=> this.handleDeleteUser(item)}
                                            
                                            ><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )})
                            }
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
