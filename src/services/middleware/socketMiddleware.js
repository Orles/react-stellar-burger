import { Middleware, MiddlewareAPI } from 'redux';

export const socketMiddleware = (wsActions) => {
    return store => {
        let socket = null;
        
        return next => action => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsInit, wsClose, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit) {
                socket = new WebSocket(payload);
            }
            // `${wsUrl}?token=${localStorage.getItem("accessToken").substr(7)}`
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };
                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };
                socket.onmessage = event => {
                    const { data } = event;
                    dispatch({ type: onMessage, payload: JSON.parse(data) });
                };
                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };
                if (socket.readyState === WebSocket.OPEN) {

                    if (type === wsSendMessage) {
                        const order = JSON.stringify(payload);
                        socket.send(order);
                    }
                }
                if (type === wsClose) {
                    socket.close();
                }
            }
        

            next(action);
        };
    };
}; 