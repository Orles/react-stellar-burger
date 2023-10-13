import { Iingredient } from "../../utils/type";
import { INGREDIENT_DETAILS_MODAL_CLOSE } from "../actions/ingridienrDetailsAction";
import { IingredientDetailsModalOpen } from "../actions/ingridienrDetailsAction";

export interface IInitialStateIngtidientDetails {
    ingridient: null | Iingredient;
}

const initialState: IInitialStateIngtidientDetails = {
    ingridient: null,
}

export const ingridientDetailsReducer = (state = initialState, action: IingredientDetailsModalOpen) => {
    switch (action.type) {
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