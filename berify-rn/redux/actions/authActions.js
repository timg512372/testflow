import * as types from '../types';
import { AsyncStorage } from 'react-native';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const changeUserName = userName => {
    return {
        type: types.CHANGE_USER_NAME,
        payload: userName
    };
};

export const changeInstitution = institution => {
    return {
        type: types.CHANGE_INSTITUTION,
        payload: institution
    };
};

export const changePassword = password => {
    return {
        type: types.CHANGE_PASSWORD,
        payload: password
    };
};

export const changePasswordConfirm = password_confirm => {
    return {
        type: types.CHANGE_PASSWORD_CONFIRM,
        payload: password_confirm
    };
};

export const changeLocation = location => {
    return {
        type: types.CHANGE_LOCATION,
        payload: location
    };
};

export const changeRole = role => {
    return {
        type: types.CHANGE_ROLE,
        payload: role
    };
};

export const changeLUserName = userName => {
    return {
        type: types.CHANGE_L_USER_NAME,
        payload: userName
    };
};

export const changeLPassword = password => {
    return {
        type: types.CHANGE_L_PASSWORD,
        payload: password
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
) => async dispatch => {
    try {
        console.log(institution, userName, password, password_confirm, role, location);

        const res = await axios({
            method: 'post',
            url: 'https://c92da37d.ngrok.io/api/auth/register',
            data: { institution, userName, password, password_confirm, role, location }
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
        dispatch(setError(e.message));
    }
};

export const handleLogin = (userName, password, navigation) => async dispatch => {
    try {
        const res = await axios({
            method: 'post',
            url: 'https://c92da37d.ngrok.io/api/auth/login',
            data: { userName, password }
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
        dispatch(setError(e.message));
    }
};

export const setError = error => {
    return {
        type: types.GET_ERRORS,
        payload: error
    };
};

export const setCurrentUser = decoded => {
    return {
        type: types.SET_CURRENT_USER,
        payload: decoded
    };
};

export const logoutUser = navigation => async dispatch => {
    console.log('logging out user');
    await AsyncStorage.removeItem('jwtToken');
    navigation.navigate('Landing');
    dispatch(setCurrentUser({}));
};
