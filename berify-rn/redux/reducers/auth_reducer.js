import * as types from '../types';

const INITIAL_STATE = {
    loading: false,
    user: null,
    error: ''
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        default:
            return state;
    }
}
