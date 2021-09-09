
/*
* searching 상태 == 검색 창 + 추천 태그들 보여주는 상태
* searching이 true가 되면 로고, 필터, 업로드 버튼, 사진 목록이 invisible이 되고 추천 태그 목록이 생김
* */

const prefix = 'searching/';

const START_SEARCHING = `${prefix}START`;
const FINISH_SEARCHING = `${prefix}FINISH`;

export const startSearching = () => ({type: START_SEARCHING});
export const finishSearching = () => ({type: FINISH_SEARCHING});

const initialState = {
  data: false,
};
export default function isSearching(state = initialState, action) {
    switch (action.type) {
        case START_SEARCHING:
            return {
                ...state,
                data: true
            };
        case FINISH_SEARCHING:
            return {
                ...state,
                data: false
            };
        default:
            return state;
    }
}
