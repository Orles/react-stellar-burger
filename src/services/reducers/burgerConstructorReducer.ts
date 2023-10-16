import { Iingredient } from "../../utils/type";
import { BURGER_CONSTRUCTOR_ADD_BUN, BURGER_CONSTRUCTOR_ADD_INGRIDIENTS, BURGER_CONSTRUCTOR_DELETE, BURGER_CONSTRUCTOR_MOVE } from "../actions/burgerConstructorAction";
import { TBurgerConstructorActions } from "../actions/burgerConstructorAction";

export interface IInitialStateConstrctor {
    ingridient: Iingredient[];
    bun: Iingredient | null;
}

const initialState: IInitialStateConstrctor = {
    ingridient: [],
    bun: null,
}

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions)=> {
    switch (action.type) {
        case BURGER_CONSTRUCTOR_ADD_INGRIDIENTS: {
            return {
                ...state,
                ingridient: [...state.ingridient, action.payload]
            }
        }
        case BURGER_CONSTRUCTOR_ADD_BUN: {
            return {
                ...state,
                bun: action.payload
            }
        }
        case BURGER_CONSTRUCTOR_DELETE: {
            return {
                ...state,
                ingridient: [...state.ingridient].filter(item => item.key !== action.payload)
            }
        }
        case BURGER_CONSTRUCTOR_MOVE: {
            return {
                ...state,
                ingridient: action.payload
            }
        }
        default: {
            return state;
        }
    }
}