import { handleActions } from 'redux-actions';
import { createAction } from 'redux-actions';
import * as SecureStore from 'expo-secure-store';
import * as authAPI from '../../api/authAPI';
import api from '../../api/client';
import createAsyncSaga, { asyncActionCreator, createAsyncAction } from '../../util/redux';
import { takeEvery } from 'redux-saga/effects';

const prefix = 'googlePicker/';

const SET_FILE_LIST = `${prefix}SET_FILE_LIST`;
const TOGGLE_SELECT = `${prefix}TOGGLE_SELECT`;

export const setFileList = createAction(SET_FILE_LIST);
export const toggleSelect = createAction(TOGGLE_SELECT, ({fileId}) => ({fileId}));

const initialState = {
  data: [],
  selected: [],
  loading: false,
  error: null,
};

// 6. 리듀서 정의
export default handleActions(
  {
    [SET_FILE_LIST]: (state, action) => {
        return {
          ...state,
          data: action.payload,
          selected: []
        };
    },
    [TOGGLE_SELECT]: (state, action) => {
      const fileId = action.payload.fileId;
      const selected = state.selected;
      return {
        ...state,
        selected: selected.includes(fileId) ? selected.filter(i => i !== fileId) : [ ...selected, fileId ]
      }
    }
  },
  initialState,
);