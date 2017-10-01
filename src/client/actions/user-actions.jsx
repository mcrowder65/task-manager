import {USER_SET_ID} from "./action-types";
import {addFetching, minusFetching} from "./index";
import {fetchPost} from "../shared/shared-fetch";
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
  if (!username || username.length === 0 || typeof username !== "string") {
      throw Error("username must be non empty string");
  }
  if (!password || password.length === 0 || typeof password !== "string") {
      throw Error("password must be non empty string");
  }
  return async dispatch => {
    try {
      dispatch(addFetching());
      const result = await fetchPost({
        url: "http://matthewjcrowder.com:80/login",
        body: JSON.stringify({username, password})
      });
      //this is the jwt and now i'm logged in!
      dispatch(userSetId(result));
    } catch (error) {
      console.error(error);
      dispatch(userSetId(result));
    } finally {
      dispatch(minusFetching());
    }
  };
};
