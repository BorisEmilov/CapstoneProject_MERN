import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../components/actions/types"


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function(status = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case USER_LOADED:
            return {
                ...status,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...status,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...status,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return status;
    }
}















