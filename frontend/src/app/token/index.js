export const types = {
    RETRIEVE_TOKENS_SUCCESS: "token/RETRIEVE_TOKENS_SUCCESS",
    RETRIEVE_TOKENS_FAILURE: "token/RETRIEVE_TOKENS_FAILURE",
    RECYCLE_REFRESH_TOKEN_SUCCESS: "token/RECYCLE_REFRESH_TOKEN_SUCCESS",
    RECYCLE_REFRESH_TOKEN_FAILURE: "token/RECYCLE_REFRESH_TOKEN_FAILURE",
};

export const initialState = {
    accessToken: localStorage.getItem("access"),
    refreshToken: localStorage.getItem("refresh")
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.RETRIEVE_TOKENS_SUCCESS:
            return {...state, ...action.response};
        case types.RETRIEVE_TOKENS_FAILURE:
            return {...initialState};
        case types.RECYCLE_REFRESH_TOKEN_SUCCESS:
            return {...state, refreshToken: action.response};
        case types.RECYCLE_REFRESH_TOKEN_FAILURE:
            return {...initialState};
        default:
            return state;
    }
};