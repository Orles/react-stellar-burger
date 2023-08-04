import { getData } from "../../utils/Api";

export const GET_BURGER_INGRIDIENTS_REQUEST = 'GET_BURGER_INGRIDIENTS_REQUEST';
export const GET_BURGER_INGRIDIENTS_FAILED = 'GET_BURGER_INGRIDIENTS_FAILED';
export const GET_BURGER_INGRIDIENTS_SUCCESS = 'GET_BURGER_INGRIDIENTS_SUCCESS';

export const getBurgerIngridientsData = () => {
    return function (dispatch) {
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
            } else {
                dispatch({
                    type: GET_BURGER_INGRIDIENTS_FAILED
                })
            }
        })
    }
}