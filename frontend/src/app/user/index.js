export const types = {
    RETRIEVE_USER_SUCCESS: "user/RETRIEVE_USER_SUCCESS",
    RETRIEVE_USER_FAILURE: "user/RETRIEVE_USER_FAILURE",
    LOGIN_REQUIRED: "user/LOGIN_REQUIRED"
}

export const initialState = {
    username: "Unknown",
    id: "",
    email: "",
    score: 0,
    hasAuthenticated: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.RETRIEVE_USER_SUCCESS:
            return {...state, ...action.response, hasAuthenticated: true};
        case types.RETRIEVE_USER_FAILURE:
            return {...initialState};
        default:
            return state;
    }
};