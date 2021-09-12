import { handleActions } from 'redux-actions';
import { createAction } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';
import * as uploadAPI from '../../api/uploadAPI';
import createAsyncSaga, { asyncActionCreator, createAsyncAction } from '../../util/redux';

// 1. 각 모듈별 함수 구분을 위한 prefix 각 모듈 파일명 + '/' 의 조합으로 구성합니다.
const prefix = 'upload/';

// 2. 액션타입에 대해서 정의합니다.
const APPEND_CANDIDATES = `${prefix}APPEND_CANDIDATES`;
const UPLOAD_PHOTOS = asyncActionCreator(`${prefix}UPLOAD_PHOTOS`);

// 3. 액션함수에 대해서 정의합니다.
export const appendCandidates = createAction(APPEND_CANDIDATES, ({data}) => ({data}));
export const uploadPhotos = createAsyncAction(UPLOAD_PHOTOS);

// 4. saga 비동기 관련 함수가 필요할 경우 작성 합니다. (optional) saga함수들의 모음은 최하단에 나열합니다.
const uploadPhotosSaga = createAsyncSaga(uploadPhotos, uploadAPI.uploadWithGoogleDrive);

// 5. 초기 상태 정의
const initialState = {
  data: [],
  pollingKey: null,
  loading: false,
  error: null,
};

// 6. 리듀서 정의
export default handleActions(
  {
    [APPEND_CANDIDATES]: (state, action) => {
        return {
          ...state,
          data: [...action.payload.data, ...state.data],
          numShowItems: 0,
        };
    },
    [UPLOAD_PHOTOS.SUCCESS]: (state, action) => {
      return {
        ...state,
        pollingKey: action.payload.data
      }
    }
  },
  initialState,
);

// 7. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
export function* uploadSaga() {
  yield takeEvery(UPLOAD_PHOTOS.REQUEST, uploadPhotosSaga);
}
