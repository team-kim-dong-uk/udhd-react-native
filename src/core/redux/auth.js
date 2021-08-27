import { handleActions } from 'redux-actions';
import { createAction } from 'redux-actions';
import * as SecureStore from 'expo-secure-store';
import api from '../../api/client';

const prefix = 'auth/';

const LOGIN_SUCCESS = `${prefix}LOGIN_SUCCESS`;
const LOGIN_FAILURE = `${prefix}LOGIN_FAILURE`;

export const loginSuccess = createAction(LOGIN_SUCCESS, ({userId, accessToken, refreshToken}) => ({userId, accessToken, refreshToken}));
export const loginFailure = createAction(LOGIN_FAILURE);

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
            accessToken: action.payload.accessToken,
          }
        };
    },
    [LOGIN_FAILURE]: (state, action) =>
      state,
  },
  initialState,
);
