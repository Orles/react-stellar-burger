import { SET_AUTHCHECKED, SET_USER, TOGGLE_OK } from "../actions/userAction";

const initialState = {
    user: null,
    isAuthChecked: false,
    ok: false
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHCHECKED: {
            return {
                ...state,
                isAuthChecked: action.payload
            }
        }
        case SET_USER: {
            return {
                ...state,
                user: action.payload
            }
        }
        case TOGGLE_OK: {
            return {
                ...state,
                ok: action.payload
            }
        }
        default: {
            return state
        }
    }
}