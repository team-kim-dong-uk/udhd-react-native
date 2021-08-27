import { createAction } from 'redux-actions';
import { call, put} from 'redux-saga/effects';
import * as authAPI from '../../api/authAPI';
import { loginSuccess } from '../../core/redux/auth';
import { finishLoading, startLoading } from '../../core/redux/loading';

export const asyncActionCreator = (actionName) => {
  const asyncTypeAction = ['_REQUEST', '_SUCCESS', '_FAILURE'];
  return {
    REQUEST: actionName + asyncTypeAction[0],
    SUCCESS: actionName + asyncTypeAction[1],
    FAILURE: actionName + asyncTypeAction[2],
  };
};

export const createAsyncAction = (asyncAction) => {
  return {
    request: createAction(asyncAction.REQUEST),
    success: createAction(asyncAction.SUCCESS),
    failure: createAction(asyncAction.FAILURE),
  };
};

export default function createAsyncSaga(asyncAction, asyncFunction) {
  return function* saga(action) {
    try {
      yield put(startLoading());
      const result = yield call(asyncFunction, action?.payload);
      yield put(asyncAction.success(result));
    } catch (error) {
      if (error?.response?.status === 401) {
        // try {
        //   // acessToken이 잘못되어 401응답을 받은경우, refreshToken으로 새 토큰을 요청한다.
        //   const tokenResponse = yield authAPI.refreshToken();
        //   yield put(loginSuccess(tokenResponse.data));
        //   // 새 토큰 정보를 가지고 다시 요청을 보낸다.
        //   const result = yield call(asyncFunction, action?.payload);
        //   yield put(asyncAction.success(result));
        // } catch (e) {
        //   // refresh token도 잘못되어 401에러 발생시 login 페이지로 이동.
        //   if (e?.response?.status === 401) {
        //     Router.push('/login');
        //   }
        //   yield put(asyncAction.failure({ error: e }));
        // }
      } else {
        console.log(error);
        yield put(asyncAction.failure({ error }));
      }
    }
    yield put(finishLoading());
  }
}
