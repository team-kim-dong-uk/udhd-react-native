import { handleActions } from 'redux-actions';
import { createAction } from 'redux-actions';
import * as SecureStore from 'expo-secure-store';
import * as authAPI from '../../api/authAPI';
import api from '../../api/client';
import createAsyncSaga, { asyncActionCreator, createAsyncAction } from '../../util/redux';
import { takeEvery } from 'redux-saga/effects';

const prefix = 'googlePicker/';

const CHANGE_FOLDER = `${prefix}CHANGE_FOLDER`
const SET_FILE_LIST = `${prefix}SET_FILE_LIST`;
const TOGGLE_SELECT = `${prefix}TOGGLE_SELECT`;

export const changeFolder = createAction(CHANGE_FOLDER, ({folderId}) => ({folderId}));
export const setFileList = createAction(SET_FILE_LIST);
export const toggleSelect = createAction(TOGGLE_SELECT, ({item}) => ({item}));

const initialState = {
  data: [],
  folderId: 'root',
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
          folderId: action.payload.folderId,
        };
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
    }
  },
  initialState,
);