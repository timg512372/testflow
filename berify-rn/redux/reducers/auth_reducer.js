import * as types from '../types';

const INITIAL_STATE = {
    institution: '',
    userName: '',
    password: '',
    password_confirm: '',
    role: '',
    location: '',
    user: {},
    isAuthenticated: false,
    lUserName: '',
    lPassword: '',
    error: '',
    page: ''
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.CHANGE_INSTITUTION:
            return { ...state, institution: action.payload };

        case types.CHANGE_USER_NAME:
            return { ...state, userName: action.payload };

        case types.CHANGE_PASSWORD:
            return { ...state, password: action.payload };

        case types.CHANGE_PASSWORD_CONFIRM:
            return { ...state, password_confirm: action.payload };

        case types.CHANGE_LOCATION:
            return { ...state, location: action.payload };

        case types.CHANGE_ROLE:
            return { ...state, role: action.payload };

        case types.SET_CURRENT_USER: {
            return {
                ...state,
                isAuthenticated: !(
                    Object.keys(action.payload).length === 0 &&
                    action.payload.constructor === Object
                ),
                user: action.payload
            };
        }

        case types.CHANGE_L_USER_NAME: {
            return {
                ...state,
                lUserName: action.payload
            };
        }

        case types.CHANGE_L_PASSWORD: {
            return {
                ...state,
                lPassword: action.payload
            };
        }

        case types.GET_ERRORS: {
            return { ...state, error: action.payload };
        }

        case types.CHANGE_PAGE: {
            return { ...state, page: action.payload };
        }

        default:
            return state;
    }
}
