import {createAction, handleActions} from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga, {
  asyncActionCreator,
  createAsyncAction,
} from '../../util/redux/index';
import * as photoAPI from '../../api/photoAPI';
import { setSelectedTagsSaga } from './tags';

// 1. 각 모듈별 함수 구분을 위한 prefix 각 모듈 파일명 + '/' 의 조합으로 구성합니다.
const prefix = 'photos/';

// 2. 액션타입에 대해서 정의합니다.
const GET_PHOTOS = asyncActionCreator(`${prefix}GET_PHOTOS`);
const ADD_LIKE = `${prefix}ADD_LIKE`;

// 3. 액션함수에 대해서 정의합니다.
export const getPhotos = createAsyncAction(GET_PHOTOS, ({type, userId, tags}) => ({type, userId, tags}));
export const addLike = createAction(ADD_LIKE, ({photoId}) => ({photoId}));

// 4. saga 비동기 관련 함수가 필요할 경우 작성 합니다. (optional) saga함수들의 모음은 최하단에 나열합니다.
const getPhotosSaga = createAsyncSaga(getPhotos, photoAPI.getPhotos);

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
    [GET_PHOTOS.SUCCESS]: (state, action) => {
      const requestURL = action.payload.config.url; // 이걸로 판별하는거 좋은 디자인은 아닌 것 같은데 귀찮아서 일단 이렇게함. 나중에 바꾸기
      if (requestURL.includes('album')) {
        return {
          ...state,
          album: action.payload.data,
        };
      } else if (requestURL.includes('search')) {
        return {
          ...state,
          search: action.payload.data,
        };
      } else if (requestURL.includes('upload')) {
        return {
          ...state,
          upload: action.payload.data,
        };
      } else {
        return state;
      }
    },
    [GET_PHOTOS.FAILURE]: (state, action) => ({
      ...state,
      error: action.error,
    }),
    [ADD_LIKE]: (state, {payload: {photoId}}) => {
      let returnData =  state.search.map((photo) => {
                          if(photo.photoId == photoId){
                            photo.inAlbum = true
                          }
                          return photo
                        })
      return {
        ...state,
        search: returnData,
      }
    }
  },
  initialState,
);

// 7. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
export function* photosSaga() {
  yield takeEvery(GET_PHOTOS.REQUEST, getPhotosSaga);
  yield takeEvery(GET_PHOTOS.REQUEST, setSelectedTagsSaga);
}
