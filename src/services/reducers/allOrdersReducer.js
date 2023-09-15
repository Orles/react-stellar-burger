import { WS_CONNECTION_SUCCESS_ALL_ORDERS,  WS_CONNECTION_ERROR_ALL_ORDERS, WS_CONNECTION_CLOSED_ALL_ORDERS, WS_GET_MESSAGE_ALL_ORDERS} from "../actions/allOrders";

const initialState = {
    wsConnected: false,
    allOrders: null,
    error: undefined
};

export const allOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS_ALL_ORDERS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        case WS_CONNECTION_ERROR_ALL_ORDERS:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_CONNECTION_CLOSED_ALL_ORDERS:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };
        case WS_GET_MESSAGE_ALL_ORDERS:
            return {
                ...state,
                error: undefined,
                allOrders: action.payload
            };
        default:
            return state;
    }
}; 