import {RESET_STATE} from "../../config/constants";
import {assign, omit} from "lodash";

export const types = {
    ADD_FIELD_ERROR: "form/ADD_FIELD_ERROR",
    UPDATE_VALUE: "form/UPDATE_VALUE",
    UPDATE_ALL_VALUES: "form/UPDATE_ALL_VALUES",
    RESET_FORM: "form/RESET_FORM",
    RESET_FOCUS: "form/RESET_FOCUS",
    RESET_FIELD_ERRORS: "form/RESET_FIELD_ERRORS",
    CLEAR_VALUES: "form/CLEAR_VALUES"
}

export const initialState = {
    values: {},
    fieldErrors: {},
    focus: false
};

export default (state = initialState, action) => {
    const {type, error} = action;
    const {values, fieldErrors} = state;

    switch (type) {
        case RESET_STATE:
            return {...initialState}
        case types.ADD_FIELD_ERROR: {
            const {name, message} = action ;
            return {
                ...state,
                fieldErrors: {
                    ...fieldErrors,
                    [name]: message
                }
            };
        }
        case types.UPDATE_VALUE: {
            const {name, value} = action;
            let updatedFieldErrors = assign({}, fieldErrors);
            delete updatedFieldErrors[name];
            if (value) {
                return {
                    ...state,
                    fieldErrors: updatedFieldErrors,
                    values: assign({}, values, {[name]: value})
                };
            } else {
                return {
                    ...state,
                    fieldErrors: updatedFieldErrors,
                    values: assign({}, omit(values, [name]))
                };
            }
        }
        case types.UPDATE_ALL_VALUES: {
            const {updatedValues} = actions;
            let updatedFieldErrors = assign({}, fieldErrors);
            forEach(keys(updatedValues), (name) => {
                delete updatedFieldErrors[name];
            });
            return {
                ...state,
                fieldErrors: updatedFieldErrors,
                values: assign({}, values, updatedValues)
            };
        }
        case types.RESET_FORM:
            return {...initialState};
        case types.RESET_FOCUS:
            return {...state, focus: false};
        case types.RESET_FIELD_ERRORS: {
            return omit(state, ["fieldErrors"]);
        }
        case types.CLEAR_VALUES: {
            const {valuesToClear} = action;
            return {...state, values: omit(values, valuesToClear)};
        }
        default:
            if (error) {
                if (error.fieldErrors) {
                    if (!action.ignoreFieldErrors) {
                        if (action.appendToFieldErrors) {
                            return {
                                ...state,
                                values,
                                fieldErrors: {
                                    ...state.fieldErrors,
                                    ...state.fieldErrors
                                }
                            };
                        } else {
                            return {
                                ...state,
                                values,
                                fieldErrors: error.fieldErrors,
                                focus: true
                            };
                        }
                    }
                }
            }
            return state;
    }
};

export const actions = {
    resetForm: () => {
        return {type: types.RESET_FORM};
    },
    updateValues: (updatedValues, pageKey) => {
        return {type: types.UPDATE_ALL_VALUES, updatedValues, pageKey}
    },
    update: (name, value) => {
        return {type: types.UPDATE_VALUE, name, value};
    },
    addFieldError: (name, message) => {
        return {type: types.ADD_FIELD_ERROR, name, message};
    },
    resetFieldErrors: () => {
        return {type: types.RESET_FIELD_ERRORS};
    },
    clearValues: (valuesToClear) => {
        return {type: types.CLEAR_VALUES, valuesToClear};
    },
}