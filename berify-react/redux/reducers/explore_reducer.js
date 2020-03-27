import * as types from '../types';

const INITIAL_STATE = {
    cases: []
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LOAD_CASES: {
            return { ...state, cases: action.payload };
        }

        default:
            return state;
    }
}
