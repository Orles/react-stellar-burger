import { WS_CONNECTION_CLOSED_ORDERS, WS_CONNECTION_ERROR_ORDERS, WS_CONNECTION_SUCCESS_ORDERS, WS_GET_MESSAGE_ORDERS } from "../actions/ordersAction";

const initialState = {
    wsConnected: false,
    orders: null,
    error: undefined
};

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS_ORDERS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        case WS_CONNECTION_ERROR_ORDERS:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_CONNECTION_CLOSED_ORDERS:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };
        case WS_GET_MESSAGE_ORDERS:
            return {
                ...state,
                error: undefined,
                orders: action.payload
            };
        default:
            return state;
    }
}; 