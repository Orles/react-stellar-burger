import { postIngridients } from "../../utils/Api";

export const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS';
export const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST';
export const ORDER_DETAILS_FAILED = 'ORDER_DETAILS_FAILED';
export const ORDER_DETAILS_OK = 'ORDER_DETAILS_OK';
export const ORDER_DETAILS_NO = 'ORDER_DETAILS_NO';

export const postOrdersDetailsIngredients = (ingridients) => {
    return function (dispatch) {
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