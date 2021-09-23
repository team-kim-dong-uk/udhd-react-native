
/*
* searching 상태 == 검색 창 + 추천 태그들 보여주는 상태
* searching이 true가 되면 로고, 필터, 업로드 버튼, 사진 목록이 invisible이 되고 추천 태그 목록이 생김
* */

import {createAction, handleActions} from "redux-actions";

const prefix = 'search_tag/';

const SET_SEARCH_TAG = `${prefix}SET`;
const DELETE_SEARCH_TAG = `${prefix}DELETE`;

export const setSearchTags = createAction(SET_SEARCH_TAG,({tag}) => ({tag}));
export const deleteSearchTags = createAction(DELETE_SEARCH_TAG,({tag}) => ({tag}));

const initialState = {
  data: [],
};

export default handleActions(
    {
        [SET_SEARCH_TAG]: (state, action) => {
            if(state.data.includes(action.payload.tag))
                return {
                    ...state,
                    data: state.data
                }
            else
                return {
                    ...state,
                    data: state.data.concat(action.payload.tag)
                };
        },
        [DELETE_SEARCH_TAG]: (state, action) => {
            console.log(JSON.stringify(action));
            let idx = state.data.indexOf(action.payload.tag);
            if (idx != -1){
                state.data.splice(idx, 1)
            }
            return {
                ...state,
                data: state.data
            };
        },
    },
    initialState,
);
