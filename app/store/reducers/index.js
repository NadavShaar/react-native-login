import userReducer from './userReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    user: userReducer
});

export default reducers;