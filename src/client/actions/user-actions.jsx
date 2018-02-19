import {USER_SET_ID} from "./action-types";
import {addFetchCount, minusFetchCount} from "./index";
import {emptyStringValidator} from "../validators/string";
import UserApi from "../api/user-api";
import {addMessage} from "./messages-actions";

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
            dispatch(addFetchCount());
            const id = await UserApi.login(username, password);
            dispatch(userSetId(id));
            return true;
        } catch (error) {
            dispatch(addMessage("Failed to login"));
            return false;
        } finally {
            dispatch(minusFetchCount());
        }
    };
};
