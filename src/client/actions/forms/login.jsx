import {LOGIN_ACTIONS_SET_FORM} from "../action-types";
import initialState from "../../reducers/initial-state";

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
