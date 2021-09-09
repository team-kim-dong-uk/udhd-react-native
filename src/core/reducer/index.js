import { combineReducers } from 'redux';
import auth from '../redux/auth';
import photo from '../redux/photo';
import photos from '../redux/photos';
import tags from '../redux/tags'
// import upload from '../redux/upload';
import loading from '../redux/loading';
import isSearching from "../redux/searching";

const rootReducer = combineReducers({
    auth, photo, photos, loading, tags, isSearching});
export default rootReducer;
