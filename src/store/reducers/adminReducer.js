import actionTypes from '../actions/actionTypes';
const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    position: [],
    users:[],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('fetch gender start', action);
            state.isLoadingGender = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            console.log('fetch gender success', action)
            state.isLoadingGender = false;
            state.genders = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            console.log('fetch gender faided', action)
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            console.log('fetch Position success', action)
            state.position = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAIDED:
            console.log('fetch Position faided', action)
            state.position = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            console.log('fetch ROLE success', action)
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIDED:
            console.log('fetch ROLE faided', action)

            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            console.log('fetch User success', action)
            state.users = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAIDED:
            console.log('fetch User faided', action)
            state.users = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;