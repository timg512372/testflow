import * as types from '../types';

const INITIAL_STATE = {
    page: '~',
    user: {},
    isAuthenticated: false,
    loading: false,
    error: ''
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.SET_CURRENT_USER: {
            return {
                ...state,
                isAuthenticated: !(
                    Object.keys(action.payload).length === 0 &&
                    action.payload.constructor === Object
                ),
                user: action.payload,
                loading: false
            };
        }
        case types.GET_LOADING: {
            return { ...state, loading: true, error: '' };
        }
        case types.CHANGE_PAGE: {
            console.log('Changed page to ' + action.payload);
            return { ...state, page: action.payload };
        }
        case types.GET_ERRORS: {
            return { ...state, error: action.payload, loading: false };
        }

        default:
            return state;
    }
}
