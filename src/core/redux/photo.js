import {createAction, handleActions} from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga, {
  asyncActionCreator,
  createAsyncAction,
} from '../../util/redux/index';
import * as photoAPI from '../../api/photoAPI';

// 1. 각 모듈별 함수 구분을 위한 prefix 각 모듈 파일명 + '/' 의 조합으로 구성합니다.
const prefix = 'photo/';

// 2. 액션타입에 대해서 정의합니다.
const GET_PHOTO = asyncActionCreator(`${prefix}GET_PHOTO`);
const SET_PHOTO_TAGS = `${prefix}SET_PHOTO_TAGS`;

// 3. 액션함수에 대해서 정의합니다.
export const getPhoto = createAsyncAction(GET_PHOTO);
export const setPhotoTags = createAction(SET_PHOTO_TAGS, ({tags}) => ({tags}));

// 4. saga 비동기 관련 함수가 필요할 경우 작성 합니다. (optional) saga함수들의 모음은 최하단에 나열합니다.
const getPhotoSaga = createAsyncSaga(getPhoto, photoAPI.getPhoto);

// 5. 초기 상태 정의
const initialState = {
  data: null,
  loading: false,
  error: null,
};

// 6. 리듀서 정의
export default handleActions(
  {
    [GET_PHOTO.SUCCESS]: (state, action) => {
        return {
          ...state,
          data: action.payload.data
        };
    },
    [GET_PHOTO.FAILURE]: (state, action) => ({
      ...state,
      error: action,
    }),
      [SET_PHOTO_TAGS]: (state, {payload: {tags}}) => {
          return {
              ...state,
              data: {
                  tags: tags || state.data.tags
              }
          };
      },
  },
  initialState,
);

// 7. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
export function* photoSaga() {
  yield takeEvery(GET_PHOTO.REQUEST, getPhotoSaga);
}
