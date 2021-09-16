import { combineReducers } from 'redux';
import auth from '../redux/auth';
import photo from '../redux/photo';
import photos from '../redux/photos';
import tags from '../redux/tags'
// import upload from '../redux/upload';
import loading from '../redux/loading';
import showPhotoDetail from "../redux/showPhotoDetail";
import searching from "../redux/searching";
import searchTags from "../redux/searchTags";

const rootReducer = combineReducers({
    auth, photo, photos, loading, tags, searching, showPhotoDetail,
    searchTags
    });
export default rootReducer;
