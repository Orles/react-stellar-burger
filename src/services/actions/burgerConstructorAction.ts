import { Iingredient } from "../../utils/type";

export const BURGER_CONSTRUCTOR_ADD_INGRIDIENTS: 'BURGER_CONSTRUCTOR_ADD' = 'BURGER_CONSTRUCTOR_ADD';
export const BURGER_CONSTRUCTOR_DELETE: 'BURGER_CONSTRUCTOR_DELETE' = 'BURGER_CONSTRUCTOR_DELETE';
export const BURGER_CONSTRUCTOR_ADD_BUN: 'BURGER_CONSTRUCTOR_ADD_BUN' = 'BURGER_CONSTRUCTOR_ADD_BUN';
export const BURGER_CONSTRUCTOR_MOVE: 'BURGER_CONSTRUCTOR_MOVE' = 'BURGER_CONSTRUCTOR_MOVE';

export interface IBurgerConstructorAddIngridients {
    readonly type: typeof BURGER_CONSTRUCTOR_ADD_INGRIDIENTS;
    readonly payload: Iingredient[];
}

export interface IBurgerConstructorDelete {
    readonly type: typeof BURGER_CONSTRUCTOR_DELETE;
    readonly payload: number;
}

export interface IBurgerConstructorAddBun {
    readonly type: typeof BURGER_CONSTRUCTOR_ADD_BUN;
    readonly payload: Iingredient;
}

export interface IBurgerConstructorMove {
    readonly type: typeof BURGER_CONSTRUCTOR_MOVE;
    readonly payload: Iingredient[];
}

export type TBurgerConstructorActions =
| IBurgerConstructorAddIngridients
| IBurgerConstructorDelete
| IBurgerConstructorAddBun
| IBurgerConstructorMove;