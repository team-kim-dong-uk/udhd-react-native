import { all } from 'redux-saga/effects';
import { photoSaga } from '../redux/photo';
import { photosSaga } from '../redux/photos';
import { authSaga } from '../redux/auth';
import { uploadSaga } from '../redux/upload';
import {tagsSaga} from "../redux/tags";
import { userSaga } from '../redux/user';
import {albumSaga} from "../redux/album";
// import { uploadSaga } from '../redux/upload';

export default function* rootSaga() {
  yield all([
    authSaga(),
    photoSaga(),
    photosSaga(),
    uploadSaga(),
    tagsSaga(),
    userSaga(),
    albumSaga(),
    // uploadSaga(),
  ]);
}
