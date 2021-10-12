import { handleActions } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga, {
  asyncActionCreator,
  createAsyncAction,
} from '../../util/redux/index';
import * as albumAPI from '../../api/albumAPI';
import * as tagAPI from "../../api/tagAPI";
import ToastUtil from "../../util/ToastUtil";

// 1. 각 모듈별 함수 구분을 위한 prefix 각 모듈 파일명 + '/' 의 조합으로 구성합니다.
const prefix = 'album/';

// 2. 액션타입에 대해서 정의합니다.
const ADD = asyncActionCreator(`${prefix}ADD`);
const REMOVE = asyncActionCreator(`${prefix}REMOVE`);
const PATCH_TAGS = asyncActionCreator(`${prefix}PATCH_TAGS`);

// 3. 액션함수에 대해서 정의합니다.
//export const getAlbum = createAsyncAction(GET_ALBUM);
export const addToAlbum = createAsyncAction(ADD);
export const removeFromAlbum = createAsyncAction(REMOVE);
export const updateAlbumTags = createAsyncAction(PATCH_TAGS, ({userId, albumId, tags}) => ({userId, albumId, tags}));

// 4. saga 비동기 관련 함수가 필요할 경우 작성 합니다. (optional) saga함수들의 모음은 최하단에 나열합니다.
//const getAlbumSaga = createAsyncSaga(getAlbum, albumAPI.getAlbum);
const addToAlbumSaga = createAsyncSaga(addToAlbum, albumAPI.addToAlbum);
const removeFromAlbumSaga = createAsyncSaga(removeFromAlbum, albumAPI.removeFromAlbum);
const updateTagsSaga = createAsyncSaga(updateAlbumTags, albumAPI.updateAlbumTags);

// 5. 초기 상태 정의
const initialState = {
  data: [],
  isEnd: false,
  loading: false,
  error: null,
};

// 6. 리듀서 정의
export default handleActions(
  {
    [ADD.SUCCESS]: (state, action) => {
        return {
            ...state,
        };
    },
    [ADD.FAILURE]: (state, action) => {
      return {
          ...state,
          error: action.error,
      };
    },
      [REMOVE.SUCCESS]: (state, action) => {
          return {
              ...state,
          };
      },
      [REMOVE.FAILURE]: (state, action) => {
          return {
              ...state,
              error: action.error,
          };
      },
      [PATCH_TAGS.SUCCESS]: (state, action) => {
          ToastUtil.success("업데이트 성공!");
          return {
              ...state,
          };
      },
      [PATCH_TAGS.FAILURE]: (state, action) => {
          ToastUtil.error("다시 시도해주세요!");
          return {
              ...state,
              error: action.error,
          };
      },
  },
  initialState,
);

// 7. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
export function* albumSaga() {
  yield takeEvery(ADD.REQUEST, addToAlbumSaga);
  yield takeEvery(REMOVE.REQUEST, removeFromAlbumSaga);
    yield takeEvery(PATCH_TAGS.REQUEST, updateTagsSaga);
}
