export const AuthInitialState = {
    isLoginMode: true,
    isLoading: false,
    error: null
};

export const ACTION_TYPES = {
    TOGGLE_LOGIN_MODE: 'TOGGLE_LOGIN_MODE',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR'
};

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.TOGGLE_LOGIN_MODE:
            return {
                ...state,
                isLoginMode: !state.isLoginMode
            };
        case ACTION_TYPES.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        case ACTION_TYPES.SET_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
};