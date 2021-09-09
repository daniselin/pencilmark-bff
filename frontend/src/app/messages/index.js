import {omit, values} from "lodash";

export const types = {
    RESET_MESSAGES: "messages/RESET_MESSAGES",
    FATAL_ERROR: "messages/FATAL_ERROR",
    RESET_SUCCESS_MESSAGE: "messages/RESET_SUCCESS_MESSAGE",
    RESET_ERROR_MESSAGE: "messages/RESET_ERROR_MESSAGE",
    RESET_FATAL_ERROR_MESSAGE: "messages/RESET_FATAL_ERROR_MESSAGE",
};

export const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.RESET_MESSAGES:
            return {...initialState};
        case types.RESET_ERROR_MESSAGE:
            return omit({...state}, ["errorMessage", "verifications"]);
        case types.RESET_FATAL_ERROR_MESSAGE:
            return omit({...state}, ["fatalErrorMessage"]);
        case types.RESET_SUCCESS_MESSAGE:
            return omit({...state}, ["successMessage"]);
        case types.FATAL_ERROR:
            if (!has(action.error, "disableError") || !action.error.disableError) {
                return {...state, fatalErrorMessage: action.error.message};
            }
            return state;
        default:
    }

    if (action.successMessage) {
        return {successMessage: action.successMessage,
        section: action.section};
    }

    const {error} = action;
    if (error) {
        if (error.verifications) {
            const {verifications} = error;
            return {
                verifications: values(verifications)
            };
        }
        if (error.message && !error.fieldErrors) {
            const {message} = error;
            return {
                errorMessage: message
            };
        }
    }

    return state;
};

export const actions = {
    resetSuccessMessage: () => {
        return {type: types.RESET_SUCCESS_MESSAGE};
    },
    resetErrorMessage: () => {
        return {type: types.RESET_ERROR_MESSAGE};
    },
    resetFatalErrorMessage: () => {
        return {type: types.RESET_FATAL_ERROR_MESSAGE}
    }
};