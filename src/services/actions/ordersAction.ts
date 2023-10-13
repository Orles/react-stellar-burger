import { IOrders } from "../../utils/type";
import { IWSMiddlewareActions } from "../../utils/type";

export const WS_CONNECTION_START_ORDERS: 'WS_CONNECTION_START_ORDERS' = 'WS_CONNECTION_START_ORDERS';
export const WS_CONNECTION_SUCCESS_ORDERS: 'WS_CONNECTION_SUCCESS_ORDERS' = 'WS_CONNECTION_SUCCESS_ORDERS';
export const WS_CONNECTION_ERROR_ORDERS: 'WS_CONNECTION_ERROR_ORDERS' = 'WS_CONNECTION_ERROR_ORDERS';
export const WS_CONNECTION_CLOSED_ORDERS: 'WS_CONNECTION_CLOSED_ORDERS' = 'WS_CONNECTION_CLOSED_ORDERS';
export const WS_GET_MESSAGE_ORDERS: 'WS_GET_MESSAGE_ORDERS' = 'WS_GET_MESSAGE_ORDERS';
export const WS_SEND_MESSAGE_ORDERS: 'WS_SEND_MESSAGE_ORDERS' = 'WS_SEND_MESSAGE_ORDERS';
export const WS_DISCONECT_ORDERS: 'WS_DISCONECT_ORDERS' = 'WS_DISCONECT_ORDERS';

export interface IConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START_ORDERS;
  readonly payload: any;
}
export interface IConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSED_ORDERS;
  readonly payload: any;
}
export interface IConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS_ORDERS;
  readonly payload: any;
}
export interface IConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR_ORDERS;
  readonly payload: any;
}
export interface IConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED_ORDERS;
  readonly payload: any;
}
export interface IGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE_ORDERS;
  readonly payload: IOrders;
}
export interface ISendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE_ORDERS;
  readonly payload: any;
}

export type TWSActions =
  | IConnectionStartAction
  | IConnectionCloseAction
  | IConnectionSuccessAction
  | IConnectionErrorAction
  | IConnectionClosedAction
  | IGetMessageAction
  | ISendMessageAction;

export const wsActions = {
    wsInit: WS_CONNECTION_START_ORDERS,
    wsClose: WS_DISCONECT_ORDERS,
    wsSendMessage: WS_SEND_MESSAGE_ORDERS,
    onOpen: WS_CONNECTION_SUCCESS_ORDERS,
    onClose: WS_CONNECTION_CLOSED_ORDERS,
    onError: WS_CONNECTION_ERROR_ORDERS,
    onMessage: WS_GET_MESSAGE_ORDERS
  };