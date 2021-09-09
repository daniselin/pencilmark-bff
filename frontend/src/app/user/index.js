export const types = {
    RETRIEVE_USER_SUCCESS: "user/RETRIEVE_USER_SUCCESS",
    RETRIEVE_USER_FAILURE: "user/RETRIEVE_USER_FAILURE",
    SIGN_IN_USER: "user/SIGN_IN_USER",
    SIGN_UP_USER: "user/SIGN_UP_USER",
    LOGOUT_USER: "user/LOGOUT_USER",
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

export const actions = {
    logoutUser: () => {
        return {type: types.LOGOUT_USER}
    },
    loginUser: () => {
        return {type: types.SIGN_IN_USER}
    },
    signupUser: () => {
        return {type: types.SIGN_UP_USER}
    }
}