import { Middleware, MiddlewareAPI } from 'redux';

export const socketMiddleware = (wsUrl) => {
    return store => {
        let socket = null;
        
        return next => action => {
            const { dispatch, getState } = store;
            const { type, payload } = action;

            if (type === 'WS_CONNECTION_START_ORDERS') {
                socket = new WebSocket(`${wsUrl}?token=${localStorage.getItem("accessToken").substr(7)}`);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: 'WS_CONNECTION_SUCCESS_ORDERS', payload: event });
                };
                socket.onerror = event => {
                    dispatch({ type: 'WS_CONNECTION_ERROR_ORDERS', payload: event });
                };
                socket.onmessage = event => {
                    const { data } = event;
                    dispatch({ type: 'WS_GET_MESSAGE_ORDERS', payload: JSON.parse(data) });
                };
                socket.onclose = event => {
                    dispatch({ type: 'WS_CONNECTION_CLOSED_ORDERS', payload: event });
                };
                if (socket.readyState === WebSocket.OPEN) {

                    if (type === 'WS_SEND_MESSAGE_ORDERS') {
                        const order = JSON.stringify(payload);
                        socket.send(order);
                    }
                }
            }
        

            next(action);
        };
    };
}; 