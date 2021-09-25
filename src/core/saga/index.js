import { all } from 'redux-saga/effects';
import { photoSaga } from '../redux/photo';
import { photosSaga } from '../redux/photos';
import { authSaga } from '../redux/auth';
import {tagsSaga} from "../redux/tags";
import {albumSaga} from "../redux/album";
// import { uploadSaga } from '../redux/upload';
export default function* rootSaga() {
  yield all([
    authSaga(),
    photoSaga(),
    photosSaga(),
    tagsSaga(),
    albumSaga(),
    // uploadSaga(),
  ]);
}
