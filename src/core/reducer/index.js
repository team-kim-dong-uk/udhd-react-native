import { combineReducers } from 'redux';
import auth from '../redux/auth';
import photo from '../redux/photo';
import photos from '../redux/photos';
// import upload from '../redux/upload';
import loading from '../redux/loading';
import googlePicker from '../redux/googlePicker';

const rootReducer = combineReducers({auth, photo, photos, loading, googlePicker});
export default rootReducer;
