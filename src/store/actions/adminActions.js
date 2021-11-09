import actionTypes from './actionTypes';
import {
    getAllCodeServices,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailsDoctor
} from '../../services/userService';
import {
    toast
} from "react-toastify"
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeServices('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFaided());

            }
        } catch (error) {
            dispatch(fetchGenderFaided());
            console.error(error);
        }
    }
}
export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: data,
})
export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED,
})
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeServices('position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFaided());

            }
        } catch (error) {
            dispatch(fetchPositionFaided());
            console.error(error);
        }
    }
}
export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data,
})
export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAIDED,
})
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeServices('role');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFaided());

            }
        } catch (error) {
            dispatch(fetchRoleFaided());
            console.error(error);
        }
    }
}
export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data,
})
export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED,
})
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            if (data) {
                let res = await createNewUserService(data);
                if (res && res.errCode === 0) {
                    toast.success('create New user success')
                    dispatch(createNewUserSuccess());
                } else {
                    toast.error('create New user error')
                    dispatch(createNewUserFailed());

                }
            }
        } catch (error) {
            dispatch(createNewUserFailed());
            console.error(error);
        }
    }
}
export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,

})
export const createNewUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAIDED,
})
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFailed());

            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed', error);
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: data

})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIDED,
})
export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        try {
            if (id) {
                let res = await deleteUserService(id);
                if (res && res.errCode === 0) {
                    toast.success('delete user success')
                    dispatch(deleteUserSuccess());
                } else {
                    toast.error('delete user error')
                    dispatch(deleteUserFailed());

                }
            }
        } catch (error) {
            dispatch(deleteUserFailed());
            console.error(error);
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,

})
export const deleteUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAIDED,
})
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
                let res = await editUserService(data);
                if (res && res.errCode === 0) {
                    toast.success('Update user success')
                    dispatch(editUserSuccess());
                } else {
                    toast.error('Update user error')
                    dispatch(editUserFailed());
                }
            
        } catch (error) {
            dispatch(editUserFailed());
            console.error(error);
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,

})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAIDED,
})
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
          let res = await getTopDoctorHomeService('');
          if(res && res.errCode ===0 ){
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                data:res.data
            })
          }
          else{
            dispatch({type: actionTypes.FETCH_TOP_DOCTORS_FAIDED})
          }
        } catch (error) {
            dispatch({type: actionTypes.FETCH_TOP_DOCTORS_FAIDED})
            console.log('fetchTopDoctorFailed', error);
        }
    }
}
export const fetchAllDoctors= () => {
    return async (dispatch, getState) => {
        try {
          let res = await getAllDoctors();
          if(res && res.errCode ===0 ){
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                data:res.data
            })
          }
          else{
            dispatch({type: actionTypes.FETCH_ALL_DOCTORS_FAIDED})
          }
        } catch (error) {
            dispatch({type: actionTypes.FETCH_ALL_DOCTORS_FAIDED})
            console.log('fetchTopDoctorFailed', error);
        }
    }
}
export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
          let res = await saveDetailsDoctor(data);
          if(res && res.errCode ===0 ){
            toast.success('save Details doctor success')
            dispatch({
                type: actionTypes.FETCH_DETAILS_DOCTOR_SUCCESS,
            })
          }
          else{
            toast.error('save Details doctor error')
            dispatch({type: actionTypes.FETCH_DETAILS_DOCTOR_FAIDED})
          }
        } catch (error) {
            dispatch({type: actionTypes.FETCH_DETAILS_DOCTOR_FAIDED})
        }
    }
}
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
          let res = await getAllCodeServices('TIME');
          if(res && res.errCode ===0 ){
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                data:res.data
            })
          }
          else{
            dispatch({type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIDED})
          }
        } catch (error) {
            console.log('fetchTimeFailed', error);
            dispatch({type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIDED})
        }
    }
}