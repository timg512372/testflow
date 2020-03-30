import * as types from '../types';

export const updateMyCases = payload => {
    return {
        type: types.LOAD_MY_CASES,
        payload
    };
};
