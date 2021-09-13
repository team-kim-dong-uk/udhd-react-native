import { handleActions } from 'redux-actions';
import { createAction } from 'redux-actions';

const prefix = 'googlePicker/';

const CHANGE_FOLDER = `${prefix}CHANGE_FOLDER`;   // 폴더 이동
const BACK_FOLDER = `${prefix}BACK_FOLDER`;       // 상위 폴더로 이동
const SET_FILE_LIST = `${prefix}SET_FILE_LIST`;   // api로 받아온 정보 보여주기
const TOGGLE_SELECT = `${prefix}TOGGLE_SELECT`;   // 이미지 클릭 시 선택 / 선택해제
const SELECT_ALL = `${prefix}SELECT_ALL`;         // 이미지 전체 선택
const UNSELECT_ALL = `${prefix}UNSELECT_ALL`;     // 이미지 전체선택 해제

export const changeFolder = createAction(CHANGE_FOLDER, ({folderId}) => ({folderId}));
export const backFolder = createAction(BACK_FOLDER);
export const setFileList = createAction(SET_FILE_LIST);
export const toggleSelect = createAction(TOGGLE_SELECT, ({item}) => ({item}));
export const selectAll = createAction(SELECT_ALL);
export const unselectAll = createAction(UNSELECT_ALL);

const initialState = {
  data: [],
  folderIdStack: ['root'],  // 뒤로가기 버튼 클릭시 처리를 위해 root부터 들어간 폴더를 stack으로 관리. 배열의 끝 원소가 현재 폴더
  loading: false,
  error: null,
};

// 6. 리듀서 정의
export default handleActions(
  {
    [CHANGE_FOLDER]: (state, action) => {
        return {
          ...state,
          data: [],
          folderIdStack: [...state.folderIdStack, action.payload.folderId],
        };
    },
    [BACK_FOLDER]: (state, action) => {
      return {
        ...state,
        data: [],
        folderIdStack: state.folderIdStack.slice(0, -1),
      }
    },
    [SET_FILE_LIST]: (state, action) => {
        return {
          ...state,
          data: action.payload,
        };
    },
    [TOGGLE_SELECT]: (state, action) => {
      const fileId = action.payload.item.id;
      return {
        ...state,
        data: state.data.map(item => item.id === fileId ? {...item, selected: !item.selected} : item),
      }
    },
    [SELECT_ALL]: (state, action) => {
      return {
        ...state,
        data: state.data.map( item => 
          item.mimeType.startsWith('image') ? {...item, selected: true} : item),
      }
    },
    [UNSELECT_ALL]: (state, action) => {
      return {
        ...state,
        data: state.data.map( item => 
          item.mimeType.startsWith('image') ? {...item, selected: false} : item),
      }
    },
  },
  initialState,
);