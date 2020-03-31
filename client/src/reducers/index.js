import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth'
import profile from './profile'
import plage from './plage';
import buoy from './buoy'
import member from './member'
import vending from './vending'

export default combineReducers({
    alert,
    auth,
    profile,
    plage,
    buoy,
    member,
    vending
});
