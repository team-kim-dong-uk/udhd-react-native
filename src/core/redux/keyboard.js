import {createAction, handleActions} from "redux-actions";

const prefix = 'keyboard/';

const VISIBLE = `${prefix}VISIBLE`;
const INVISIBLE = `${prefix}INVISIBLE`;

export const keyboardVisible = createAction(VISIBLE);
export const keyboardInvisible = createAction(INVISIBLE);

const initialState = {
  visible: false,
};
export default handleActions(
    {
        [VISIBLE]: (state, action) => {
            return {
                ...state,
                visible: true
            };
        },
        [INVISIBLE]: (state, action) => {
            return {
                ...state,
                visible: false
            };
        },
    },
    initialState,
);
