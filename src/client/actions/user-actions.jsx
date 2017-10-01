import {USER_SET_ID} from "./action-types";
import {addFetching, minusFetching} from "./index";
import stringValidator, {emptyStringValidator} from "../validators/string";
import {setUsernameError, setPasswordError, clearLoginForm} from "./forms/login";
import UserApi from "../api/user-api";

export const userSetId = id => {
    if (!emptyStringValidator(id)) {
      throw new Error("Id must be string");
    }
    return {
        type: USER_SET_ID,
        id
    };
};

export const login = (username, password) => {
  return async dispatch => {
    try {
      if (!stringValidator(username)) {
          dispatch(setUsernameError("Username is required"));
      }
      if (!stringValidator(password)) {
        dispatch(setPasswordError("Password is required"));
      } else {
        dispatch(addFetching());
        //this is the jwt and now i'm logged in!
        const id = await UserApi.login(username, password);
        dispatch(userSetId(id));
        dispatch(clearLoginForm());
      }
    } catch (error) {
      dispatch(userSetId("didnt work"));
    } finally {
      dispatch(minusFetching());
    }
  };
};
