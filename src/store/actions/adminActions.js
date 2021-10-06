import actionTypes from './actionTypes';
import {getAllCodeServices,createNewUserService} from '../../services/userService';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })
export const fetchGenderStart =  () => {
    return async(dispatch,getState)=>{
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeServices('GENDER');
            if(res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else{
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
    data:data,
})
export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED,
})
export const fetchPositionStart =  () => {
    return async(dispatch,getState)=>{
        try {
            let res = await getAllCodeServices('position');
            if(res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else{
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
    data:data,
})
export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAIDED,
})
export const fetchRoleStart =  () => {
    return async(dispatch,getState)=>{
        try {
            let res = await getAllCodeServices('role');
            if(res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }
            else{
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
    data:data,
})
export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED,
})
export const createNewUser = (data) => {
    return async(dispatch,getState)=>{
        try {
            if(data){
                let res = await createNewUserService(data);
                if(res && res.errCode === 0) {
                    dispatch(createNewUserSuccess());
                }
                else{
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