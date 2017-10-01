import {USER_SET_ID} from "./action-types";
import {addFetching, minusFetching} from "./index";
import {fetchPost} from "../shared/shared-fetch";
import stringValidator from "../validators/string";
import {setUsernameError, setPasswordError} from "./login-actions";

export const userSetId = id => {
    if (!id || id.length === 0 || typeof id !== "string") {
        throw Error("id must be non empty string");
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
        return dispatch(setPasswordError("Password is required"));
      }
      dispatch(addFetching());
      const result = await fetchPost({
        url: "http://matthewjcrowder.com:80/login",
        body: JSON.stringify({username, password})
      });
      //this is the jwt and now i'm logged in!
      return dispatch(userSetId(result));
    } catch (error) {
      console.error(error);
      return dispatch(userSetId(result));
    } finally {
      dispatch(minusFetching());
    }
  };
};
