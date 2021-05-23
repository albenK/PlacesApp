
export const USERS_INITIAL_STATE = {
    isLoading: false,
    error: null,
    users: []
};

export const USERS_ACTION_TYPES = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_USERS: 'SET_USERS'
};

export const USERS_REDUCER = (state, action) => {
    switch (action.type) {
        case USERS_ACTION_TYPES.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        case USERS_ACTION_TYPES.SET_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        case USERS_ACTION_TYPES.SET_USERS:
            return {
                ...state,
                users: action.payload.users
            };
        default:
            return state;

    }
};
