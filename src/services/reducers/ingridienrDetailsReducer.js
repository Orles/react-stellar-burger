import { INGREDIENT_DETAILS_MODAL_CLOSE, INGREDIENT_DETAILS_MODAL_OPEN } from "../actions/ingridienrDetailsAction";

const initialState = {
    ingridient: null,
}

export const ingridientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case INGREDIENT_DETAILS_MODAL_OPEN: {
            return {
                ...state,
                ingridient: action.payload
            }
        }
        case INGREDIENT_DETAILS_MODAL_CLOSE: {
            return {
                ...state,
                ingredient: {}
            }
        }
        default: {
            return state
        }
    }
}