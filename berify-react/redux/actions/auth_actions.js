import * as types from '../types';
import axios from 'axios';
import setAuthToken, { showSuccessModal, showErrorModal } from '../../components/functions';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, callback) => {
    return async dispatch => {
        dispatch({
            type: types.GET_LOADING
        });
        try {
            const res = await axios({
                method: 'post',
                url: `${process.env.SERVER_URL}/api/auth/register`,
                data: { ...user }
            });
            console.log('success');
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            showSuccessModal('Successfully Created User');
            callback();
        } catch (err) {
            console.log(err);
            showErrorModal(err.message);
            dispatch({
                type: types.GET_ERRORS,
                payload: err.message
            });
        }
    };
};

export const loginUser = (user, callback) => async dispatch => {
    try {
        const res = await axios({
            method: 'post',
            url: `${process.env.SERVER_URL}/api/auth/login`,
            data: { ...user }
        });

        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        callback();
    } catch (err) {
        dispatch({
            type: types.GET_ERRORS,
            payload: err.response ? err.response : 'Unknown'
        });
    }
};

export const setCurrentUser = decoded => {
    return {
        type: types.SET_CURRENT_USER,
        payload: decoded
    };
};

export const logoutUser = callback => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    callback ? callback() : null;
};
