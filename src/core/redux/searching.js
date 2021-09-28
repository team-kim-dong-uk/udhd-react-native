
/*
* searching 상태 == 검색 창 + 추천 태그들 보여주는 상태
* searching이 true가 되면 로고, 필터, 업로드 버튼, 사진 목록이 invisible이 되고 추천 태그 목록이 생김
* */

import {createAction, handleActions} from "redux-actions";

const prefix = 'searching/';

const START_SEARCHING = `${prefix}START`;
const FINISH_SEARCHING = `${prefix}FINISH`;

export const startSearching = createAction(START_SEARCHING);
export const finishSearching = createAction(FINISH_SEARCHING);

const initialState = {
  data: false,
};
export default handleActions(
    {
        [START_SEARCHING]: (state, action) => {
            return {
                ...state,
                data: true
            };
        },
        [FINISH_SEARCHING]: (state, action) => {
            return {
                ...state,
                data: false
            };
        },
    },
    initialState,
);
