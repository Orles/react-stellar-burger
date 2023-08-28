import { ORDER_DETAILS_FAILED, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../actions/orderDetailsAction";

const initialState = {
    orderDetails: {},
    orderDetailsRequest: false,
    orderDetailsFailed: false
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
        default: {
            return state;
        }
    }
}