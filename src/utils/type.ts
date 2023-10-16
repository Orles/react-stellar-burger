import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { store } from "..";
import { TBurgerConstructorActions } from "../services/actions/burgerConstructorAction";
import { TGetBurgerIngridients } from "../services/actions/burgerIngridientsAction";
import { IingredientDetailsModalOpen } from "../services/actions/ingridienrDetailsAction";
import { TOrdersDetails } from "../services/actions/orderDetailsAction";
import { TWSActions } from "../services/actions/ordersAction";
import { TSet } from "../services/actions/userAction";
import { rootReducer } from "../services/reducers";
import { IInitialStateConstrctor } from "../services/reducers/burgerConstructorReducer";
import { IInitialStateIngridient } from "../services/reducers/burgerIngridientsReducer";
import { IInitialStateIngtidientDetails } from "../services/reducers/ingridienrDetailsReducer";
import { IInetStateOrderDetails } from "../services/reducers/orderDetailsReducer";
import { IInitStateOrders } from "../services/reducers/ordersReducer";
import { IInitStateUser } from "../services/reducers/userReducer";
import { TypedUseSelectorHook, useDispatch as dispatchHook,
  useSelector as selectorHook} from "react-redux";
import { Action, ActionCreator } from "@reduxjs/toolkit";

export interface Iingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  key?: number;
}

export interface Iorder {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

// export interface Ivalue {
//   email?: string;
//   name?: string | number;
//   password?: string | number;
// }

export type RootState = {
  burgerIngridients: IInitialStateIngridient;
  burgerConstructor: IInitialStateConstrctor;
  ingredientDetails: IInitialStateIngtidientDetails;
  orderDetails: IInetStateOrderDetails;
  user: IInitStateUser;
  orders: IInitStateOrders;
}
export interface IOrders {
  success: boolean,
  orders: Array<IOrderRow>,
  total: number,
  totalToday: number,
}

export interface IOrderRow {
  ingredients: Array<string>,
  _id: string,
  status: 'created' | 'done' | 'pending',
  number: number,
  createdAt: string,
  updatedAt: string,
  name: string,
}

export interface IUserData {
  email: string,
  password: string,
  name?: string,
}

export interface IWSMiddlewareActions {
  wsInit: string;
  wsClose: string;
  wsSendMessage: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export type AppState = ReturnType<typeof rootReducer>;

type AppActions =
  | TBurgerConstructorActions
  | TGetBurgerIngridients
  | IingredientDetailsModalOpen
  | TOrdersDetails
  | TWSActions
  | TSet;

  export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, AppActions>
  >;

  export type AppDispatch = typeof store.dispatch;

  export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

  export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 