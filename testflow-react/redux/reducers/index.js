import { combineReducers } from 'redux';
import auth from './auth_reducer';
import explore from './explore_reducer';
import personal from './personal_reducer';

export default combineReducers({ auth, explore, personal });
