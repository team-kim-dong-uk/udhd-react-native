import { createAction, handleActions } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';
import createAsyncSaga, {
  asyncActionCreator,
  createAsyncAction,
} from '../../util/redux/index';
import * as tagAPI from '../../api/tagAPI';

// 1. 각 모듈별 함수 구분을 위한 prefix 각 모듈 파일명 + '/' 의 조합으로 구성합니다.
const prefix = 'tags/';

// 2. 액션타입에 대해서 정의합니다.
const GET_TAGS = asyncActionCreator(`${prefix}GET_TAGS`);
const SET_SELECTED_TAGS = `${prefix}SET_SELECTED_TAGS`;
const SET_SORT_BY = `${prefix}SET_SORT_BY`;

// 3. 액션함수에 대해서 정의합니다.
export const getTags = createAsyncAction(GET_TAGS);
export const setSelectedTags = createAction(SET_SELECTED_TAGS, ({type, tags}) => ({type, tags}));
export const setSortBy = createAction(SET_SORT_BY, ({type, sortBy}) => ({type, sortBy}));

// 4. saga 비동기 관련 함수가 필요할 경우 작성 합니다. (optional) saga함수들의 모음은 최하단에 나열합니다.
const getTagsSaga = createAsyncSaga(getTags, tagAPI.getTags);

export function* setSelectedTagsSaga(action) {
  yield put(setSelectedTags(action.payload));
}

// 5. 초기 상태 정의
const initialState = {
  data: [],
  selectedAlbumTags: [],
  selectedSearchTags: [],
  albumSortBy: null,
  searchSortBy: null,
  loading: false,
  error: null,
};

// 6. 리듀서 정의
export default handleActions(
  {
      [GET_TAGS.SUCCESS]: (state, action) => {
          return {
              ...state,
              data: action.payload.data
          };
      },
      [GET_TAGS.FAILURE]: (state, action) => ({
          ...state,
          error: action,
      }),
      [SET_SELECTED_TAGS]: (state, {payload: {type, tags}}) => {
        if (type === 'album') {
          return {
            ...state,
            selectedAlbumTags: tags || [],
          }
        } else {
          return {
            ...state,
            selectedSearchTags: tags || [],
          }
        }
      },
      [SET_SORT_BY]: (state, {payload: {type, sortBy}}) => {
          console.log("type is:" + type + "   sort is :" + sortBy)
          if (type === 'album') {
              return {
                  ...state,
                  albumSortBy: sortBy || null,
              }
          } else {
              return {
                  ...state,
                  searchSortBy: sortBy || null,
              }
          }
      },
  },
  initialState,
);

// 7. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
export function* tagsSaga() {
  yield takeEvery(GET_TAGS.REQUEST, getTagsSaga);
}
