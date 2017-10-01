import {USER_SET_ID} from "./action-types";
import {addFetching, minusFetching} from "./index";
import {emptyStringValidator} from "../validators/string";
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
      dispatch(addFetching());
      const id = await UserApi.login(username, password);
      dispatch(userSetId(id));
      return true;
    } catch (error) {
      //TODO add failure message
      return false;
    } finally {
      dispatch(minusFetching());
    }
  };
};
