import { useReducer, useCallback, useRef, useEffect } from 'react';

import { USE_HTTP_CLIENT_REDUCER,
    USE_HTTP_CLIENT_INITIAL_STATE,
    USE_HTTP_CLIENT_ACTION_TYPES
} from './httpClientReducer';

const useHttpClient = () => {
    const [ state, dispatch ] = useReducer(USE_HTTP_CLIENT_REDUCER, USE_HTTP_CLIENT_INITIAL_STATE);

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        dispatch({ type: USE_HTTP_CLIENT_ACTION_TYPES.SET_LOADING, payload: { isLoading: true }});
        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController);
        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortController.signal
            });
           
            const responseData = await response.json();

            // remove the abort controller we just added since http request finished.
            activeHttpRequests.current = activeHttpRequests.current.filter(abortCtrl => abortCtrl !== httpAbortController);
    
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            dispatch({ type: USE_HTTP_CLIENT_ACTION_TYPES.SET_LOADING, payload: { isLoading: false }});
            return responseData;

        } catch (err) {
            dispatch({ type: USE_HTTP_CLIENT_ACTION_TYPES.SET_LOADING, payload: { isLoading: false }});
            dispatch({ type: USE_HTTP_CLIENT_ACTION_TYPES.SET_ERROR, payload: { error: err.message }});
            throw err;
        }

    }, []);

    const clearError = () => {
        dispatch({ type: USE_HTTP_CLIENT_ACTION_TYPES.SET_ERROR, payload: { error: null }});
    };

    useEffect(() => {
        // cleanup any remaining open http requests.
        return () => {
            activeHttpRequests.current.forEach(abortController => abortController.abort());
        }
    }, []);

    return {
        isLoading: state.isLoading,
        error: state.error,
        sendRequest,
        clearError
    };
};

export default useHttpClient;