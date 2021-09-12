import { handleActions } from 'redux-actions';
import { createAction } from 'redux-actions';
import * as SecureStore from 'expo-secure-store';
import * as authAPI from '../../api/authAPI';
import api from '../../api/client';
import createAsyncSaga, { asyncActionCreator, createAsyncAction } from '../../util/redux';
import { takeEvery } from 'redux-saga/effects';

const prefix = 'auth/';

const LOGIN_SUCCESS = `${prefix}LOGIN_SUCCESS`;
const LOGIN_FAILURE = `${prefix}LOGIN_FAILURE`;
const SET_NICKNAME = asyncActionCreator(`${prefix}SET_NICKNAME`);
const SET_GROUP = asyncActionCreator(`${prefix}SET_GROUP`);

export const loginSuccess = createAction(LOGIN_SUCCESS, 
  ({userId, accessToken, refreshToken, email, nickname, group}) => ({userId, accessToken, refreshToken, email, nickname, group}));
export const loginFailure = createAction(LOGIN_FAILURE);
export const setNickname = createAsyncAction(SET_NICKNAME);
export const setGroup = createAsyncAction(SET_GROUP);

const setNicknameSaga = createAsyncSaga(setNickname, authAPI.setNickname);
const setGroupSaga = createAsyncSaga(setGroup, authAPI.setGroup);

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default handleActions(
  {
    [LOGIN_SUCCESS]: (state, action) => {
        // SecureStore.setItemAsync('refreshToken', action.payload.refreshToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${action.payload.accessToken}`;
        return {
          ...state,
          data: {
            userId: action.payload.userId,
            email: action.payload.email,
            nickname: action.payload.nickname,
            group: action.payload.group,
            accessToken: action.payload.accessToken,
          }
        };
    },
    [LOGIN_FAILURE]: (state, action) =>
      state,
    [SET_NICKNAME.SUCCESS]: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          nickname: action.payload.data.nickname,
        },
        error: null
      }
    },[SET_NICKNAME.FAILURE]: (state, action) => {
      if (action.payload.status === 409) {
        return {
          ...state,
          error: "중복된 닉네임이 이미 존재합니다."
        }
      }
      return {
        ...state,
        error: "에러가 발생했습니다."
      };
    },
    [SET_GROUP.SUCCESS]: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          group: action.payload.data.group,
        }
      }
    },[SET_GROUP.FAILURE]: (state, action) => {
      console.log(action);
      return state;
    },
  },
  initialState,
);

export function* authSaga() {
  yield takeEvery(SET_NICKNAME.REQUEST, setNicknameSaga);
  yield takeEvery(SET_GROUP.REQUEST, setGroupSaga);
}
