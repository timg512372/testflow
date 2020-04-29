import * as types from '../types';
import { AsyncStorage } from 'react-native';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { SERVER_URL } from '../../dotenv.json';

export const changeUserName = (userName) => {
    return {
        type: types.CHANGE_USER_NAME,
        payload: userName,
    };
};

export const changeInstitution = (institution) => {
    return {
        type: types.CHANGE_INSTITUTION,
        payload: institution,
    };
};

export const changePassword = (password) => {
    return {
        type: types.CHANGE_PASSWORD,
        payload: password,
    };
};

export const changePasswordConfirm = (password_confirm) => {
    return {
        type: types.CHANGE_PASSWORD_CONFIRM,
        payload: password_confirm,
    };
};

export const changeLocation = (location) => {
    return {
        type: types.CHANGE_LOCATION,
        payload: location,
    };
};

export const changeRole = (role) => {
    return {
        type: types.CHANGE_ROLE,
        payload: role,
    };
};

export const changeLUserName = (userName) => {
    return {
        type: types.CHANGE_L_USER_NAME,
        payload: userName,
    };
};

export const changeLPassword = (password) => {
    return {
        type: types.CHANGE_L_PASSWORD,
        payload: password,
    };
};

export const handleRegister = (
    institution,
    userName,
    password,
    password_confirm,
    role,
    location,
    navigation
) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        if (password.length < 8) {
            throw { message: 'Password needs to be at least 8 characters' };
        }

        let number = false;
        let special = false;
        for (let i = 0; i < password.length; i++) {
            let num = password.charCodeAt(i);
            if (num >= 48 && num <= 57) {
                number = true;
            } else if (!(num >= 65 && num <= 90) && !(num >= 97 && num <= 122)) {
                special = true;
            }
        }

        if (!number) {
            throw { message: 'Password needs to contain a number' };
        } else if (!special) {
            throw { message: 'Password needs to contain a special character' };
        } else if (password == password_confirm) {
            throw { message: "Passwords don't match" };
        }

        console.log(institution, userName, password, password_confirm, role, location);

        const res = await axios({
            method: 'post',
            url: `${SERVER_URL}/api/auth/register`,
            data: {
                institution,
                userName: institution,
                email: userName,
                password,
                password_confirm,
                role,
                location,
            },
        });
        console.log('Finished registration');
        navigation.navigate('Login');
    } catch (e) {
        console.log('in error');
        console.log(e);
        let error = '';
        if (e.response) {
            Object.keys(e.response.data).forEach((key) => (error += e.response.data[key] + '\n'));
        } else if (e.message) {
            error = e.message;
        } else {
            error = 'Please try again later';
        }
        dispatch(setError(error));
    }
};

export const handleLogin = (userName, password, navigation) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await axios({
            method: 'post',
            url: `${SERVER_URL}/api/auth/login`,
            data: { userName, password },
        });

        navigation.navigate('Verify', userName);
    } catch (e) {
        console.log(e);
        let error = '';
        if (e.response) {
            Object.keys(e.response.data).forEach((key) => (error += e.response.data[key] + '\n'));
        } else if (e.message) {
            error = e.message;
        } else {
            error = 'Please try again later';
        }
        dispatch(setError(error));
    }
};

export const handleVerify = (code, userName, navigation) => async (dispatch) => {
    try {
        console.log(code);
        console.log('help');
        dispatch(setLoading(true));
        const res = await axios({
            method: 'post',
            url: `${SERVER_URL}/api/auth/verify`,
            data: { userName, code },
        });

        const { token } = res.data;
        await AsyncStorage.setItem('jwtToken', token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));

        if (decoded.role == 'hospital') {
            navigation.navigate('HospitalMain');
        }

        if (decoded.role == 'lab') {
            navigation.navigate('LabMain');
        }

        if (decoded.role == 'factory') {
            navigation.navigate('FactoryMain');
        }
    } catch (e) {
        console.log(e);
        let error = '';
        if (e.response) {
            Object.keys(e.response.data).forEach((key) => (error += e.response.data[key] + '\n'));
        } else if (e.message) {
            error = e.message;
        } else {
            error = 'Please try again later';
        }
        dispatch(setError(error));
    }
};

export const setError = (error) => {
    console.log(error);
    return {
        type: types.GET_ERRORS,
        payload: error,
    };
};

export const setCurrentUser = (decoded) => {
    return {
        type: types.SET_CURRENT_USER,
        payload: decoded,
    };
};

export const setLoading = (loading) => {
    return {
        type: types.SET_LOADING,
        payload: loading,
    };
};

export const logoutUser = (navigation) => async (dispatch) => {
    console.log('logging out user');
    await AsyncStorage.removeItem('jwtToken');
    navigation.navigate('Landing');
    dispatch(setCurrentUser({}));
};

export const clearErrors = () => {
    return {
        type: types.GET_ERRORS,
        payload: '',
    };
};
