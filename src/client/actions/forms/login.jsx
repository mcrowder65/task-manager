import {LOGIN_ACTIONS_SET_FORM} from "../action-types";
import initialState from "../../reducers/initial-state";
import stringValidator from "../../validators/string";

export const setUsername = username => {
    return {
        type: LOGIN_ACTIONS_SET_FORM,
        username
    };
};

export const setUsernameError = usernameError => {
    return {
        type: LOGIN_ACTIONS_SET_FORM,
        usernameError
    };
};

export const setPassword = password => {
    return {
        type: LOGIN_ACTIONS_SET_FORM,
        password
    };
};

export const setPasswordError = passwordError => {
    return {
        type: LOGIN_ACTIONS_SET_FORM,
        passwordError
    };
};

export const clearLoginForm = () => {
    return {
        type: LOGIN_ACTIONS_SET_FORM,
        ...initialState.forms.login
    };
};

export const validateLoginForm = (username, password) => {
    return dispatch => {
        const isUsernameValid = stringValidator(username);
        const isPasswordValid = stringValidator(password);
        if (!isUsernameValid) {
            dispatch(setUsernameError("Username is required"));
        }
        if (!isPasswordValid) {
            dispatch(setPasswordError("Password is required"));
        }
        return isUsernameValid && isPasswordValid;
    };
};
