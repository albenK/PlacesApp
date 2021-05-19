export const AuthInitialState = {
    isLoginMode: true,
    isLoading: false,
    data: null,
    error: null
};

export const ACTION_TYPES = {
    TOGGLE_LOGIN_MODE: 'TOGGLE_LOGIN_MODE'
};

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.TOGGLE_LOGIN_MODE:
            return {
                ...state,
                isLoginMode: !state.isLoginMode
            };
        default:
            return state;
    }
};