import * as types from '../types';

export const updateCases = payload => {
    return {
        type: types.LOAD_CASES,
        payload
    };
};
