import { combineReducers } from 'redux';
import auth from '../redux/auth';
import photo from '../redux/photo';
import photos from '../redux/photos';
import upload from '../redux/upload';
import loading from '../redux/loading';
import isSearching from "../redux/searching";
import tags from '../redux/tags'
import googlePicker from '../redux/googlePicker';

const rootReducer = combineReducers({auth, photo, photos, loading, googlePicker, upload, tags, isSearching});
export default rootReducer;
