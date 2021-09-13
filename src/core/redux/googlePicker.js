import { handleActions } from 'redux-actions';
import { createAction } from 'redux-actions';

const prefix = 'googlePicker/';

const CHANGE_FOLDER = `${prefix}CHANGE_FOLDER`
const BACK_FOLDER = `${prefix}BACK_FOLDER`
const SET_FILE_LIST = `${prefix}SET_FILE_LIST`;
const TOGGLE_SELECT = `${prefix}TOGGLE_SELECT`;
const SELECT_ALL = `${prefix}SELECT_ALL`;
const UNSELECT_ALL = `${prefix}UNSELECT_ALL`;

export const changeFolder = createAction(CHANGE_FOLDER, ({folderId}) => ({folderId}));
export const backFolder = createAction(BACK_FOLDER);
export const setFileList = createAction(SET_FILE_LIST);
export const toggleSelect = createAction(TOGGLE_SELECT, ({item}) => ({item}));
export const selectAll = createAction(SELECT_ALL);
export const unselectAll = createAction(UNSELECT_ALL);

const initialState = {
  data: [],
  folderIdStack: ['root'],
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