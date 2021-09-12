import { handleActions } from 'redux-actions';
import { createAction } from 'redux-actions';


// TODO 나중에 searching 이랑 합치는게 좋을 것 같다.
const prefix = 'show_photo_detail/';

const START_SHOW_DETAIL = `${prefix}START`;
const FINISH_SHOW_DETAIL = `${prefix}FINISH`;

export const startShowDetail = createAction(START_SHOW_DETAIL);
export const finishShowDetail = createAction(FINISH_SHOW_DETAIL);

const initialState = {
  data: false,
};

export default handleActions(
    {
        [START_SHOW_DETAIL]: (state, action) => {
            return {
                ...state,
                data: true
            };
        },
        [FINISH_SHOW_DETAIL]: (state, action) => {
            return {
                ...state,
                data: true
            };
        },
    },
  initialState,
);

