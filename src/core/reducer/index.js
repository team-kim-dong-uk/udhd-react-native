import { combineReducers } from 'redux';
import auth from '../redux/auth';
// import photo from '../redux/photo';
// import photos from '../redux/photos';
// import upload from '../redux/upload';
// import loading from '../redux/loading';

const rootReducer = combineReducers({auth});
export default rootReducer;
