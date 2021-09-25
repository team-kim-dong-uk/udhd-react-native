import { handleActions } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga, {
  asyncActionCreator,
  createAsyncAction,
} from '../../util/redux/index';
import * as photoAPI from '../../api/photoAPI';

// 1. 각 모듈별 함수 구분을 위한 prefix 각 모듈 파일명 + '/' 의 조합으로 구성합니다.
const prefix = 'photos/';

// 2. 액션타입에 대해서 정의합니다.
const GET_ALBUM_PHOTOS = asyncActionCreator(`${prefix}GET_ALBUM_PHOTOS`);
const GET_SEARCH_PHOTOS = asyncActionCreator(`${prefix}GET_SEARCH_PHOTOS`);
const GET_UPLOAD_PHOTOS = asyncActionCreator(`${prefix}GET_UPLOAD_PHOTOS`);

// 3. 액션함수에 대해서 정의합니다.
export const getAlbumPhotos = createAsyncAction(GET_ALBUM_PHOTOS);
export const getSearchPhotos = createAsyncAction(GET_SEARCH_PHOTOS);
export const getUploadPhotos = createAsyncAction(GET_UPLOAD_PHOTOS);

// 4. saga 비동기 관련 함수가 필요할 경우 작성 합니다. (optional) saga함수들의 모음은 최하단에 나열합니다.
const getAlbumPhotosSaga = createAsyncSaga(getAlbumPhotos, photoAPI.getAlbumPhotos);
const getSearchPhotosSaga = createAsyncSaga(getSearchPhotos, photoAPI.getSearchPhotos);
const getUploadPhotosSaga = createAsyncSaga(getUploadPhotos, photoAPI.getUploadPhotos);

// 5. 초기 상태 정의
const initialState = {
  album: null,
  search: null,
  upload: null,
  loading: false,
  error: null,
};

// 6. 리듀서 정의
export default handleActions(
  {
    [GET_ALBUM_PHOTOS.SUCCESS]: (state, action) => {
      return {
          ...state,
          album: action.payload.data,
      };
    },
    [GET_SEARCH_PHOTOS.SUCCESS]: (state, action) => {
      return {
          ...state,
          search: action.payload.data,
      };
    },
    [GET_UPLOAD_PHOTOS.SUCCESS]: (state, action) => {
      return {
          ...state,
          upload: action.payload.data,
      };
    },
    [GET_ALBUM_PHOTOS.FAILURE]: (state, action) => ({
      ...state,
      error: action.error,
    }),
    [GET_SEARCH_PHOTOS.FAILURE]: (state, action) => ({
      ...state,
      error: action.error,
    }),
    [GET_UPLOAD_PHOTOS.FAILURE]: (state, action) => ({
      ...state,
      error: action.error,
    }),
  },
  initialState,
);

// 7. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
export function* photosSaga() {
  yield takeEvery(GET_ALBUM_PHOTOS.REQUEST, getAlbumPhotosSaga);
  yield takeEvery(GET_SEARCH_PHOTOS.REQUEST, getSearchPhotosSaga);
  yield takeEvery(GET_UPLOAD_PHOTOS.REQUEST, getUploadPhotosSaga);
}
