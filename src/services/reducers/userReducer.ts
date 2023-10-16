import { IUserData } from "../../utils/type";
import { SET_AUTHCHECKED, SET_USER, TOGGLE_OK, TSet } from "../actions/userAction";

export interface IInitStateUser {
    user: null | IUserData;
    isAuthChecked: boolean,
    ok: boolean
}

const initialState: IInitStateUser = {
    user: null,
    isAuthChecked: false,
    ok: false
};

export const userReducer = (state = initialState, action: TSet) => {
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