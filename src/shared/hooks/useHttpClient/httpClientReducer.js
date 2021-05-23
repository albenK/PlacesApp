export const USE_HTTP_CLIENT_INITIAL_STATE = {
    isLoading: false,
    error: null
};

export const USE_HTTP_CLIENT_ACTION_TYPES = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR'
};

export const USE_HTTP_CLIENT_REDUCER = (state, action) => {
    switch (action.type) {
        case USE_HTTP_CLIENT_ACTION_TYPES.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        case USE_HTTP_CLIENT_ACTION_TYPES.SET_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
}