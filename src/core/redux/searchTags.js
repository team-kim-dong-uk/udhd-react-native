
/*
* searching 상태 == 검색 창 + 추천 태그들 보여주는 상태
* searching이 true가 되면 로고, 필터, 업로드 버튼, 사진 목록이 invisible이 되고 추천 태그 목록이 생김
* */

import {createAction, handleActions} from "redux-actions";

const prefix = 'search_tag/';

const SET_SEARCH_TAG = `${prefix}SET`;

export const setSearchTags = createAction(SET_SEARCH_TAG, ({tag}) => ({tag}));

const initialState = {
  data: [],
};

export default handleActions(
    {
        [SET_SEARCH_TAG]: (state, action) => {
            return {
                ...state,
                data: state.data.concat(action.payload.tag)
            };
        },
    },
    initialState,
);
