import {SET_USERNAME, SET_IS_DRAWER_OPEN} from "./action-types";
import {fetchPost} from "../shared/shared-fetch";

export const setUsername = username => {
    if (!username || username.length === 0 || typeof username !== "string") {
        throw Error("username must be non empty string");
    }
    return {
        type: SET_USERNAME,
        username
    };
};

export const setIsDrawerOpen = isDrawerOpen => {
    return {
        type: SET_IS_DRAWER_OPEN,
        isDrawerOpen: !!isDrawerOpen
    };
};

export const asyncCall = (username = "matt", password = "crowder") => {
    return async dispatch => {
        const result = await fetchPost({
            url: "http://localhost:3000/login",
            body: JSON.stringify({username, password})
        });
        if (result) {

            dispatch(setUsername(username));
        }
        //this is the jwt and now i'm logged in!
    };
};