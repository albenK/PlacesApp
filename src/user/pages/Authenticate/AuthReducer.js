export const AUTH_INITIAL_STATE = {
    isLoginMode: true,
    isLoading: false,
    error: null
};

export const AUTH_ACTION_TYPES = {
    TOGGLE_LOGIN_MODE: 'TOGGLE_LOGIN_MODE',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR'
};

export const AUTH_REDUCER = (state, action) => {
    switch (action.type) {
        case AUTH_ACTION_TYPES.TOGGLE_LOGIN_MODE:
            return {
                ...state,
                isLoginMode: !state.isLoginMode
            };
        case AUTH_ACTION_TYPES.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        case AUTH_ACTION_TYPES.SET_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
};