import { ORDER_DETAILS_FAILED, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_OK, ORDER_DETAILS_NO } from "../actions/orderDetailsAction";

const initialState = {
    orderDetails: {},
    orderDetailsRequest: false,
    orderDetailsFailed: false,
    ok: false
}

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST: {
            return {
                ...state,
                orderDetailsRequest: true
            }
        }
        case ORDER_DETAILS_SUCCESS: {
            return {
                ...state,
                orderDetails: action.payload,
                orderDetailsRequest: false,
                orderDetailsFailed: false
            }
        }
        case ORDER_DETAILS_FAILED: {
            return {
                ...state,
                orderDetails: {},
                orderDetailsRequest: false,
                orderDetailsFailed: true
            }
        }
        case ORDER_DETAILS_OK: {
            return {
                ...state,
                ok: action.payload,
            }
        }
        case ORDER_DETAILS_NO: {
            return {
                ...state,
                ok: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}