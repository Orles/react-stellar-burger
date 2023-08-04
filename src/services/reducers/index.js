import { combineReducers } from "redux";
import { burgerIngridientsReducer } from "./burgerIngridientsReducer";
import { burgerConstructorReducer } from "./burgerConstructorReducer";
import { ingridientDetailsReducer } from "./ingridienrDetailsReducer";
import { orderDetailsReducer } from "./orderDetailsReducer";

export const rootReducer = combineReducers({
    burgerIngridients: burgerIngridientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingridientDetailsReducer,
    orderDetails: orderDetailsReducer
})