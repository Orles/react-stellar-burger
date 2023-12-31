import { GET_BURGER_INGRIDIENTS_FAILED, GET_BURGER_INGRIDIENTS_REQUEST, GET_BURGER_INGRIDIENTS_SUCCESS } from "../actions/burgerIngridientsAction";

const initialState = {
    burgerIngridients: [],
    burgerIngredientsRequest: false,
    burgerIngredientsFailed: false
}

export const burgerIngridientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BURGER_INGRIDIENTS_REQUEST: {
            return {
                ...state,
                burgerIngredientsRequest: true,
            }
        }
        case GET_BURGER_INGRIDIENTS_SUCCESS: {
            return {
                ...state,
                burgerIngridients: action.payload,
                burgerIngredientsRequest: false,
                burgerIngredientsFailed: false
            }
        }
        case GET_BURGER_INGRIDIENTS_FAILED: {
            return {
                ...state,
                burgerIngredientsRequest: false,
                burgerIngredientsFailed: true
            }
        }
        default: {
            return state;
        }
    }
}