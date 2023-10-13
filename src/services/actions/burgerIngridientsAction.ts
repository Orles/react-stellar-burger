import { getData } from "../../utils/Api";
import { Dispatch } from "redux";
import { Iingredient } from "../../utils/type";

export const GET_BURGER_INGRIDIENTS_REQUEST:  'GET_BURGER_INGRIDIENTS_REQUEST'= 'GET_BURGER_INGRIDIENTS_REQUEST';
export const GET_BURGER_INGRIDIENTS_FAILED: 'GET_BURGER_INGRIDIENTS_FAILED' = 'GET_BURGER_INGRIDIENTS_FAILED';
export const GET_BURGER_INGRIDIENTS_SUCCESS: 'GET_BURGER_INGRIDIENTS_SUCCESS' = 'GET_BURGER_INGRIDIENTS_SUCCESS';

export interface IGetBurgerIngridientsRequest {
    readonly type: typeof GET_BURGER_INGRIDIENTS_REQUEST;
}

export interface IGetBurgerIngridientsFalied {
    readonly type: typeof GET_BURGER_INGRIDIENTS_FAILED;
}

export interface IGetBurgerIngridientsSuccess {
    readonly type: typeof GET_BURGER_INGRIDIENTS_SUCCESS;
    readonly payload: Iingredient;
}

export type TGetBurgerIngridients =
| IGetBurgerIngridientsRequest
| IGetBurgerIngridientsFalied
| IGetBurgerIngridientsSuccess;

export const getBurgerIngridientsData = () => {
    return function (dispatch: Dispatch) {
        dispatch({
            type: GET_BURGER_INGRIDIENTS_REQUEST
        })
        getData()
        .then((res) => {
            if (res && res.success) {
                dispatch({
                    type: GET_BURGER_INGRIDIENTS_SUCCESS,
                    payload: res.data
                })
                console.log(res.data)
            } else {
                dispatch({
                    type: GET_BURGER_INGRIDIENTS_FAILED
                })
            }
        })
    }
}