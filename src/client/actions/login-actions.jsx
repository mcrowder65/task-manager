import {LOGIN_ACTIONS_SET_USERNAME, LOGIN_ACTIONS_SET_PASSWORD} from "./action-types";

export const setUsername = username => {
  return {
    type: LOGIN_ACTIONS_SET_USERNAME,
    username
  };
};

export const setUsernameError = usernameError => {
  return {
    type: LOGIN_ACTIONS_SET_USERNAME,
    usernameError
  };
};

export const setPassword = password => {
  return {
    type: LOGIN_ACTIONS_SET_PASSWORD,
    password
  };
};

export const setPasswordError = passwordError => {
  return {
    type: LOGIN_ACTIONS_SET_PASSWORD,
    passwordError
  };
};
