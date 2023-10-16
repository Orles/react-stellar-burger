import { IUserData } from "../../utils/type";

export const SET_USER: 'SET_USER' = 'SET_USER';
export const SET_AUTHCHECKED: 'SET_AUTHCHECKED' = 'SET_AUTHCHECKED';
export const TOGGLE_OK: 'TOGGLE_OK' = 'TOGGLE_OK'

export interface ISetUser {
    readonly type: typeof SET_USER;
    readonly payload: IUserData | null;
}

export interface ISetAuthchecked {
    readonly type: typeof SET_AUTHCHECKED;
    readonly payload: boolean;
}

export interface ISetOk {
    readonly type: typeof TOGGLE_OK;
    readonly payload: boolean;
}

export type TSet =
| ISetUser
| ISetAuthchecked
| ISetOk;