import { postIngridients } from "../../utils/Api";
import { Iingredient, Iorder } from "../../utils/type";
import { AppDispatch } from "../../utils/type";

export const ORDER_DETAILS_SUCCESS: 'ORDER_DETAILS_SUCCESS' = 'ORDER_DETAILS_SUCCESS';
export const ORDER_DETAILS_REQUEST: 'ORDER_DETAILS_REQUEST' = 'ORDER_DETAILS_REQUEST';
export const ORDER_DETAILS_FAILED: 'ORDER_DETAILS_FAILED' = 'ORDER_DETAILS_FAILED';
export const ORDER_DETAILS_OK: 'ORDER_DETAILS_OK' = 'ORDER_DETAILS_OK';
export const ORDER_DETAILS_NO: 'ORDER_DETAILS_NO' = 'ORDER_DETAILS_NO';

export interface IOrdersDetailsSuccess {
    readonly type: typeof ORDER_DETAILS_SUCCESS;
    readonly payload: Iorder;
}
export interface IOrdersDetailsRequest {
    readonly type: typeof ORDER_DETAILS_REQUEST;
}
export interface IOrdersDetailsFalied {
    readonly type: typeof ORDER_DETAILS_FAILED;
}
export interface IOrdersDetailsOk {
    readonly type: typeof ORDER_DETAILS_OK;
    readonly payload: boolean;
}
export interface IOrdersDetailsNo {
    readonly type: typeof ORDER_DETAILS_NO;
    readonly payload: boolean;
}

export type TOrdersDetails =
| IOrdersDetailsSuccess
| IOrdersDetailsRequest
| IOrdersDetailsFalied
| IOrdersDetailsOk
| IOrdersDetailsNo;

export const postOrdersDetailsIngredients = (ingridients: string[]) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
        postIngridients(ingridients)
        .then((res) => {
            if (res && res.success) {
                dispatch({
                    type: ORDER_DETAILS_SUCCESS,
                    payload: res.order
                })
            } else {
                dispatch({
                    type: ORDER_DETAILS_FAILED
                })
            }
        })
    }
}